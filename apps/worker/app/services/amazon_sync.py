import os
import httpx
import json
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Any
from app.core.database import get_db

class AmazonSyncService:
    """Amazon Selling Partner API integration service"""
    
    def __init__(self):
        self.region = os.getenv("SP_API_REGION", "NA")
        self.seller_id = os.getenv("SP_API_SELLER_ID")
        self.role_arn = os.getenv("SP_API_ROLE_ARN")
        self.access_key = os.getenv("AWS_ACCESS_KEY_ID")
        self.secret_key = os.getenv("AWS_SECRET_ACCESS_KEY")
        self.lwa_client_id = os.getenv("LWA_CLIENT_ID")
        self.lwa_client_secret = os.getenv("LWA_CLIENT_SECRET")
        self.refresh_token = os.getenv("SP_API_REFRESH_TOKEN")
        self.marketplace_ids = os.getenv("MARKETPLACE_IDS", "ATVPDKIKX0DER").split(",")
        
        # Base URLs for different regions
        self.base_urls = {
            "NA": "https://sellingpartnerapi-na.amazon.com",
            "EU": "https://sellingpartnerapi-eu.amazon.com",
            "FE": "https://sellingpartnerapi-fe.amazon.com"
        }
        
        self.base_url = self.base_urls.get(self.region, self.base_urls["NA"])
        self.access_token = None
    
    async def get_access_token(self) -> str:
        """Get LWA access token"""
        if self.access_token:
            return self.access_token
            
        url = "https://api.amazon.com/auth/o2/token"
        data = {
            "grant_type": "refresh_token",
            "refresh_token": self.refresh_token,
            "client_id": self.lwa_client_id,
            "client_secret": self.lwa_client_secret
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.post(url, data=data)
            response.raise_for_status()
            token_data = response.json()
            self.access_token = token_data["access_token"]
            return self.access_token
    
    async def make_sp_api_request(
        self, 
        method: str, 
        endpoint: str, 
        params: Optional[Dict] = None,
        data: Optional[Dict] = None
    ) -> Dict[str, Any]:
        """Make authenticated request to SP-API"""
        access_token = await self.get_access_token()
        
        headers = {
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json",
            "x-amz-access-token": access_token
        }
        
        url = f"{self.base_url}{endpoint}"
        
        async with httpx.AsyncClient() as client:
            if method.upper() == "GET":
                response = await client.get(url, headers=headers, params=params)
            elif method.upper() == "POST":
                response = await client.post(url, headers=headers, json=data)
            else:
                raise ValueError(f"Unsupported HTTP method: {method}")
            
            response.raise_for_status()
            return response.json()
    
    async def sync_orders(self, from_date: str = None, to_date: str = None) -> Dict[str, Any]:
        """Sync Amazon orders"""
        if not from_date:
            from_date = (datetime.now() - timedelta(days=7)).isoformat()
        if not to_date:
            to_date = datetime.now().isoformat()
        
        # Convert to Amazon's expected format
        from_date_amz = datetime.fromisoformat(from_date.replace('Z', '+00:00')).strftime('%Y-%m-%dT%H:%M:%S.%fZ')
        to_date_amz = datetime.fromisoformat(to_date.replace('Z', '+00:00')).strftime('%Y-%m-%dT%H:%M:%S.%fZ')
        
        params = {
            "MarketplaceIds": self.marketplace_ids,
            "CreatedAfter": from_date_amz,
            "CreatedBefore": to_date_amz
        }
        
        try:
            # Get orders
            orders_response = await self.make_sp_api_request(
                "GET", 
                "/orders/v0/orders", 
                params=params
            )
            
            orders = orders_response.get("payload", {}).get("Orders", [])
            synced_count = 0
            
            db = await get_db()
            
            for order_data in orders:
                # Upsert order
                order = await db.amazonorder.upsert(
                    where={"amazonOrderId": order_data["AmazonOrderId"]},
                    data={
                        "amazonOrderId": order_data["AmazonOrderId"],
                        "purchaseDate": datetime.fromisoformat(order_data["PurchaseDate"].replace('Z', '+00:00')),
                        "lastUpdateDate": datetime.fromisoformat(order_data["LastUpdateDate"].replace('Z', '+00:00')),
                        "orderStatus": order_data["OrderStatus"],
                        "orderTotal": float(order_data.get("OrderTotal", {}).get("Amount", 0)),
                        "marketplaceId": order_data["MarketplaceId"],
                        "buyerEmail": order_data.get("BuyerEmail"),
                        "shipServiceLevel": order_data.get("ShipServiceLevel")
                    }
                )
                
                # Get order items
                items_response = await self.make_sp_api_request(
                    "GET",
                    f"/orders/v0/orders/{order_data['AmazonOrderId']}/orderItems"
                )
                
                items = items_response.get("payload", {}).get("OrderItems", [])
                
                for item_data in items:
                    await db.amazonorderitem.upsert(
                        where={
                            "amazonOrderId_sellerSku": {
                                "amazonOrderId": order.id,
                                "sellerSku": item_data["SellerSKU"]
                            }
                        },
                        data={
                            "amazonOrderId": order.id,
                            "asin": item_data["ASIN"],
                            "sellerSku": item_data["SellerSKU"],
                            "quantityOrdered": int(item_data["QuantityOrdered"]),
                            "itemPrice": float(item_data.get("ItemPrice", {}).get("Amount", 0)),
                            "itemTax": float(item_data.get("ItemTax", {}).get("Amount", 0))
                        }
                    )
                
                synced_count += 1
            
            return {
                "synced_orders": synced_count,
                "from_date": from_date,
                "to_date": to_date
            }
            
        except Exception as e:
            print(f"Error syncing orders: {e}")
            # Return mock data for development
            return {
                "synced_orders": 0,
                "from_date": from_date,
                "to_date": to_date,
                "error": str(e),
                "mock": True
            }
    
    async def sync_inventory(self) -> Dict[str, Any]:
        """Sync Amazon inventory"""
        try:
            # Get inventory summaries
            params = {
                "MarketplaceIds": self.marketplace_ids,
                "Details": "true"
            }
            
            response = await self.make_sp_api_request(
                "GET",
                "/fba/inventory/v1/summaries",
                params=params
            )
            
            inventory_items = response.get("payload", {}).get("inventorySummaries", [])
            synced_count = 0
            
            db = await get_db()
            
            for item in inventory_items:
                await db.amazoninventory.upsert(
                    where={
                        "asin_sellerSku_condition": {
                            "asin": item["asin"],
                            "sellerSku": item["sellerSku"],
                            "condition": item["condition"]
                        }
                    },
                    data={
                        "asin": item["asin"],
                        "fnsku": item.get("fnsku"),
                        "sellerSku": item["sellerSku"],
                        "condition": item["condition"],
                        "totalQty": int(item.get("totalQuantity", 0)),
                        "fulfillableQty": int(item.get("fulfillableQuantity", 0)),
                        "inboundQty": int(item.get("inboundQuantity", 0))
                    }
                )
                synced_count += 1
            
            return {
                "synced_items": synced_count
            }
            
        except Exception as e:
            print(f"Error syncing inventory: {e}")
            # Return mock data for development
            return {
                "synced_items": 0,
                "error": str(e),
                "mock": True
            }
    
    async def create_and_sync_report(self, report_type: str) -> Dict[str, Any]:
        """Create and sync Amazon report"""
        try:
            # Create report
            report_data = {
                "reportType": report_type,
                "marketplaceIds": self.marketplace_ids
            }
            
            create_response = await self.make_sp_api_request(
                "POST",
                "/reports/2021-06-30/reports",
                data=report_data
            )
            
            report_id = create_response["reportId"]
            
            # Store report log
            db = await get_db()
            report_log = await db.amazonreportlog.create(
                data={
                    "reportType": report_type,
                    "requestedAt": datetime.now(),
                    "status": "IN_PROGRESS",
                    "key": report_id
                }
            )
            
            return {
                "report_id": report_id,
                "status": "created",
                "log_id": report_log.id
            }
            
        except Exception as e:
            print(f"Error creating report: {e}")
            return {
                "error": str(e),
                "mock": True
            }

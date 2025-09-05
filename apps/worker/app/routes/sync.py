from fastapi import APIRouter, HTTPException, Depends, Header
from typing import Optional
from datetime import datetime, timedelta
from app.core.database import get_db
from app.services.amazon_sync import AmazonSyncService

router = APIRouter()

async def verify_worker_auth(authorization: Optional[str] = Header(None)):
    """Verify worker service authentication"""
    expected_token = f"Bearer {os.getenv('WORKER_SECRET_KEY', 'changeme')}"
    if authorization != expected_token:
        raise HTTPException(status_code=401, detail="Unauthorized")
    return True

@router.post("/orders")
async def sync_orders(
    from_date: Optional[str] = None,
    to_date: Optional[str] = None,
    _: bool = Depends(verify_worker_auth)
):
    """Sync Amazon orders"""
    try:
        service = AmazonSyncService()
        
        # Default to last 7 days if no dates provided
        if not from_date:
            from_date = (datetime.now() - timedelta(days=7)).isoformat()
        if not to_date:
            to_date = datetime.now().isoformat()
            
        result = await service.sync_orders(from_date, to_date)
        return {"status": "success", "message": "Orders synced", "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/inventory")
async def sync_inventory(_: bool = Depends(verify_worker_auth)):
    """Sync Amazon inventory"""
    try:
        service = AmazonSyncService()
        result = await service.sync_inventory()
        return {"status": "success", "message": "Inventory synced", "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/reports")
async def sync_reports(
    report_type: str = "GET_MERCHANT_LISTINGS_ALL_DATA",
    _: bool = Depends(verify_worker_auth)
):
    """Create and sync Amazon reports"""
    try:
        service = AmazonSyncService()
        result = await service.create_and_sync_report(report_type)
        return {"status": "success", "message": "Report created", "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/status")
async def sync_status():
    """Get sync job status"""
    # This would typically check job status from a job queue
    return {
        "last_orders_sync": "2024-01-15T10:30:00Z",
        "last_inventory_sync": "2024-01-15T10:25:00Z",
        "next_scheduled_sync": "2024-01-15T11:00:00Z",
        "status": "healthy"
    }

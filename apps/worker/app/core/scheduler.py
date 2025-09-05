from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger
import os
from app.services.amazon_sync import AmazonSyncService

scheduler = AsyncIOScheduler()

async def sync_amazon_orders():
    """Scheduled job to sync Amazon orders"""
    try:
        service = AmazonSyncService()
        await service.sync_orders()
        print("Amazon orders sync completed")
    except Exception as e:
        print(f"Amazon orders sync failed: {e}")

async def sync_amazon_inventory():
    """Scheduled job to sync Amazon inventory"""
    try:
        service = AmazonSyncService()
        await service.sync_inventory()
        print("Amazon inventory sync completed")
    except Exception as e:
        print(f"Amazon inventory sync failed: {e}")

def setup_scheduler():
    """Setup scheduled jobs"""
    cron_expression = os.getenv("SYNC_CRON", "*/30 * * * *")  # Every 30 minutes
    
    # Parse cron expression (simplified)
    if cron_expression.startswith("*/"):
        minutes = cron_expression.split()[0].replace("*/", "")
        cron_expression = f"*/{minutes} * * * *"
    
    scheduler.add_job(
        sync_amazon_orders,
        CronTrigger.from_crontab(cron_expression),
        id="sync_amazon_orders",
        name="Sync Amazon Orders",
        replace_existing=True
    )
    
    scheduler.add_job(
        sync_amazon_inventory,
        CronTrigger.from_crontab(cron_expression),
        id="sync_amazon_inventory", 
        name="Sync Amazon Inventory",
        replace_existing=True
    )

import os
from prisma import Prisma

prisma = Prisma()

async def init_db():
    """Initialize database connection"""
    await prisma.connect()

async def get_db():
    """Get database instance"""
    return prisma

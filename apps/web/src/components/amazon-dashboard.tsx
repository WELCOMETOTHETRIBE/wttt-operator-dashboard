'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { 
  ShoppingCart, 
  Package, 
  TrendingUp, 
  RefreshCw, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  ExternalLink
} from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'

// Mock Amazon data
const amazonOrders = [
  {
    id: '123-1234567-1234567',
    sku: 'FT-ALIGN-60g',
    qty: 2,
    total: 24.99,
    status: 'Shipped',
    purchaseDate: '2024-01-15T10:30:00Z',
    buyerEmail: 'customer@example.com'
  },
  {
    id: '123-1234567-1234568',
    sku: 'FT-THRIVE-60g',
    qty: 1,
    total: 12.49,
    status: 'Processing',
    purchaseDate: '2024-01-15T11:15:00Z',
    buyerEmail: 'customer2@example.com'
  },
  {
    id: '123-1234567-1234569',
    sku: 'TROPICAL-GF-CLSTR-300g',
    qty: 1,
    total: 18.99,
    status: 'Shipped',
    purchaseDate: '2024-01-15T14:20:00Z',
    buyerEmail: 'customer3@example.com'
  }
]

const amazonInventory = [
  {
    asin: 'B08XYZ1234',
    sku: 'FT-ALIGN-60g',
    condition: 'New',
    totalQty: 150,
    fulfillableQty: 120,
    inboundQty: 30,
    status: 'Good'
  },
  {
    asin: 'B08XYZ1235',
    sku: 'FT-THRIVE-60g',
    condition: 'New',
    totalQty: 200,
    fulfillableQty: 180,
    inboundQty: 20,
    status: 'Good'
  },
  {
    asin: 'B08XYZ1236',
    sku: 'FT-DRIVE-60g',
    condition: 'New',
    totalQty: 75,
    fulfillableQty: 60,
    inboundQty: 15,
    status: 'Low Stock'
  },
  {
    asin: 'B08XYZ1237',
    sku: 'TROPICAL-GF-CLSTR-300g',
    condition: 'New',
    totalQty: 80,
    fulfillableQty: 60,
    inboundQty: 20,
    status: 'Good'
  }
]

const syncStatus = {
  lastOrdersSync: '2024-01-15T10:30:00Z',
  lastInventorySync: '2024-01-15T10:25:00Z',
  nextScheduledSync: '2024-01-15T11:00:00Z',
  status: 'healthy'
}

export function AmazonDashboard() {
  const [isSyncing, setIsSyncing] = useState(false)

  const handleSync = async (type: 'orders' | 'inventory' | 'reports') => {
    setIsSyncing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSyncing(false)
    // In real app, this would trigger the worker service
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Shipped':
        return <Badge variant="success">Shipped</Badge>
      case 'Processing':
        return <Badge variant="warning">Processing</Badge>
      case 'Good':
        return <Badge variant="success">Good</Badge>
      case 'Low Stock':
        return <Badge variant="warning">Low Stock</Badge>
      default:
        return <Badge variant="default">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Amazon Integration</h1>
          <p className="text-gray-600">Monitor Amazon sales, inventory, and sync status</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => handleSync('reports')}
            disabled={isSyncing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
            Sync Reports
          </Button>
          <Button 
            className="tribe-gradient"
            onClick={() => handleSync('orders')}
            disabled={isSyncing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
            Sync Orders
          </Button>
        </div>
      </div>

      {/* Sync Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5" />
            Sync Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500">Last Orders Sync</div>
              <div className="text-sm">{formatDate(syncStatus.lastOrdersSync)}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500">Last Inventory Sync</div>
              <div className="text-sm">{formatDate(syncStatus.lastInventorySync)}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500">Next Scheduled Sync</div>
              <div className="text-sm">{formatDate(syncStatus.nextScheduledSync)}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Recent Amazon Orders
          </CardTitle>
          <CardDescription>Latest orders from Amazon marketplace</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Purchase Date</TableHead>
                <TableHead>Buyer</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {amazonOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-sm">{order.id}</TableCell>
                  <TableCell className="font-medium">{order.sku}</TableCell>
                  <TableCell>{order.qty}</TableCell>
                  <TableCell className="font-medium">{formatCurrency(order.total)}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell className="text-sm">{formatDate(order.purchaseDate)}</TableCell>
                  <TableCell className="text-sm">
                    {order.buyerEmail.replace(/(.{2}).*(@.*)/, '$1***$2')}
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Amazon Inventory */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Amazon FBA Inventory
          </CardTitle>
          <CardDescription>Current FBA inventory levels and status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ASIN</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Total Qty</TableHead>
                <TableHead>Fulfillable</TableHead>
                <TableHead>Inbound</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {amazonInventory.map((item) => (
                <TableRow key={item.asin}>
                  <TableCell className="font-mono text-sm">{item.asin}</TableCell>
                  <TableCell className="font-medium">{item.sku}</TableCell>
                  <TableCell>{item.condition}</TableCell>
                  <TableCell className="font-medium">{item.totalQty}</TableCell>
                  <TableCell className="text-green-600 font-medium">{item.fulfillableQty}</TableCell>
                  <TableCell className="text-blue-600">{item.inboundQty}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common Amazon integration tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2"
              onClick={() => handleSync('orders')}
              disabled={isSyncing}
            >
              <ShoppingCart className="h-6 w-6" />
              <span>Sync Orders</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2"
              onClick={() => handleSync('inventory')}
              disabled={isSyncing}
            >
              <Package className="h-6 w-6" />
              <span>Sync Inventory</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2"
              onClick={() => handleSync('reports')}
              disabled={isSyncing}
            >
              <TrendingUp className="h-6 w-6" />
              <span>Generate Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  TrendingUp, 
  Package, 
  AlertTriangle, 
  DollarSign,
  ShoppingCart,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'

// Mock data - in real app this would come from API
const kpiData = {
  todaysOrders: 12,
  weeklySales: 2847.50,
  fbaOnHand: 1247,
  reorderFlags: 3,
  cogsPercent: 42.5,
  grossMargin: 57.5,
  workOrdersInProgress: 2
}

const recentOrders = [
  { id: '123-1234567-1234567', sku: 'FT-ALIGN-60g', qty: 2, total: 24.99, status: 'Shipped' },
  { id: '123-1234567-1234568', sku: 'FT-THRIVE-60g', qty: 1, total: 12.49, status: 'Processing' },
  { id: '123-1234567-1234569', sku: 'TROPICAL-GF-CLSTR-300g', qty: 1, total: 18.99, status: 'Shipped' },
]

const lowStockItems = [
  { sku: 'FT-ALIGN-60g', onHand: 45, minQty: 50, status: 'Reorder Now' },
  { sku: 'Organic Pineapple', onHand: 8, minQty: 10, status: 'Reorder Now' },
  { sku: 'Stand-up Pouch 60g', onHand: 850, minQty: 1000, status: 'Reorder Soon' },
]

const expiringLots = [
  { lotCode: 'LOT001', sku: 'FT-ALIGN-60g', expDate: '2024-02-15', daysLeft: 42 },
  { lotCode: 'LOT002', sku: 'FT-THRIVE-60g', expDate: '2024-01-28', daysLeft: 25 },
]

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your operations.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Export Report</Button>
          <Button className="tribe-gradient">Sync Amazon</Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.todaysOrders}</div>
            <p className="text-xs text-muted-foreground">
              +2 from yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">7-Day Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(kpiData.weeklySales)}</div>
            <p className="text-xs text-muted-foreground">
              +12.5% from last week
            </p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">FBA On-Hand</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.fbaOnHand.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Across 4 SKUs
            </p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reorder Flags</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{kpiData.reorderFlags}</div>
            <p className="text-xs text-muted-foreground">
              Items need attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Secondary KPIs */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">COGS %</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.cogsPercent}%</div>
            <p className="text-xs text-muted-foreground">
              Cost of goods sold
            </p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gross Margin</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{kpiData.grossMargin}%</div>
            <p className="text-xs text-muted-foreground">
              Healthy margin
            </p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Work Orders</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.workOrdersInProgress}</div>
            <p className="text-xs text-muted-foreground">
              In progress
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Amazon Orders</CardTitle>
            <CardDescription>Latest orders from Amazon marketplace</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{order.sku}</p>
                    <p className="text-xs text-gray-500">Order: {order.id}</p>
                    <p className="text-xs text-gray-500">Qty: {order.qty}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-sm font-medium">{formatCurrency(order.total)}</p>
                    <div className="flex items-center gap-1">
                      {order.status === 'Shipped' ? (
                        <CheckCircle className="h-3 w-3 text-green-500" />
                      ) : (
                        <Clock className="h-3 w-3 text-yellow-500" />
                      )}
                      <span className="text-xs text-gray-500">{order.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Low Stock Alerts</CardTitle>
            <CardDescription>Items that need reordering</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{item.sku}</p>
                    <p className="text-xs text-gray-500">On Hand: {item.onHand}</p>
                    <p className="text-xs text-gray-500">Min Qty: {item.minQty}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      item.status === 'Reorder Now' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Expiring Lots */}
      <Card>
        <CardHeader>
          <CardTitle>Expiring Lots</CardTitle>
          <CardDescription>Lots expiring within the next 60 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {expiringLots.map((lot) => (
              <div key={lot.lotCode} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="space-y-1">
                  <p className="text-sm font-medium">{lot.lotCode}</p>
                  <p className="text-xs text-gray-500">SKU: {lot.sku}</p>
                  <p className="text-xs text-gray-500">Expires: {formatDate(lot.expDate)}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    lot.daysLeft <= 30 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {lot.daysLeft} days left
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

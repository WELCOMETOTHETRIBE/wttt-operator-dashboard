'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Package, AlertTriangle, CheckCircle, Clock } from 'lucide-react'
import { formatCurrency, formatDate, daysUntilExpiry } from '@/lib/utils'

// Mock inventory data
const inventoryData = [
  {
    id: '1',
    sku: 'FT-ALIGN-60g',
    title: 'FrüTrōpics ALIGN 60g Pouch',
    onHand: 45,
    allocated: 5,
    available: 40,
    lots: [
      { code: 'LOT001', qty: 25, expDate: '2024-02-15', mfgDate: '2023-12-15' },
      { code: 'LOT002', qty: 20, expDate: '2024-03-20', mfgDate: '2024-01-20' }
    ],
    cogs: 8.50,
    reorderStatus: 'Reorder Now',
    minQty: 50
  },
  {
    id: '2',
    sku: 'FT-THRIVE-60g',
    title: 'FrüTrōpics THRIVE 60g Pouch',
    onHand: 120,
    allocated: 10,
    available: 110,
    lots: [
      { code: 'LOT003', qty: 60, expDate: '2024-04-10', mfgDate: '2024-02-10' },
      { code: 'LOT004', qty: 60, expDate: '2024-05-15', mfgDate: '2024-03-15' }
    ],
    cogs: 9.25,
    reorderStatus: 'Good',
    minQty: 50
  },
  {
    id: '3',
    sku: 'FT-DRIVE-60g',
    title: 'FrüTrōpics DRIVE 60g Pouch',
    onHand: 85,
    allocated: 15,
    available: 70,
    lots: [
      { code: 'LOT005', qty: 45, expDate: '2024-03-05', mfgDate: '2024-01-05' },
      { code: 'LOT006', qty: 40, expDate: '2024-04-12', mfgDate: '2024-02-12' }
    ],
    cogs: 9.75,
    reorderStatus: 'Good',
    minQty: 50
  },
  {
    id: '4',
    sku: 'TROPICAL-GF-CLSTR-300g',
    title: 'Tribal Clusters Tropical GF 300g',
    onHand: 35,
    allocated: 8,
    available: 27,
    lots: [
      { code: 'LOT007', qty: 20, expDate: '2024-06-20', mfgDate: '2024-04-20' },
      { code: 'LOT008', qty: 15, expDate: '2024-07-15', mfgDate: '2024-05-15' }
    ],
    cogs: 12.50,
    reorderStatus: 'Reorder Soon',
    minQty: 30
  }
]

export function InventoryTable() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const filteredData = inventoryData.filter(item => {
    const matchesSearch = item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.title.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'reorder' && item.reorderStatus !== 'Good') ||
                         (filterStatus === 'good' && item.reorderStatus === 'Good')
    
    return matchesSearch && matchesFilter
  })

  const getReorderBadgeVariant = (status: string) => {
    switch (status) {
      case 'Reorder Now':
        return 'danger'
      case 'Reorder Soon':
        return 'warning'
      default:
        return 'success'
    }
  }

  const getExpiryBadge = (expDate: string) => {
    const daysLeft = daysUntilExpiry(expDate)
    if (daysLeft <= 30) {
      return <Badge variant="danger">Expires in {daysLeft} days</Badge>
    } else if (daysLeft <= 60) {
      return <Badge variant="warning">Expires in {daysLeft} days</Badge>
    } else {
      return <Badge variant="success">Expires in {daysLeft} days</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Finished Goods Inventory</CardTitle>
            <CardDescription>
              Track SKUs, lots, and inventory levels with FEFO/FIFO costing
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Search SKUs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64"
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="all">All Items</option>
              <option value="reorder">Need Reorder</option>
              <option value="good">Good Stock</option>
            </select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SKU</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>On Hand</TableHead>
              <TableHead>Allocated</TableHead>
              <TableHead>Available</TableHead>
              <TableHead>Lots (FEFO)</TableHead>
              <TableHead>COGS</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.sku}</TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{item.title}</div>
                    <div className="text-sm text-gray-500">Brand: WTTT</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-gray-400" />
                    {item.onHand}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-yellow-500" />
                    {item.allocated}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    {item.available}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    {item.lots.map((lot, index) => (
                      <div key={lot.code} className="flex items-center justify-between text-sm">
                        <span className="font-mono">{lot.code}</span>
                        <span className="text-gray-500">({lot.qty})</span>
                        {getExpiryBadge(lot.expDate)}
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  {formatCurrency(item.cogs)}
                </TableCell>
                <TableCell>
                  <Badge variant={getReorderBadgeVariant(item.reorderStatus)}>
                    {item.reorderStatus}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm">
                      Adjust
                    </Button>
                    <Button variant="outline" size="sm">
                      Transfer
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

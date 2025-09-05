import { AppShell } from '@/components/app-shell'
import { InventoryTable } from '@/components/inventory-table'

export default function InventoryPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Inventory</h1>
            <p className="text-gray-600">Manage finished goods inventory and track lots</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              Export CSV
            </button>
            <button className="px-4 py-2 bg-tribe-leaf text-white rounded-md text-sm font-medium hover:bg-tribe-leaf/90">
              Receive Stock
            </button>
          </div>
        </div>

        {/* Inventory Table */}
        <InventoryTable />
      </div>
    </AppShell>
  )
}

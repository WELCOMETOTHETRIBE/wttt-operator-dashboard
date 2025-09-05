import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Unit conversion utilities
export const UNIT_CONVERSIONS = {
  // Weight conversions (to grams)
  'g': 1,
  'kg': 1000,
  'lb': 453.592,
  'oz': 28.3495,
  // Volume conversions (to ml)
  'ml': 1,
  'l': 1000,
  // Count
  'unit': 1,
} as const

export type Unit = keyof typeof UNIT_CONVERSIONS

export function convertToBaseUnit(value: number, fromUnit: Unit, toUnit: Unit = 'g'): number {
  // Convert to base unit first
  const baseValue = value * UNIT_CONVERSIONS[fromUnit]
  // Convert to target unit
  return baseValue / UNIT_CONVERSIONS[toUnit]
}

// FIFO COGS calculation
export interface InventoryTransaction {
  id: string
  qty: number
  unitCost: number
  txnType: 'RECEIPT' | 'CONSUME' | 'ADJUST' | 'SALE' | 'RETURN'
  createdAt: Date
}

export function calculateFIFOCOGS(transactions: InventoryTransaction[]): number {
  const sortedTransactions = transactions
    .filter(t => t.txnType === 'RECEIPT')
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
  
  if (sortedTransactions.length === 0) return 0
  
  let totalCost = 0
  let totalQty = 0
  
  for (const txn of sortedTransactions) {
    totalCost += txn.qty * txn.unitCost
    totalQty += txn.qty
  }
  
  return totalQty > 0 ? totalCost / totalQty : 0
}

// Reorder point calculation
export function calculateReorderPoint(
  avgDailyUsage: number,
  leadTimeDays: number,
  safetyStockQty: number = 0
): number {
  return Math.ceil(avgDailyUsage * leadTimeDays + safetyStockQty)
}

// Format currency
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

// Format date
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(d)
}

// Format date with time
export function formatDateTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d)
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Generate lot code
export function generateLotCode(prefix: string = 'LOT'): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 5).toUpperCase()
  return `${prefix}-${timestamp}-${random}`
}

// Calculate days until expiry
export function daysUntilExpiry(expDate: Date | string): number {
  const exp = typeof expDate === 'string' ? new Date(expDate) : expDate
  const now = new Date()
  const diffTime = exp.getTime() - now.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

// Check if lot is expiring soon (within 30 days)
export function isExpiringSoon(expDate: Date | string, days: number = 30): boolean {
  return daysUntilExpiry(expDate) <= days
}

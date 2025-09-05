import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding WTTT database...')

  // Create Brand Kit
  const brandKit = await prisma.brandKit.create({
    data: {
      name: 'WTTT Brand Kit',
      primaryHex: '#0E0F10',
      secondaryHex: '#779C3F',
      accentHex: '#F47C41',
      fontPrimary: 'Inter',
      tone: 'Authentic, Natural, Empowering',
      mission: 'To create premium wellness products that connect people to nature and their authentic selves',
      values: ['Authenticity', 'Quality', 'Sustainability', 'Community', 'Wellness']
    }
  })

  // Create Vendors
  const organicVendor = await prisma.vendor.create({
    data: {
      name: 'Organic Harvest Co.',
      contact: 'orders@organicharvest.com',
      leadTimeDays: 14,
      terms: 'Net 30'
    }
  })

  const packagingVendor = await prisma.vendor.create({
    data: {
      name: 'EcoPack Solutions',
      contact: 'sales@ecopack.com',
      leadTimeDays: 21,
      terms: 'Net 15'
    }
  })

  // Create Ingredients
  const ingredients = await Promise.all([
    prisma.ingredient.create({
      data: {
        name: 'Organic Pineapple',
        uom: 'kg',
        vendorId: organicVendor.id,
        costPerUom: 8.50,
        organic: true
      }
    }),
    prisma.ingredient.create({
      data: {
        name: 'Organic Mango',
        uom: 'kg',
        vendorId: organicVendor.id,
        costPerUom: 12.00,
        organic: true
      }
    }),
    prisma.ingredient.create({
      data: {
        name: 'Organic Coconut',
        uom: 'kg',
        vendorId: organicVendor.id,
        costPerUom: 6.75,
        organic: true
      }
    }),
    prisma.ingredient.create({
      data: {
        name: 'Fresh Ginger',
        uom: 'kg',
        vendorId: organicVendor.id,
        costPerUom: 15.00,
        organic: true
      }
    }),
    prisma.ingredient.create({
      data: {
        name: 'Maqui Berry Powder',
        uom: 'kg',
        vendorId: organicVendor.id,
        costPerUom: 85.00,
        organic: true
      }
    }),
    prisma.ingredient.create({
      data: {
        name: 'Goji Berry Powder',
        uom: 'kg',
        vendorId: organicVendor.id,
        costPerUom: 65.00,
        organic: true
      }
    }),
    prisma.ingredient.create({
      data: {
        name: 'Gluten-Free Oats',
        uom: 'kg',
        vendorId: organicVendor.id,
        costPerUom: 4.25,
        organic: true
      }
    }),
    prisma.ingredient.create({
      data: {
        name: 'Teff Flour',
        uom: 'kg',
        vendorId: organicVendor.id,
        costPerUom: 12.50,
        organic: true
      }
    }),
    prisma.ingredient.create({
      data: {
        name: 'Quinoa Flour',
        uom: 'kg',
        vendorId: organicVendor.id,
        costPerUom: 18.00,
        organic: true
      }
    }),
    prisma.ingredient.create({
      data: {
        name: 'Amaranth Flour',
        uom: 'kg',
        vendorId: organicVendor.id,
        costPerUom: 22.00,
        organic: true
      }
    }),
    prisma.ingredient.create({
      data: {
        name: 'Chia Seeds',
        uom: 'kg',
        vendorId: organicVendor.id,
        costPerUom: 16.50,
        organic: true
      }
    }),
    prisma.ingredient.create({
      data: {
        name: 'Pumpkin Seeds',
        uom: 'kg',
        vendorId: organicVendor.id,
        costPerUom: 14.00,
        organic: true
      }
    }),
    prisma.ingredient.create({
      data: {
        name: 'MCT Oil',
        uom: 'l',
        vendorId: organicVendor.id,
        costPerUom: 45.00,
        organic: true
      }
    }),
    prisma.ingredient.create({
      data: {
        name: 'Turkey Tail Extract',
        uom: 'kg',
        vendorId: organicVendor.id,
        costPerUom: 120.00,
        organic: true
      }
    }),
    prisma.ingredient.create({
      data: {
        name: 'Ashwagandha Powder',
        uom: 'kg',
        vendorId: organicVendor.id,
        costPerUom: 95.00,
        organic: true
      }
    }),
    prisma.ingredient.create({
      data: {
        name: 'Turmeric Powder',
        uom: 'kg',
        vendorId: organicVendor.id,
        costPerUom: 28.00,
        organic: true
      }
    })
  ])

  // Create Products
  const alignProduct = await prisma.product.create({
    data: {
      name: 'FrüTrōpics ALIGN',
      brand: 'WTTT',
      family: 'FrüTrōpics',
      description: 'Tropical fruit blend with adaptogenic herbs for daily alignment and balance',
      status: 'ACTIVE',
      defaultUom: 'unit',
      upc: '123456789012',
      asin: 'B08XYZ1234'
    }
  })

  const thriveProduct = await prisma.product.create({
    data: {
      name: 'FrüTrōpics THRIVE',
      brand: 'WTTT',
      family: 'FrüTrōpics',
      description: 'Energizing tropical blend with superfoods for peak performance',
      status: 'ACTIVE',
      defaultUom: 'unit',
      upc: '123456789013',
      asin: 'B08XYZ1235'
    }
  })

  const driveProduct = await prisma.product.create({
    data: {
      name: 'FrüTrōpics DRIVE',
      brand: 'WTTT',
      family: 'FrüTrōpics',
      description: 'Focus-enhancing tropical blend with nootropics and adaptogens',
      status: 'ACTIVE',
      defaultUom: 'unit',
      upc: '123456789014',
      asin: 'B08XYZ1236'
    }
  })

  const clusterProduct = await prisma.product.create({
    data: {
      name: 'Tribal Clusters Tropical',
      brand: 'WTTT',
      family: 'Tribal Clusters',
      description: 'Gluten-free tropical clusters with ancient grains and superfoods',
      status: 'ACTIVE',
      defaultUom: 'unit',
      upc: '123456789015',
      asin: 'B08XYZ1237'
    }
  })

  // Create SKUs
  const skus = await Promise.all([
    prisma.sku.create({
      data: {
        productId: alignProduct.id,
        code: 'FT-ALIGN-60g',
        title: 'FrüTrōpics ALIGN 60g Pouch',
        casePackQty: 12,
        innerPackQty: 1,
        netWeightGrams: 60
      }
    }),
    prisma.sku.create({
      data: {
        productId: thriveProduct.id,
        code: 'FT-THRIVE-60g',
        title: 'FrüTrōpics THRIVE 60g Pouch',
        casePackQty: 12,
        innerPackQty: 1,
        netWeightGrams: 60
      }
    }),
    prisma.sku.create({
      data: {
        productId: driveProduct.id,
        code: 'FT-DRIVE-60g',
        title: 'FrüTrōpics DRIVE 60g Pouch',
        casePackQty: 12,
        innerPackQty: 1,
        netWeightGrams: 60
      }
    }),
    prisma.sku.create({
      data: {
        productId: clusterProduct.id,
        code: 'TROPICAL-GF-CLSTR-300g',
        title: 'Tribal Clusters Tropical GF 300g',
        casePackQty: 6,
        innerPackQty: 1,
        netWeightGrams: 300
      }
    })
  ])

  // Create Packaging Items
  const packagingItems = await Promise.all([
    prisma.packagingItem.create({
      data: {
        name: 'Stand-up Pouch 60g',
        uom: 'unit',
        vendorId: packagingVendor.id,
        costPerUom: 0.35,
        kind: 'POUCH'
      }
    }),
    prisma.packagingItem.create({
      data: {
        name: 'Stand-up Pouch 300g',
        uom: 'unit',
        vendorId: packagingVendor.id,
        costPerUom: 0.55,
        kind: 'POUCH'
      }
    }),
    prisma.packagingItem.create({
      data: {
        name: 'Front Label 60g',
        uom: 'unit',
        vendorId: packagingVendor.id,
        costPerUom: 0.08,
        kind: 'LABEL'
      }
    }),
    prisma.packagingItem.create({
      data: {
        name: 'Back Label 60g',
        uom: 'unit',
        vendorId: packagingVendor.id,
        costPerUom: 0.08,
        kind: 'LABEL'
      }
    }),
    prisma.packagingItem.create({
      data: {
        name: 'Master Case 12pk',
        uom: 'unit',
        vendorId: packagingVendor.id,
        costPerUom: 2.25,
        kind: 'CASE'
      }
    }),
    prisma.packagingItem.create({
      data: {
        name: 'Master Case 6pk',
        uom: 'unit',
        vendorId: packagingVendor.id,
        costPerUom: 1.85,
        kind: 'CASE'
      }
    })
  ])

  // Create BOMs
  await Promise.all([
    // ALIGN BOM
    prisma.bom.create({
      data: {
        productId: alignProduct.id,
        packagingItemId: packagingItems[0].id, // 60g pouch
        qtyPerUnit: 1
      }
    }),
    prisma.bom.create({
      data: {
        productId: alignProduct.id,
        packagingItemId: packagingItems[2].id, // front label
        qtyPerUnit: 1
      }
    }),
    prisma.bom.create({
      data: {
        productId: alignProduct.id,
        packagingItemId: packagingItems[3].id, // back label
        qtyPerUnit: 1
      }
    }),
    prisma.bom.create({
      data: {
        productId: alignProduct.id,
        packagingItemId: packagingItems[4].id, // master case
        qtyPerUnit: 0.083 // 1/12
      }
    }),
    // THRIVE BOM
    prisma.bom.create({
      data: {
        productId: thriveProduct.id,
        packagingItemId: packagingItems[0].id,
        qtyPerUnit: 1
      }
    }),
    prisma.bom.create({
      data: {
        productId: thriveProduct.id,
        packagingItemId: packagingItems[2].id,
        qtyPerUnit: 1
      }
    }),
    prisma.bom.create({
      data: {
        productId: thriveProduct.id,
        packagingItemId: packagingItems[3].id,
        qtyPerUnit: 1
      }
    }),
    prisma.bom.create({
      data: {
        productId: thriveProduct.id,
        packagingItemId: packagingItems[4].id,
        qtyPerUnit: 0.083
      }
    }),
    // DRIVE BOM
    prisma.bom.create({
      data: {
        productId: driveProduct.id,
        packagingItemId: packagingItems[0].id,
        qtyPerUnit: 1
      }
    }),
    prisma.bom.create({
      data: {
        productId: driveProduct.id,
        packagingItemId: packagingItems[2].id,
        qtyPerUnit: 1
      }
    }),
    prisma.bom.create({
      data: {
        productId: driveProduct.id,
        packagingItemId: packagingItems[3].id,
        qtyPerUnit: 1
      }
    }),
    prisma.bom.create({
      data: {
        productId: driveProduct.id,
        packagingItemId: packagingItems[4].id,
        qtyPerUnit: 0.083
      }
    }),
    // CLUSTERS BOM
    prisma.bom.create({
      data: {
        productId: clusterProduct.id,
        packagingItemId: packagingItems[1].id, // 300g pouch
        qtyPerUnit: 1
      }
    }),
    prisma.bom.create({
      data: {
        productId: clusterProduct.id,
        packagingItemId: packagingItems[2].id,
        qtyPerUnit: 1
      }
    }),
    prisma.bom.create({
      data: {
        productId: clusterProduct.id,
        packagingItemId: packagingItems[3].id,
        qtyPerUnit: 1
      }
    }),
    prisma.bom.create({
      data: {
        productId: clusterProduct.id,
        packagingItemId: packagingItems[5].id, // 6pk case
        qtyPerUnit: 0.167 // 1/6
      }
    })
  ])

  // Create Recipes
  const alignRecipe = await prisma.recipe.create({
    data: {
      productId: alignProduct.id,
      version: '1.0',
      yieldQty: 1000, // 1000 units
      yieldUom: 'unit',
      instructions: 'Mix all ingredients in order, ensuring even distribution of adaptogens'
    }
  })

  const thriveRecipe = await prisma.recipe.create({
    data: {
      productId: thriveProduct.id,
      version: '1.0',
      yieldQty: 1000,
      yieldUom: 'unit',
      instructions: 'Combine tropical fruits first, then add superfoods and energy boosters'
    }
  })

  const driveRecipe = await prisma.recipe.create({
    data: {
      productId: driveProduct.id,
      version: '1.0',
      yieldQty: 1000,
      yieldUom: 'unit',
      instructions: 'Layer nootropics with tropical base, ensuring cognitive enhancers are evenly distributed'
    }
  })

  const clusterRecipe = await prisma.recipe.create({
    data: {
      productId: clusterProduct.id,
      version: '1.0',
      yieldQty: 500, // 500 units (larger size)
      yieldUom: 'unit',
      instructions: 'Mix ancient grains with tropical fruits, form clusters, and bake at low temperature'
    }
  })

  // Create Recipe Lines
  const recipeLines = [
    // ALIGN Recipe
    { recipeId: alignRecipe.id, ingredientId: ingredients[0].id, qtyPerBatch: 25, lossPct: 2 }, // Pineapple
    { recipeId: alignRecipe.id, ingredientId: ingredients[1].id, qtyPerBatch: 20, lossPct: 2 }, // Mango
    { recipeId: alignRecipe.id, ingredientId: ingredients[2].id, qtyPerBatch: 15, lossPct: 1 }, // Coconut
    { recipeId: alignRecipe.id, ingredientId: ingredients[3].id, qtyPerBatch: 2, lossPct: 5 },  // Ginger
    { recipeId: alignRecipe.id, ingredientId: ingredients[13].id, qtyPerBatch: 0.5, lossPct: 3 }, // Turkey Tail
    { recipeId: alignRecipe.id, ingredientId: ingredients[14].id, qtyPerBatch: 1, lossPct: 3 }, // Ashwagandha
    { recipeId: alignRecipe.id, ingredientId: ingredients[12].id, qtyPerBatch: 0.2, lossPct: 1 }, // MCT Oil
    
    // THRIVE Recipe
    { recipeId: thriveRecipe.id, ingredientId: ingredients[0].id, qtyPerBatch: 30, lossPct: 2 },
    { recipeId: thriveRecipe.id, ingredientId: ingredients[1].id, qtyPerBatch: 25, lossPct: 2 },
    { recipeId: thriveRecipe.id, ingredientId: ingredients[2].id, qtyPerBatch: 20, lossPct: 1 },
    { recipeId: thriveRecipe.id, ingredientId: ingredients[4].id, qtyPerBatch: 0.3, lossPct: 3 }, // Maqui
    { recipeId: thriveRecipe.id, ingredientId: ingredients[5].id, qtyPerBatch: 0.3, lossPct: 3 }, // Goji
    { recipeId: thriveRecipe.id, ingredientId: ingredients[12].id, qtyPerBatch: 0.3, lossPct: 1 },
    
    // DRIVE Recipe
    { recipeId: driveRecipe.id, ingredientId: ingredients[0].id, qtyPerBatch: 22, lossPct: 2 },
    { recipeId: driveRecipe.id, ingredientId: ingredients[1].id, qtyPerBatch: 18, lossPct: 2 },
    { recipeId: driveRecipe.id, ingredientId: ingredients[2].id, qtyPerBatch: 12, lossPct: 1 },
    { recipeId: driveRecipe.id, ingredientId: ingredients[3].id, qtyPerBatch: 3, lossPct: 5 },
    { recipeId: driveRecipe.id, ingredientId: ingredients[15].id, qtyPerBatch: 0.8, lossPct: 3 }, // Turmeric
    { recipeId: driveRecipe.id, ingredientId: ingredients[14].id, qtyPerBatch: 1.2, lossPct: 3 },
    
    // CLUSTERS Recipe
    { recipeId: clusterRecipe.id, ingredientId: ingredients[6].id, qtyPerBatch: 50, lossPct: 3 }, // Oats
    { recipeId: clusterRecipe.id, ingredientId: ingredients[7].id, qtyPerBatch: 15, lossPct: 2 }, // Teff
    { recipeId: clusterRecipe.id, ingredientId: ingredients[8].id, qtyPerBatch: 12, lossPct: 2 }, // Quinoa
    { recipeId: clusterRecipe.id, ingredientId: ingredients[9].id, qtyPerBatch: 8, lossPct: 2 },  // Amaranth
    { recipeId: clusterRecipe.id, ingredientId: ingredients[10].id, qtyPerBatch: 5, lossPct: 1 }, // Chia
    { recipeId: clusterRecipe.id, ingredientId: ingredients[11].id, qtyPerBatch: 8, lossPct: 1 }, // Pumpkin Seeds
    { recipeId: clusterRecipe.id, ingredientId: ingredients[0].id, qtyPerBatch: 20, lossPct: 2 },
    { recipeId: clusterRecipe.id, ingredientId: ingredients[1].id, qtyPerBatch: 15, lossPct: 2 },
    { recipeId: clusterRecipe.id, ingredientId: ingredients[12].id, qtyPerBatch: 0.5, lossPct: 1 }
  ]

  await Promise.all(
    recipeLines.map(line =>
      prisma.recipeLine.create({ data: line })
    )
  )

  // Create Reorder Policies
  await Promise.all([
    // SKU Reorder Policies
    ...skus.map(sku =>
      prisma.reorderPolicy.create({
        data: {
          itemType: 'SKU',
          itemId: sku.id,
          minQty: 50,
          targetQty: 200,
          safetyStockQty: 25
        }
      })
    ),
    // Ingredient Reorder Policies
    ...ingredients.map(ingredient =>
      prisma.reorderPolicy.create({
        data: {
          itemType: 'INGREDIENT',
          itemId: ingredient.id,
          minQty: 10,
          targetQty: 50,
          safetyStockQty: 5
        }
      })
    ),
    // Packaging Reorder Policies
    ...packagingItems.map(item =>
      prisma.reorderPolicy.create({
        data: {
          itemType: 'PACKAGING',
          itemId: item.id,
          minQty: 1000,
          targetQty: 5000,
          safetyStockQty: 500
        }
      })
    )
  ])

  // Create some initial inventory
  const now = new Date()
  const lotCodes = ['LOT001', 'LOT002', 'LOT003', 'LOT004']
  
  const lots = await Promise.all(
    skus.map((sku, index) =>
      prisma.lot.create({
        data: {
          skuId: sku.id,
          lotCode: lotCodes[index],
          mfgDate: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
          expDate: new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000) // 1 year from now
        }
      })
    )
  )

  // Create inventory ledger entries
  await Promise.all([
    // Initial receipts for SKUs
    ...lots.map((lot, index) =>
      prisma.inventoryLedger.create({
        data: {
          skuId: lot.skuId,
          lotId: lot.id,
          txnType: 'RECEIPT',
          qty: 100,
          uom: 'unit',
          unitCost: 8.50 + index * 0.50, // Varying costs
          source: 'Initial Stock',
          ref: 'INIT-001'
        }
      })
    ),
    // Some ingredient receipts
    ...ingredients.slice(0, 5).map(ingredient =>
      prisma.inventoryLedger.create({
        data: {
          ingredientId: ingredient.id,
          txnType: 'RECEIPT',
          qty: 100,
          uom: ingredient.uom,
          unitCost: ingredient.costPerUom,
          source: 'Initial Stock',
          ref: 'INIT-002'
        }
      })
    ),
    // Some packaging receipts
    ...packagingItems.slice(0, 3).map(item =>
      prisma.inventoryLedger.create({
        data: {
          packagingItemId: item.id,
          txnType: 'RECEIPT',
          qty: 1000,
          uom: item.uom,
          unitCost: item.costPerUom,
          source: 'Initial Stock',
          ref: 'INIT-003'
        }
      })
    )
  ])

  // Create mock Amazon data
  const amazonOrder = await prisma.amazonOrder.create({
    data: {
      amazonOrderId: '123-1234567-1234567',
      purchaseDate: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
      lastUpdateDate: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
      orderStatus: 'Shipped',
      orderTotal: 24.99,
      marketplaceId: 'ATVPDKIKX0DER',
      buyerEmail: 'customer@example.com',
      shipServiceLevel: 'Standard'
    }
  })

  await prisma.amazonOrderItem.create({
    data: {
      amazonOrderId: amazonOrder.id,
      asin: 'B08XYZ1234',
      sellerSku: 'FT-ALIGN-60g',
      quantityOrdered: 2,
      itemPrice: 12.49,
      itemTax: 0.00
    }
  })

  // Create Amazon inventory
  await Promise.all([
    prisma.amazonInventory.create({
      data: {
        asin: 'B08XYZ1234',
        fnsku: 'X001ABC123',
        sellerSku: 'FT-ALIGN-60g',
        condition: 'New',
        totalQty: 150,
        fulfillableQty: 120,
        inboundQty: 30
      }
    }),
    prisma.amazonInventory.create({
      data: {
        asin: 'B08XYZ1235',
        fnsku: 'X001ABC124',
        sellerSku: 'FT-THRIVE-60g',
        condition: 'New',
        totalQty: 200,
        fulfillableQty: 180,
        inboundQty: 20
      }
    }),
    prisma.amazonInventory.create({
      data: {
        asin: 'B08XYZ1236',
        fnsku: 'X001ABC125',
        sellerSku: 'FT-DRIVE-60g',
        condition: 'New',
        totalQty: 175,
        fulfillableQty: 150,
        inboundQty: 25
      }
    }),
    prisma.amazonInventory.create({
      data: {
        asin: 'B08XYZ1237',
        fnsku: 'X001ABC126',
        sellerSku: 'TROPICAL-GF-CLSTR-300g',
        condition: 'New',
        totalQty: 80,
        fulfillableQty: 60,
        inboundQty: 20
      }
    })
  ])

  // Create Brand Assets
  await Promise.all([
    prisma.asset.create({
      data: {
        kind: 'LOGO',
        url: '/assets/logo-primary.svg',
        filename: 'logo-primary.svg',
        version: '1.0.0',
        tags: ['primary', 'logo', 'brand']
      }
    }),
    prisma.asset.create({
      data: {
        kind: 'LOGO',
        url: '/assets/logo-secondary.svg',
        filename: 'logo-secondary.svg',
        version: '1.0.0',
        tags: ['secondary', 'logo', 'brand']
      }
    }),
    prisma.asset.create({
      data: {
        kind: 'PACKAGING',
        url: '/assets/pouch-dieline.pdf',
        filename: 'pouch-dieline.pdf',
        version: '1.0.0',
        tags: ['dieline', 'pouch', 'packaging']
      }
    }),
    prisma.asset.create({
      data: {
        kind: 'PHOTO',
        url: '/assets/product-hero.jpg',
        filename: 'product-hero.jpg',
        version: '1.0.0',
        tags: ['hero', 'product', 'lifestyle']
      }
    })
  ])

  console.log('✅ Database seeded successfully!')
  console.log(`📊 Created:`)
  console.log(`   - 1 Brand Kit`)
  console.log(`   - 2 Vendors`)
  console.log(`   - ${ingredients.length} Ingredients`)
  console.log(`   - 4 Products with ${skus.length} SKUs`)
  console.log(`   - ${packagingItems.length} Packaging Items`)
  console.log(`   - 4 Recipes with ${recipeLines.length} Recipe Lines`)
  console.log(`   - ${lots.length} Lots with initial inventory`)
  console.log(`   - 1 Amazon Order with items`)
  console.log(`   - 4 Amazon Inventory records`)
  console.log(`   - 4 Brand Assets`)
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

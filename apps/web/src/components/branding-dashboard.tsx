'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Palette, 
  Download, 
  Upload, 
  Eye, 
  FileText, 
  Image,
  Type,
  Heart
} from 'lucide-react'

// Mock brand kit data
const brandKit = {
  name: 'WTTT Brand Kit',
  primaryHex: '#0E0F10',
  secondaryHex: '#779C3F',
  accentHex: '#F47C41',
  fontPrimary: 'Inter',
  tone: 'Authentic, Natural, Empowering',
  mission: 'To create premium wellness products that connect people to nature and their authentic selves',
  values: ['Authenticity', 'Quality', 'Sustainability', 'Community', 'Wellness']
}

const brandAssets = [
  {
    id: '1',
    kind: 'LOGO',
    filename: 'logo-primary.svg',
    url: '/assets/logo-primary.svg',
    version: '1.0.0',
    tags: ['primary', 'logo', 'brand']
  },
  {
    id: '2',
    kind: 'LOGO',
    filename: 'logo-secondary.svg',
    url: '/assets/logo-secondary.svg',
    version: '1.0.0',
    tags: ['secondary', 'logo', 'brand']
  },
  {
    id: '3',
    kind: 'PACKAGING',
    filename: 'pouch-dieline.pdf',
    url: '/assets/pouch-dieline.pdf',
    version: '1.0.0',
    tags: ['dieline', 'pouch', 'packaging']
  },
  {
    id: '4',
    kind: 'PHOTO',
    filename: 'product-hero.jpg',
    url: '/assets/product-hero.jpg',
    version: '1.0.0',
    tags: ['hero', 'product', 'lifestyle']
  }
]

export function BrandingDashboard() {
  const [editingBrand, setEditingBrand] = useState(false)
  const [brandData, setBrandData] = useState(brandKit)

  const handleExportBrandKit = () => {
    // In real app, this would generate and download a ZIP file
    const brandKitData = {
      colors: {
        primary: brandData.primaryHex,
        secondary: brandData.secondaryHex,
        accent: brandData.accentHex
      },
      fonts: {
        primary: brandData.fontPrimary
      },
      tone: brandData.tone,
      mission: brandData.mission,
      values: brandData.values
    }
    
    const dataStr = JSON.stringify(brandKitData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'wttt-brand-kit.json'
    link.click()
  }

  const ColorPreview = ({ color, label }: { color: string; label: string }) => (
    <div className="flex items-center gap-3">
      <div 
        className="w-12 h-12 rounded-lg border-2 border-gray-200 shadow-sm"
        style={{ backgroundColor: color }}
      />
      <div>
        <div className="font-medium">{label}</div>
        <div className="text-sm text-gray-500 font-mono">{color}</div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Branding</h1>
          <p className="text-gray-600">Manage brand assets, colors, and brand guidelines</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportBrandKit}>
            <Download className="h-4 w-4 mr-2" />
            Export Brand Kit
          </Button>
          <Button 
            className="tribe-gradient"
            onClick={() => setEditingBrand(!editingBrand)}
          >
            <Palette className="h-4 w-4 mr-2" />
            {editingBrand ? 'Save Changes' : 'Edit Brand Kit'}
          </Button>
        </div>
      </div>

      {/* Brand Kit Editor */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Brand Kit
          </CardTitle>
          <CardDescription>
            Define your brand colors, fonts, and voice
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Colors */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Brand Colors</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {editingBrand ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="primary">Primary Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="primary"
                        value={brandData.primaryHex}
                        onChange={(e) => setBrandData({...brandData, primaryHex: e.target.value})}
                        className="font-mono"
                      />
                      <div 
                        className="w-12 h-10 rounded border-2 border-gray-200"
                        style={{ backgroundColor: brandData.primaryHex }}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secondary">Secondary Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="secondary"
                        value={brandData.secondaryHex}
                        onChange={(e) => setBrandData({...brandData, secondaryHex: e.target.value})}
                        className="font-mono"
                      />
                      <div 
                        className="w-12 h-10 rounded border-2 border-gray-200"
                        style={{ backgroundColor: brandData.secondaryHex }}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accent">Accent Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="accent"
                        value={brandData.accentHex}
                        onChange={(e) => setBrandData({...brandData, accentHex: e.target.value})}
                        className="font-mono"
                      />
                      <div 
                        className="w-12 h-10 rounded border-2 border-gray-200"
                        style={{ backgroundColor: brandData.accentHex }}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <ColorPreview color={brandData.primaryHex} label="Primary" />
                  <ColorPreview color={brandData.secondaryHex} label="Secondary" />
                  <ColorPreview color={brandData.accentHex} label="Accent" />
                </>
              )}
            </div>
          </div>

          {/* Typography */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Typography</h3>
            <div className="space-y-2">
              <Label htmlFor="font">Primary Font</Label>
              {editingBrand ? (
                <Input
                  id="font"
                  value={brandData.fontPrimary}
                  onChange={(e) => setBrandData({...brandData, fontPrimary: e.target.value})}
                />
              ) : (
                <div className="text-lg font-medium" style={{ fontFamily: brandData.fontPrimary }}>
                  {brandData.fontPrimary} - The quick brown fox jumps over the lazy dog
                </div>
              )}
            </div>
          </div>

          {/* Brand Voice */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Brand Voice</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="tone">Tone</Label>
                {editingBrand ? (
                  <Input
                    id="tone"
                    value={brandData.tone}
                    onChange={(e) => setBrandData({...brandData, tone: e.target.value})}
                  />
                ) : (
                  <div className="text-gray-700">{brandData.tone}</div>
                )}
              </div>
              <div>
                <Label htmlFor="mission">Mission</Label>
                {editingBrand ? (
                  <textarea
                    id="mission"
                    value={brandData.mission}
                    onChange={(e) => setBrandData({...brandData, mission: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    rows={3}
                  />
                ) : (
                  <div className="text-gray-700">{brandData.mission}</div>
                )}
              </div>
              <div>
                <Label>Values</Label>
                {editingBrand ? (
                  <Input
                    value={brandData.values.join(', ')}
                    onChange={(e) => setBrandData({...brandData, values: e.target.value.split(', ')})}
                    placeholder="Enter values separated by commas"
                  />
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {brandData.values.map((value, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-tribe-leaf/10 text-tribe-leaf rounded-full text-sm"
                      >
                        {value}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Preview */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Preview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div 
                className="p-6 rounded-lg text-white"
                style={{ 
                  background: `linear-gradient(135deg, ${brandData.primaryHex}, ${brandData.secondaryHex})`
                }}
              >
                <h4 className="text-xl font-bold mb-2">WELCOME TO THE TRIBE</h4>
                <p className="text-sm opacity-90">Premium wellness products for authentic living</p>
              </div>
              <div className="p-6 border-2 border-gray-200 rounded-lg">
                <h4 className="text-xl font-bold mb-2" style={{ color: brandData.accentHex }}>
                  FrüTrōpics ALIGN
                </h4>
                <p className="text-gray-600">Tropical fruit blend with adaptogenic herbs</p>
                <Button 
                  className="mt-4"
                  style={{ 
                    backgroundColor: brandData.accentHex,
                    color: 'white'
                  }}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Brand Assets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="h-5 w-5" />
            Brand Assets
          </CardTitle>
          <CardDescription>
            Upload and manage logos, packaging dielines, and brand photos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {brandAssets.map((asset) => (
              <div key={asset.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  {asset.kind === 'LOGO' && <Type className="h-5 w-5 text-blue-500" />}
                  {asset.kind === 'PACKAGING' && <FileText className="h-5 w-5 text-green-500" />}
                  {asset.kind === 'PHOTO' && <Image className="h-5 w-5 text-purple-500" />}
                  <div>
                    <div className="font-medium">{asset.filename}</div>
                    <div className="text-sm text-gray-500">v{asset.version}</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {asset.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-6 border-2 border-dashed border-gray-300 rounded-lg text-center">
            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500 mb-2">Upload new brand assets</p>
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Choose Files
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

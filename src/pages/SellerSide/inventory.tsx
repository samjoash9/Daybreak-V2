import { useState } from 'react';
import { Card, CardContent } from '../../components/common/card';
import { Button } from '../../components/common/button';
import { Input } from '../../components/common/input';
import { Badge } from '../../components/common/badge';
import { Progress } from '../../components/common/progress';
import {
  Plus,
  Search,
  Filter,
  Package,
  AlertTriangle,
  TrendingUp,
  MoreHorizontal,
  Edit,
  Trash2,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/common/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/common/dialog';
import { Label } from '../../components/common/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/common/select';

const inventoryItems = [
  {
    id: 1,
    name: 'Coffee Beans (Arabica)',
    category: 'Raw Materials',
    currentStock: 25,
    minStock: 10,
    maxStock: 50,
    unit: 'kg',
    costPerUnit: 450,
    supplier: 'Mountain Coffee Co.',
    lastRestocked: '2024-01-10',
    status: 'good',
  },
  {
    id: 2,
    name: 'Milk (Fresh)',
    category: 'Dairy',
    currentStock: 8,
    minStock: 15,
    maxStock: 30,
    unit: 'liters',
    costPerUnit: 85,
    supplier: 'Local Dairy Farm',
    lastRestocked: '2024-01-14',
    status: 'low',
  },
  {
    id: 3,
    name: 'Sugar (White)',
    category: 'Sweeteners',
    currentStock: 12,
    minStock: 5,
    maxStock: 20,
    unit: 'kg',
    costPerUnit: 60,
    supplier: 'Sweet Supply Co.',
    lastRestocked: '2024-01-12',
    status: 'good',
  },
  {
    id: 4,
    name: 'Disposable Cups (12oz)',
    category: 'Packaging',
    currentStock: 150,
    minStock: 200,
    maxStock: 500,
    unit: 'pieces',
    costPerUnit: 2.5,
    supplier: 'EcoPack Solutions',
    lastRestocked: '2024-01-08',
    status: 'low',
  },
  {
    id: 5,
    name: 'Croissants (Frozen)',
    category: 'Pastries',
    currentStock: 0,
    minStock: 20,
    maxStock: 50,
    unit: 'pieces',
    costPerUnit: 15,
    supplier: 'French Bakery Supply',
    lastRestocked: '2024-01-05',
    status: 'out',
  },
  {
    id: 6,
    name: 'Syrup (Vanilla)',
    category: 'Flavoring',
    currentStock: 6,
    minStock: 3,
    maxStock: 12,
    unit: 'bottles',
    costPerUnit: 120,
    supplier: 'Flavor Masters',
    lastRestocked: '2024-01-13',
    status: 'good',
  },
  {
    id: 7,
    name: 'Napkins',
    category: 'Supplies',
    currentStock: 45,
    minStock: 30,
    maxStock: 100,
    unit: 'packs',
    costPerUnit: 25,
    supplier: 'Clean & Neat Co.',
    lastRestocked: '2024-01-09',
    status: 'good',
  },
];

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredItems = inventoryItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { variant: string; label: string }> = {
      good: { variant: 'default', label: 'In Stock' },
      low: { variant: 'secondary', label: 'Low Stock' },
      out: { variant: 'destructive', label: 'Out of Stock' },
    };

    const config = statusConfig[status] || statusConfig.good;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getStockPercentage = (current: number, max: number) => Math.min((current / max) * 100, 100);

  const getTotalValue = () =>
    inventoryItems.reduce((total, item) => total + item.currentStock * item.costPerUnit, 0);

  const getLowStockCount = () =>
    inventoryItems.filter((item) => item.status === 'low' || item.status === 'out').length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl mb-2">Inventory</h1>
        <p className="text-muted-foreground">Track and manage your cafe&apos;s resources and supplies</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white border-0 shadow-[0_-4px_6px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.1)]">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Items</p>
              <p className="text-2xl font-bold">{inventoryItems.length}</p>
            </div>
            <Package className="h-8 w-8 text-[#8B4513]" />
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-[0_-4px_6px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.1)]">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Low Stock Items</p>
              <p className="text-2xl font-bold text-yellow-600">{getLowStockCount()}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-yellow-600" />
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-[0_-4px_6px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.1)]">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Value</p>
              <p className="text-2xl font-bold">₱{getTotalValue().toLocaleString()}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-[0_-4px_6px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.1)]">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Categories</p>
              <p className="text-2xl font-bold">
                {[...new Set(inventoryItems.map((item) => item.category))].length}
              </p>
            </div>
            <Filter className="h-8 w-8 text-blue-600" />
          </CardContent>
        </Card>
      </div>

      {/* Filters + Add Item */}
      <Card className="bg-white border-0 shadow-[0_-4px_6px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.1)]">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search inventory items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
              />
            </div>

            {/* Filter + Add */}
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[160px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Raw Materials">Raw Materials</SelectItem>
                  <SelectItem value="Dairy">Dairy</SelectItem>
                  <SelectItem value="Sweeteners">Sweeteners</SelectItem>
                  <SelectItem value="Packaging">Packaging</SelectItem>
                  <SelectItem value="Pastries">Pastries</SelectItem>
                  <SelectItem value="Supplies">Supplies</SelectItem>
                </SelectContent>
              </Select>

              {/* Add Item Dialog */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="coffee">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add Inventory Item</DialogTitle>
                    <DialogDescription>Add a new item to track in your inventory</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="item-name">Item Name</Label>
                      <Input id="item-name" placeholder="Enter item name" />
                    </div>
                    <div>
                      <Label htmlFor="item-category">Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Raw Materials">Raw Materials</SelectItem>
                          <SelectItem value="Dairy">Dairy</SelectItem>
                          <SelectItem value="Sweeteners">Sweeteners</SelectItem>
                          <SelectItem value="Packaging">Packaging</SelectItem>
                          <SelectItem value="Pastries">Pastries</SelectItem>
                          <SelectItem value="Supplies">Supplies</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="current-stock">Current Stock</Label>
                        <Input id="current-stock" type="number" placeholder="0" />
                      </div>
                      <div>
                        <Label htmlFor="unit">Unit</Label>
                        <Input id="unit" placeholder="kg, pieces, etc." />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="min-stock">Min Stock</Label>
                        <Input id="min-stock" type="number" placeholder="0" />
                      </div>
                      <div>
                        <Label htmlFor="max-stock">Max Stock</Label>
                        <Input id="max-stock" type="number" placeholder="0" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="cost-per-unit">Cost per Unit (₱)</Label>
                      <Input id="cost-per-unit" type="number" placeholder="0.00" />
                    </div>
                    <div>
                      <Label htmlFor="supplier">Supplier</Label>
                      <Input id="supplier" placeholder="Supplier name" />
                    </div>
                    <Button className="w-full bg-[#8B4513] hover:bg-[#A0522D]">Add Item</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inventory List */}
      <div className="grid gap-4">
        {filteredItems.map((item) => (
          <Card className="bg-white border-0 shadow-[0_-4px_6px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.1)]"
            key={item.id}>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    {getStatusBadge(item.status)}
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Current Stock</p>
                      <p className="font-semibold">
                        {item.currentStock} {item.unit}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Min / Max</p>
                      <p className="font-semibold">
                        {item.minStock} / {item.maxStock} {item.unit}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Cost per Unit</p>
                      <p className="font-semibold">₱{item.costPerUnit}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Value</p>
                      <p className="font-semibold">
                        ₱{(item.currentStock * item.costPerUnit).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span>Stock Level</span>
                      <span>{Math.round(getStockPercentage(item.currentStock, item.maxStock))}%</span>
                    </div>
                    <Progress value={getStockPercentage(item.currentStock, item.maxStock)} className="h-2" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 text-sm text-muted-foreground">
                    <p>
                      <span className="font-medium">Supplier:</span> {item.supplier}
                    </p>
                    <p>
                      <span className="font-medium">Last Restocked:</span> {item.lastRestocked}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="coffee">
                    Restock
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Item
                      </DropdownMenuItem>
                      <DropdownMenuItem>View History</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove Item
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No inventory items found</h3>
            <p className="text-muted-foreground">
              {searchTerm || selectedCategory !== 'all'
                ? 'Try adjusting your filters to see more items.'
                : 'Start by adding your first inventory item to track.'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

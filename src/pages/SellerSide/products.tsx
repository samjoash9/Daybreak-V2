import { useState } from 'react';
import { Card, CardContent } from '../../components/common/card';
import { Button } from '../../components/common/button';
import { Input } from '../../components/common/input';
import { Badge } from '../../components/common/badge';
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  MoreHorizontal,
  Eye,
  Coffee
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../components/common/alert-dialog';
import { Label } from '../../components/common/label';
import { Textarea } from '../../components/common/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/common/select';

const initialProducts = [
  {
    id: 1,
    name: 'Iced Coffee',
    price: 39,
    category: 'Cold Drinks',
    stock: 45,
    status: 'active',
    image: '/placeholder-coffee.jpg',
    description: 'Refreshing iced coffee perfect for hot days'
  },
  {
    id: 2,
    name: 'Cappuccino',
    price: 45,
    category: 'Hot Drinks',
    stock: 32,
    status: 'active',
    image: '/placeholder-coffee.jpg',
    description: 'Classic cappuccino with steamed milk foam'
  },
  {
    id: 3,
    name: 'Latte',
    price: 49,
    category: 'Hot Drinks',
    stock: 28,
    status: 'active',
    image: '/placeholder-coffee.jpg',
    description: 'Smooth latte with perfect milk-to-coffee ratio'
  },
  {
    id: 4,
    name: 'Americano',
    price: 35,
    category: 'Hot Drinks',
    stock: 0,
    status: 'out_of_stock',
    image: '/placeholder-coffee.jpg',
    description: 'Strong black coffee for purists'
  },
  {
    id: 5,
    name: 'Mocha',
    price: 55,
    category: 'Hot Drinks',
    stock: 15,
    status: 'low_stock',
    image: '/placeholder-coffee.jpg',
    description: 'Coffee with chocolate syrup and whipped cream'
  },
  {
    id: 6,
    name: 'Croissant',
    price: 25,
    category: 'Pastries',
    stock: 12,
    status: 'active',
    image: '/placeholder-pastry.jpg',
    description: 'Buttery, flaky croissant baked fresh daily'
  },
];

export default function Products() {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [deletingProduct, setDeletingProduct] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusBadge = (status: string, stock: number) => {
    if (status === 'out_of_stock' || stock === 0) {
      return <Badge variant="destructive">Out of Stock</Badge>;
    }
    if (status === 'low_stock' || stock < 20) {
      return <Badge variant="secondary">Low Stock</Badge>;
    }
    return <Badge variant="default">In Stock</Badge>;
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct({ ...product });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (editingProduct) {
      setProducts(products.map(p =>
        p.id === editingProduct.id ? editingProduct : p
      ));
      setIsEditDialogOpen(false);
      setEditingProduct(null);
    }
  };

  const handleDeleteProduct = (product: any) => {
    setDeletingProduct(product);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (deletingProduct) {
      setProducts(products.filter(p => p.id !== deletingProduct.id));
      setIsDeleteDialogOpen(false);
      setDeletingProduct(null);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl mb-2">Products</h1>
        <p className="text-muted-foreground">Manage your cafe's menu items and inventory.</p>
      </div>

      {/* Filters + Button in one row */}
      <Card className="bg-white border-0 shadow-[0_-4px_6px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.1)]">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[140px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Hot Drinks">Hot Drinks</SelectItem>
                <SelectItem value="Cold Drinks">Cold Drinks</SelectItem>
                <SelectItem value="Pastries">Pastries</SelectItem>
              </SelectContent>
            </Select>

            {/* Add Product Button */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="coffee">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                  <DialogDescription>Create a new menu item for your cafe</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="product-name">Product Name</Label>
                    <Input id="product-name" placeholder="Enter product name" />
                  </div>
                  <div>
                    <Label htmlFor="product-price">Price (₱)</Label>
                    <Input id="product-price" type="number" placeholder="0.00" />
                  </div>
                  <div>
                    <Label htmlFor="product-category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hot-drinks">Hot Drinks</SelectItem>
                        <SelectItem value="cold-drinks">Cold Drinks</SelectItem>
                        <SelectItem value="pastries">Pastries</SelectItem>
                        <SelectItem value="snacks">Snacks</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="product-stock">Initial Stock</Label>
                    <Input id="product-stock" type="number" placeholder="0" />
                  </div>
                  <div>
                    <Label htmlFor="product-description">Description</Label>
                    <Textarea id="product-description" placeholder="Product description..." />
                  </div>
                  <Button className="w-full bg-[#8B4513] hover:bg-[#A0522D]">
                    Add Product
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Card className="bg-white border-0 shadow-[0_-4px_6px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.1)]"
            key={product.id}
          >
            <div className="relative">
              <div className="h-48 bg-[#F5F5DC] flex items-center justify-center">
                <Coffee className="h-16 w-16 text-[#8B4513]" />
              </div>
              <div className="absolute top-2 right-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-white/80">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleEditProduct(product)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Product
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => handleDeleteProduct(product)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Product
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold">{product.name}</h3>
                  <Badge variant="outline" className="text-xs">
                    {product.category}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-[#8B4513]">₱{product.price}</span>
                  {getStatusBadge(product.status, product.stock)}
                </div>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>Stock: {product.stock}</span>
                  <span>ID: #{product.id}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty state */}
      {filteredProducts.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Coffee className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground">
              {searchTerm || selectedCategory !== 'all'
                ? 'Try adjusting your filters to see more products.'
                : 'Get started by adding your first product.'}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>Update product information</DialogDescription>
          </DialogHeader>
          {editingProduct && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-product-name">Product Name</Label>
                <Input
                  id="edit-product-name"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-product-price">Price (₱)</Label>
                <Input
                  id="edit-product-price"
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="edit-product-category">Category</Label>
                <Select
                  value={editingProduct.category}
                  onValueChange={(value) => setEditingProduct({ ...editingProduct, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Hot Drinks">Hot Drinks</SelectItem>
                    <SelectItem value="Cold Drinks">Cold Drinks</SelectItem>
                    <SelectItem value="Pastries">Pastries</SelectItem>
                    <SelectItem value="Snacks">Snacks</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-product-stock">Stock</Label>
                <Input
                  id="edit-product-stock"
                  type="number"
                  value={editingProduct.stock}
                  onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="edit-product-description">Description</Label>
                <Textarea
                  id="edit-product-description"
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  className="flex-1 bg-[#8B4513] hover:bg-[#A0522D]"
                  onClick={handleSaveEdit}
                >
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deletingProduct?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={confirmDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

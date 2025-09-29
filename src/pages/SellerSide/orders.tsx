import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/common/card';
import { Button } from '../../components/common/button';
import { Input } from '../../components/common/input';
import { Badge } from '../../components/common/badge';
import {
  Search,
  Filter,
  Eye,
  MoreHorizontal,
  Clock,
  CheckCircle,
  XCircle,
  Package
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/common/select';
import { Separator } from '../../components/common/separator';

const orders = [
  {
    id: '#3847',
    customer: 'John Doe',
    customerEmail: 'john.doe@email.com',
    items: [
      { name: 'Iced Coffee', quantity: 2, price: 39 },
      { name: 'Croissant', quantity: 1, price: 25 }
    ],
    total: 103,
    status: 'completed',
    date: '2024-01-15',
    time: '10:30 AM',
    paymentMethod: 'Card',
    location: 'Main Branch'
  },
  {
    id: '#3848',
    customer: 'Jane Smith',
    customerEmail: 'jane.smith@email.com',
    items: [
      { name: 'Cappuccino', quantity: 1, price: 45 }
    ],
    total: 45,
    status: 'pending',
    date: '2024-01-15',
    time: '11:15 AM',
    paymentMethod: 'Cash',
    location: 'Main Branch'
  },
  {
    id: '#3849',
    customer: 'Mike Johnson',
    customerEmail: 'mike.johnson@email.com',
    items: [
      { name: 'Latte', quantity: 2, price: 49 },
      { name: 'Mocha', quantity: 1, price: 55 }
    ],
    total: 153,
    status: 'processing',
    date: '2024-01-15',
    time: '11:45 AM',
    paymentMethod: 'Card',
    location: 'Downtown Branch'
  },
  {
    id: '#3850',
    customer: 'Sarah Wilson',
    customerEmail: 'sarah.wilson@email.com',
    items: [
      { name: 'Americano', quantity: 1, price: 35 },
      { name: 'Croissant', quantity: 2, price: 25 }
    ],
    total: 85,
    status: 'cancelled',
    date: '2024-01-15',
    time: '12:20 PM',
    paymentMethod: 'Card',
    location: 'Main Branch'
  },
  {
    id: '#3851',
    customer: 'David Brown',
    customerEmail: 'david.brown@email.com',
    items: [
      { name: 'Iced Coffee', quantity: 1, price: 39 },
      { name: 'Latte', quantity: 1, price: 49 }
    ],
    total: 88,
    status: 'completed',
    date: '2024-01-14',
    time: '2:15 PM',
    paymentMethod: 'Cash',
    location: 'Downtown Branch'
  }
];

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { variant: 'secondary', icon: Clock, color: 'text-yellow-600' },
      processing: { variant: 'outline', icon: Package, color: 'text-blue-600' },
      completed: { variant: 'default', icon: CheckCircle, color: 'text-green-600' },
      cancelled: { variant: 'destructive', icon: XCircle, color: 'text-red-600' }
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="capitalize">
        <Icon className="h-3 w-3 mr-1" />
        {status}
      </Badge>
    );
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    // This would typically make an API call
    console.log(`Updating order ${orderId} to ${newStatus}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl mb-2">Orders</h1>
          <p className="text-muted-foreground">Manage and track customer orders</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {orders.filter(o => o.status === 'pending').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Processing</p>
                <p className="text-2xl font-bold text-blue-600">
                  {orders.filter(o => o.status === 'processing').length}
                </p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-green-600">
                  {orders.filter(o => o.status === 'completed').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Cancelled</p>
                <p className="text-2xl font-bold text-red-600">
                  {orders.filter(o => o.status === 'cancelled').length}
                </p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search orders by ID or customer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <div className="grid gap-4">
        {filteredOrders.map((order) => (
          <Card key={order.id}>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="font-semibold text-lg">{order.id}</h3>
                    {getStatusBadge(order.status)}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-muted-foreground">
                    <p><span className="font-medium">Customer:</span> {order.customer}</p>
                    <p><span className="font-medium">Date:</span> {order.date} at {order.time}</p>
                    <p><span className="font-medium">Location:</span> {order.location}</p>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">Items:</span> {order.items.length} item(s) •
                      <span className="font-medium ml-1">Total:</span> ₱{order.total}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Order Details - {order.id}</DialogTitle>
                        <DialogDescription>Complete order information</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Customer Information</h4>
                          <p className="text-sm text-muted-foreground">{order.customer}</p>
                          <p className="text-sm text-muted-foreground">{order.customerEmail}</p>
                        </div>

                        <Separator />

                        <div>
                          <h4 className="font-medium mb-2">Order Items</h4>
                          <div className="space-y-2">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex justify-between text-sm">
                                <span>{item.quantity}x {item.name}</span>
                                <span>₱{item.price * item.quantity}</span>
                              </div>
                            ))}
                          </div>
                          <Separator className="my-2" />
                          <div className="flex justify-between font-medium">
                            <span>Total</span>
                            <span>₱{order.total}</span>
                          </div>
                        </div>

                        <Separator />

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Date:</span>
                            <p className="text-muted-foreground">{order.date}</p>
                          </div>
                          <div>
                            <span className="font-medium">Time:</span>
                            <p className="text-muted-foreground">{order.time}</p>
                          </div>
                          <div>
                            <span className="font-medium">Payment:</span>
                            <p className="text-muted-foreground">{order.paymentMethod}</p>
                          </div>
                          <div>
                            <span className="font-medium">Location:</span>
                            <p className="text-muted-foreground">{order.location}</p>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {order.status === 'pending' && (
                        <DropdownMenuItem onClick={() => updateOrderStatus(order.id, 'processing')}>
                          Mark as Processing
                        </DropdownMenuItem>
                      )}
                      {order.status === 'processing' && (
                        <DropdownMenuItem onClick={() => updateOrderStatus(order.id, 'completed')}>
                          Mark as Completed
                        </DropdownMenuItem>
                      )}
                      {order.status !== 'cancelled' && order.status !== 'completed' && (
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => updateOrderStatus(order.id, 'cancelled')}
                        >
                          Cancel Order
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No orders found</h3>
            <p className="text-muted-foreground">
              {searchTerm || selectedStatus !== 'all'
                ? 'Try adjusting your filters to see more orders.'
                : 'Orders will appear here once customers start placing them.'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
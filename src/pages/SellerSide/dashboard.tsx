import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/common/card';
import { Badge } from '../../components/common/badge';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const salesData = [
  { name: 'Mon', sales: 2400, orders: 12 },
  { name: 'Tue', sales: 1398, orders: 8 },
  { name: 'Wed', sales: 9800, orders: 24 },
  { name: 'Thu', sales: 3908, orders: 18 },
  { name: 'Fri', sales: 4800, orders: 22 },
  { name: 'Sat', sales: 3800, orders: 16 },
  { name: 'Sun', sales: 4300, orders: 19 },
];

const topProducts = [
  { name: 'Iced Coffee', sales: 145, revenue: 5655 },
  { name: 'Cappuccino', sales: 128, revenue: 4992 },
  { name: 'Latte', sales: 98, revenue: 4410 },
  { name: 'Americano', sales: 87, revenue: 3480 },
  { name: 'Mocha', sales: 76, revenue: 3800 },
];

const recentOrders = [
  { id: '#3847', customer: 'John Doe', items: 2, total: 89, status: 'completed' },
  { id: '#3848', customer: 'Jane Smith', items: 1, total: 45, status: 'pending' },
  { id: '#3849', customer: 'Mike Johnson', items: 3, total: 127, status: 'completed' },
  { id: '#3850', customer: 'Sarah Wilson', items: 2, total: 78, status: 'processing' },
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening at your cafe today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₱15,847</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +12.5% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +8.2% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">189</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
              -2.1% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              Active products
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Sales</CardTitle>
            <CardDescription>Sales performance over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#8B4513" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Trends</CardTitle>
            <CardDescription>Number of orders over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="orders" stroke="#D2B48C" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>Best selling items this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#8B4513] text-white rounded-full flex items-center justify-center text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.sales} sold</p>
                    </div>
                  </div>
                  <p className="font-medium">₱{product.revenue.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest customer orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₱{order.total}</p>
                    <Badge
                      variant={order.status === 'completed' ? 'default' : order.status === 'pending' ? 'secondary' : 'outline'}
                      className="text-xs"
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
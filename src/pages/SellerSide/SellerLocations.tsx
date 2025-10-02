import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/common/card';
import { Button } from '../../components/common/button';
import { Input } from '../../components/common/input';
import { Badge } from '../../components/common/badge';
import {
  Plus,
  Search,
  MapPin,
  Phone,
  Clock,
  Users,
  Edit,
  Trash2,
  MoreHorizontal,
  Store,
  TrendingUp,
  TrendingDown,
  DollarSign
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
import { Textarea } from '../../components/common/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/common/select';

const locations = [
  {
    id: 1,
    name: 'Main Branch',
    address: '123 Coffee Street, Downtown, Manila',
    phone: '+63 2 123 4567',
    manager: 'Maria Santos',
    status: 'active',
    openingHours: '6:00 AM - 10:00 PM',
    capacity: 50,
    monthlyRevenue: 145000,
    monthlyOrders: 1240,
    revenueChange: 12.5,
    orderChange: 8.2,
    popularItems: ['Iced Coffee', 'Cappuccino', 'Croissant']
  },
  {
    id: 2,
    name: 'Downtown Branch',
    address: '456 Business Ave, Makati City',
    phone: '+63 2 987 6543',
    manager: 'Juan Dela Cruz',
    status: 'active',
    openingHours: '7:00 AM - 9:00 PM',
    capacity: 35,
    monthlyRevenue: 98000,
    monthlyOrders: 890,
    revenueChange: -3.2,
    orderChange: 5.1,
    popularItems: ['Americano', 'Latte', 'Mocha']
  },
  {
    id: 3,
    name: 'Mall Branch',
    address: '789 Shopping Center, Quezon City',
    phone: '+63 2 555 0123',
    manager: 'Ana Rodriguez',
    status: 'active',
    openingHours: '10:00 AM - 10:00 PM',
    capacity: 25,
    monthlyRevenue: 67000,
    monthlyOrders: 650,
    revenueChange: 18.7,
    orderChange: 15.3,
    popularItems: ['Iced Coffee', 'Frappuccino', 'Pastries']
  },
  {
    id: 4,
    name: 'University Branch',
    address: '321 Academic Road, University Belt',
    phone: '+63 2 444 7890',
    manager: 'Miguel Torres',
    status: 'maintenance',
    openingHours: '6:30 AM - 11:00 PM',
    capacity: 40,
    monthlyRevenue: 0,
    monthlyOrders: 0,
    revenueChange: 0,
    orderChange: 0,
    popularItems: ['Americano', 'Iced Coffee', 'Study Snacks']
  }
];

export default function SellerLocations() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredLocations = locations.filter(location => {
    const matchesSearch =
      location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || location.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { variant: string; label: string }> = {
      active: { variant: 'default', label: 'Active' },
      maintenance: { variant: 'secondary', label: 'Under Maintenance' },
      closed: { variant: 'destructive', label: 'Closed' },
    };

    const config = statusConfig[status] || statusConfig.active;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getTotalRevenue = () => {
    return locations
      .filter(l => l.status === 'active')
      .reduce((total, location) => total + location.monthlyRevenue, 0);
  };

  const getActiveLocations = () => {
    return locations.filter(l => l.status === 'active').length;
  };

  const getTotalOrders = () => {
    return locations
      .filter(l => l.status === 'active')
      .reduce((total, location) => total + location.monthlyOrders, 0);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl mb-2">Locations</h1>
        <p className="text-muted-foreground">Manage your cafe branches and their performance</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white border-0 shadow-[0_-4px_6px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.1)]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Locations</p>
                <p className="text-2xl font-bold">{locations.length}</p>
              </div>
              <Store className="h-8 w-8 text-[#8B4513]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-[0_-4px_6px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.1)]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Locations</p>
                <p className="text-2xl font-bold text-green-600">{getActiveLocations()}</p>
              </div>
              <MapPin className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-[0_-4px_6px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.1)]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                <p className="text-2xl font-bold">₱{getTotalRevenue().toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-[0_-4px_6px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.1)]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Orders</p>
                <p className="text-2xl font-bold">{getTotalOrders().toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters + Add Location */}
      <Card className="bg-white border-0 shadow-[0_-4px_6px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.1)]">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Status filter */}
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>

            {/* Add Location button */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="coffee">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Location
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Location</DialogTitle>
                  <DialogDescription>Add a new branch to your cafe network</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="location-name">Location Name</Label>
                    <Input id="location-name" placeholder="e.g., Main Branch" />
                  </div>
                  <div>
                    <Label htmlFor="location-address">Address</Label>
                    <Textarea id="location-address" placeholder="Full address..." />
                  </div>
                  <div>
                    <Label htmlFor="location-phone">Phone Number</Label>
                    <Input id="location-phone" placeholder="+63 2 123 4567" />
                  </div>
                  <div>
                    <Label htmlFor="location-manager">Manager</Label>
                    <Input id="location-manager" placeholder="Manager name" />
                  </div>
                  <div>
                    <Label htmlFor="location-hours">Opening Hours</Label>
                    <Input id="location-hours" placeholder="e.g., 6:00 AM - 10:00 PM" />
                  </div>
                  <div>
                    <Label htmlFor="location-capacity">Seating Capacity</Label>
                    <Input id="location-capacity" type="number" placeholder="0" />
                  </div>
                  <div>
                    <Label htmlFor="location-status">Status</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="maintenance">Under Maintenance</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full bg-[#8B4513] hover:bg-[#A0522D]">
                    Add Location
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Locations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredLocations.map((location) => (
          <Card className="bg-white border-0 shadow-[0_-4px_6px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.1)]"
            key={location.id}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{location.name}</CardTitle>
                  <CardDescription className="mt-1">Managed by {location.manager}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(location.status)}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Location
                      </DropdownMenuItem>
                      <DropdownMenuItem>View Analytics</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Location
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Location Details */}
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{location.address}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{location.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{location.openingHours}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Capacity: {location.capacity} seats</span>
                </div>
              </div>

              {/* Performance */}
              {location.status === 'active' && (
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Monthly Performance</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Revenue</p>
                      <div className="flex items-center gap-1">
                        <span className="font-semibold">
                          ₱{location.monthlyRevenue.toLocaleString()}
                        </span>
                        <div
                          className={`flex items-center text-xs ${location.revenueChange >= 0 ? 'text-green-600' : 'text-red-600'
                            }`}
                        >
                          {location.revenueChange >= 0 ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : (
                            <TrendingDown className="h-3 w-3" />
                          )}
                          <span>{Math.abs(location.revenueChange)}%</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Orders</p>
                      <div className="flex items-center gap-1">
                        <span className="font-semibold">
                          {location.monthlyOrders.toLocaleString()}
                        </span>
                        <div
                          className={`flex items-center text-xs ${location.orderChange >= 0 ? 'text-green-600' : 'text-red-600'
                            }`}
                        >
                          {location.orderChange >= 0 ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : (
                            <TrendingDown className="h-3 w-3" />
                          )}
                          <span>{Math.abs(location.orderChange)}%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <p className="text-sm text-muted-foreground mb-2">Popular Items</p>
                    <div className="flex flex-wrap gap-1">
                      {location.popularItems.map((item, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {location.status === 'maintenance' && (
                <div className="border-t pt-4">
                  <div className="bg-yellow-50 p-3 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      This location is currently under maintenance and not operational.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty state */}
      {filteredLocations.length === 0 && (
        <Card className="bg-white border-0 shadow-[0_-4px_6px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.1)]">
          <CardContent className="p-12 text-center">
            <Store className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No locations found</h3>
            <p className="text-muted-foreground">
              {searchTerm || selectedStatus !== 'all'
                ? 'Try adjusting your filters to see more locations.'
                : 'Start by adding your first cafe location.'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

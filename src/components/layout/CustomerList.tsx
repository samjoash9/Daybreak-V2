import { Avatar, AvatarFallback, AvatarImage } from "../common/avatar.js";
import { Badge } from '../common/badge.js'
import { ScrollArea } from "../common/scroll-area.js";

interface Customer {
    id: string;
    name: string;
    email: string;
    lastMessage: string;
    timestamp: string;
    unreadCount: number;
    avatar?: string;
    // status: 'online' | 'offline';
}

interface CustomerListProps {
    customers: Customer[];
    selectedCustomerId: string | null;
    onSelectCustomer: (customerId: string) => void;
}

export function CustomerList({ customers, selectedCustomerId, onSelectCustomer }: CustomerListProps) {
    return (
        <div className="w-80 bg-sidebar border-r border-sidebar-border flex flex-col h-full">
            <div className="p-4 border-b border-sidebar-border">
                <h2 className="text-sidebar-foreground">Customer Support</h2>
                <p className="text-sm text-sidebar-foreground/70">Active conversations</p>
            </div>

            <ScrollArea className="flex-1">
                <div className="p-2">
                    {customers.map((customer) => (
                        <div
                            key={customer.id}
                            onClick={() => onSelectCustomer(customer.id)}
                            className={`p-3 rounded-lg cursor-pointer transition-colors mb-2 ${selectedCustomerId === customer.id
                                ? 'bg-gray-200'
                                : 'hover:bg-sidebar-accent/50 text-sidebar-foreground'
                                }`}
                        >
                            <div className="flex items-start gap-3">
                                <div className="relative">
                                    <Avatar className="w-10 h-10 bg-[#e5c570] text-white">
                                        <AvatarImage src={customer.avatar} alt={customer.name} />
                                        <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground">
                                            {customer.name.split(' ').map(n => n[0]).join('')}
                                        </AvatarFallback>
                                    </Avatar>
                                    {/* <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-sidebar ${customer.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                                        }`} /> */}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <p className="truncate">{customer.name}</p>
                                        {customer.unreadCount > 0 && (
                                            <Badge className="bg-sidebar-primary text-sidebar-primary-foreground text-xs bg-[#e5c570]">
                                                {customer.unreadCount}
                                            </Badge>
                                        )}
                                    </div>
                                    <p className="text-xs opacity-70 truncate">{customer.lastMessage}</p>
                                    <p className="text-xs opacity-50 mt-1">{customer.timestamp}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}
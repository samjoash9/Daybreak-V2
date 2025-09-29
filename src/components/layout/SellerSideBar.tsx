import { useState } from "react";
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Warehouse,
    MapPin,
    Coffee,
    Menu,
    X,
} from "lucide-react";
import { Button } from "../common/button";
import { NavLink } from "react-router-dom";

export function SellerSidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const menuItems = [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
        { id: "products", label: "Products", icon: Package },
        { id: "orders", label: "Orders", icon: ShoppingCart },
        { id: "inventory", label: "Inventory", icon: Warehouse },
        { id: "locations", label: "Locations", icon: MapPin },
    ];

    return (
        <div
            className={`bg-[#8B4513] text-white h-screen transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"
                }`}
        >
            {/* Header */}
            <div className="p-4 border-b border-[#A0522D]">
                <div className="flex items-center justify-between">
                    {!isCollapsed && (
                        <div className="flex items-center gap-2">
                            <Coffee className="h-8 w-8 text-[#D2B48C]" />
                            <div>
                                <h2 className="font-semibold">DayBreak Cafe</h2>
                                <p className="text-[#D2B48C] text-sm">Seller Dashboard</p>
                            </div>
                        </div>
                    )}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="text-white hover:bg-[#A0522D]"
                    >
                        {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
                    </Button>
                </div>
            </div>

            {/* Navigation */}
            <nav className="p-4">
                <ul className="space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li key={item.id}>
                                <NavLink
                                    to={`/seller/${item.id}`}
                                    className={({ isActive }) =>
                                        `w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${isActive
                                            ? "bg-[#D2B48C] text-[#8B4513]"
                                            : "hover:bg-[#A0522D] text-white"
                                        }`
                                    }
                                >
                                    <Icon className="h-5 w-5 flex-shrink-0" />
                                    {!isCollapsed && <span>{item.label}</span>}
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
}

import { SellerSidebar } from "./SellerSideBar";
import { Outlet } from "react-router-dom";

export default function SellerLayout() {
    return (
        <div className="flex h-screen">
            {/* Left: sidebar */}
            <SellerSidebar />

            {/* Right: the page that matches the nested seller route */}
            <main className="flex-1 overflow-auto p-6 bg-gray-50">
                <Outlet />
            </main>
        </div>
    );
}

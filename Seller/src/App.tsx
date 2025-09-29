import { useState } from 'react';
import { SellerSidebar } from './components/layout/seller-sidebar';
import { Dashboard } from './components/pages/dashboard';
import { Products } from './components/pages/products';
import { Orders } from './components/pages/orders';
import { Inventory } from './components/pages/inventory';
import { Locations } from './components/pages/locations';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'products':
        return <Products />;
      case 'orders':
        return <Orders />;
      case 'inventory':
        return <Inventory />;
      case 'locations':
        return <Locations />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <SellerSidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="flex-1 overflow-y-auto">
        {renderPage()}
      </main>
    </div>
  );
}
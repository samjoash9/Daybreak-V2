import Header from '../../components/layout/Header';
import { Button } from '../../components/common/button';
import { useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { Clock, CheckCircle2, XCircle, Truck, Wallet } from 'lucide-react';

type Status = 'to_pay' | 'preparing' | 'ready' | 'completed' | 'cancelled';

const STATUS_CONFIG: Record<Status, { label: string; color: string; icon: JSX.Element }> = {
  to_pay: { label: 'To Pay', color: 'bg-amber-100 text-amber-800 border-amber-300', icon: <Wallet size={18} /> },
  preparing: { label: 'Preparing', color: 'bg-blue-100 text-blue-800 border-blue-300', icon: <Clock size={18} /> },
  ready: { label: 'Ready', color: 'bg-emerald-100 text-emerald-800 border-emerald-300', icon: <Truck size={18} /> },
  completed: { label: 'Completed', color: 'bg-green-100 text-green-800 border-green-300', icon: <CheckCircle2 size={18} /> },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-800 border-red-300', icon: <XCircle size={18} /> },
};

const mockOrders = [
  {
    id: 'DB-1001',
    items: 'Caramel Iced Latte (LARGE) ×1, Matcha Latte (SMALL) ×2',
    total: 117,
    status: 'to_pay' as Status,
    placedAt: 'Jan 05, 2026 09:20 AM',
    eta: 'Pay now to start preparing',
  },
  {
    id: 'DB-1000',
    items: 'Spanish Latte (LARGE) ×1',
    total: 39,
    status: 'preparing' as Status,
    placedAt: 'Jan 05, 2026 09:00 AM',
    eta: 'Estimated ready in 5-10 mins',
  },
  {
    id: 'DB-0999',
    items: 'French Vanilla (SMALL) ×1',
    total: 39,
    status: 'ready' as Status,
    placedAt: 'Jan 05, 2026 08:35 AM',
    eta: 'Ready for pickup',
  },
  {
    id: 'DB-0998',
    items: 'Salted Caramel (LARGE) ×1',
    total: 39,
    status: 'completed' as Status,
    placedAt: 'Jan 04, 2026 02:10 PM',
    eta: 'Completed',
  },
  {
    id: 'DB-0997',
    items: 'Matcha Latte (SMALL) ×1',
    total: 39,
    status: 'cancelled' as Status,
    placedAt: 'Jan 04, 2026 11:05 AM',
    eta: 'Cancelled by user',
  },
];

const MyCheckout = () => {
  const navigate = useNavigate();
  const [activeStatus, setActiveStatus] = useState<Status | 'all'>('all');

  const filteredOrders = useMemo(() => {
    if (activeStatus === 'all') return mockOrders;
    return mockOrders.filter((order) => order.status === activeStatus);
  }, [activeStatus]);

  return (
    <div className="min-h-screen bg-[#fce7c7]">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-[#3a2a18]">My Checkout</h1>
            <p className="text-[#3a2a18] mt-2">Track your orders and their current status.</p>
          </div>
          <Button
            variant="outline"
            className="border-2 border-[#3a2a18] text-[#3a2a18] hover:bg-[#e5c570]"
            onClick={() => navigate('/store')}
          >
            Shop More
          </Button>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-6">
            {(['all', 'to_pay', 'preparing', 'ready', 'completed', 'cancelled'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setActiveStatus(status)}
                className={`px-4 py-2 rounded-full border-2 text-sm font-semibold transition-colors ${
                  activeStatus === status
                    ? 'border-[#5e341c] bg-[#fce7c7] text-[#3a2a18]'
                    : 'border-gray-300 text-[#3a2a18] hover:border-[#e5c570]'
                }`}
              >
                {status === 'all' ? 'All' : STATUS_CONFIG[status].label}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const statusConf = STATUS_CONFIG[order.status];
              return (
                <div
                  key={order.id}
                  className="border border-[#3a2a18]/15 rounded-lg p-4 sm:p-5 bg-[#fffaf3] shadow-sm"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-lg font-bold text-[#3a2a18]">Order {order.id}</p>
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold border ${statusConf.color}`}
                        >
                          {statusConf.icon}
                          {statusConf.label}
                        </span>
                      </div>
                      <p className="text-[#3a2a18] mt-1">{order.items}</p>
                      <p className="text-sm text-gray-700 mt-1">Placed: {order.placedAt}</p>
                    </div>
                    <div className="text-right space-y-2">
                      <p className="text-2xl font-bold text-[#3a2a18]">₱{order.total}</p>
                      <p className="text-sm text-gray-700">{order.eta}</p>
                      {order.status === 'ready' && (
                        <Button
                          variant="outline"
                          className="w-full sm:w-auto border-2 border-[#3a2a18] text-[#3a2a18] hover:bg-[#e5c570]"
                        >
                          View Pickup Details
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredOrders.length === 0 && (
              <div className="text-center py-10 text-[#3a2a18]">
                <p className="text-lg font-semibold">No orders in this status yet.</p>
                <p className="text-sm text-gray-700 mt-1">Place an order to see it here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCheckout;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../../Stores/UserStore";
import LoadingSpinner from "../Spinner/Spinner";
import { 
  TruckIcon, 
  ShoppingBagIcon, 
  CheckCircleIcon, 
  ClockIcon,
  CubeIcon,
  CurrencyDollarIcon,
  MapPinIcon
} from "@heroicons/react/24/outline";

export default function CurrentOrdersPage() {
  const navigate = useNavigate();
  const { isLoggedIn, fetchCurrentOrders, currentOrders } = useUserStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      if (!isLoggedIn) {
        navigate("/login");
        return;
      }

      try {
        await fetchCurrentOrders();
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetch();
  }, [isLoggedIn, navigate, fetchCurrentOrders]);

  // Generate random progress for demo (in real app, this would come from backend)
  const getOrderProgress = (orderId) => {
    const seed = orderId * 17; // Deterministic random based on ID
    const stages = ['ORDERED', 'PACKED', 'SHIPPED', 'OUT_FOR_DELIVERY', 'DELIVERED'];
    const currentStageIndex = seed % 4; // 0-3, never fully delivered for current orders
    return {
      currentStage: stages[currentStageIndex],
      currentStageIndex,
      stages
    };
  };

  const getStageColor = (stage, isActive, isPast) => {
    if (isPast) return "bg-green-500";
    if (isActive) return "bg-blue-500";
    return "bg-gray-300";
  };

  const getStageIcon = (stage) => {
    switch(stage) {
      case 'ORDERED': return ShoppingBagIcon;
      case 'PACKED': return CubeIcon;
      case 'SHIPPED': return TruckIcon;
      case 'OUT_FOR_DELIVERY': return MapPinIcon;
      case 'DELIVERED': return CheckCircleIcon;
      default: return ClockIcon;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!currentOrders || currentOrders.length === 0) {
    return (
      <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="mx-auto w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <TruckIcon className="w-12 h-12 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Current Orders</h1>
            <p className="text-slate-600 text-lg mb-8">You have no orders in transit at the moment.</p>
            <Link
              to="/shop"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Current Orders</h1>
          <p className="text-slate-600">Track your orders in real-time</p>
        </div>

        <div className="space-y-6">
          {currentOrders.map((order) => {
            const progress = getOrderProgress(order.id);
            const { currentStage, currentStageIndex, stages } = progress;

            return (
              <div
                key={order.id}
                onClick={() => navigate(`/product/${order.id}`)}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-200 cursor-pointer"
              >
                <div className="bg-blue-600 px-6 py-4">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-3">
                      <TruckIcon className="w-6 h-6" />
                      <span className="font-semibold">In Transit</span>
                    </div>
                    <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                      Order #{order.id}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">{order.title}</h3>

                  {/* Progress Tracker */}
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                      {stages.slice(0, -1).map((stage, index) => {
                        const Icon = getStageIcon(stage);
                        const isActive = index === currentStageIndex;
                        const isPast = index < currentStageIndex;
                        const stageName = stage.replace(/_/g, ' ');

                        return (
                          <div key={stage} className="flex-1 relative">
                            <div className="flex flex-col items-center">
                              <div
                                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                                  isPast ? 'bg-green-500' : isActive ? 'bg-blue-500 ring-4 ring-blue-200' : 'bg-gray-300'
                                }`}
                              >
                                <Icon className="w-6 h-6 text-white" />
                              </div>
                              <div className="mt-2 text-center">
                                <p className={`text-xs font-semibold ${
                                  isPast || isActive ? 'text-slate-900' : 'text-slate-400'
                                }`}>
                                  {stageName}
                                </p>
                              </div>
                            </div>
                            {index < stages.length - 2 && (
                              <div className="absolute top-6 left-1/2 w-full h-1 -z-10">
                                <div className={`h-full transition-all duration-500 ${
                                  index < currentStageIndex ? 'bg-green-500' : 'bg-gray-300'
                                }`} />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Current Status Message */}
                    <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                      <p className="text-sm font-medium text-blue-900">
                        {currentStage === 'ORDERED' && '🎉 Your order has been confirmed and is being prepared!'}
                        {currentStage === 'PACKED' && '📦 Your order has been packed and is ready to ship!'}
                        {currentStage === 'SHIPPED' && '🚚 Your order is on the way!'}
                        {currentStage === 'OUT_FOR_DELIVERY' && '🏃 Out for delivery - arriving soon!'}
                      </p>
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                        <CurrencyDollarIcon className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Unit Price</p>
                        <p className="text-sm font-semibold text-slate-900">${order.price.toFixed(2)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                        <CubeIcon className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Quantity</p>
                        <p className="text-sm font-semibold text-slate-900">{order.quantity}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                        <CurrencyDollarIcon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Total</p>
                        <p className="text-sm font-semibold text-slate-900">${order.total.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

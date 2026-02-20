import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../../Stores/UserStore";
import LoadingSpinner from "../Spinner/Spinner";
import { ShoppingBagIcon, CalendarIcon, CubeIcon, CurrencyDollarIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

export default function PreviousOrdersPage() {
  const navigate = useNavigate();
  const isLoggedIn = useUserStore(state => state.isLoggedIn);
  const isVerified = useUserStore(state => state.isVerified);
  const fetchPreviousOrders = useUserStore(state => state.fetchPreviousOrders);
  const previousOrders = useUserStore(state => state.previousOrders);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      if (!isLoggedIn) {
        navigate("/login");
        return;
      }
      if(!isVerified){
        navigate("/verify-email");
        return;
      }
      try {
        await fetchPreviousOrders();
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetch();
  }, [isLoggedIn, navigate,isVerified, fetchPreviousOrders]);

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const filteredOrders = (previousOrders ?? []).filter((order) => {
    if (order.status !== "DELIVERED") return true;
    const daysSinceDelivery = (Date.now() - new Date(order.updatedAt)) / (1000 * 60 * 60 * 24);
    return daysSinceDelivery > 5;
  });

  if (filteredOrders.length === 0) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="mx-auto w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
              <ShoppingBagIcon className="w-12 h-12 text-slate-400" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Previous Orders</h1>
            <p className="text-slate-600 text-lg mb-8">No completed orders yet.</p>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-black text-white font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Previous Orders</h1>
          <p className="text-slate-600">View and track all your past purchases</p>
        </div>

        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              onClick={() => navigate(`/product/${order.id}`)}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-slate-200 cursor-pointer"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-slate-900 mb-1 flex items-center gap-2">
                      <ShoppingBagIcon className="w-6 h-6 text-blue-600" />
                      {order.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                        <CheckCircleIcon className="w-4 h-4" />
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 text-slate-600">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                      <CurrencyDollarIcon className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Unit Price</p>
                      <p className="text-sm font-semibold text-slate-900">${order.price.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-slate-600">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                      <CubeIcon className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Quantity</p>
                      <p className="text-sm font-semibold text-slate-900">{order.quantity}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-slate-600">
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
          ))}
        </div>
      </div>
    </div>
  );
}
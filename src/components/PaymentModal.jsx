import React, { useState } from 'react';
import { X, CreditCard, Banknote, Landmark, CheckCircle } from 'lucide-react';
import API from '../api/axios';

const PaymentModal = ({ order, onClose, onRefresh }) => {
  const [amount, setAmount] = useState(order.totalAmount - order.amountPaid);
  const [method, setMethod] = useState('CASH');
  const [reference, setReference] = useState('');
  const [loading, setLoading] = useState(false);

  const balanceDue = order.totalAmount - order.amountPaid;

  const handlePayment = async () => {
    if (amount <= 0 || amount > balanceDue + 0.01) {
      alert("Please enter a valid amount within the balance due.");
      return;
    }

    setLoading(true);
    try {
      await API.post(`/payments/record/${order.id}`, {
        amount,
        method,
        reference,
        receivedById: "current-user-id" // Replace with your Auth context user ID
      });
      
      onRefresh(); // Refresh the orders list to show new balance
      onClose();
    } catch (error) {
      console.error("Payment failed", error);
      alert("System error recording payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden border border-gray-100">
        
        {/* Header */}
        <div className="bg-blue-600 p-6 text-white flex justify-between items-center">
          <div>
            <h2 className="text-xl font-black uppercase tracking-tight">Record Payment</h2>
            <p className="text-blue-100 text-xs font-bold uppercase mt-1">Order: #{order.trackingCode}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Summary Card */}
          <div className="bg-gray-50 p-4 rounded-xl flex justify-between items-center border border-gray-200">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase">Balance Due</p>
              <p className="text-2xl font-black text-gray-900">₦{balanceDue.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-gray-400 uppercase">Total Bill</p>
              <p className="text-sm font-bold text-gray-600">₦{order.totalAmount.toLocaleString()}</p>
            </div>
          </div>

          {/* Amount Input */}
          <div>
            <label className="text-[10px] font-black text-gray-500 uppercase mb-2 block">Amount to Pay</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">₦</span>
              <input 
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-10 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl font-black text-lg focus:border-blue-500 focus:ring-0 transition-all outline-none"
              />
            </div>
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="text-[10px] font-black text-gray-500 uppercase mb-2 block">Payment Method</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'CASH', icon: Banknote, label: 'Cash' },
                { id: 'TRANSFER', icon: Landmark, label: 'Transfer' },
                { id: 'POS', icon: CreditCard, label: 'POS' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setMethod(item.id)}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${
                    method === item.id 
                    ? 'border-blue-600 bg-blue-50 text-blue-600' 
                    : 'border-gray-100 bg-white text-gray-400 hover:border-gray-200'
                  }`}
                >
                  <item.icon size={20} className="mb-1" />
                  <span className="text-[10px] font-black uppercase">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Reference Input */}
          <div>
            <label className="text-[10px] font-black text-gray-500 uppercase mb-2 block">Reference (Optional)</label>
            <input 
              type="text"
              placeholder="e.g. Last 4 digits or RRN"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-sm focus:border-blue-500 outline-none"
            />
          </div>

          {/* Action Button */}
          <button 
            onClick={handlePayment}
            disabled={loading || amount <= 0}
            className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-sm shadow-lg flex items-center justify-center gap-2 transition-all ${
              loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 text-white active:scale-95'
            }`}
          >
            {loading ? 'Processing...' : (
              <>
                <CheckCircle size={18} />
                Confirm Payment
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
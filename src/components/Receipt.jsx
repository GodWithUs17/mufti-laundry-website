import React from 'react';

export const Receipt = React.forwardRef(({ order }, ref) => {
  if (!order) return null;

  const balance = order.totalAmount - (order.amountPaid || 0);

  return (
    <div ref={ref} className="p-8 bg-white text-slate-900 font-mono w-[350px] mx-auto border border-slate-100">
      {/* Brand Header */}
      <div className="text-center border-b-2 border-dashed border-slate-200 pb-4 mb-4">
        <h2 className="text-2xl font-black tracking-tighter">MUFTI LAUNDRY</h2>
        <p className="text-[10px] uppercase font-bold text-slate-500">Iseyin • +234 000 000 0000</p>
      </div>

      {/* Transaction Details */}
      <div className="space-y-1 text-[11px] mb-6 uppercase">
        <div className="flex justify-between"><span>Date:</span> <span>{new Date().toLocaleDateString()}</span></div>
        <div className="flex justify-between"><span>Order:</span> <span className="font-bold">#{order.trackingCode}</span></div>
        <div className="flex justify-between"><span>Client:</span> <span>{order.customerName}</span></div>
      </div>

      {/* Pricing Breakdown */}
      <div className="border-y border-slate-100 py-3 mb-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="font-bold">Total Bill:</span> 
          <span>₦{order.totalAmount.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-emerald-600 font-black">
          <span>Amount Paid:</span> 
          <span>₦{order.amountPaid.toLocaleString()}</span>
        </div>
      </div>

      {/* The Big Balance */}
      <div className="flex justify-between items-center mb-6 px-2 py-3 bg-slate-50 rounded-lg">
        <span className="font-black text-xs uppercase text-slate-500">Balance Due:</span>
        <span className={`text-lg font-black ${balance > 0 ? 'text-rose-600' : 'text-slate-900'}`}>
          ₦{balance.toLocaleString()}
        </span>
      </div>

      {/* Professional Footer / Policy */}
      <div className="text-[9px] text-slate-400 text-center space-y-2 uppercase leading-tight">
        <div className="py-1 border border-slate-200 font-black text-slate-900">
          {order.paymentStatus}
        </div>
        <p>* 50% Deposit required before service</p>
        <p>* Present this receipt for collection</p>
        <p className="pt-2 font-bold italic text-slate-300">*** Thank You ***</p>
      </div>
    </div>
  );
});
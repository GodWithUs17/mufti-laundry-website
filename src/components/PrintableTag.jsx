import React from 'react';

const PrintableTag = ({ order }) => {
  if (!order) return null;

  const COLORS = {
    NAVY: '#0F172A',
    SLATE: '#64748B',
    WHITE: '#FFFFFF',
  };

  return (
    <div className="p-4 w-[80mm] bg-white text-slate-900">
      {/* Brand Header */}
      <div className="text-center border-b-2 border-dashed border-slate-300 pb-4 mb-4">
        <h1 
          style={{ color: COLORS.NAVY }} 
          className="text-xl font-black uppercase tracking-tighter"
        >
          MUFTI LAUNDRY
        </h1>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          Premium Care Tag
        </p>
      </div>

      {/* Customer & ID Section */}
      <div className="space-y-1 mb-4">
        <div className="flex justify-between items-baseline">
          <span className="text-[10px] font-black text-slate-400 uppercase">Order ID</span>
          <span className="text-lg font-black text-blue-600">
            #{order.trackingCode || order.id?.slice(-4).toUpperCase()}
          </span>
        </div>
        <div className="flex justify-between items-baseline">
          <span className="text-[10px] font-black text-slate-400 uppercase">Customer</span>
          <span className="text-sm font-black text-slate-800 uppercase">
            {order.customerName}
          </span>
        </div>
      </div>

      {/* Items Summary */}
      <div className="border-t border-b border-slate-100 py-3 mb-4">
        <table className="w-full">
          <thead>
            <tr className="text-[8px] font-black text-slate-400 uppercase">
              <th className="text-left pb-1">Item</th>
              <th className="text-right pb-1">Qty</th>
            </tr>
          </thead>
          <tbody>
            {order.items?.map((item, idx) => (
              <tr key={idx} className="border-b border-slate-50 last:border-0">
                <td className="py-1 text-[11px] font-black text-slate-700 uppercase">
                  {item.itemName}
                </td>
                <td className="py-1 text-[11px] font-black text-slate-700 text-right">
                  x{item.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer & Status */}
      <div className="text-center space-y-2">
        <div className="inline-block px-3 py-1 bg-slate-900 text-white rounded text-[10px] font-black uppercase tracking-widest">
          Status: {order.status?.replace('_', ' ')}
        </div>
        <p className="text-[8px] font-bold text-slate-400 italic">
          Generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
        </p>
      </div>

      {/* Printing Optimization */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: 80mm auto; margin: 0; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}} />
    </div>
  );
};

export default PrintableTag;
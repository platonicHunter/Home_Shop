'use client';

import { Item } from '@/types/items';
import { calculateFinalPrice, formatCurrency } from '@/lib/price-utils';

interface ItemListTableProps {
  items: Item[];
  loading: boolean;
}

export default function ItemListTable({ items, loading }: ItemListTableProps) {
  if (loading) {
    return (
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-12 text-center border border-gray-400 shadow-sm">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
        <p className="text-xs font-semibold text-gray-400 mt-3">Data များ ရယူနေပါသည်...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-12 text-center border border-gray-100 shadow-sm space-y-2">
        <div className="text-4xl">📦</div>
        <h3 className="text-sm font-bold text-gray-700">ရှာဖွေတွေ့ရှိသော ပစ္စည်း မရှိပါ</h3>
        <p className="text-xs text-gray-400">စာလုံးပေါင်း သို့မဟုတ် Category ပြောင်းလဲရှာဖွေကြည့်ပါ</p>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* 📱 Mobile Display: Card View (sm အောက် ဖုန်းများအတွက်) */}
      <div className="block sm:hidden divide-y divide-gray-100">
        {items.map((item) => (
          <div key={item.id} className="p-4 space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-gray-900 text-base">{item.name}</h4>
                <span className="text-xs text-gray-400">({item.unit})</span>
              </div>
              <span className="bg-blue-50 text-blue-700 text-[11px] font-semibold px-2.5 py-1 rounded-full border border-blue-100">
                {item.categories?.name || 'Uncategorized'}
              </span>
            </div>

            <div className="flex justify-between items-center pt-2 text-xs border-t border-gray-50">
              <div>
                <span className="text-gray-400 block text-[10px]">မူရင်းဈေး</span>
                <span className="font-semibold text-gray-700">{formatCurrency(item.base_price)}</span>
              </div>
              <div className="text-right">
                <span className="text-blue-500 font-bold block text-[10px]">+1.5% တိုးဈေး</span>
                <span className="font-extrabold text-blue-700 text-sm">
                  {formatCurrency(calculateFinalPrice(item.base_price))}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 💻 Desktop Display: Clean Table View (sm နှင့်အထက်) */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/80 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              <th className="p-4">ပစ္စည်းအမည်</th>
              <th className="p-4">Category</th>
              <th className="p-4">မူရင်းဈေး</th>
              <th className="p-4 text-blue-600 font-bold">+1.5% တိုးဈေး</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-blue-50/30 transition-colors">
                <td className="p-4 font-semibold text-gray-900">
                  {item.name} <span className="text-xs font-normal text-gray-400">({item.unit})</span>
                </td>
                <td className="p-4">
                  <span className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full border border-blue-100">
                    {item.categories?.name || 'Uncategorized'}
                  </span>
                </td>
                <td className="p-4 font-medium text-gray-600">{formatCurrency(item.base_price)}</td>
                <td className="p-4 font-black text-blue-700 text-base">
                  {formatCurrency(calculateFinalPrice(item.base_price))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
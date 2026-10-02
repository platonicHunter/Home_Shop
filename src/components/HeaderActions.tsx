'use client';

import Link from 'next/link';

export default function HeaderActions() {
  return (
    <div className="bg-white p-5 sm:p-6 rounded-2xl border-2 border-blue-100 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <div className="flex items-center gap-2">
          <span className="text-2xl">🏡</span>
          <h1 className="text-xl sm:text-2xl font-black text-blue-950">
            Home Price Tracker
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-medium">
          အိမ်သုံးပစ္စည်း ဈေးနှုန်းများ စစ်ဆေးရန် နှင့် ၁.၅% တိုးတွက်ကြည့်ရန်
        </p>
      </div>

      <div className="flex items-center gap-2.5 w-full sm:w-auto">
        <Link
          href="/categories"
          className="flex-1 sm:flex-initial text-center bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5"
        >
          <span>⚙️</span> Categories
        </Link>
        <Link
          href="/add-item"
          className="flex-1 sm:flex-initial text-center bg-blue-600 hover:bg-blue-700 text-white border border-blue-600 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold shadow-md shadow-blue-500/15 transition-all flex items-center justify-center gap-1.5"
        >
          <span>➕</span> Add Item
        </Link>
      </div>
    </div>
  );
}
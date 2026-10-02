'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Category } from '@/types/items';

export default function AddItemPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [basePrice, setBasePrice] = useState('');
  const [unit, setUnit] = useState('ခု');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      const { data } = await supabase.from('categories').select('*').order('name');
      if (data) setCategories(data);
    }
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !categoryId || !basePrice) {
      alert('ကျေးဇူးပြု၍ အချက်အလက်များကို အပြည့်အစုံ ဖြည့်သွင်းပါ');
      return;
    }

    setLoading(true);
    const { error } = await supabase.from('items').insert([
      {
        name,
        category_id: categoryId,
        base_price: parseFloat(basePrice),
        unit,
      },
    ]);

    setLoading(false);

    if (error) {
      alert('Error: ' + error.message);
    } else {
      router.push('/');
      router.refresh();
    }
  };

  return (
    <main className="w-full min-h-screen bg-slate-50 py-6 sm:py-10 px-4 sm:px-8 md:px-12">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl border-2 border-blue-100 shadow-sm p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center border-b-2 border-slate-100 pb-4">
            <h1 className="text-xl sm:text-2xl font-black text-blue-950 flex items-center gap-2">
              <span>➕</span> ပစ္စည်းအသစ် ထည့်ရန်
            </h1>
            <Link
              href="/"
              className="text-xs sm:text-sm font-bold text-slate-500 hover:text-blue-600 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl border border-slate-300 transition-all"
            >
              ← Home သို့ပြန်သွားရန်
            </Link>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                ပစ္စည်းအမည်
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="ဥပမာ - ကော်ဖီ၊ အအေး"
                required
                className="w-full bg-slate-50/50 border-2 border-slate-400 focus:border-blue-500 focus:bg-white rounded-xl px-4 py-3 text-sm text-slate-800 font-medium transition-all outline-none"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold text-slate-600  uppercase tracking-wider">
                  Category (အမျိုးအစား)
                </label>
                {categories.length === 0 && (
                  <Link href="/categories" className="text-xs text-rose-500 hover:underline font-bold">
                    Category မရှိသေးပါ။ ဒီမှာ ဝင်ထည့်ပါ
                  </Link>
                )}
              </div>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required
                className="w-full bg-slate-50/50 border-2 border-slate-400 focus:border-blue-500 focus:bg-white rounded-xl px-4 py-3 text-sm text-slate-800 font-semibold transition-all outline-none cursor-pointer"
              >
                <option value="">Category ရွေးချယ်ပါ</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    📁 {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                  မူရင်းဈေးနှုန်း (Ks)
                </label>
                <input
                  type="number"
                  value={basePrice}
                  onChange={(e) => setBasePrice(e.target.value)}
                  placeholder="ဥပမာ - 10000"
                  required
                  className="w-full bg-slate-50/50 border-2 border-slate-400 focus:border-blue-500 focus:bg-white rounded-xl px-4 py-3 text-sm text-slate-800 font-medium transition-all outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                  ယူနစ် / ရေတွက်ပုံ
                </label>
                <input
                  type="text"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  placeholder="ခု၊ ပြည်၊ ဘူး၊ ထုပ်..."
                  required
                  className="w-full bg-slate-50/50 border-2 border-slate-400 focus:border-blue-500 focus:bg-white rounded-xl px-4 py-3 text-sm text-slate-800 font-medium transition-all outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold py-3.5 px-4 rounded-xl shadow-md shadow-blue-500/20 border border-blue-600 transition-all text-sm mt-4 flex justify-center items-center gap-2"
            >
              {loading ? 'သိမ်းဆည်းနေပါသည်...' : 'သိမ်းဆည်းမည်'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
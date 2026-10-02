'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Category } from '@/types/items';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      if (Array.isArray(data)) setCategories(data);
    } catch (err) {
      console.error('Fetch categories error:', err);
    }
  }

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategoryName.trim() }),
      });

      const data = await res.json();
      if (res.ok) {
        setNewCategoryName('');
        fetchCategories();
      } else {
        alert('Error: ' + (data.error || 'Failed to add category'));
      }
    } catch (err: any) {
      alert('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('ဒီ Category ကို ဖျက်ရန် သေချာပါသလား?')) return;

    try {
      const res = await fetch(`/api/categories?id=${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchCategories();
      } else {
        const data = await res.json();
        alert('Error: ' + (data.error || 'Failed to delete category'));
      }
    } catch (err: any) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <main className="w-full min-h-screen bg-slate-50 py-6 sm:py-10 px-4 sm:px-8 md:px-12">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl border-2 border-blue-100 shadow-sm p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center border-b-2 border-slate-100 pb-4">
            <h1 className="text-xl sm:text-2xl font-black text-blue-950 flex items-center gap-2">
              <span>⚙️</span> Category စီမံခန့်ခွဲရန်
            </h1>
            <Link
              href="/"
              className="text-xs sm:text-sm font-bold text-slate-500 hover:text-blue-600 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl border border-slate-300 transition-all"
            >
              ← Home သို့ပြန်သွားရန်
            </Link>
          </div>

          {/* Add Category Form */}
          <form onSubmit={handleAddCategory} className="flex gap-2 sm:gap-3">
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Category အမည်သစ် ရိုက်ထည့်ပါ..."
              className="flex-1 bg-slate-50/50 border-2 border-slate-400 focus:border-blue-500 focus:bg-white rounded-xl px-4 py-2.5 text-sm text-slate-800 font-medium transition-all outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold px-5 py-2.5 rounded-xl border border-blue-600 shadow-md shadow-blue-500/20 text-sm transition-all whitespace-nowrap"
            >
              {loading ? 'ထည့်နေသည်...' : 'ထည့်မည်'}
            </button>
          </form>

          {/* Category List */}
          <div className="space-y-3 pt-2">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              ရှိပြီးသား Categories ({categories.length})
            </h2>

            {categories.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 text-slate-400 text-xs font-medium">
                Category မရှိသေးပါ။ အထက်ပါ Form တွင် စတင်ထည့်သွင်းပါ။
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="flex justify-between items-center p-3.5 bg-slate-50/80 rounded-xl border-2 border-slate-200 hover:border-blue-200 transition-all"
                  >
                    <span className="font-bold text-slate-800 text-sm flex items-center gap-2">
                      <span>📁</span> {cat.name}
                    </span>
                    <button
                      onClick={() => handleDeleteCategory(cat.id)}
                      className="text-xs font-bold text-rose-500 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200 transition-all"
                    >
                      ဖျက်မည်
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
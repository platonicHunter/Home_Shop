'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Item, Category } from '@/types/items';
import HeaderActions from '@/components/HeaderActions';
import SearchFilter from '@/components/SearchFilter';
import ItemListTable from '@/components/ItemListTable';

export default function HomePage() {
  const [items, setItems] = useState<Item[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  async function fetchItems() {
    const res = await fetch('/api/items');
    const data = await res.json();
    setItems(data);
  }
  fetchItems();
}, []);

  async function fetchData() {
    setLoading(true);
    const { data: catData } = await supabase.from('categories').select('*').order('name');
    if (catData) setCategories(catData);

    const { data: itemData } = await supabase
      .from('items')
      .select('*, categories(id, name)')
      .order('created_at', { ascending: false });

    if (itemData) setItems(itemData as Item[]);
    setLoading(false);
  }

  const filteredItems = items.filter((item) => {
    const matchesName = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || item.category_id === selectedCategory;
    return matchesName && matchesCategory;
  });

  return (
    // w-full min-h-screen ဖြင့် စခရင်အပြည့် အသုံးပြုနိုင်အောင် ပြင်ထားသည်
    <main className="w-full min-h-screen bg-slate-50 py-6 sm:py-8 px-4 sm:px-8 md:px-12">
      {/* max-w-7xl သို့မဟုတ် max-w-full သုံးပေးခြင်းဖြင့် Desktop/Tablet တွင် အကျယ်ပြည့် ပေါ်စေမည် */}
      <div className="max-w-7xl mx-auto space-y-5 sm:space-y-6">
        <HeaderActions />
        <SearchFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={categories}
        />
        <ItemListTable items={filteredItems} loading={loading} />
      </div>
    </main>
  );
}
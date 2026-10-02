'use client';

import { Category } from '@/types/items';

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  categories: Category[];
}

export default function SearchFilter({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
}: SearchFilterProps) {
  return (
    <div className="bg-white/80 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-blue-300  shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
      {/* Search Input */}
      <div className="sm:col-span-2 relative">
        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
          ပစ္စည်းအမည်ဖြင့် ရှာရန်
        </label>
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="ဥပမာ - ဆန်၊ ဆီ၊ ပဲ..."
            className="w-full bg-gray-50/80 border border-gray-200/80 focus:border-blue-500 focus:bg-white rounded-xl pl-9 pr-4 py-2.5 text-sm transition-all outline-none text-gray-800 placeholder:text-gray-400"
          />
          <span className="absolute left-3 top-2.5 text-gray-400 text-sm">🔍</span>
        </div>
      </div>

      {/* Category Dropdown */}
      <div>
        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
          Category စစ်ထုတ်ရန်
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full bg-gray-50/80 border border-gray-200/80 focus:border-blue-500 focus:bg-white rounded-xl px-3 py-2.5 text-sm transition-all outline-none text-gray-800 font-medium cursor-pointer"
        >
          <option value="ALL">✨ Category အားလုံး</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              📁 {cat.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
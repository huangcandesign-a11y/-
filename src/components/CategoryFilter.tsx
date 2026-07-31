import React from 'react';
import { CategoryId, CategoryInfo } from '../types';
import { Brush, Building2, BookOpen, Music, Sparkles, Film, Layers, Wind } from 'lucide-react';

interface CategoryFilterProps {
  categories: CategoryInfo[];
  selectedCategory: CategoryId | 'all';
  onSelectCategory: (cat: CategoryId | 'all') => void;
  categoryCounts: Record<string, number>;
}

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Brush,
  Building2,
  BookOpen,
  Music,
  Sparkles,
  Film,
  Layers,
  Wind,
};

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  categoryCounts,
}) => {
  const totalCount = (Object.values(categoryCounts) as number[]).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-6">
      {/* Category Header Banner */}
      <div className="bg-[#F2EFE9] dark:bg-stone-900 border border-[#E5E1D8] dark:border-stone-800 rounded-sm p-6 sm:p-8 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block px-2.5 py-0.5 border border-[#C5A059] text-[#C5A059] text-[10px] tracking-widest uppercase font-sans font-medium mb-3">
            语料分类 / Corpus Categories
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-light text-[#2D2926] dark:text-stone-100 tracking-tight mb-2">
            艺术门类与语料场域
          </h2>
          <p className="text-[#59544E] dark:text-stone-300 text-xs sm:text-sm leading-relaxed font-serif italic">
            汇聚古典绘画、园林建筑、诗词歌赋、听觉声景、宋瓷金石、影视光影与现代装置等领域的高阶美学辞藻，分类沉淀感官意象。
          </p>
        </div>
      </div>

      {/* Category Filter Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* All Categories Button */}
        <button
          onClick={() => onSelectCategory('all')}
          className={`p-4 rounded-sm border text-left transition-all flex flex-col justify-between ${
            selectedCategory === 'all'
              ? 'bg-[#2D2926] text-[#FAF9F6] border-[#2D2926]'
              : 'bg-white dark:bg-stone-900 text-[#2D2926] dark:text-stone-200 border-[#E5E1D8] dark:border-stone-800 hover:border-[#2D2926]'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className={`text-[10px] uppercase font-sans tracking-widest font-bold ${selectedCategory === 'all' ? 'text-[#C5A059]' : 'text-[#8C867A]'}`}>
              全部门类
            </span>
            <span className={`text-[10px] font-sans px-2 py-0.5 border ${selectedCategory === 'all' ? 'border-[#C5A059] text-[#C5A059]' : 'border-[#E5E1D8] text-[#8C867A]'}`}>
              {totalCount} 词
            </span>
          </div>
          <div>
            <h3 className="font-serif font-light text-base mb-1">全景美学语料库</h3>
            <p className={`text-xs line-clamp-1 font-serif italic ${selectedCategory === 'all' ? 'text-[#E5E1D8]' : 'text-[#8C867A]'}`}>
              跨门类纵览所有意境词汇
            </p>
          </div>
        </button>

        {/* Category Cards */}
        {categories.map((cat) => {
          const Icon = ICON_MAP[cat.iconName] || Layers;
          const isSelected = selectedCategory === cat.id;
          const count = categoryCounts[cat.id] || 0;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`p-4 rounded-sm border text-left transition-all flex flex-col justify-between relative group ${
                isSelected
                  ? 'bg-[#2D2926] text-[#FAF9F6] border-[#2D2926]'
                  : 'bg-white dark:bg-stone-900 text-[#2D2926] dark:text-stone-200 border-[#E5E1D8] dark:border-stone-800 hover:border-[#2D2926]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`w-7 h-7 flex items-center justify-center border ${
                    isSelected
                      ? 'border-[#C5A059] text-[#C5A059]'
                      : 'border-[#E5E1D8] text-[#8C867A]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className={`text-[10px] font-sans px-2 py-0.5 border ${isSelected ? 'border-[#C5A059] text-[#C5A059]' : 'border-[#E5E1D8] text-[#8C867A]'}`}>
                  {count} 词
                </span>
              </div>
              <div>
                <h3 className="font-serif font-light text-sm mb-1 group-hover:text-[#C5A059] transition-colors">
                  {cat.name}
                </h3>
                <p className={`text-xs line-clamp-2 font-serif italic ${isSelected ? 'text-[#E5E1D8]' : 'text-[#8C867A]'}`}>
                  {cat.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

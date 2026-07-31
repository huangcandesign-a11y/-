import React from 'react';
import { Search, Sparkles, Feather, Plus, BookMarked, Layers, Wand2 } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeTab: 'corpus' | 'dimensions' | 'retrieval' | 'art_analyzer';
  setActiveTab: (tab: 'corpus' | 'dimensions' | 'retrieval' | 'art_analyzer') => void;
  selectedBasketCount: number;
  onOpenStudio: () => void;
  onOpenAddModal: () => void;
  onOpenAnalyzer: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  activeTab,
  setActiveTab,
  selectedBasketCount,
  onOpenStudio,
  onOpenAddModal,
  onOpenAnalyzer,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#FAF9F6]/95 dark:bg-[#1C1A18]/95 backdrop-blur-md border-b border-[#E5E1D8] dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Logo & Title */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('corpus')}>
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#2D2926] dark:bg-stone-100 flex items-center justify-center text-[#FAF9F6] dark:text-[#2D2926] font-bold text-lg rounded-sm shadow-sm">
              <span>辞</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-serif font-light tracking-widest text-[#2D2926] dark:text-stone-100 uppercase">
                  辞章 · 艺海
                </h1>
                <span className="text-[10px] tracking-widest uppercase px-2 py-0.5 border border-[#C5A059] text-[#C5A059] font-sans font-medium">
                  鉴赏语料
                </span>
              </div>
              <p className="text-[11px] text-[#8C867A] dark:text-stone-400 font-serif italic hidden sm:block tracking-wide">
                意境深远 · 感官通感 · 学术厚度
              </p>
            </div>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-md mx-2">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A69F92]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="输入意境关键词、拼音或典籍（如：幽玄、苍润、余音）..."
                className="w-full pl-10 pr-4 py-1.5 text-xs sm:text-sm bg-[#FAF9F6] dark:bg-stone-900 border-b border-[#2D2926] dark:border-stone-600 focus:border-[#C5A059] text-[#2D2926] dark:text-stone-100 placeholder-[#A69F92] focus:outline-none font-sans italic transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] uppercase font-sans text-[#8C867A] hover:text-[#2D2926]"
                >
                  清除
                </button>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenAnalyzer}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans uppercase tracking-wider text-[#C5A059] bg-[#F2EFE9] dark:bg-stone-800 hover:bg-[#2D2926] hover:text-[#FAF9F6] border border-[#E5E1D8] dark:border-stone-700 transition-all rounded-sm"
              title="上传艺术图文进行AI美学通感解析"
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>AI 图文鉴赏</span>
            </button>

            <button
              onClick={onOpenStudio}
              className="relative flex items-center gap-1.5 px-3 sm:px-4 py-1.5 text-xs font-sans uppercase tracking-widest text-[#FAF9F6] bg-[#2D2926] hover:bg-[#C5A059] dark:bg-stone-100 dark:text-[#2D2926] transition-all rounded-sm shadow-sm"
            >
              <BookMarked className="w-3.5 h-3.5" />
              <span>暂存工坊</span>
              {selectedBasketCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 text-[10px] font-bold bg-[#C5A059] text-[#2D2926] rounded-full">
                  {selectedBasketCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenAddModal}
              className="p-1.5 text-[#59544E] dark:text-stone-300 hover:text-[#2D2926] border border-[#E5E1D8] dark:border-stone-700 rounded-sm hover:bg-[#F2EFE9] transition"
              title="新增美学辞藻"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* View mode navigation tabs */}
        <div className="flex items-center justify-between border-t border-[#E5E1D8] dark:border-stone-800 pt-1 pb-2">
          <nav className="flex space-x-6 sm:space-x-8 text-xs tracking-widest uppercase font-sans font-medium">
            <button
              onClick={() => setActiveTab('corpus')}
              className={`py-1 flex items-center gap-1.5 border-b-2 transition-all ${
                activeTab === 'corpus'
                  ? 'border-[#2D2926] dark:border-stone-100 text-[#2D2926] dark:text-stone-100 font-bold'
                  : 'border-transparent text-[#8C867A] dark:text-stone-400 hover:text-[#2D2926]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>一、语料分类</span>
            </button>

            <button
              onClick={() => setActiveTab('dimensions')}
              className={`py-1 flex items-center gap-1.5 border-b-2 transition-all ${
                activeTab === 'dimensions'
                  ? 'border-[#2D2926] dark:border-stone-100 text-[#2D2926] dark:text-stone-100 font-bold'
                  : 'border-transparent text-[#8C867A] dark:text-stone-400 hover:text-[#2D2926]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>二、美学维度</span>
            </button>

            <button
              onClick={() => setActiveTab('retrieval')}
              className={`py-1 flex items-center gap-1.5 border-b-2 transition-all ${
                activeTab === 'retrieval'
                  ? 'border-[#2D2926] dark:border-stone-100 text-[#2D2926] dark:text-stone-100 font-bold'
                  : 'border-transparent text-[#8C867A] dark:text-stone-400 hover:text-[#2D2926]'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>三、检索与应用</span>
            </button>
          </nav>

          <button
            onClick={onOpenAnalyzer}
            className="md:hidden text-xs text-[#C5A059] font-sans uppercase tracking-wider flex items-center gap-1"
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span>AI 解析</span>
          </button>
        </div>
      </div>
    </header>
  );
};

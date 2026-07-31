import React, { useState, useEffect, useMemo } from 'react';
import {
  AestheticDimensionId,
  AestheticTerm,
  CategoryId,
  SensoryChannel,
} from './types';
import { CATEGORIES, DIMENSIONS, INITIAL_TERMS } from './data/aestheticData';
import {
  getFavoriteIds,
  saveFavoriteIds,
  getCustomTerms,
  saveCustomTerms,
} from './utils/storage';

import { Header } from './components/Header';
import { CategoryFilter } from './components/CategoryFilter';
import { DimensionFilter } from './components/DimensionFilter';
import { TermCard } from './components/TermCard';
import { TermDetailModal } from './components/TermDetailModal';
import { RhetoricStudioModal } from './components/RhetoricStudioModal';
import { AiArtAnalyzerModal } from './components/AiArtAnalyzerModal';
import { CustomTermModal } from './components/CustomTermModal';

import { Search, Sparkles, BookMarked, Heart, Wand2, Feather, SlidersHorizontal, Layers, CheckCircle2 } from 'lucide-react';

export default function App() {
  // Navigation & Search State
  const [activeTab, setActiveTab] = useState<'corpus' | 'dimensions' | 'retrieval' | 'art_analyzer'>('corpus');
  const [searchQuery, setSearchQuery] = useState('');

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [selectedDimension, setSelectedDimension] = useState<AestheticDimensionId | 'all'>('all');
  const [selectedSensoryChannel, setSelectedSensoryChannel] = useState<SensoryChannel | 'all'>('all');
  const [quickFilter, setQuickFilter] = useState<'all' | 'favorites' | 'basket' | 'synesthesia'>('all');

  // Persistence State
  const [favorites, setFavorites] = useState<string[]>([]);
  const [basket, setBasket] = useState<string[]>([]);
  const [customTerms, setCustomTerms] = useState<AestheticTerm[]>([]);

  // Modals & Drawers State
  const [inspectedTerm, setInspectedTerm] = useState<AestheticTerm | null>(null);
  const [isStudioOpen, setIsStudioOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAnalyzerOpen, setIsAnalyzerOpen] = useState(false);

  // Load Initial Saved State
  useEffect(() => {
    setFavorites(getFavoriteIds());
    setCustomTerms(getCustomTerms());
  }, []);

  // Save Favorites & Custom Terms on Change
  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const updated = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      saveFavoriteIds(updated);
      return updated;
    });
  };

  const toggleBasket = (id: string) => {
    setBasket((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddCustomTerm = (term: AestheticTerm) => {
    const updated = [term, ...customTerms];
    setCustomTerms(updated);
    saveCustomTerms(updated);
  };

  const handleAddTermToBasket = (term: AestheticTerm) => {
    // Add custom term if needed
    if (!allTerms.some((t) => t.id === term.id)) {
      setCustomTerms((prev) => [term, ...prev]);
    }
    if (!basket.includes(term.id)) {
      setBasket((prev) => [...prev, term.id]);
    }
  };

  // Combine built-in and user terms
  const allTerms = useMemo(() => {
    return [...customTerms, ...INITIAL_TERMS];
  }, [customTerms]);

  // Compute Counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    allTerms.forEach((term) => {
      counts[term.category] = (counts[term.category] || 0) + 1;
    });
    return counts;
  }, [allTerms]);

  const dimensionCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    allTerms.forEach((term) => {
      term.dimensions.forEach((dim) => {
        counts[dim] = (counts[dim] || 0) + 1;
      });
    });
    return counts;
  }, [allTerms]);

  // Main Filtering Engine
  const filteredTerms = useMemo(() => {
    return allTerms.filter((term) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesWord = term.word.toLowerCase().includes(q);
        const matchesPinyin = term.pinyin.toLowerCase().includes(q);
        const matchesDef = term.pithyDefinition.toLowerCase().includes(q);
        const matchesDeep = term.deepInterpretation.toLowerCase().includes(q);
        const matchesOrigin = term.classicOrigin?.toLowerCase().includes(q);
        const matchesTag = term.tags.some((t) => t.toLowerCase().includes(q));

        if (!matchesWord && !matchesPinyin && !matchesDef && !matchesDeep && !matchesOrigin && !matchesTag) {
          return false;
        }
      }

      // 2. Category Filter
      if (selectedCategory !== 'all' && term.category !== selectedCategory) {
        return false;
      }

      // 3. Dimension Filter
      if (selectedDimension !== 'all' && !term.dimensions.includes(selectedDimension)) {
        return false;
      }

      // 4. Sensory Channel Filter
      if (selectedSensoryChannel !== 'all' && !term.sensoryChannels.includes(selectedSensoryChannel)) {
        return false;
      }

      // 5. Quick Filter
      if (quickFilter === 'favorites' && !favorites.includes(term.id)) {
        return false;
      }
      if (quickFilter === 'basket' && !basket.includes(term.id)) {
        return false;
      }
      if (quickFilter === 'synesthesia' && !term.dimensions.includes('synesthesia')) {
        return false;
      }

      return true;
    });
  }, [allTerms, searchQuery, selectedCategory, selectedDimension, selectedSensoryChannel, quickFilter, favorites, basket]);

  const basketTermsList = useMemo(() => {
    return allTerms.filter((t) => basket.includes(t.id));
  }, [allTerms, basket]);

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#1A1816] text-[#2D2926] dark:text-stone-100 font-serif selection:bg-[#C5A059] selection:text-[#2D2926] transition-colors flex flex-col justify-between">
      <div>
        {/* Header */}
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selectedBasketCount={basket.length}
          onOpenStudio={() => setIsStudioOpen(true)}
          onOpenAddModal={() => setIsAddModalOpen(true)}
          onOpenAnalyzer={() => setIsAnalyzerOpen(true)}
        />

        {/* Main Container */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* VIEW 1: CORPUS CLASSIFICATION (一、语料分类) */}
          {activeTab === 'corpus' && (
            <div className="space-y-8">
              <CategoryFilter
                categories={CATEGORIES}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                categoryCounts={categoryCounts}
              />

              {/* Results Counter Bar */}
              <div className="flex items-center justify-between border-b border-[#E5E1D8] dark:border-stone-800 pb-3">
                <div className="flex items-center gap-2 text-xs font-serif text-[#59544E] dark:text-stone-400">
                  <span className="font-medium text-[#2D2926] dark:text-stone-100">
                    {selectedCategory === 'all'
                      ? '全部门类美学辞藻'
                      : CATEGORIES.find((c) => c.id === selectedCategory)?.name}
                  </span>
                  <span>· 共检索出 {filteredTerms.length} 条语料</span>
                </div>

                {selectedCategory !== 'all' && (
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className="text-xs text-[#C5A059] dark:text-amber-400 font-sans uppercase tracking-widest hover:underline"
                  >
                    重置门类筛选
                  </button>
                )}
              </div>

              {/* Terms Grid */}
              {filteredTerms.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredTerms.map((term) => (
                    <TermCard
                      key={term.id}
                      term={term}
                      category={CATEGORIES.find((c) => c.id === term.category)}
                      dimensions={DIMENSIONS}
                      isFavorite={favorites.includes(term.id)}
                      isInBasket={basket.includes(term.id)}
                      onToggleFavorite={toggleFavorite}
                      onToggleBasket={toggleBasket}
                      onInspect={setInspectedTerm}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white dark:bg-stone-900 rounded-sm border border-[#E5E1D8] dark:border-stone-800">
                  <Search className="w-10 h-10 mx-auto text-[#A69F92] mb-3" />
                  <p className="text-sm font-serif text-[#59544E] dark:text-stone-400 mb-1">
                    未检索到符合条件的辞藻素材
                  </p>
                  <p className="text-xs text-[#8C867A] font-serif italic">
                    尝试清除搜索词或切换其它门类分类
                  </p>
                </div>
              )}
            </div>
          )}

          {/* VIEW 2: AESTHETIC DIMENSIONS (二、美学维度) */}
          {activeTab === 'dimensions' && (
            <div className="space-y-8">
              <DimensionFilter
                dimensions={DIMENSIONS}
                selectedDimension={selectedDimension}
                onSelectDimension={setSelectedDimension}
                selectedSensoryChannel={selectedSensoryChannel}
                onSelectSensoryChannel={setSelectedSensoryChannel}
                dimensionCounts={dimensionCounts}
              />

              {/* Results Counter Bar */}
              <div className="flex items-center justify-between border-b border-[#E5E1D8] dark:border-stone-800 pb-3">
                <div className="flex items-center gap-2 text-xs font-serif text-[#59544E] dark:text-stone-400">
                  <span className="font-medium text-[#2D2926] dark:text-stone-100">
                    {selectedDimension === 'all'
                      ? '全维度美学词汇'
                      : DIMENSIONS.find((d) => d.id === selectedDimension)?.name}
                  </span>
                  <span>· 共 {filteredTerms.length} 条语料</span>
                </div>

                {(selectedDimension !== 'all' || selectedSensoryChannel !== 'all') && (
                  <button
                    onClick={() => {
                      setSelectedDimension('all');
                      setSelectedSensoryChannel('all');
                    }}
                    className="text-xs text-[#C5A059] font-sans uppercase tracking-widest hover:underline"
                  >
                    重置美学维度筛选
                  </button>
                )}
              </div>

              {/* Terms Grid */}
              {filteredTerms.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredTerms.map((term) => (
                    <TermCard
                      key={term.id}
                      term={term}
                      category={CATEGORIES.find((c) => c.id === term.category)}
                      dimensions={DIMENSIONS}
                      isFavorite={favorites.includes(term.id)}
                      isInBasket={basket.includes(term.id)}
                      onToggleFavorite={toggleFavorite}
                      onToggleBasket={toggleBasket}
                      onInspect={setInspectedTerm}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white dark:bg-stone-900 rounded-sm border border-[#E5E1D8] dark:border-stone-800">
                  <Sparkles className="w-10 h-10 mx-auto text-[#A69F92] mb-3" />
                  <p className="text-sm font-serif text-[#59544E] dark:text-stone-400">
                    无当前维度或感官通道相符的词汇
                  </p>
                </div>
              )}
            </div>
          )}

          {/* VIEW 3: RETRIEVAL & APPLICATION (三、检索与应用) */}
          {activeTab === 'retrieval' && (
            <div className="space-y-8">
              {/* Workbench Banner */}
              <div className="bg-[#F2EFE9] dark:bg-stone-900 border border-[#E5E1D8] dark:border-stone-800 rounded-sm p-6 sm:p-8 relative overflow-hidden">
                <div className="relative z-10 max-w-3xl">
                  <span className="inline-block px-2.5 py-0.5 border border-[#C5A059] text-[#C5A059] text-[10px] tracking-widest uppercase font-sans font-medium mb-3">
                    应用工坊 / Application Workbench
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-light text-[#2D2926] dark:text-stone-100 tracking-tight mb-2">
                    智能检索 · 辞藻应用与 AI 合成台
                  </h2>
                  <p className="text-[#59544E] dark:text-stone-300 text-xs sm:text-sm leading-relaxed font-serif italic mb-4">
                    在此快速检索所有经典与学术美学语料，将词汇加入暂存写作台，并使用 Gemini AI 生成精美的策展评论或输出美学卡片。
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => setIsStudioOpen(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-[#2D2926] text-[#FAF9F6] font-sans uppercase tracking-wider text-xs rounded-sm hover:bg-[#C5A059] hover:text-[#2D2926] transition"
                    >
                      <BookMarked className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>打开暂存工坊 ({basket.length})</span>
                    </button>

                    <button
                      onClick={() => setIsAnalyzerOpen(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-stone-800 text-[#2D2926] dark:text-stone-100 border border-[#E5E1D8] dark:border-stone-700 font-sans uppercase tracking-wider text-xs rounded-sm hover:border-[#2D2926] transition"
                    >
                      <Wand2 className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>AI 图文鉴赏解析</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Filter Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-sm bg-white dark:bg-stone-900 border border-[#E5E1D8] dark:border-stone-800">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setQuickFilter('all')}
                    className={`px-3 py-1.5 rounded-sm text-xs font-sans uppercase tracking-widest transition ${
                      quickFilter === 'all'
                        ? 'bg-[#2D2926] text-[#FAF9F6] font-bold'
                        : 'bg-[#FAF9F6] dark:bg-stone-800 border border-[#E5E1D8] text-[#59544E] dark:text-stone-400'
                    }`}
                  >
                    全部词汇 ({allTerms.length})
                  </button>

                  <button
                    onClick={() => setQuickFilter('favorites')}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-sm text-xs font-sans uppercase tracking-widest transition ${
                      quickFilter === 'favorites'
                        ? 'bg-[#2D2926] text-[#FAF9F6] font-bold'
                        : 'bg-[#FAF9F6] dark:bg-stone-800 border border-[#E5E1D8] text-[#59544E] dark:text-stone-400'
                    }`}
                  >
                    <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                    <span>我的收藏 ({favorites.length})</span>
                  </button>

                  <button
                    onClick={() => setQuickFilter('basket')}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-sm text-xs font-sans uppercase tracking-widest transition ${
                      quickFilter === 'basket'
                        ? 'bg-[#2D2926] text-[#FAF9F6] font-bold'
                        : 'bg-[#FAF9F6] dark:bg-stone-800 border border-[#E5E1D8] text-[#59544E] dark:text-stone-400'
                    }`}
                  >
                    <BookMarked className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>已入工坊 ({basket.length})</span>
                  </button>

                  <button
                    onClick={() => setQuickFilter('synesthesia')}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-sm text-xs font-sans uppercase tracking-widest transition ${
                      quickFilter === 'synesthesia'
                        ? 'bg-[#2D2926] text-[#FAF9F6] font-bold'
                        : 'bg-[#FAF9F6] dark:bg-stone-800 border border-[#E5E1D8] text-[#59544E] dark:text-stone-400'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>感官通感词汇</span>
                  </button>
                </div>

                <div className="text-xs text-[#8C867A] font-serif italic">
                  显示 {filteredTerms.length} 条结果
                </div>
              </div>

              {/* Terms Grid */}
              {filteredTerms.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredTerms.map((term) => (
                    <TermCard
                      key={term.id}
                      term={term}
                      category={CATEGORIES.find((c) => c.id === term.category)}
                      dimensions={DIMENSIONS}
                      isFavorite={favorites.includes(term.id)}
                      isInBasket={basket.includes(term.id)}
                      onToggleFavorite={toggleFavorite}
                      onToggleBasket={toggleBasket}
                      onInspect={setInspectedTerm}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white dark:bg-stone-900 rounded-sm border border-[#E5E1D8] dark:border-stone-800">
                  <Search className="w-10 h-10 mx-auto text-[#A69F92] mb-3" />
                  <p className="text-sm font-serif text-[#59544E] dark:text-stone-400 mb-1">
                    检索列表为空
                  </p>
                  <p className="text-xs text-[#8C867A] font-serif italic">
                    请尝试更改检索条件或清除快速筛选
                  </p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Clean Minimalism Footer */}
      <footer className="mt-12 py-4 border-t border-[#E5E1D8] dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between px-6 sm:px-10 text-[10px] uppercase tracking-[0.3em] text-[#A69F92] font-sans gap-2">
        <div>Design for Aesthetics & Culture</div>
        <div>© 2024 Cizhang Archive</div>
        <div>Database version: 4.0.12</div>
      </footer>

      {/* MODALS */}
      <TermDetailModal
        term={inspectedTerm}
        category={CATEGORIES.find((c) => c.id === inspectedTerm?.category)}
        dimensions={DIMENSIONS}
        allTerms={allTerms}
        isOpen={!!inspectedTerm}
        onClose={() => setInspectedTerm(null)}
        isFavorite={inspectedTerm ? favorites.includes(inspectedTerm.id) : false}
        isInBasket={inspectedTerm ? basket.includes(inspectedTerm.id) : false}
        onToggleFavorite={toggleFavorite}
        onToggleBasket={toggleBasket}
        onSelectTerm={setInspectedTerm}
      />

      <RhetoricStudioModal
        basketTerms={basketTermsList}
        isOpen={isStudioOpen}
        onClose={() => setIsStudioOpen(false)}
        onRemoveFromBasket={toggleBasket}
        onClearBasket={() => setBasket([])}
      />

      <AiArtAnalyzerModal
        isOpen={isAnalyzerOpen}
        onClose={() => setIsAnalyzerOpen(false)}
        onAddTermToBasket={handleAddTermToBasket}
      />

      <CustomTermModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddCustomTerm={handleAddCustomTerm}
      />
    </div>
  );
}

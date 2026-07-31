import React, { useState } from 'react';
import { AestheticTerm, CategoryInfo, DimensionInfo } from '../types';
import { Heart, Copy, Check, Plus, BookMarked, Eye, Sparkles } from 'lucide-react';

interface TermCardProps {
  term: AestheticTerm;
  category?: CategoryInfo;
  dimensions: DimensionInfo[];
  isFavorite: boolean;
  isInBasket: boolean;
  onToggleFavorite: (id: string) => void;
  onToggleBasket: (id: string) => void;
  onInspect: (term: AestheticTerm) => void;
}

export const TermCard: React.FC<TermCardProps> = ({
  term,
  category,
  dimensions,
  isFavorite,
  isInBasket,
  onToggleFavorite,
  onToggleBasket,
  onInspect,
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyExample = (text: string, index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const matchedDimension = dimensions.find((d) => term.dimensions.includes(d.id));

  return (
    <div
      onClick={() => onInspect(term)}
      className="group relative bg-[#FFFFFF] dark:bg-[#22201E] rounded-sm border border-[#E5E1D8] dark:border-stone-800 p-5 sm:p-6 shadow-none hover:border-[#2D2926] dark:hover:border-stone-600 transition-all duration-200 cursor-pointer flex flex-col justify-between overflow-hidden"
    >
      {/* Decorative Corner Seal Stamp */}
      <div className="absolute -right-3 -top-3 w-14 h-14 rounded-full border border-[#E5E1D8] dark:border-stone-800 flex items-center justify-center rotate-12 pointer-events-none group-hover:border-[#C5A059]/40 transition-colors">
        <span className="text-[9px] font-serif text-[#A69F92] dark:text-stone-500 font-bold tracking-widest uppercase">
          辞章
        </span>
      </div>

      <div>
        {/* Header: Category & Dimension Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-1.5 font-sans">
            {category && (
              <span className="text-[10px] px-2 py-0.5 uppercase tracking-widest bg-[#F2EFE9] dark:bg-stone-800 text-[#59544E] dark:text-stone-300 border border-[#E5E1D8] dark:border-stone-700 font-medium">
                {category.name}
              </span>
            )}
            {matchedDimension && (
              <span className="text-[10px] px-2 py-0.5 uppercase tracking-widest border border-[#C5A059]/40 text-[#C5A059] font-medium bg-white dark:bg-stone-900">
                {matchedDimension.name}
              </span>
            )}
          </div>

          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(term.id);
            }}
            className={`p-1 transition-colors ${
              isFavorite
                ? 'text-rose-700 dark:text-rose-400'
                : 'text-[#A69F92] hover:text-[#2D2926] dark:hover:text-stone-200'
            }`}
            title={isFavorite ? '取消收藏' : '收藏辞藻'}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Word & Pinyin */}
        <div className="mb-3">
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-serif font-light tracking-tight text-[#2D2926] dark:text-stone-100 group-hover:text-[#C5A059] transition-colors">
              {term.word}
            </h3>
            <span className="text-xs font-serif italic text-[#8C867A] dark:text-stone-400">{term.pinyin}</span>
          </div>
          <p className="text-xs font-serif font-medium text-[#C5A059] mt-1">
            「{term.pithyDefinition}」
          </p>
        </div>

        {/* Deep Interpretation Snippet */}
        <p className="text-xs text-[#59544E] dark:text-stone-300 line-clamp-3 font-serif leading-relaxed mb-4">
          {term.deepInterpretation}
        </p>

        {/* Origin Badge */}
        {term.classicOrigin && (
          <div className="mb-4 p-2.5 bg-[#F2EFE9] dark:bg-stone-900/80 border border-[#E5E1D8] dark:border-stone-800 rounded-sm">
            <div className="text-[9px] font-sans uppercase tracking-[0.2em] text-[#A69F92] dark:text-stone-500 mb-0.5 font-bold">
              典籍出处 / 源流
            </div>
            <div className="text-xs font-serif text-[#59544E] dark:text-stone-300 line-clamp-1 italic">
              {term.classicOrigin}
            </div>
          </div>
        )}

        {/* Example Sentence with Quick Copy */}
        {term.critiqueExamples && term.critiqueExamples.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-[10px] font-sans uppercase tracking-widest text-[#8C867A] dark:text-stone-400 mb-1">
              <span>鉴赏例句</span>
              <button
                onClick={(e) => handleCopyExample(term.critiqueExamples[0], 0, e)}
                className="flex items-center gap-1 text-[10px] font-sans uppercase tracking-widest text-[#C5A059] hover:underline"
              >
                {copiedIndex === 0 ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copiedIndex === 0 ? '已复制' : '复制例句'}</span>
              </button>
            </div>
            <p className="text-xs text-[#2D2926] dark:text-stone-300 font-serif italic bg-white dark:bg-stone-900 p-2.5 border border-[#E5E1D8] dark:border-stone-800 line-clamp-2">
              “{term.critiqueExamples[0]}”
            </p>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="pt-3 border-t border-[#E5E1D8] dark:border-stone-800 flex items-center justify-between gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onInspect(term);
          }}
          className="flex items-center gap-1 text-xs font-sans uppercase tracking-widest text-[#8C867A] dark:text-stone-400 hover:text-[#2D2926] dark:hover:text-stone-100 transition"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>深度研读</span>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleBasket(term.id);
          }}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-sm text-xs font-sans uppercase tracking-widest transition-all ${
            isInBasket
              ? 'bg-[#2D2926] text-[#FAF9F6] border border-[#2D2926]'
              : 'border border-[#E5E1D8] dark:border-stone-700 text-[#2D2926] dark:text-stone-200 hover:bg-[#2D2926] hover:text-[#FAF9F6]'
          }`}
        >
          {isInBasket ? <BookMarked className="w-3.5 h-3.5 text-[#C5A059]" /> : <Plus className="w-3.5 h-3.5" />}
          <span>{isInBasket ? '已入工坊' : '加入工坊'}</span>
        </button>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { AestheticTerm, CategoryInfo, DimensionInfo } from '../types';
import { X, Copy, Check, Sparkles, BookOpen, Wand2, Heart, BookMarked, Eye, RefreshCw } from 'lucide-react';

interface TermDetailModalProps {
  term: AestheticTerm | null;
  category?: CategoryInfo;
  dimensions: DimensionInfo[];
  allTerms: AestheticTerm[];
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  isInBasket: boolean;
  onToggleFavorite: (id: string) => void;
  onToggleBasket: (id: string) => void;
  onSelectTerm: (term: AestheticTerm) => void;
}

export const TermDetailModal: React.FC<TermDetailModalProps> = ({
  term,
  category,
  dimensions,
  allTerms,
  isOpen,
  onClose,
  isFavorite,
  isInBasket,
  onToggleFavorite,
  onToggleBasket,
  onSelectTerm,
}) => {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [aiExpandedData, setAiExpandedData] = useState<any>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  if (!isOpen || !term) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleAiExpand = async () => {
    setIsLoadingAi(true);
    setAiError(null);
    try {
      const res = await fetch('/api/gemini/expand-term', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ term: term.word }),
      });
      if (!res.ok) {
        throw new Error('AI 解析请求失败');
      }
      const data = await res.json();
      setAiExpandedData(data);
    } catch (err: any) {
      setAiError(err.message || 'AI 展开解析失败，请检查网络或配置');
    } finally {
      setIsLoadingAi(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#2D2926]/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl bg-white dark:bg-[#22201E] rounded-sm shadow-2xl border border-[#E5E1D8] dark:border-stone-800 overflow-hidden my-8">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E1D8] dark:border-stone-800 bg-[#FAF9F6] dark:bg-stone-900">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-sans uppercase tracking-widest px-2.5 py-0.5 border border-[#C5A059] text-[#C5A059] font-medium">
              {category?.name || '综合美学'}
            </span>
            <span className="text-xs text-[#8C867A] font-serif italic">{term.pinyin}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(term.id)}
              className={`p-1.5 rounded-sm transition ${
                isFavorite
                  ? 'text-rose-600 bg-rose-50 dark:bg-rose-950/40'
                  : 'text-[#A69F92] hover:text-[#2D2926] dark:hover:text-stone-200'
              }`}
              title={isFavorite ? '取消收藏' : '收藏'}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={() => onToggleBasket(term.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-sans uppercase tracking-widest transition ${
                isInBasket
                  ? 'bg-[#2D2926] text-[#FAF9F6] border border-[#2D2926]'
                  : 'border border-[#E5E1D8] text-[#2D2926] dark:text-stone-300 hover:bg-[#2D2926] hover:text-[#FAF9F6]'
              }`}
            >
              <BookMarked className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{isInBasket ? '已在工坊' : '加入工坊'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-sm text-[#A69F92] hover:text-[#2D2926] dark:hover:text-stone-200 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Main Title Section */}
          <div className="border-b border-[#E5E1D8] dark:border-stone-800 pb-6">
            <div className="flex items-baseline gap-3 mb-2">
              <h2 className="text-3xl sm:text-4xl font-serif font-light tracking-tight text-[#2D2926] dark:text-stone-100">
                {term.word}
              </h2>
              <span className="text-sm font-serif italic text-[#8C867A]">{term.pinyin}</span>
            </div>
            <p className="text-base font-serif text-[#C5A059] font-medium">
              「{term.pithyDefinition}」
            </p>

            {/* Dimension Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {term.dimensions.map((dimId) => {
                const dimInfo = dimensions.find((d) => d.id === dimId);
                if (!dimInfo) return null;
                return (
                  <span
                    key={dimId}
                    className="text-[10px] font-sans uppercase tracking-widest px-2.5 py-1 border border-[#C5A059]/40 text-[#C5A059] font-medium"
                  >
                    {dimInfo.name}
                  </span>
                );
              })}

              {term.sensoryChannels.map((sc) => (
                <span
                  key={sc}
                  className="text-[10px] font-sans uppercase tracking-widest px-2.5 py-1 bg-[#F2EFE9] dark:bg-stone-800 text-[#59544E] dark:text-stone-300 border border-[#E5E1D8] dark:border-stone-700"
                >
                  感官: {sc}
                </span>
              ))}
            </div>
          </div>

          {/* Deep Interpretation */}
          <div>
            <h3 className="text-[10px] font-sans font-bold text-[#A69F92] dark:text-stone-400 uppercase tracking-[0.2em] mb-2">
              学术深度与美学意释 / Deep Interpretation
            </h3>
            <p className="text-sm text-[#59544E] dark:text-stone-200 font-serif leading-relaxed bg-[#F2EFE9] dark:bg-stone-900 p-4 rounded-sm border border-[#E5E1D8] dark:border-stone-800">
              {term.deepInterpretation}
            </p>
          </div>

          {/* Classic Origin */}
          {term.classicOrigin && (
            <div>
              <h3 className="text-[10px] font-sans font-bold text-[#A69F92] dark:text-stone-400 uppercase tracking-[0.2em] mb-2">
                典籍出处与流派渊源 / Classic Origin
              </h3>
              <div className="p-4 rounded-sm bg-white dark:bg-stone-900 border border-[#E5E1D8] dark:border-stone-800 text-[#2D2926] dark:text-stone-200 font-serif text-sm italic">
                {term.classicOrigin}
              </div>
            </div>
          )}

          {/* Sensory Experience */}
          {term.sensoryExperience && (
            <div>
              <h3 className="text-[10px] font-sans font-bold text-[#A69F92] dark:text-stone-400 uppercase tracking-[0.2em] mb-2">
                感官通感描写 / Synesthetic Experience
              </h3>
              <p className="text-sm text-[#2D2926] dark:text-stone-300 font-serif leading-relaxed italic bg-[#F2EFE9] dark:bg-stone-900 p-4 rounded-sm border border-[#E5E1D8] dark:border-stone-800">
                “{term.sensoryExperience}”
              </p>
            </div>
          )}

          {/* Critique Examples */}
          {term.critiqueExamples && term.critiqueExamples.length > 0 && (
            <div>
              <h3 className="text-[10px] font-sans font-bold text-[#A69F92] dark:text-stone-400 uppercase tracking-[0.2em] mb-2">
                鉴赏应用例句 / Critique Examples
              </h3>
              <div className="space-y-2">
                {term.critiqueExamples.map((ex, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-sm bg-white dark:bg-stone-900 border border-[#E5E1D8] dark:border-stone-800 flex items-start justify-between gap-3 group"
                  >
                    <p className="text-xs sm:text-sm text-[#2D2926] dark:text-stone-200 font-serif leading-relaxed italic">
                      “{ex}”
                    </p>
                    <button
                      onClick={() => handleCopy(ex)}
                      className="p-1.5 text-[#A69F92] hover:text-[#C5A059] transition shrink-0"
                      title="复制例句"
                    >
                      {copiedText === ex ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Terms */}
          {term.relatedTerms && term.relatedTerms.length > 0 && (
            <div>
              <h3 className="text-[10px] font-sans font-bold text-[#A69F92] dark:text-stone-400 uppercase tracking-[0.2em] mb-2">
                关联辞藻延伸 / Related Terms
              </h3>
              <div className="flex flex-wrap gap-2">
                {term.relatedTerms.map((rt) => {
                  const found = allTerms.find((t) => t.word === rt);
                  return (
                    <button
                      key={rt}
                      onClick={() => {
                        if (found) onSelectTerm(found);
                      }}
                      className="px-3 py-1 rounded-sm text-xs font-serif bg-white dark:bg-stone-800 text-[#59544E] dark:text-stone-300 border border-[#E5E1D8] dark:border-stone-700 hover:border-[#C5A059] hover:text-[#C5A059] transition"
                    >
                      {rt} {found ? '→' : ''}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Gemini AI Term Expansion Section */}
          <div className="pt-4 border-t border-[#E5E1D8] dark:border-stone-800">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Wand2 className="w-4 h-4 text-[#C5A059]" />
                <h3 className="text-[10px] font-sans font-bold text-[#2D2926] dark:text-stone-200 uppercase tracking-[0.2em]">
                  AI 美学深度辞源与通感演绎
                </h3>
              </div>
              <button
                onClick={handleAiExpand}
                disabled={isLoadingAi}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-sans uppercase tracking-wider text-[#2D2926] bg-[#F2EFE9] border border-[#E5E1D8] hover:border-[#2D2926] transition disabled:opacity-50"
              >
                {isLoadingAi ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />}
                <span>{aiExpandedData ? '重新解析' : 'AI 深度展开'}</span>
              </button>
            </div>

            {aiError && <p className="text-xs text-rose-500">{aiError}</p>}

            {aiExpandedData && (
              <div className="p-4 rounded-sm bg-[#F2EFE9] dark:bg-stone-900 border border-[#E5E1D8] dark:border-stone-800 space-y-3">
                {aiExpandedData.aestheticArchetype && (
                  <div>
                    <span className="text-xs font-serif text-[#C5A059] font-medium block mb-1">
                      美学原型：{aiExpandedData.aestheticArchetype}
                    </span>
                  </div>
                )}
                {aiExpandedData.etymologyAndSource && (
                  <p className="text-xs text-[#59544E] dark:text-stone-300 font-serif">
                    <strong>文献考据：</strong> {aiExpandedData.etymologyAndSource}
                  </p>
                )}
                {aiExpandedData.synesthesiaChannels && (
                  <div className="grid grid-cols-2 gap-2 text-xs text-[#59544E] dark:text-stone-400 bg-white dark:bg-stone-800 p-2.5 border border-[#E5E1D8]">
                    <div><strong>视觉：</strong> {aiExpandedData.synesthesiaChannels.visual}</div>
                    <div><strong>触觉：</strong> {aiExpandedData.synesthesiaChannels.tactile}</div>
                    <div><strong>听觉：</strong> {aiExpandedData.synesthesiaChannels.auditory}</div>
                    <div><strong>时空：</strong> {aiExpandedData.synesthesiaChannels.spatialTemporal}</div>
                  </div>
                )}
                {aiExpandedData.classicSentenceExamples && (
                  <div className="space-y-1">
                    <span className="text-[10px] font-sans uppercase tracking-widest text-[#8C867A]">AI 扩展例句：</span>
                    {aiExpandedData.classicSentenceExamples.map((s: string, i: number) => (
                      <p key={i} className="text-xs font-serif text-[#2D2926] dark:text-stone-200 italic">
                        “{s}”
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

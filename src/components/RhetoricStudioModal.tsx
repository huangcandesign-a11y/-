import React, { useState } from 'react';
import { AestheticTerm } from '../types';
import { X, Trash2, Copy, Check, Wand2, Sparkles, BookMarked, Download, FileText, Feather, Share2, Layers } from 'lucide-react';

interface RhetoricStudioModalProps {
  basketTerms: AestheticTerm[];
  isOpen: boolean;
  onClose: () => void;
  onRemoveFromBasket: (id: string) => void;
  onClearBasket: () => void;
}

export const RhetoricStudioModal: React.FC<RhetoricStudioModalProps> = ({
  basketTerms,
  isOpen,
  onClose,
  onRemoveFromBasket,
  onClearBasket,
}) => {
  const [activeTab, setActiveTab] = useState<'basket' | 'ai_composer' | 'card_export'>('basket');
  const [artDomain, setArtDomain] = useState('绘画与水墨艺术');
  const [tone, setTone] = useState('学术深邃与通感诗意兼备');
  const [customTopic, setCustomTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [critiqueResult, setCritiqueResult] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  // Card customization state
  const [cardTheme, setCardTheme] = useState<'xuan_paper' | 'dark_ink' | 'bamboo_white'>('xuan_paper');
  const [cardSelectedTermId, setCardSelectedTermId] = useState<string>('');

  if (!isOpen) return null;

  const handleCopyText = (text: string, identifier: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(identifier);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleCopyFormattedBasket = () => {
    const formatted = basketTerms
      .map((t) => `【${t.word}】（${t.pinyin}）: ${t.pithyDefinition} | 意释：${t.deepInterpretation}`)
      .join('\n\n');
    navigator.clipboard.writeText(formatted);
    setCopiedSection('basket');
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleGenerateCritique = async () => {
    setIsGenerating(true);
    setErrorMessage(null);
    try {
      const selectedWords = basketTerms.map((t) => t.word);
      const res = await fetch('/api/gemini/compose-critique', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          selectedWords,
          artDomain,
          tone,
          customTopic,
        }),
      });

      if (!res.ok) {
        throw new Error('生成评论失败，请重试');
      }

      const data = await res.json();
      setCritiqueResult(data);
    } catch (err: any) {
      setErrorMessage(err.message || '评论生成出错');
    } finally {
      setIsGenerating(false);
    }
  };

  const activeCardTerm = basketTerms.find((t) => t.id === cardSelectedTermId) || basketTerms[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#2D2926]/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-white dark:bg-[#22201E] rounded-sm shadow-2xl border border-[#E5E1D8] dark:border-stone-800 overflow-hidden my-6 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#E5E1D8] dark:border-stone-800 bg-[#FAF9F6] dark:bg-stone-900 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-[#2D2926] text-[#FAF9F6] border border-[#2D2926] flex items-center justify-center">
              <BookMarked className="w-4 h-4 text-[#C5A059]" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-light text-[#2D2926] dark:text-stone-100">
                暂存写作台与辞藻应用工坊
              </h2>
              <p className="text-xs text-[#8C867A] font-serif italic">
                已收集 {basketTerms.length} 个美学词汇 · 支持组词合成、AI 评论撰写与卡片导出
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#A69F92] hover:text-[#2D2926] dark:hover:text-stone-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Sub-Tabs */}
        <div className="flex border-b border-[#E5E1D8] dark:border-stone-800 px-6 bg-[#F2EFE9] dark:bg-stone-900">
          <button
            onClick={() => setActiveTab('basket')}
            className={`px-4 py-3 text-xs font-sans uppercase tracking-widest border-b-2 transition ${
              activeTab === 'basket'
                ? 'border-[#C5A059] text-[#2D2926] dark:text-stone-100 font-bold'
                : 'border-transparent text-[#8C867A] hover:text-[#2D2926]'
            }`}
          >
            辞藻暂存夹 ({basketTerms.length})
          </button>

          <button
            onClick={() => setActiveTab('ai_composer')}
            className={`px-4 py-3 text-xs font-sans uppercase tracking-widest border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'ai_composer'
                ? 'border-[#C5A059] text-[#2D2926] dark:text-stone-100 font-bold'
                : 'border-transparent text-[#8C867A] hover:text-[#2D2926]'
            }`}
          >
            <Wand2 className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>AI 鉴赏文章合成</span>
          </button>

          <button
            onClick={() => setActiveTab('card_export')}
            className={`px-4 py-3 text-xs font-sans uppercase tracking-widest border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'card_export'
                ? 'border-[#C5A059] text-[#2D2926] dark:text-stone-100 font-bold'
                : 'border-transparent text-[#8C867A] hover:text-[#2D2926]'
            }`}
          >
            <Feather className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>美学卡片生成</span>
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: BASKET */}
          {activeTab === 'basket' && (
            <div>
              {basketTerms.length === 0 ? (
                <div className="text-center py-12 text-[#A69F92]">
                  <BookMarked className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm font-serif mb-1">暂存工坊为空</p>
                  <p className="text-xs font-serif italic">在辞藻卡片上点击“加入工坊”，在此汇聚美学素材。</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-sans uppercase tracking-widest text-[#A69F92]">选中的词汇清单</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleCopyFormattedBasket}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-sm text-xs font-sans uppercase tracking-widest bg-white dark:bg-stone-800 border border-[#E5E1D8] text-[#2D2926] dark:text-stone-300 hover:border-[#2D2926] transition"
                      >
                        {copiedSection === 'basket' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedSection === 'basket' ? '已复制格式化清单' : '复制词汇清单'}</span>
                      </button>
                      <button
                        onClick={onClearBasket}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-sm text-xs font-sans uppercase tracking-widest border border-rose-300 text-rose-700 bg-rose-50 dark:bg-rose-950/50 dark:text-rose-300 hover:bg-rose-100 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>清空暂存</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {basketTerms.map((term) => (
                      <div
                        key={term.id}
                        className="p-4 rounded-sm border border-[#E5E1D8] dark:border-stone-800 bg-[#FAF9F6] dark:bg-stone-900 flex items-start justify-between gap-3"
                      >
                        <div>
                          <div className="flex items-baseline gap-2 mb-1">
                            <h4 className="font-serif font-light text-base text-[#2D2926] dark:text-stone-100">
                              {term.word}
                            </h4>
                            <span className="text-xs font-serif italic text-[#8C867A]">{term.pinyin}</span>
                          </div>
                          <p className="text-xs font-serif text-[#C5A059] mb-1">
                            「{term.pithyDefinition}」
                          </p>
                          <p className="text-xs text-[#59544E] dark:text-stone-400 line-clamp-2 font-serif italic">
                            {term.deepInterpretation}
                          </p>
                        </div>

                        <button
                          onClick={() => onRemoveFromBasket(term.id)}
                          className="p-1.5 text-[#A69F92] hover:text-rose-600 transition shrink-0"
                          title="从暂存工坊移除"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Quick Action Banner to AI composer */}
                  <div className="p-4 rounded-sm bg-[#F2EFE9] dark:bg-stone-900 border border-[#E5E1D8] dark:border-stone-800 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-serif font-light text-[#2D2926] dark:text-stone-200">
                        准备好融词成文了吗？
                      </h4>
                      <p className="text-xs text-[#8C867A] font-serif italic">
                        利用上述选中的 {basketTerms.length} 个辞藻，直接生成符合策展与评论风格的文章。
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('ai_composer')}
                      className="px-4 py-2 text-xs font-sans uppercase tracking-widest bg-[#2D2926] text-[#FAF9F6] border border-[#2D2926] rounded-sm hover:bg-[#C5A059] hover:text-[#2D2926] transition shrink-0"
                    >
                      前往 AI 合成 →
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: AI COMPOSER */}
          {activeTab === 'ai_composer' && (
            <div className="space-y-6">
              {/* Controls */}
              <div className="p-5 rounded-sm bg-[#F2EFE9] dark:bg-stone-900 border border-[#E5E1D8] dark:border-stone-800 space-y-4">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-[10px] font-sans uppercase tracking-widest text-[#8C867A]">
                    融汇词汇（{basketTerms.length}个）：
                  </span>
                  {basketTerms.length > 0 ? (
                    basketTerms.map((t) => (
                      <span
                        key={t.id}
                        className="text-xs px-2 py-0.5 border border-[#C5A059]/40 text-[#C5A059] font-serif bg-white dark:bg-stone-800"
                      >
                        {t.word}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-[#8C867A] italic font-serif">尚未选择特定词汇，AI 将自由发挥高阶辞藻</span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-sans uppercase tracking-widest text-[#8C867A] mb-1">
                      艺术分类门类
                    </label>
                    <select
                      value={artDomain}
                      onChange={(e) => setArtDomain(e.target.value)}
                      className="w-full text-xs p-2.5 bg-white dark:bg-stone-800 border border-[#E5E1D8] dark:border-stone-700 rounded-sm text-[#2D2926] dark:text-stone-200 focus:outline-none"
                    >
                      <option value="绘画与水墨艺术">绘画与水墨艺术</option>
                      <option value="古典园林与建筑空间">古典园林与建筑空间</option>
                      <option value="诗词歌赋与文学意境">诗词歌赋与文学意境</option>
                      <option value="音乐声景与听觉艺术">音乐声景与听觉艺术</option>
                      <option value="瓷器金石与雕塑工艺">瓷器金石与雕塑工艺</option>
                      <option value="影视长镜头与光影色彩">影视长镜头与光影色彩</option>
                      <option value="现代装置与沉浸场域">现代装置与沉浸场域</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-sans uppercase tracking-widest text-[#8C867A] mb-1">
                      写作基调与格调
                    </label>
                    <select
                      value={tone}
                      onChange={(e) => setTone(e.target.value)}
                      className="w-full text-xs p-2.5 bg-white dark:bg-stone-800 border border-[#E5E1D8] dark:border-stone-700 rounded-sm text-[#2D2926] dark:text-stone-200 focus:outline-none"
                    >
                      <option value="学术深邃与通感诗意兼备">学术深邃与通感诗意兼备</option>
                      <option value="典雅严谨的前言论述">典雅严谨的前言论述</option>
                      <option value="纯粹诗意感官散文体">纯粹诗意感官散文体</option>
                      <option value="现象学与当代艺术批评体">现象学与当代艺术批评体</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-sans uppercase tracking-widest text-[#8C867A] mb-1">
                    展览主题 / 作品命名（可选）
                  </label>
                  <input
                    type="text"
                    value={customTopic}
                    onChange={(e) => setCustomTopic(e.target.value)}
                    placeholder="例如：《山水呼吸》、《光与重力》、《冷声景与寂静》"
                    className="w-full text-xs p-2.5 bg-white dark:bg-stone-800 border border-[#E5E1D8] dark:border-stone-700 rounded-sm text-[#2D2926] dark:text-stone-200 placeholder-[#A69F92] focus:outline-none"
                  />
                </div>

                <button
                  onClick={handleGenerateCritique}
                  disabled={isGenerating}
                  className="w-full py-3 bg-[#2D2926] text-[#FAF9F6] font-sans uppercase tracking-widest text-xs rounded-sm hover:bg-[#C5A059] hover:text-[#2D2926] transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Sparkles className={`w-4 h-4 text-[#C5A059] ${isGenerating ? 'animate-spin' : ''}`} />
                  <span>{isGenerating ? 'AI 正在融汇美学辞藻生成文章...' : '合成艺术鉴赏文章'}</span>
                </button>
              </div>

              {errorMessage && (
                <div className="p-4 rounded-sm bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 text-xs border border-rose-200">
                  {errorMessage}
                </div>
              )}

              {critiqueResult && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-sans uppercase tracking-widest font-bold text-[#2D2926] dark:text-stone-200">
                      生成成果 (3种美学应用范式)
                    </h3>
                  </div>

                  {/* 1. Curatorial Intro */}
                  {critiqueResult.curatorialIntro && (
                    <div className="p-5 rounded-sm bg-white dark:bg-stone-900 border border-[#E5E1D8] dark:border-stone-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-sans uppercase tracking-widest font-bold text-[#C5A059]">
                          A. 策展前言 / 展览致辞
                        </span>
                        <button
                          onClick={() => handleCopyText(critiqueResult.curatorialIntro, 'curatorial')}
                          className="flex items-center gap-1 text-xs text-[#8C867A] hover:text-[#2D2926]"
                        >
                          {copiedSection === 'curatorial' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedSection === 'curatorial' ? '已复制' : '复制'}</span>
                        </button>
                      </div>
                      <p className="text-xs sm:text-sm text-[#2D2926] dark:text-stone-200 font-serif leading-relaxed">
                        {critiqueResult.curatorialIntro}
                      </p>
                    </div>
                  )}

                  {/* 2. Academic Critique */}
                  {critiqueResult.academicCritique && (
                    <div className="p-5 rounded-sm bg-white dark:bg-stone-900 border border-[#E5E1D8] dark:border-stone-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-sans uppercase tracking-widest font-bold text-[#C5A059]">
                          B. 学术评论精段
                        </span>
                        <button
                          onClick={() => handleCopyText(critiqueResult.academicCritique, 'academic')}
                          className="flex items-center gap-1 text-xs text-[#8C867A] hover:text-[#2D2926]"
                        >
                          {copiedSection === 'academic' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedSection === 'academic' ? '已复制' : '复制'}</span>
                        </button>
                      </div>
                      <p className="text-xs sm:text-sm text-[#2D2926] dark:text-stone-200 font-serif leading-relaxed">
                        {critiqueResult.academicCritique}
                      </p>
                    </div>
                  )}

                  {/* 3. Sensory Poetic Text */}
                  {critiqueResult.sensoryPoeticText && (
                    <div className="p-5 rounded-sm bg-[#F2EFE9] dark:bg-stone-900 border border-[#E5E1D8] dark:border-stone-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-sans uppercase tracking-widest font-bold text-[#C5A059]">
                          C. 感官通感短评
                        </span>
                        <button
                          onClick={() => handleCopyText(critiqueResult.sensoryPoeticText, 'sensory')}
                          className="flex items-center gap-1 text-xs text-[#8C867A] hover:text-[#2D2926]"
                        >
                          {copiedSection === 'sensory' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedSection === 'sensory' ? '已复制' : '复制'}</span>
                        </button>
                      </div>
                      <p className="text-xs sm:text-sm text-[#2D2926] dark:text-stone-200 font-serif leading-relaxed italic">
                        “{critiqueResult.sensoryPoeticText}”
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: VISUAL CARD EXPORTER */}
          {activeTab === 'card_export' && (
            <div className="space-y-6">
              {/* Card Controls */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-sm bg-[#F2EFE9] dark:bg-stone-900 border border-[#E5E1D8] dark:border-stone-800">
                <div>
                  <label className="block text-[10px] font-sans uppercase tracking-widest text-[#8C867A] mb-1">
                    选择制作美学卡片的辞藻
                  </label>
                  <select
                    value={cardSelectedTermId}
                    onChange={(e) => setCardSelectedTermId(e.target.value)}
                    className="text-xs p-2 bg-white dark:bg-stone-800 border border-[#E5E1D8] dark:border-stone-700 rounded-sm text-[#2D2926] dark:text-stone-200 focus:outline-none"
                  >
                    {basketTerms.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.word} - 「{t.pithyDefinition}」
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-sans uppercase tracking-widest text-[#8C867A] mb-1">
                    卡片排版主题
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCardTheme('xuan_paper')}
                      className={`px-3 py-1 text-xs font-sans uppercase tracking-wider rounded-sm border ${
                        cardTheme === 'xuan_paper' ? 'bg-[#2D2926] text-[#FAF9F6] border-[#2D2926]' : 'bg-white text-[#59544E] border-[#E5E1D8]'
                      }`}
                    >
                      古质宣纸
                    </button>
                    <button
                      onClick={() => setCardTheme('dark_ink')}
                      className={`px-3 py-1 text-xs font-sans uppercase tracking-wider rounded-sm border ${
                        cardTheme === 'dark_ink' ? 'bg-[#2D2926] text-[#C5A059] border-[#2D2926]' : 'bg-white text-[#59544E] border-[#E5E1D8]'
                      }`}
                    >
                      沉静暗墨
                    </button>
                    <button
                      onClick={() => setCardTheme('bamboo_white')}
                      className={`px-3 py-1 text-xs font-sans uppercase tracking-wider rounded-sm border ${
                        cardTheme === 'bamboo_white' ? 'bg-[#FAF9F6] text-[#2D2926] border-[#C5A059]' : 'bg-white text-[#59544E] border-[#E5E1D8]'
                      }`}
                    >
                      清空竹白
                    </button>
                  </div>
                </div>
              </div>

              {/* The Visual Card Preview Area */}
              {activeCardTerm ? (
                <div className="p-4 flex flex-col items-center">
                  <div
                    id="aesthetic-card-preview"
                    className={`w-full max-w-md p-8 rounded-sm shadow-sm border relative overflow-hidden transition-all ${
                      cardTheme === 'xuan_paper'
                        ? 'bg-[#FAF9F6] text-[#2D2926] border-[#E5E1D8]'
                        : cardTheme === 'dark_ink'
                        ? 'bg-[#22201E] text-[#FAF9F6] border-stone-800'
                        : 'bg-white text-[#2D2926] border-[#E5E1D8]'
                    }`}
                  >
                    {/* Decorative Calligraphy Watermark Seal */}
                    <div className="absolute right-6 top-6 w-12 h-12 rounded-full border border-[#E5E1D8] flex items-center justify-center rotate-6 pointer-events-none">
                      <span className="text-[9px] font-serif font-bold text-[#C5A059]">辞章</span>
                    </div>

                    <div className="space-y-6 relative z-10">
                      <div>
                        <span className="text-[9px] font-sans uppercase tracking-[0.3em] text-[#A69F92]">
                          Aesthetics Corpus · 鉴赏辞藻
                        </span>
                        <div className="flex items-baseline gap-3 mt-1">
                          <h2 className="text-4xl font-serif font-light tracking-tight">
                            {activeCardTerm.word}
                          </h2>
                          <span className="text-sm font-serif italic text-[#8C867A]">{activeCardTerm.pinyin}</span>
                        </div>
                        <p className="text-sm font-serif font-medium text-[#C5A059] mt-2">
                          「{activeCardTerm.pithyDefinition}」
                        </p>
                      </div>

                      <p className="text-xs font-serif leading-relaxed text-[#59544E] dark:text-stone-300 border-t border-b py-4 border-[#E5E1D8]">
                        {activeCardTerm.deepInterpretation}
                      </p>

                      {activeCardTerm.critiqueExamples && activeCardTerm.critiqueExamples[0] && (
                        <div>
                          <span className="text-[9px] font-sans uppercase tracking-widest text-[#A69F92] block mb-1">例句赏析</span>
                          <p className="text-xs font-serif italic leading-relaxed">
                            “{activeCardTerm.critiqueExamples[0]}”
                          </p>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-[9px] uppercase tracking-widest text-[#A69F92] pt-2 border-t border-[#E5E1D8] font-sans">
                        <span>美学辞藻库 · 文化艺术鉴赏</span>
                        <span>{new Date().toLocaleDateString('zh-CN')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={() =>
                        handleCopyText(
                          `【${activeCardTerm.word}】(${activeCardTerm.pinyin}): ${activeCardTerm.pithyDefinition}\n${activeCardTerm.deepInterpretation}\n例句：“${activeCardTerm.critiqueExamples[0]}”`,
                          'card'
                        )
                      }
                      className="flex items-center gap-1.5 px-4 py-2 bg-[#2D2926] text-[#FAF9F6] rounded-sm text-xs font-sans uppercase tracking-widest border border-[#2D2926] hover:bg-[#C5A059] hover:text-[#2D2926] transition"
                    >
                      {copiedSection === 'card' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#C5A059]" />}
                      <span>{copiedSection === 'card' ? '已复制卡片文本' : '复制卡片文本'}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-xs font-serif italic text-[#8C867A]">
                  请先从“暂存工坊”中选择或添加辞藻，以生成精美卡片。
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

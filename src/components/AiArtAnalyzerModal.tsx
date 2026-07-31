import React, { useState } from 'react';
import { ART_SAMPLES } from '../data/aestheticData';
import { ArtSample } from '../types';
import { X, Wand2, Sparkles, Upload, Image as ImageIcon, Check, Plus, BookOpen } from 'lucide-react';

interface AiArtAnalyzerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTermToBasket: (term: any) => void;
}

export const AiArtAnalyzerModal: React.FC<AiArtAnalyzerModalProps> = ({
  isOpen,
  onClose,
  onAddTermToBasket,
}) => {
  const [selectedSample, setSelectedSample] = useState<ArtSample | null>(ART_SAMPLES[0]);
  const [customDescription, setCustomDescription] = useState('');
  const [customImageBase64, setCustomImageBase64] = useState<string | null>(null);
  const [customImageMime, setCustomImageMime] = useState<string>('image/jpeg');
  const [categoryInput, setCategoryInput] = useState('绘画与水墨艺术');

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [addedTermIndex, setAddedTermIndex] = useState<Record<number, boolean>>({});

  if (!isOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCustomImageMime(file.type || 'image/jpeg');
    const reader = new FileReader();
    reader.onload = () => {
      setCustomImageBase64(reader.result as string);
      setSelectedSample(null); // Clear selected preset sample
    };
    reader.readAsDataURL(file);
  };

  const handleRunAnalysis = async () => {
    setIsAnalyzing(true);
    setErrorMessage(null);
    setAnalysisResult(null);

    try {
      const payload: any = {
        category: categoryInput,
      };

      if (customImageBase64) {
        payload.imageBase64 = customImageBase64;
        payload.mimeType = customImageMime;
        payload.description = customDescription || '来自用户上传的艺术图片';
      } else if (selectedSample) {
        payload.description = `【示例作品】${selectedSample.title} - ${selectedSample.artist} (${selectedSample.era}): ${selectedSample.description}`;
      } else {
        payload.description = customDescription || '自然水墨与光影美学感官场域';
      }

      const res = await fetch('/api/gemini/analyze-art', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('美学分析失败，请检查 GEMINI_API_KEY 配置');
      }

      const data = await res.json();
      setAnalysisResult(data);
    } catch (err: any) {
      setErrorMessage(err.message || '分析过程中发生错误');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAddAiTerm = (termItem: any, idx: number) => {
    onAddTermToBasket({
      id: `ai-term-${Date.now()}-${idx}`,
      word: termItem.word,
      pinyin: termItem.pinyin || '',
      category: 'painting_calligraphy',
      dimensions: ['synesthesia', 'poetic_realm'],
      sensoryChannels: ['visual', 'tactile'],
      pithyDefinition: termItem.meaning?.slice(0, 15) || 'AI 提取核心词汇',
      deepInterpretation: termItem.meaning || '',
      classicOrigin: termItem.origin || 'AI 艺术评论库',
      sensoryExperience: termItem.sensoryChannel || '',
      critiqueExamples: [termItem.example || ''],
      tags: ['AI提取', '美学通感'],
    });

    setAddedTermIndex((prev) => ({ ...prev, [idx]: true }));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#2D2926]/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-white dark:bg-[#22201E] rounded-sm shadow-2xl border border-[#E5E1D8] dark:border-stone-800 overflow-hidden my-6 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#E5E1D8] dark:border-stone-800 bg-[#FAF9F6] dark:bg-stone-900 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-[#2D2926] text-[#FAF9F6] border border-[#2D2926] flex items-center justify-center">
              <Wand2 className="w-4 h-4 text-[#C5A059]" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-light text-[#2D2926] dark:text-stone-100">
                AI 智能美学图文鉴赏解析
              </h2>
              <p className="text-xs text-[#8C867A] font-serif italic">
                传入作品图像或意境描述，由 Gemini 多模态模型解析提取【感官通感、深远意境与学术词汇】
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

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Section 1: Input selection */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-sans font-bold text-[#A69F92] dark:text-stone-400 uppercase tracking-[0.2em]">
              1. 选择经典美学名作 或 上传本地艺术图像
            </h3>

            {/* Presets Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {ART_SAMPLES.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => {
                    setSelectedSample(sample);
                    setCustomImageBase64(null);
                  }}
                  className={`p-2.5 rounded-sm border text-left transition relative overflow-hidden group ${
                    selectedSample?.id === sample.id && !customImageBase64
                      ? 'border-[#2D2926] dark:border-stone-100 bg-[#FAF9F6] dark:bg-stone-800'
                      : 'border-[#E5E1D8] dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-[#C5A059]'
                  }`}
                >
                  <img
                    src={sample.imageUrl}
                    alt={sample.title}
                    className="w-full h-24 object-cover rounded-sm mb-2"
                  />
                  <h4 className="font-serif font-light text-xs text-[#2D2926] dark:text-stone-100 truncate">
                    {sample.title}
                  </h4>
                  <p className="text-[10px] text-[#8C867A] font-serif italic truncate">{sample.artist}</p>
                </button>
              ))}
            </div>

            {/* Upload Custom File area */}
            <div className="flex flex-col sm:flex-row gap-4 items-center p-4 rounded-sm border border-dashed border-[#E5E1D8] dark:border-stone-800 bg-[#FAF9F6] dark:bg-stone-900">
              <label className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-[#2D2926] text-[#FAF9F6] rounded-sm text-xs font-sans uppercase tracking-widest hover:bg-[#C5A059] hover:text-[#2D2926] transition">
                <Upload className="w-4 h-4" />
                <span>上传艺术作品照片</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>

              {customImageBase64 && (
                <div className="flex items-center gap-2 text-xs text-emerald-600 font-serif">
                  <ImageIcon className="w-4 h-4" />
                  <span>自定义作品已加载</span>
                  <button
                    onClick={() => setCustomImageBase64(null)}
                    className="text-[#A69F92] hover:text-rose-600 ml-2"
                  >
                    移除
                  </button>
                </div>
              )}

              <input
                type="text"
                value={customDescription}
                onChange={(e) => setCustomDescription(e.target.value)}
                placeholder="或补充说明作品细节/感官意境需求..."
                className="flex-1 w-full text-xs p-2.5 bg-white dark:bg-stone-800 border border-[#E5E1D8] dark:border-stone-700 rounded-sm text-[#2D2926] dark:text-stone-200 focus:outline-none placeholder-[#A69F92]"
              />
            </div>

            <button
              onClick={handleRunAnalysis}
              disabled={isAnalyzing}
              className="w-full py-3 bg-[#2D2926] text-[#FAF9F6] font-sans uppercase tracking-widest text-xs rounded-sm hover:bg-[#C5A059] hover:text-[#2D2926] transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Sparkles className={`w-4 h-4 text-[#C5A059] ${isAnalyzing ? 'animate-spin' : ''}`} />
              <span>{isAnalyzing ? 'Gemini 正在多模态深度解析作品意境与辞藻...' : '开始 AI 美学与通感分析'}</span>
            </button>
          </div>

          {errorMessage && (
            <div className="p-4 rounded-sm bg-rose-50 text-rose-700 text-xs border border-rose-200">
              {errorMessage}
            </div>
          )}

          {/* Section 2: Analysis Results */}
          {analysisResult && (
            <div className="space-y-6 pt-4 border-t border-[#E5E1D8] dark:border-stone-800">
              <div className="p-5 rounded-sm bg-[#F2EFE9] dark:bg-stone-900 border border-[#E5E1D8] dark:border-stone-800">
                <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#C5A059] font-bold">
                  美学分析报告 · Aesthetic Report
                </span>
                <h3 className="text-xl font-serif font-light text-[#2D2926] dark:text-stone-100 mt-1 mb-2">
                  {analysisResult.title}
                </h3>
                <p className="text-xs text-[#59544E] dark:text-stone-300 font-serif leading-relaxed mb-3">
                  {analysisResult.summary}
                </p>

                {analysisResult.aestheticDimensions && (
                  <div className="flex flex-wrap gap-1.5">
                    {analysisResult.aestheticDimensions.map((dim: string, i: number) => (
                      <span
                        key={i}
                        className="text-[10px] font-sans uppercase tracking-widest px-2.5 py-0.5 border border-[#C5A059]/40 text-[#C5A059] bg-white dark:bg-stone-800"
                      >
                        #{dim}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Synesthesia Breakdown */}
              {analysisResult.synesthesiaBreakdown && (
                <div>
                  <h4 className="text-[10px] font-sans font-bold text-[#A69F92] dark:text-stone-400 uppercase tracking-[0.2em] mb-2">
                    感官通感拆解 / Synesthetic Perception
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {analysisResult.synesthesiaBreakdown.map((sb: any, idx: number) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-sm bg-[#FAF9F6] dark:bg-stone-900 border border-[#E5E1D8] dark:border-stone-800"
                      >
                        <span className="text-[10px] font-sans uppercase tracking-widest text-[#C5A059] block mb-0.5">
                          {sb.sense}
                        </span>
                        <h5 className="font-serif font-medium text-sm text-[#2D2926] dark:text-stone-100 mb-1">
                          {sb.phrase}
                        </h5>
                        <p className="text-xs text-[#59544E] dark:text-stone-300 font-serif italic">
                          {sb.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Rich Extracted Vocabulary */}
              {analysisResult.richVocabulary && (
                <div>
                  <h4 className="text-[10px] font-sans font-bold text-[#A69F92] dark:text-stone-400 uppercase tracking-[0.2em] mb-2">
                    提炼核心鉴赏辞藻（可一键加入写作暂存工坊）
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {analysisResult.richVocabulary.map((v: any, idx: number) => (
                      <div
                        key={idx}
                        className="p-4 rounded-sm border border-[#E5E1D8] dark:border-stone-800 bg-white dark:bg-stone-900 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-baseline gap-2 mb-1">
                            <h5 className="font-serif font-light text-lg text-[#2D2926] dark:text-stone-100">
                              {v.word}
                            </h5>
                            <span className="text-xs font-serif italic text-[#8C867A]">{v.pinyin}</span>
                          </div>
                          <p className="text-xs text-[#59544E] dark:text-stone-300 font-serif italic mb-2">
                            {v.meaning}
                          </p>
                          {v.origin && (
                            <p className="text-[11px] text-[#C5A059] font-serif mb-2">
                              出处/渊源：{v.origin}
                            </p>
                          )}
                          {v.example && (
                            <p className="text-xs text-[#2D2926] dark:text-stone-200 italic bg-[#FAF9F6] dark:bg-stone-800 p-2 border border-[#E5E1D8]">
                              “{v.example}”
                            </p>
                          )}
                        </div>

                        <button
                          onClick={() => handleAddAiTerm(v, idx)}
                          disabled={addedTermIndex[idx]}
                          className={`mt-3 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-sm text-xs font-sans uppercase tracking-widest border transition ${
                            addedTermIndex[idx]
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-200'
                              : 'bg-[#2D2926] text-[#FAF9F6] border-[#2D2926] hover:bg-[#C5A059] hover:text-[#2D2926]'
                          }`}
                        >
                          {addedTermIndex[idx] ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Plus className="w-3.5 h-3.5" />}
                          <span>{addedTermIndex[idx] ? '已加入暂存工坊' : '加入写作暂存工坊'}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Critique Paragraph */}
              {analysisResult.critiqueParagraph && (
                <div>
                  <h4 className="text-[10px] font-sans font-bold text-[#A69F92] dark:text-stone-400 uppercase tracking-[0.2em] mb-2">
                    精美艺术鉴赏短文（适合展页/策展）
                  </h4>
                  <div className="p-5 rounded-sm bg-[#F2EFE9] dark:bg-stone-900 border border-[#E5E1D8] dark:border-stone-800">
                    <p className="text-xs sm:text-sm text-[#2D2926] dark:text-stone-200 font-serif leading-relaxed italic">
                      “{analysisResult.critiqueParagraph}”
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { AestheticDimensionId, AestheticTerm, CategoryId } from '../types';
import { CATEGORIES, DIMENSIONS } from '../data/aestheticData';
import { X, Plus, Feather } from 'lucide-react';

interface CustomTermModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCustomTerm: (term: AestheticTerm) => void;
}

export const CustomTermModal: React.FC<CustomTermModalProps> = ({
  isOpen,
  onClose,
  onAddCustomTerm,
}) => {
  const [word, setWord] = useState('');
  const [pinyin, setPinyin] = useState('');
  const [category, setCategory] = useState<CategoryId>('painting_calligraphy');
  const [selectedDimensions, setSelectedDimensions] = useState<AestheticDimensionId[]>(['poetic_realm']);
  const [pithyDefinition, setPithyDefinition] = useState('');
  const [deepInterpretation, setDeepInterpretation] = useState('');
  const [classicOrigin, setClassicOrigin] = useState('');
  const [sensoryExperience, setSensoryExperience] = useState('');
  const [exampleSentence, setExampleSentence] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!word.trim() || !pithyDefinition.trim()) return;

    const newTerm: AestheticTerm = {
      id: `custom-term-${Date.now()}`,
      word: word.trim(),
      pinyin: pinyin.trim() || 'pīn yīn',
      category,
      dimensions: selectedDimensions,
      sensoryChannels: ['visual', 'tactile'],
      pithyDefinition: pithyDefinition.trim(),
      deepInterpretation: deepInterpretation.trim() || pithyDefinition.trim(),
      classicOrigin: classicOrigin.trim() || '自定义词库录入',
      sensoryExperience: sensoryExperience.trim() || '',
      critiqueExamples: exampleSentence.trim() ? [exampleSentence.trim()] : ['学术鉴赏例句录入中'],
      relatedTerms: [],
      tags: ['个人收藏', '自定义'],
    };

    onAddCustomTerm(newTerm);
    onClose();

    // Reset form
    setWord('');
    setPinyin('');
    setPithyDefinition('');
    setDeepInterpretation('');
    setClassicOrigin('');
    setSensoryExperience('');
    setExampleSentence('');
  };

  const toggleDimension = (dimId: AestheticDimensionId) => {
    if (selectedDimensions.includes(dimId)) {
      if (selectedDimensions.length > 1) {
        setSelectedDimensions(selectedDimensions.filter((d) => d !== dimId));
      }
    } else {
      setSelectedDimensions([...selectedDimensions, dimId]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#2D2926]/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-white dark:bg-[#22201E] rounded-sm shadow-2xl border border-[#E5E1D8] dark:border-stone-800 overflow-hidden my-8">
        <div className="px-6 py-4 border-b border-[#E5E1D8] dark:border-stone-800 bg-[#FAF9F6] dark:bg-stone-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Feather className="w-4 h-4 text-[#C5A059]" />
            <h2 className="text-base font-serif font-light text-[#2D2926] dark:text-stone-100">
              录入自定义美学辞藻
            </h2>
          </div>
          <button onClick={onClose} className="p-1.5 text-[#A69F92] hover:text-[#2D2926] rounded-sm">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-sans uppercase tracking-widest text-[#8C867A] mb-1">
                辞藻名称 *
              </label>
              <input
                type="text"
                required
                value={word}
                onChange={(e) => setWord(e.target.value)}
                placeholder="如：苍润、虚静、气韵"
                className="w-full p-2.5 bg-white dark:bg-stone-800 border border-[#E5E1D8] dark:border-stone-700 rounded-sm text-[#2D2926] dark:text-stone-100 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-sans uppercase tracking-widest text-[#8C867A] mb-1">
                拼音
              </label>
              <input
                type="text"
                value={pinyin}
                onChange={(e) => setPinyin(e.target.value)}
                placeholder="如：cāng rùn"
                className="w-full p-2.5 bg-white dark:bg-stone-800 border border-[#E5E1D8] dark:border-stone-700 rounded-sm text-[#2D2926] dark:text-stone-100 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-sans uppercase tracking-widest text-[#8C867A] mb-1">
              所属艺术门类
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as CategoryId)}
              className="w-full p-2.5 bg-white dark:bg-stone-800 border border-[#E5E1D8] dark:border-stone-700 rounded-sm text-[#2D2926] dark:text-stone-100 focus:outline-none"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-sans uppercase tracking-widest text-[#8C867A] mb-1">
              美学维度 (多选)
            </label>
            <div className="flex flex-wrap gap-1.5">
              {DIMENSIONS.map((dim) => {
                const isSelected = selectedDimensions.includes(dim.id);
                return (
                  <button
                    type="button"
                    key={dim.id}
                    onClick={() => toggleDimension(dim.id)}
                    className={`px-2.5 py-1 rounded-sm text-[10px] font-sans uppercase tracking-widest border transition ${
                      isSelected
                        ? 'bg-[#2D2926] text-[#FAF9F6] border-[#2D2926]'
                        : 'bg-white text-[#59544E] border-[#E5E1D8]'
                    }`}
                  >
                    {dim.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-sans uppercase tracking-widest text-[#8C867A] mb-1">
              精炼定语/简释 (8-15字) *
            </label>
            <input
              type="text"
              required
              value={pithyDefinition}
              onChange={(e) => setPithyDefinition(e.target.value)}
              placeholder="如：干枯中蕴温润，苍茫而带血脉"
              className="w-full p-2.5 bg-white dark:bg-stone-800 border border-[#E5E1D8] dark:border-stone-700 rounded-sm text-[#2D2926] dark:text-stone-100 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] font-sans uppercase tracking-widest text-[#8C867A] mb-1">
              深度意释与学术厚度
            </label>
            <textarea
              rows={3}
              value={deepInterpretation}
              onChange={(e) => setDeepInterpretation(e.target.value)}
              placeholder="详细阐述词汇的美学内涵、审美心理与视觉/触觉表达..."
              className="w-full p-2.5 bg-white dark:bg-stone-800 border border-[#E5E1D8] dark:border-stone-700 rounded-sm text-[#2D2926] dark:text-stone-100 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] font-sans uppercase tracking-widest text-[#8C867A] mb-1">
              典籍出处或流派渊源
            </label>
            <input
              type="text"
              value={classicOrigin}
              onChange={(e) => setClassicOrigin(e.target.value)}
              placeholder="如：宋·郭熙《林泉高致》/《二十四诗品》"
              className="w-full p-2.5 bg-white dark:bg-stone-800 border border-[#E5E1D8] dark:border-stone-700 rounded-sm text-[#2D2926] dark:text-stone-100 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] font-sans uppercase tracking-widest text-[#8C867A] mb-1">
              鉴赏应用例句
            </label>
            <textarea
              rows={2}
              value={exampleSentence}
              onChange={(e) => setExampleSentence(e.target.value)}
              placeholder="用于评论具体作品的标准例句..."
              className="w-full p-2.5 bg-white dark:bg-stone-800 border border-[#E5E1D8] dark:border-stone-700 rounded-sm text-[#2D2926] dark:text-stone-100 focus:outline-none"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-sm bg-[#F2EFE9] text-[#59544E] font-sans uppercase tracking-widest"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-sm bg-[#2D2926] text-[#FAF9F6] font-sans uppercase tracking-widest border border-[#2D2926] hover:bg-[#C5A059] hover:text-[#2D2926] transition"
            >
              保存词汇
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

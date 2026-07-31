import React from 'react';
import { AestheticDimensionId, DimensionInfo, SensoryChannel } from '../types';
import { Sparkles, Eye, Volume2, Hand, Wind, Clock, Compass, Thermometer } from 'lucide-react';

interface DimensionFilterProps {
  dimensions: DimensionInfo[];
  selectedDimension: AestheticDimensionId | 'all';
  onSelectDimension: (dim: AestheticDimensionId | 'all') => void;
  selectedSensoryChannel: SensoryChannel | 'all';
  onSelectSensoryChannel: (channel: SensoryChannel | 'all') => void;
  dimensionCounts: Record<string, number>;
}

const SENSORY_CHANNELS: { id: SensoryChannel; name: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'visual', name: '视觉意象', icon: Eye },
  { id: 'auditory', name: '听觉声景', icon: Volume2 },
  { id: 'tactile', name: '触觉肌理', icon: Hand },
  { id: 'olfactory', name: '嗅觉空间', icon: Wind },
  { id: 'thermal', name: '温度温度', icon: Thermometer },
  { id: 'spatial', name: '空间场域', icon: Compass },
  { id: 'temporal', name: '时间延宕', icon: Clock },
];

export const DimensionFilter: React.FC<DimensionFilterProps> = ({
  dimensions,
  selectedDimension,
  onSelectDimension,
  selectedSensoryChannel,
  onSelectSensoryChannel,
  dimensionCounts,
}) => {
  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-[#F2EFE9] dark:bg-stone-900 border border-[#E5E1D8] dark:border-stone-800 rounded-sm p-6 sm:p-8 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block px-2.5 py-0.5 border border-[#C5A059] text-[#C5A059] text-[10px] tracking-widest uppercase font-sans font-medium mb-3">
            美学维度 / Aesthetic Dimensions
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-light text-[#2D2926] dark:text-stone-100 tracking-tight mb-2">
            美学哲学维度与感官通感矩阵
          </h2>
          <p className="text-[#59544E] dark:text-stone-300 text-xs sm:text-sm leading-relaxed font-serif italic">
            打破单一视角的藩篱，从《二十四诗品》古典意境、现象学身体知觉、跨感官折射与时空张力中挖掘具有深度鉴赏价值的辞藻。
          </p>
        </div>
      </div>

      {/* Aesthetic Dimensions Cards */}
      <div>
        <h3 className="text-[10px] font-sans font-bold text-[#A69F92] dark:text-stone-400 uppercase tracking-[0.2em] mb-3">
          核心美学维度 / Aesthetic Dimensions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <button
            onClick={() => onSelectDimension('all')}
            className={`p-4 rounded-sm border text-left transition ${
              selectedDimension === 'all'
                ? 'bg-[#2D2926] text-[#FAF9F6] border-[#2D2926]'
                : 'bg-white dark:bg-stone-900 border-[#E5E1D8] dark:border-stone-800 hover:border-[#2D2926]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`font-serif font-light text-sm ${selectedDimension === 'all' ? 'text-[#FAF9F6]' : 'text-[#2D2926] dark:text-stone-100'}`}>
                全部维度
              </span>
              <span className={`text-[10px] font-sans px-2 py-0.5 border ${selectedDimension === 'all' ? 'border-[#C5A059] text-[#C5A059]' : 'border-[#E5E1D8] text-[#8C867A]'}`}>
                包含所有
              </span>
            </div>
            <p className={`text-xs font-serif italic ${selectedDimension === 'all' ? 'text-[#E5E1D8]' : 'text-[#8C867A]'}`}>
              不限美学维度，展示多元交叉词汇
            </p>
          </button>

          {dimensions.map((dim) => {
            const isSelected = selectedDimension === dim.id;
            const count = dimensionCounts[dim.id] || 0;

            return (
              <button
                key={dim.id}
                onClick={() => onSelectDimension(dim.id)}
                className={`p-4 rounded-sm border text-left transition flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#2D2926] text-[#FAF9F6] border-[#2D2926]'
                    : 'bg-white dark:bg-stone-900 border-[#E5E1D8] dark:border-stone-800 hover:border-[#2D2926]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] px-2 py-0.5 border border-[#C5A059]/40 text-[#C5A059] font-sans uppercase tracking-widest font-medium">
                      {dim.name}
                    </span>
                    <span className={`text-[10px] font-sans ${isSelected ? 'text-[#C5A059]' : 'text-[#8C867A]'}`}>{count} 词</span>
                  </div>
                  <h4 className={`font-serif font-light text-sm mb-1 ${isSelected ? 'text-[#FAF9F6]' : 'text-[#2D2926] dark:text-stone-100'}`}>
                    {dim.subtitle}
                  </h4>
                  <p className={`text-xs font-serif italic line-clamp-2 leading-relaxed ${isSelected ? 'text-[#E5E1D8]' : 'text-[#8C867A]'}`}>
                    {dim.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sensory Channels Filter Chips */}
      <div className="pt-2">
        <h3 className="text-[10px] font-sans font-bold text-[#A69F92] dark:text-stone-400 uppercase tracking-[0.2em] mb-3">
          感官通感通道 / Sensory Channels
        </h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onSelectSensoryChannel('all')}
            className={`px-3 py-1.5 rounded-sm text-xs font-sans uppercase tracking-wider transition ${
              selectedSensoryChannel === 'all'
                ? 'bg-[#2D2926] text-[#FAF9F6] border border-[#2D2926]'
                : 'bg-white dark:bg-stone-800 text-[#59544E] border border-[#E5E1D8] dark:border-stone-700 hover:border-[#2D2926]'
            }`}
          >
            全部感官通道
          </button>

          {SENSORY_CHANNELS.map((ch) => {
            const Icon = ch.icon;
            const isSelected = selectedSensoryChannel === ch.id;

            return (
              <button
                key={ch.id}
                onClick={() => onSelectSensoryChannel(ch.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-sans uppercase tracking-wider transition border ${
                  isSelected
                    ? 'bg-[#2D2926] text-[#C5A059] border-[#2D2926] font-medium'
                    : 'bg-white dark:bg-stone-800 text-[#59544E] border-[#E5E1D8] dark:border-stone-700 hover:border-[#2D2926]'
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>{ch.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

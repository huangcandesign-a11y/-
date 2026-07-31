export type SensoryChannel = 'visual' | 'auditory' | 'tactile' | 'olfactory' | 'thermal' | 'spatial' | 'temporal';

export type CategoryId =
  | 'painting_calligraphy'
  | 'architecture_gardens'
  | 'literature_poetry'
  | 'music_soundscapes'
  | 'sculpture_crafts'
  | 'cinema_photography'
  | 'contemporary_art'
  | 'nature_micro';

export type AestheticDimensionId =
  | 'synesthesia'          // 感官通感
  | 'spatial_temporal'     // 时空张力
  | 'poetic_realm'         // 意境与哲学境界
  | 'texture_color'        // 质感与色彩通感
  | 'academic_theory';     // 学术批评与理论厚度

export interface AestheticTerm {
  id: string;
  word: string;
  pinyin: string;
  category: CategoryId;
  dimensions: AestheticDimensionId[];
  sensoryChannels: SensoryChannel[];
  pithyDefinition: string;       // 简炼定语 (8-15字)
  deepInterpretation: string;    // 深度意释与学术厚度
  classicOrigin: string;          // 典籍出处/美学流派
  sensoryExperience: string;      // 感官通感描写 (视觉/听觉/触觉的跨界折射)
  critiqueExamples: string[];     // 鉴赏应用例句
  relatedTerms: string[];         // 关联辞藻
  tags: string[];
  isFavorite?: boolean;
}

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  description: string;
  iconName: string;
  color: string;
}

export interface DimensionInfo {
  id: AestheticDimensionId;
  name: string;
  subtitle: string;
  description: string;
  badgeColor: string;
}

export interface ArtSample {
  id: string;
  title: string;
  artist: string;
  era: string;
  imageUrl: string;
  category: CategoryId;
  description: string;
  suggestedTerms: string[];
}

export interface SavedCollection {
  id: string;
  name: string;
  createdAt: number;
  termIds: string[];
  notes?: string;
}

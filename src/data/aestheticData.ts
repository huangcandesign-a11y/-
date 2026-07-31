import { AestheticTerm, CategoryInfo, DimensionInfo, ArtSample } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'painting_calligraphy',
    name: '绘画与书法美学',
    description: '水墨皴法、笔墨气韵、金石线条与彩墨流溢的形神之境',
    iconName: 'Brush',
    color: 'from-amber-900/20 to-stone-800/30 text-amber-700 dark:text-amber-300'
  },
  {
    id: 'architecture_gardens',
    name: '建筑与空间造园',
    description: '亭台楼阁、借景框景、光影廊檐与建筑质感的空间诗学',
    iconName: 'Building2',
    color: 'from-emerald-900/20 to-teal-800/30 text-emerald-700 dark:text-emerald-300'
  },
  {
    id: 'literature_poetry',
    name: '诗词与古典文学',
    description: '二十四诗品、词境比兴、意象沉郁与言外之旨的文字通感',
    iconName: 'BookOpen',
    color: 'from-purple-900/20 to-indigo-800/30 text-purple-700 dark:text-purple-300'
  },
  {
    id: 'music_soundscapes',
    name: '音乐与听觉声景',
    description: '余音绕梁、余白停顿、环境声景与音色温度的耳畔意境',
    iconName: 'Music',
    color: 'from-cyan-900/20 to-blue-800/30 text-cyan-700 dark:text-cyan-300'
  },
  {
    id: 'sculpture_crafts',
    name: '雕塑与物性造物',
    description: '宋瓷冰裂、青铜金石、三维张力与材料物性的触觉沉淀',
    iconName: 'Sparkles',
    color: 'from-orange-900/20 to-amber-800/30 text-orange-700 dark:text-orange-300'
  },
  {
    id: 'cinema_photography',
    name: '影视与光影镜头',
    description: '明暗对照法、胶片颗粒、景深视错觉与长镜头的流动韵律',
    iconName: 'Film',
    color: 'from-rose-900/20 to-pink-800/30 text-rose-700 dark:text-rose-300'
  },
  {
    id: 'contemporary_art',
    name: '现代艺术与装置',
    description: '极简场域、沉浸介质、概念张力与现象学身体感知',
    iconName: 'Layers',
    color: 'from-slate-900/20 to-zinc-800/30 text-slate-700 dark:text-slate-300'
  },
  {
    id: 'nature_micro',
    name: '自然微观与气象',
    description: '晨露苔痕、暮霭雾气、时令物候与天地大美的感官细化',
    iconName: 'Wind',
    color: 'from-lime-900/20 to-green-800/30 text-lime-700 dark:text-lime-300'
  }
];

export const DIMENSIONS: DimensionInfo[] = [
  {
    id: 'synesthesia',
    name: '感官通感',
    subtitle: 'Cross-Modal Perception',
    description: '打破视、听、触、嗅、味觉界限，色彩具音律感，线条带温度感，空间有触感。',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800/50'
  },
  {
    id: 'spatial_temporal',
    name: '时空张力',
    subtitle: 'Spatial-Temporal Tension',
    description: '探讨虚实相生、刹那与永恒、留白延伸、延宕与停顿的空间哲学。',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800/50'
  },
  {
    id: 'poetic_realm',
    name: '意境与哲学境界',
    subtitle: 'Aesthetic Atmosphere & Realm',
    description: '涵盖《二十四诗品》雄浑、冲淡、纤秾、沉著、高古、洗炼等古典审美最高格调。',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800/50'
  },
  {
    id: 'texture_color',
    name: '质感与色彩通感',
    subtitle: 'Texture & Color Moods',
    description: '描摹物性肌理（苍润、流溢、凝冻、微茫、沉沉）与微观色彩流转。',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800/50'
  },
  {
    id: 'academic_theory',
    name: '学术批评与理论厚度',
    subtitle: 'Critical Theory & Discourse',
    description: '融合东西方艺术史论（现象学知觉、灵光 Aura、间离、物性 Objecthood）。',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800/50'
  }
];

export const INITIAL_TERMS: AestheticTerm[] = [
  {
    id: 'cang-run',
    word: '苍润',
    pinyin: 'cāng rùn',
    category: 'painting_calligraphy',
    dimensions: ['texture_color', 'poetic_realm', 'synesthesia'],
    sensoryChannels: ['visual', 'tactile', 'thermal'],
    pithyDefinition: '干枯中蕴温润，苍茫而带血脉',
    deepInterpretation: '古典山水画笔墨最高追求之一。笔触墨色虽呈干涩苍老之骨骼，却蕴含充沛湿润之水分与生命精气，形成苍劲与滋润对立统一的张力。',
    classicOrigin: '宋·郭熙《林泉高致》：“笔墨积劫，苍润浑厚”；黄宾虹“苍郁润泽”理论。',
    sensoryExperience: '视觉上是老树枯藤般的干裂质感，触觉上却仿佛能挤出晨露与高山苔藓的温润湿意。',
    critiqueExamples: [
      '此幅山水墨法极尽苍润之致，干笔皴擦出高岩之沧桑，湿墨晕染又吐露山谷之吐纳润气。',
      '艺术家以极干的提笔在粗糙宣纸上拉出苍润的线条，如同苍老肌肤下流动着炽热血脉。'
    ],
    relatedTerms: ['浑厚华滋', '干裂秋风', '润含春雨', '焦墨融晕'],
    tags: ['宋画笔墨', '干湿张力', '山水气韵', '触觉质感']
  },
  {
    id: 'kong-ling',
    word: '空灵',
    pinyin: 'kōng líng',
    category: 'literature_poetry',
    dimensions: ['poetic_realm', 'spatial_temporal', 'synesthesia'],
    sensoryChannels: ['spatial', 'auditory', 'visual'],
    pithyDefinition: '质实中透灵光，充盈而无滞碍',
    deepInterpretation: '意境不粘不滞、超脱尘垢的清澈境界。物质或画面具有极高的呼吸感与透光度，使观者的精神得以在虚空与灵光中自由流转。',
    classicOrigin: '宗白华《美学散步》：“空灵是心灵的自由挥洒，无着无落，却无处不在。”',
    sensoryExperience: '仿佛清晨山谷间一缕清风穿透薄雾，既有冷冽的气流感，又有空谷足音的深远回响。',
    critiqueExamples: [
      '展厅中央的半透明纱幕构筑出极佳的空灵场域，光影在其间悄然穿透，涤荡了空间的凝重。',
      '其古琴演奏并不执着于繁复指法，反而在音符间隙留出极具空灵感的寂静。'
    ],
    relatedTerms: ['虚静', '超以象外', '澄怀观道', '虚实相生'],
    tags: ['宗白华美学', '空间留白', '呼吸感', '禅意']
  },
  {
    id: 'ling-guang',
    word: '灵光 (Aura)',
    pinyin: 'líng guāng',
    category: 'contemporary_art',
    dimensions: ['academic_theory', 'spatial_temporal'],
    sensoryChannels: ['spatial', 'temporal', 'visual'],
    pithyDefinition: '原作独一无二的时空本真交织',
    deepInterpretation: '瓦尔特·本雅明美学核心概念。指艺术作品在特定时空存在所独有的本真性、神圣感与不可复制的韵味，在机械复制时代尤为珍贵。',
    classicOrigin: '瓦尔特·本雅明《机械复制时代的艺术作品》',
    sensoryExperience: '站立于数百年历史的油画原作前，呼吸着微暗展厅中沉淀的岁月尘埃，感受到一种不可言喻的庄严吸引力。',
    critiqueExamples: [
      '数字化屏幕虽能精准还原色彩，却无法摹复制品现场那股穿透时空的灵光 (Aura)。',
      '装置作品以手工打磨的原始矿物为介质，重新召回了被工业生产驱散的艺术灵光。'
    ],
    relatedTerms: ['本真性', '时空交织', '沉浸场域', '物性'],
    tags: ['本雅明', '美学理论', '原作本真', '现代艺术批评']
  },
  {
    id: 'chen-yu-dun-cuo',
    word: '沉郁顿挫',
    pinyin: 'chén yù dùn cuò',
    category: 'literature_poetry',
    dimensions: ['poetic_realm', 'synesthesia'],
    sensoryChannels: ['auditory', 'tactile', 'temporal'],
    pithyDefinition: '情感深沉凝重，音律转折有跌宕',
    deepInterpretation: '杜甫诗歌美学最高格调。沉郁指意境与情感深沉深厚、蓄势不发；顿挫指节奏韵律在关键处陡然转折，产生巨大的审美张力。',
    classicOrigin: '杜甫《进雕赋表》：“至于沉郁顿挫，随时敏捷。”',
    sensoryExperience: '如同提琴大提琴低音弦的沉重震颤，运行至跌宕处陡然回旋，余音在胸腔内激荡。',
    critiqueExamples: [
      '大提琴协奏曲在第三乐章展现出沉郁顿挫的史诗感，弓弦交错间尽是生命的悲怆与坚韧。',
      '这部纪录片的镜头语言沉郁顿挫，长镜头的凝视与突如其来的剪辑断层交织出深重的历史张力。'
    ],
    relatedTerms: ['沉著', '跌宕起伏', '沉沉', '雄浑'],
    tags: ['杜诗美学', '情感深度', '节奏张力', '古典诗学']
  },
  {
    id: 'fong-gu-shou-jin',
    word: '风骨瘦硬',
    pinyin: 'fēng gǔ shòu yìng',
    category: 'painting_calligraphy',
    dimensions: ['poetic_realm', 'texture_color'],
    sensoryChannels: ['tactile', 'visual'],
    pithyDefinition: '去尽脂粉肉腻，骨力挺拔如铁',
    deepInterpretation: '中国书法与文学鉴赏中对结构严谨、骨力刚劲风格的赞誉。剔除一切浮夸雕饰与丰肉，独留挺拔遒劲的精神框架。',
    classicOrigin: '唐·张怀瓘《书断》论欧阳询书法；刘勰《文心雕龙·风骨》。',
    sensoryExperience: '视觉如青冬寒林之枯枝折钗，触觉如冷铁淬火后棱角分明的坚硬与力度。',
    critiqueExamples: [
      '其瘦金体笔法风骨瘦硬，横如鹤骨挺立，捺如兰叶削成，毫无一丝滞肉。',
      '建筑师放弃了圆润的曲线装饰，以风骨瘦硬的钢构线条构筑出极具力量感的空间骨骼。'
    ],
    relatedTerms: ['骨法用笔', '金石气', '劲健', '削繁就简'],
    tags: ['书法骨力', '线条美学', '硬朗格调', '金石学']
  },
  {
    id: 'yu-yi-liu-tou',
    word: '浮光流溢',
    pinyin: 'fú guāng liú yì',
    category: 'cinema_photography',
    dimensions: ['synesthesia', 'texture_color'],
    sensoryChannels: ['visual', 'auditory', 'thermal'],
    pithyDefinition: '光影如液体流淌，微芒变幻无定',
    deepInterpretation: '用于形容印象派油画、电影胶片或水面光影在动态中呈现的黏稠度与流动感。将无形的光线赋予了液体般流溢漫延的质感。',
    classicOrigin: '西方印象主义色彩学与现代摄影光影论述。',
    sensoryExperience: '金黄色的夕阳穿过波浪，光斑仿佛黏稠的蜜糖或融化的金属，在视网膜上缓缓淌过。',
    critiqueExamples: [
      '镜头缓慢推过湿漉漉的夜间街头，霓虹倒影在雨水中浮光流溢，营造出王家卫式的梦幻通感。',
      '这件彩色玻璃装置在日光倾泻时展现出浮光流溢的奇观，色彩如流体般浸润了整个墙面。'
    ],
    relatedTerms: ['波光粼粼', '色彩溢流', '印象流光', '绚烂之极'],
    tags: ['印象派', '电影光影', '动态通感', '色彩质感']
  },
  {
    id: 'jie-jing-kuang-jing',
    word: '借景框景',
    pinyin: 'jiè jǐng kuàng jǐng',
    category: 'architecture_gardens',
    dimensions: ['spatial_temporal', 'poetic_realm'],
    sensoryChannels: ['spatial', 'visual'],
    pithyDefinition: '纳远山近水于一窗，变无限为有限',
    deepInterpretation: '苏州园林与造园美学核心手法。通过窗棂、门洞或建筑缺口，将外部自然景观（远山、飞鸟、四季变化）引入室内，构成活态画框。',
    classicOrigin: '明·计成《园冶》：“园林巧于因借，精在体宜。”',
    sensoryExperience: '坐在幽暗的室内，视线穿过六角花窗，外面一株修竹与半面白墙瞬间凝聚成一幅随风动荡的活水墨画。',
    critiqueExamples: [
      '展馆设计巧用借景框景之法，将远处的雪山巧妙框入展厅尽头的落地玻璃，使建筑与自然融为一体。',
      '这部电影的画面构图多用门框与窗隙进行框景，暗示了角色受限的命运与被凝视的心理。'
    ],
    relatedTerms: ['因借体宜', '移步换景', '纳景入室', '空间屏障'],
    tags: ['园林诗学', '苏州园林', '构图美学', '空间框限']
  },
  {
    id: 'wu-xing-objecthood',
    word: '物性 (Objecthood)',
    pinyin: 'wù xìng',
    category: 'sculpture_crafts',
    dimensions: ['academic_theory', 'texture_color'],
    sensoryChannels: ['tactile', 'visual', 'spatial'],
    pithyDefinition: '材料本身的物理存在与本体张力',
    deepInterpretation: '极简主义与当代雕塑理论核心术语（迈克尔·弗雷德等提出）。强调艺术品不再是某种幻象的载体，而是材料（生铁、原木、生混凝土）本身的物理重力、触觉质感与空间占据。',
    classicOrigin: '迈克尔·弗雷德《艺术与物性》(Art and Objecthood)',
    sensoryExperience: '触摸一块未经雕琢的粗糙花岗岩，手掌传来的冰冷、沉重与纹理割裂感，直接诉说着物质本身的真实存在。',
    critiqueExamples: [
      '雕塑家保留了铸铁表面的氧化锈斑与锤打痕迹，强有力地彰显了材料自身的物性 (Objecthood)。',
      '这件陶艺作品未加饰釉，以柴烧火痕展现了泥土与火焰碰撞后最原始的物性美感。'
    ],
    relatedTerms: ['材料本体', '极简场域', '触觉沉淀', '重力感'],
    tags: ['当代雕塑', '极简主义', '材料美学', '迈克尔·弗雷德']
  },
  {
    id: 'bing-lie-kai-pian',
    word: '冰裂开片',
    pinyin: 'bīng liè kāi piān',
    category: 'sculpture_crafts',
    dimensions: ['texture_color', 'poetic_realm', 'synesthesia'],
    sensoryChannels: ['visual', 'auditory', 'tactile'],
    pithyDefinition: '无规则纹理之美，淬火爆裂的留痕',
    deepInterpretation: '宋代哥窑、汝窑青瓷绝顶工艺美学。釉面因膨胀系数差异，在出窑降温时天然炸裂出如冰块碎裂、金丝铁线的网状纹理，将物理缺陷转化为天工美学。',
    classicOrigin: '宋代官窑/哥窑陶瓷史论与《遵生八笺》。',
    sensoryExperience: '视觉上是错落有致的网状冰纹，听觉上仿佛能听到千年前瓷器出窑瞬间那一声清脆如银铃的冰裂轻响。',
    critiqueExamples: [
      '汝窑洗表面布满细碎的冰裂开片，釉色如雨过天青，纹理若冬日湖面初融。',
      '服装设计师将冰裂开片的纹样印制于真丝面料上，使平滑的质地产生了错落有致的视觉肌理。'
    ],
    relatedTerms: ['金丝铁线', '雨过天青', '残缺之美', '天工巧成'],
    tags: ['宋瓷美学', '哥窑汝窑', '碎裂肌理', '偶然性美学']
  },
  {
    id: 'chong-dan',
    word: '冲淡',
    pinyin: 'chōng dàn',
    category: 'literature_poetry',
    dimensions: ['poetic_realm', 'spatial_temporal'],
    sensoryChannels: ['thermal', 'tactile', 'visual'],
    pithyDefinition: '平淡天真，去尽浓艳，独存真淳',
    deepInterpretation: '《二十四诗品》第二品。不事雕琢、平淡自然、平和疏淡的审美格调。绝非平庸贫乏，而是经历了繁华落尽后的返璞归真。',
    classicOrigin: '唐·司空图《二十四诗品·冲淡》：“素处以默，妙机其微。饮之太和，独鹤与飞。”',
    sensoryExperience: '如饮一杯甘冽的深山泉水，初尝无味，细品却有淡泊悠远的甘甜绵延于齿颊间。',
    critiqueExamples: [
      '陶渊明的田园诗风极尽冲淡之致，采菊东篱之下，淡然离言，却具深永旨趣。',
      '画家仅用洗炼的几笔淡墨勾勒山影，全画气息冲淡平和，绝无浮躁争锋之意。'
    ],
    relatedTerms: ['平淡天真', '高古', '典雅', '返璞归真'],
    tags: ['二十四诗品', '司空图', '淡泊格调', '禅宗审美']
  },
  {
    id: 'an-xiang-shen-suo',
    word: '暗香深锁',
    pinyin: 'àn xiāng shēn suǒ',
    category: 'nature_micro',
    dimensions: ['synesthesia', 'poetic_realm'],
    sensoryChannels: ['olfactory', 'spatial', 'thermal'],
    pithyDefinition: '幽香幽隐于庭院，触不可及却萦绕',
    deepInterpretation: '古典诗词中对嗅觉与空间深度融合的妙描。香气并非泼辣袭人，而是隐藏于深闺、夜气或古木幽院之中，需要静心方能捕捉。',
    classicOrigin: '宋·林逋《山园小梅》“暗香浮动月黄昏”；清·纳兰性德词。',
    sensoryExperience: '寒夜微风中，鼻翼间忽然捕捉到一缕冷梅香，欲循香找寻，香味却又消隐于幽暗的庭院廊檐之下。',
    critiqueExamples: [
      '展厅特意微喷了古木与檀香精油，暗香深锁的氛围让观众在步入的瞬间不自觉地放慢了呼吸。',
      '其散文文字极具嗅觉暗示，老旧书房的纸墨香气如暗香深锁，贯穿全篇回忆。'
    ],
    relatedTerms: ['暗香浮动', '幽香冷冽', '嗅觉空间', '气味记忆'],
    tags: ['嗅觉通感', '空间氛围', '宋词意境', '感官细化']
  },
  {
    id: 'lan-in-han-jing',
    word: '余音绕梁',
    pinyin: 'yú yīn rào liáng',
    category: 'music_soundscapes',
    dimensions: ['synesthesia', 'spatial_temporal'],
    sensoryChannels: ['auditory', 'spatial', 'temporal'],
    pithyDefinition: '声音止息后，波动仍在空间延宕',
    deepInterpretation: '对听觉艺术空间与时间延延属性的终极赞颂。声音超越了演奏的物理时刻，在建筑结构与聆听者记忆中持续盘旋。',
    classicOrigin: '《列子·汤问》：“韩娥东之齐，匮粮，过雍门，鬻歌假食，既去，而响遏行云，余音绕梁，三日不绝。”',
    sensoryExperience: '大钟撞击后，钟声虽渐趋沉寂，但空气中高频的震动波纹仿佛仍在古寺梁柱间回荡盘旋。',
    critiqueExamples: [
      '音乐厅精妙的声学墙面设计，使得独奏者最后一声琴音消逝后，余音绕梁的空灵颤动仍在观众耳畔回响数秒。',
      '整场演出虽已谢幕，但其震撼的交响终章如余音绕梁，久久盘桓于人心。'
    ],
    relatedTerms: ['余音袅袅', '空谷足音', '声景延宕', '听觉留白'],
    tags: ['声音艺术', '声学空间', '听觉记忆', '古典成语']
  },
  {
    id: 'ku-dian-jiao-mo',
    word: '枯藤焦墨',
    pinyin: 'kū téng jiāo mò',
    category: 'painting_calligraphy',
    dimensions: ['texture_color', 'poetic_realm'],
    sensoryChannels: ['visual', 'tactile'],
    pithyDefinition: '浓黑如炭，刚劲若拧绞老藤',
    deepInterpretation: '书法与国画中极浓、极干之墨法的运用。焦墨不掺水份，依靠毛笔强有力的搓揉与疾迟，在纸上留下颗粒感极强的黑白对抗。',
    classicOrigin: '清·程邃焦墨山水；黄宾虹“五笔七墨”说之“焦墨”。',
    sensoryExperience: '视觉上是黑如漆、干如焦炭的强劲块面，触觉上如同抚摸老树皮上爆裂拧绞的疤痕。',
    critiqueExamples: [
      '画家以枯藤焦墨勾勒狂石，黑白对比斩钉截铁，透露出强烈的金石崩裂之气。',
      '这幅版画采用了高饱和黑墨与粗糙木刻纹理，枯藤焦墨般的质感充满了原始爆发力。'
    ],
    relatedTerms: ['金石气', '漆黑如焦', '飞白连绵', '强张力'],
    tags: ['焦墨山水', '黄宾虹', '黑白对抗', '木刻质感']
  },
  {
    id: 'ji-jian-chang-yu',
    word: '极简场域',
    pinyin: 'jí jiǎn chǎng yù',
    category: 'contemporary_art',
    dimensions: ['spatial_temporal', 'academic_theory'],
    sensoryChannels: ['spatial', 'visual', 'auditory'],
    pithyDefinition: '剥离冗余，独留空间与身体对话',
    deepInterpretation: '当代建筑与装置艺术场域理论。通过极致削减视觉杂讯与多余实体，使空间本身转化为清澈的能动介质，迫使观者关注自身的身体知觉。',
    classicOrigin: '唐纳德·贾德 (Donald Judd) 与安藤忠雄建筑空间理论。',
    sensoryExperience: '站在一座全白且没有任何饰物的巨大高耸展厅中，甚至能清晰听见自己的心跳与脚步在平滑地砖上的反弹。',
    critiqueExamples: [
      '美术馆新建的地下展厅创造了一个绝佳的极简场域，光线从天天井唯一缝隙斜洒，静谧得近乎神圣。',
      '艺术家拒绝了繁复的舞台布景，仅凭单束冷光与纯黑背景构筑出极简场域，将戏剧冲突推向极致。'
    ],
    relatedTerms: ['身体知觉', '现象学', '留白', '呼吸感'],
    tags: ['极简主义', '安藤忠雄', '空间理论', '场域艺术']
  },
  {
    id: 'shen-chen-se-diao',
    word: '黯淡深沉',
    pinyin: 'àn dàn shēn chén',
    category: 'cinema_photography',
    dimensions: ['texture_color', 'synesthesia'],
    sensoryChannels: ['visual', 'thermal', 'temporal'],
    pithyDefinition: '低饱和度暗色调，沉静如夜色包裹',
    deepInterpretation: '低调（Low-key）光影美学。不靠鲜艳色块吸睛，而是靠深黑、灰蓝、暗褐等深沉色彩层次，营造出神秘、内省且具有历史沧桑感的厚重氛围。',
    classicOrigin: '伦勃朗明暗对照法（Chiaroscuro）与卡拉瓦乔画风。',
    sensoryExperience: '视角如同沉入深海底部的视线，四周被浓重的暗影裹挟，唯有一丝微弱冷光勾勒出轮廓。',
    critiqueExamples: [
      '这部历史史诗电影全片采用黯淡深沉的影调，将中世纪的残酷与荒凉刻画得入木三分。',
      '展厅灯光调至极低，暗沉深色的背景墙让被照亮的光学玻璃展品宛如夜空中的星云。'
    ],
    relatedTerms: ['明暗对照', '沉暗', '低调光影', '夜色幽光'],
    tags: ['伦勃朗', 'LowKey影调', '黑色电影', '古典光影']
  },
  {
    id: 'wen-run-ru-yu',
    word: '温润如玉',
    pinyin: 'wēn rùn rú yù',
    category: 'sculpture_crafts',
    dimensions: ['texture_color', 'poetic_realm', 'synesthesia'],
    sensoryChannels: ['tactile', 'thermal', 'visual'],
    pithyDefinition: '不耀眼夺目，却含蓄内敛带体温',
    deepInterpretation: '东亚品质美的至高比喻。玉石不似钻石般刺眼张扬，而是将光芒内收于半透明的晶体之中，触感温和、体感柔润，象征君子德行。',
    classicOrigin: '《礼记·聘义》：“昔者君子比德于玉焉，温润而泽，仁也。”',
    sensoryExperience: '将一块和田羊脂玉握于掌心，没有金属的刺骨冰凉，而是如同抚摸带着人体微温的丝缎。',
    critiqueExamples: [
      '这件白瓷雕像釉质温润如玉，光线在其微弧的面庞上散开，泛着柔和如月色般的光晕。',
      '建筑师选用磨砂大理石作为内墙材质，打造出温润如玉的室内质感，抚慰了都市人的躁动。'
    ],
    relatedTerms: ['羊脂凝膏', '内敛光泽', '君子风度', '含蓄'],
    tags: ['玉石美学', '君子品格', '触觉温润', '古典美德']
  }
];

export const ART_SAMPLES: ArtSample[] = [
  {
    id: 'qian-li-jiang-shan',
    title: '《千里江山图》',
    artist: '王希孟（北宋）',
    era: '宋代',
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1000&auto=format&fit=crop',
    category: 'painting_calligraphy',
    description: '青绿山水巅峰巨制，石青石绿矿物颜料富丽重彩，山势连绵，水波浩渺，具苍润与辉煌之气。',
    suggestedTerms: ['苍润', '浮光流溢', '意境深远', '青绿重彩', '虚实相生']
  },
  {
    id: 'song-porcelain-ru',
    title: '北宋汝窑天青釉葵花洗',
    artist: '无名御工',
    era: '北宋',
    imageUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=1000&auto=format&fit=crop',
    category: 'sculpture_crafts',
    description: '雨过天青云破处，玛瑙入釉，釉面开片如冰裂纹，温润如玉而带金属沉凝质感。',
    suggestedTerms: ['冰裂开片', '温润如玉', '冲淡', '雨过天青', '物性 (Objecthood)']
  },
  {
    id: 'su-zhou-garden',
    title: '拙政园·倚虹亭与花窗框景',
    artist: '造园名家',
    era: '明代/清代',
    imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1000&auto=format&fit=crop',
    category: 'architecture_gardens',
    description: '江南园林之冠，以水为中心，山水萦绕，花木萦带，巧妙运用框景与借景，纳天地美景于寸尺之间。',
    suggestedTerms: ['借景框景', '空灵', '移步换景', '暗香深锁', '虚实相生']
  },
  {
    id: 'monet-impression',
    title: '《日出·印象》',
    artist: '克劳德·莫奈',
    era: '1872年',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1000&auto=format&fit=crop',
    category: 'cinema_photography',
    description: '印象派开山之作，橙红日光穿透晨雾与蓝色港口水面，展现了光影与空气流转的感官通感。',
    suggestedTerms: ['浮光流溢', '感官通感', '微茫', '印象流光', '色彩溢流']
  }
];

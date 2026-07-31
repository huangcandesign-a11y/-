import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "15mb" }));

  // Lazy-initialized Gemini AI client
  const getAi = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is missing from environment variables.");
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  };

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  // AI Aesthetic Artwork & Vocabulary Analysis Route
  app.post("/api/gemini/analyze-art", async (req, res) => {
    try {
      const { imageBase64, mimeType, description, category } = req.body;
      const ai = getAi();

      const promptText = `你是一位深谙东西方艺术史、感官美学与诗意通感的资深美学评论家与辞藻研究专家。
请对以下传入的艺术作品或艺术语境进行【深远意境、感官通感与学术厚度】的辞藻与赏析提取。

${description ? `【作品/语境描述】: ${description}` : ""}
${category ? `【艺术类别】: ${category}` : ""}

请以纯 JSON 格式返回，结构如下：
{
  "title": "作品/意境命名或核心美学主题",
  "summary": "一句话概括其美学格调与精神气象（20-40字）",
  "aestheticDimensions": ["美学维度标签1", "美学维度标签2", "美学维度标签3"],
  "synesthesiaBreakdown": [
    {
      "sense": "视觉与触觉的通感",
      "phrase": "提炼的通感辞藻或四字/八字短语",
      "explanation": "通感原理解释与审美心理"
    },
    {
      "sense": "听觉与光影的通感",
      "phrase": "通感辞藻",
      "explanation": "通感解释"
    }
  ],
  "richVocabulary": [
    {
      "word": "核心词汇（如：苍润、虚静、流溢、沉郁）",
      "pinyin": "拼音",
      "origin": "学术渊源/古籍出处或西方美学概念（如《二十四诗品》/现象学/物性论）",
      "meaning": "深度意释",
      "sensoryChannel": "触觉/视觉/听觉/时间觉",
      "example": "用于艺术赏析的标准应用例句"
    }
  ],
  "critiqueParagraph": "一段极富学术厚度与文采的精美艺术赏析短文（150-250字），融合上述词汇，适合展览册页、艺术评论或策展人语。"
}`;

      const contentsParts: any[] = [{ text: promptText }];

      if (imageBase64) {
        contentsParts.push({
          inlineData: {
            data: imageBase64.replace(/^data:image\/\w+;base64,/, ""),
            mimeType: mimeType || "image/jpeg",
          },
        });
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: { parts: contentsParts },
        config: {
          responseMimeType: "application/json",
          temperature: 0.7,
        },
      });

      const jsonText = response.text || "{}";
      res.json(JSON.parse(jsonText));
    } catch (error: any) {
      console.error("Error analyzing art:", error);
      res.status(500).json({ error: error.message || "分析失败，请检查 GEMINI_API_KEY 或输入内容" });
    }
  });

  // AI Rhetoric Studio / Composition Route
  app.post("/api/gemini/compose-critique", async (req, res) => {
    try {
      const { selectedWords, artDomain, tone, customTopic } = req.body;
      const ai = getAi();

      const promptText = `你是一位顶尖的美学赏析作家与策展评论员。
请利用以下收集选中的【美学辞藻/通感词汇】，为指定主题创作一段精湛的艺术鉴赏评论。

【选中的辞藻素材】：${selectedWords ? selectedWords.join("、") : "（无特定词汇，请自由发挥高阶美学词汇）"}
【艺术分类/领域】：${artDomain || "综合艺术"}
【写作基调与语境】：${tone || "学术深邃与通感诗意兼备"}
${customTopic ? `【主题/评论对象】：${customTopic}` : ""}

要求：
1. 自然融汇选中的辞藻，避免生硬堆砌，体现学术厚度与极佳感官通感（如将色彩转化为音符、将线条化为触感、将空间化为时间）。
2. 文风典雅深邃，句式沉郁而富有韵律。
3. 给出3个不同维度的创作成果：
   - A. 【策展前言/展览致辞】(150字左右)
   - B. 【学术评论精段】(200字左右，含理论延伸)
   - C. 【感官通感诗意短评】(80字左右，提炼意境)

请返回 JSON 格式：
{
  "curatorialIntro": "策展前言...",
  "academicCritique": "学术评论...",
  "sensoryPoeticText": "感官通感短评...",
  "highlightedWordsUsed": ["用到的关键词1", "关键词2"]
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: promptText,
        config: {
          responseMimeType: "application/json",
          temperature: 0.8,
        },
      });

      const jsonText = response.text || "{}";
      res.json(JSON.parse(jsonText));
    } catch (error: any) {
      console.error("Error composing critique:", error);
      res.status(500).json({ error: error.message || "生成评论失败" });
    }
  });

  // AI Term Expansion Route
  app.post("/api/gemini/expand-term", async (req, res) => {
    try {
      const { term } = req.body;
      const ai = getAi();

      const promptText = `请对美学鉴赏词汇“${term}”进行极具学术厚度与通感意境的深度剖析。

返回 JSON 格式：
{
  "term": "${term}",
  "pinyin": "拼音",
  "aestheticArchetype": "美学原型/哲学属性（如：宋代虚静观、现象学身体知觉、古典诗学雄浑品）",
  "etymologyAndSource": "辞源出处与文献渊源（如典籍记载或艺术史经典论述）",
  "synesthesiaChannels": {
    "visual": "视觉意象",
    "tactile": "触觉/质感",
    "auditory": "听觉/韵律",
    "spatialTemporal": "时空张力"
  },
  "classicSentenceExamples": [
    "艺术鉴赏标准例句 1",
    "艺术鉴赏标准例句 2"
  ],
  "relatedTerms": ["关联词汇1", "关联词汇2", "关联词汇3", "关联词汇4"]
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: promptText,
        config: {
          responseMimeType: "application/json",
        },
      });

      const jsonText = response.text || "{}";
      res.json(JSON.parse(jsonText));
    } catch (error: any) {
      console.error("Error expanding term:", error);
      res.status(500).json({ error: error.message || "解析词汇失败" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

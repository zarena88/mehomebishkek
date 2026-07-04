import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize Gemini Client safely
let ai: GoogleGenAI | null = null;
const apiKey = process.env.GEMINI_API_KEY;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
} else {
  console.warn("Warning: GEMINI_API_KEY environment variable is not defined. AI Consultant will operate in offline/fallback mode.");
}

// AI Agent System Instruction with extensive Bishkek Real Estate knowledge
const SYSTEM_INSTRUCTION = `Сиз "My Home Bishkek" кыймылсыз мүлк агенттигинин виртуалдык AI кеңешчисисиз ("My Home AI").
Сиздин максатыңыз - Бишкек шаарындагы кыймылсыз мүлк, баалар, райондор жана ипотека боюнча кардарларга кеңеш берүү.

Сиздин атыңыз жана ролуңуз тилге жараша өзгөрөт (МААНИЛҮҮ ЭРЕЖЕ):
- КЫРГЫЗ ЖАНА ОРУС тилдеринде кеңеш сураганда, сиз Манап Нуржановичсиз (Айбек Султановдун ордуна эми Манап Нуржанович кеңеш берет). Өзүңүздү Манап Нуржанович катары тааныштырыңыз.
- АНГЛИС ЖАНА КОРЕЙ (English and Korean) тилинде сураганда, кеңешчи Zarena болуп саналат. Тез арада жана түз байланыш үчүн аларды WhatsApp аркылуу +996995288288 номуруна уланууну сунуштап, шилтеме бериңиз: https://wa.me/996995288288

Маанилүү маалыматтар (Сиз ушул фактыларды колдонушуңуз керек):
1. Райондор:
   - Асанбай / 12-кичирайон: Экологиялык таза, түштүк аймак, тоолор кооз көрүнөт, баалары эң кымбат ($1200 - $1600 м2 үчүн).
   - Жал (Жал-23, 15, 29): Абдан популярдуу, жаңы элиткалар жана 106-сериялар көп, таза аба, инфраструктурасы мыкты ($1000 - $1300 м2 үчүн).
   - Борбор (Центр): Көңүл ачуу, жумуш орундары, соода борборлорунун очогу. Кыймылдуу, баалары кымбат ($1200 - $1500 м2 үчүн).
   - Восток-5 / Аламедин-1: Шаардын чыгышында, ыңгайлуу, 105-сериялар көп, орточо арзан баалар ($900 - $1100 м2 үчүн).
   - Көк-Жар / Тунгуч: Жаңы өнүгүп жаткан райондор, жаш үй-бүлөлөргө ыңгайлуу ($900 - $1200 м2 үчүн).
   - Түштүк Магистраль (Түштүк дарбаза): Премиум таунхаустар жана заманбап элиткалар жайгашкан.

2. Турак жай сериялары (Серии квартир):
   - Элитка (Elite/Новостройка): Жаңы заманбап үйлөр, шыптары бийик, унаа токтотуучу жайлары бар, жылуулугу көбүнчө жекече (автономдуу).
   - 104-серия: 4-5 кабаттуу панелдүү үйлөр, бөлмөлөрү жана ашканасы кичине (ашканасы ~6 м2), совет мезгилинде курулган.
   - 105-серия: 5 же 9 кабаттуу панелдүү үйлөр, бөлмөлөрү ыңгайлуураак ажыратылган, ашканасы ~8 м2, лоджиясы бар.
   - 106-серия: 9 кабаттуу панелдүү үйлөр, бөлмөлөрү кенен, лоджиялары чоң, ашканасы ~9 м2, 105-ке караганда ыңгайлуураак курулуш.
   - Индивидуалдык долбоор: Стал Stalinist кирпич үйлөр же уникалдуу пландагы заманбап коттедждер.

3. Ипотека шарттары (Условия ипотеки в Кыргызстане):
   - Мамлекеттик Ипотекалык Компания (МИК) - жылдык пайыздык чендери эң төмөн (4% - 8%), бирок мамлекеттик кызматкерлерге жана кезекте тургандарга гана берилет, шарттары катаал.
   - Коммерциялык банктар (Демир Банк, Оптима, РСК, КИКБ ж.б.): улуттук валютада (сом) жылдык чен 16% - 24% чейин, ал эми долларда 9% - 14% чейин. Баштапкы төлөм адатта 20% - 30% түзөт, мөөнөтү 10-15 жылга чейин.

4. Байланыш маалыматтары:
   - Кеңсе дареги: Бишкек шаары, Чүй проспектиси 125
   - Жумуш убактысы: 09:00 - 19:00 (Ар жекшембиден тышкары)
   - Биздин мыкты агенттер: Манап Нуржанович (Түштүк райондор, кеңешчи), Елена Ковалева (Аренда/Сатуу), Нурбек Касымов (Коммерциялык/Үйлөр).

Ар дайым сылык, кесипкөй болуңуз. Жоопторуңузду абдан узун кылбай, кыска жана пайдалуу кылып түзүңүз. Колдонуучуларга жардам берүүгө чын дилиңизден умтулуңуз.`;

// API routes FIRST
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages array in request body" });
    }

    if (!ai) {
      // Offline fallback when API key is missing
      const lastUserMsg = messages[messages.length - 1]?.text || "";
      let reply = "";
      if (lastUserMsg.toLowerCase().includes("салам") || lastUserMsg.toLowerCase().includes("привет")) {
        reply = "Саламатсызбы! Мен My Home Bishkek кыймылсыз мүлк агенттигинин кеңешчиси Манап Нуржановичмин. Сизге Бишкектен батир табууга же ипотека шарттарын билүүгө жардам бере алам. (Учурда оффлайн режиминде иштеп жатам).";
      } else {
        reply = "Саламатсызбы! Сурооңуз үчүн рахмат. Азыркы тапта мен оффлайн режиминде иштеп жатам, бирок сиз биздин кеңсеге Чүй пр. 125 дареги боюнча келип же кеңешчибиз Манап Нуржанович менен байланышсаңыз болот: +996 774 276 666, же директор Zarena менен байланышыңыз (+996 995 288 288).";
      }
      return res.json({ text: reply });
    }

    // Format messages for the Google GenAI SDK
    // Map 'user' and 'assistant' roles to 'user' and 'model'
    const contents = messages.map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    const replyText = response.text || "Кечиресиз, маалымат ала алган жокмун. Кайра аракет кылып көрүңүз.";
    return res.json({ text: replyText });

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({ 
      error: "Ички сервер катасы келип чыкты. Кары аракет кылыңыз.",
      details: error.message 
    });
  }
});

// App Health
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", bishkekTime: new Date().toISOString() });
});

// Vite middleware setup for development, or serving static files in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`My Home Bishkek Server is running on http://localhost:${PORT}`);
  });
}

startServer();

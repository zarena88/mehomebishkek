import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { Send, Bot, User, Sparkles, MessageSquare, ArrowRight, Loader2, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AiConsultantProps {
  lang: 'kg' | 'ru' | 'en' | 'ko';
  chatHistory: ChatMessage[];
  onSendMessage: (text: string) => void;
  onClearHistory: () => void;
  isGenerating: boolean;
}

export const AiConsultant: React.FC<AiConsultantProps> = ({
  lang,
  chatHistory,
  onSendMessage,
  onClearHistory,
  isGenerating
}) => {
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const kgSuggestions = [
    "Жал кичирайонунда баалар кандай?",
    "105 жана 106-сериянын кандай айырмасы бар?",
    "Асанбайдагы үйлөрдүн артыкчылыктары?",
    "Коммерциялык банктардан ипотека алуу шарттары?",
    "Кызыккан батирди көрүү үчүн эмне кылыш керек?"
  ];

  const ruSuggestions = [
    "Какие цены в микрорайоне Джал?",
    "В чем различие между 105 и 106 сериями?",
    "Преимущества покупки жилья в Асанбае?",
    "Каковы условия ипотеки в коммерческих банках?",
    "Как записаться на просмотр квартиры?"
  ];

  const enSuggestions = [
    "What are the prices in Jal microdistrict?",
    "What is the difference between series 105 and 106?",
    "Advantages of buying housing in Asanbay?",
    "What are the terms of mortgages in commercial banks?",
    "How to schedule a property viewing?"
  ];

  const koSuggestions = [
    "잘(Jal) 지구의 부동산 시세는 어떻게 되나요?",
    "105 타입과 106 타입 건물 구조의 차이점은 무엇인가요?",
    "아산바이(Asanbay) 지역 주택 구매 시 어떤 장점이 있나요?",
    "시중 은행의 주택 담보 대출 조건은 어떻게 되나요?",
    "실제 매물 투어/방문 예약을 하고 싶습니다."
  ];

  const suggestions = lang === 'kg' 
    ? kgSuggestions 
    : lang === 'en' 
    ? enSuggestions 
    : lang === 'ko' 
    ? koSuggestions 
    : ruSuggestions;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isGenerating) return;

    onSendMessage(input.trim());
    setInput('');
  };

  const handleSuggestionClick = (text: string) => {
    if (isGenerating) return;

    onSendMessage(text);
  };

  // Scroll to bottom whenever history changes
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isGenerating]);

  return (
    <div className="bg-slate-900 text-slate-100 rounded-3xl overflow-hidden border border-slate-800 shadow-xl flex flex-col h-[550px] md:h-[600px]">
      {/* Consultant Header */}
      <div className="bg-slate-950 border-b border-slate-800 px-5 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
            <Bot size={20} className="animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="font-bold text-sm text-white">My Home AI</h4>
              <span className="bg-amber-500/20 text-amber-400 text-[9px] font-semibold uppercase px-1.5 py-0.5 rounded border border-amber-500/10">
                Live
              </span>
            </div>
            <p className="text-[10px] text-slate-400">
              {lang === 'kg' 
                ? 'Манап Нуржанович (Кеңешчи)' 
                : lang === 'en' 
                ? 'Zarena (Consultant via WhatsApp)' 
                : lang === 'ko' 
                ? 'Zarena (WhatsApp 상담사)' 
                : 'Манап Нуржанович (Консультант)'}
            </p>
          </div>
        </div>
        {chatHistory.length > 1 && (
          <button
            onClick={onClearHistory}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-all text-xs flex items-center gap-1"
            title={lang === 'kg' ? 'Тарыхты өчүрүү' : lang === 'en' ? 'Clear history' : lang === 'ko' ? '대화 기록 삭제' : 'Очистить историю'}
          >
            <RefreshCw size={12} />
            <span className="hidden sm:inline text-[10px]">{lang === 'kg' ? 'Тазалоо' : lang === 'en' ? 'Clear' : lang === 'ko' ? '초기화' : 'Очистить'}</span>
          </button>
        )}
      </div>

      {/* Messages Feed Area */}
      <div className="flex-grow p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-slate-800">
        {(lang === 'en' || lang === 'ko') && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 text-emerald-100 flex flex-col md:flex-row items-center justify-between gap-4 shrink-0 shadow-md mb-2"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500 text-slate-950 rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20 font-bold text-sm">
                Z
              </div>
              <div>
                <h5 className="font-bold text-xs sm:text-sm text-emerald-400">
                  {lang === 'en' ? 'Direct English Consultant: Zarena' : '한국어 전담 상담사: Zarena'}
                </h5>
                <p className="text-[11px] text-emerald-300/90 mt-0.5 leading-relaxed">
                  {lang === 'en'
                    ? 'Get instant expert answers and premium property service via WhatsApp!'
                    : 'WhatsApp을 통해 비슈케크 부동산 매물 상담 및 투어를 친절하게 상담해 드립니다!'}
                </p>
              </div>
            </div>
            <a
              href="https://wa.me/996995288288"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-4 py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-md shrink-0"
            >
              <span>{lang === 'en' ? 'Chat on WhatsApp' : 'WhatsApp 1:1 상담'}</span>
            </a>
          </motion.div>
        )}

        <AnimatePresence initial={false}>
          {chatHistory.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.2 }}
              className={`flex gap-3 max-w-[85%] ${
                msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
                msg.role === 'user'
                  ? 'bg-slate-800 border-slate-700 text-slate-300'
                  : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
              }`}>
                {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
              </div>

              <div className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-amber-500 text-slate-950 font-medium rounded-tr-none'
                  : 'bg-slate-850 text-slate-200 rounded-tl-none border border-slate-800'
              }`}>
                <p className="whitespace-pre-line">{msg.text}</p>
                <span className="block text-[9px] mt-1.5 text-slate-400 text-right">
                  {msg.timestamp}
                </span>
              </div>
            </motion.div>
          ))}
          
          {isGenerating && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex gap-3 max-w-[80%] mr-auto"
            >
              <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <Loader2 size={14} className="animate-spin" />
              </div>
              <div className="bg-slate-850 border border-slate-800 text-slate-400 px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                <span className="text-xs">
                  {lang === 'kg' 
                    ? 'My Home AI жооп жазууда' 
                    : lang === 'en' 
                    ? 'My Home AI is thinking' 
                    : lang === 'ko' 
                    ? 'My Home AI가 답변을 작성 중입니다' 
                    : 'My Home AI думает'}
                </span>
                <span className="flex gap-1">
                  <span className="w-1 h-1 bg-slate-500 rounded-full animate-bounce delay-0" />
                  <span className="w-1 h-1 bg-slate-500 rounded-full animate-bounce delay-150" />
                  <span className="w-1 h-1 bg-slate-500 rounded-full animate-bounce delay-300" />
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={chatEndRef} />
      </div>

      {/* Suggested Questions Section */}
      {chatHistory.length <= 1 && !isGenerating && (
        <div className="px-4 py-3 bg-slate-950/40 border-t border-slate-800/60 shrink-0">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2 flex items-center gap-1">
            <Sparkles size={11} className="text-amber-400" />
            {lang === 'kg' 
              ? 'Көп берилүүчү суроолор:' 
              : lang === 'en' 
              ? 'Frequently Asked Questions:' 
              : lang === 'ko' 
              ? '자주 묻는 질문:' 
              : 'Часто задаваемые вопросы:'}
          </p>
          <div className="flex flex-wrap gap-1.5 max-h-[85px] overflow-y-auto scrollbar-none">
            {suggestions.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleSuggestionClick(s)}
                className="text-[11px] bg-slate-850 hover:bg-slate-800 text-slate-300 hover:text-white px-2.5 py-1.5 rounded-lg border border-slate-800 transition-all flex items-center gap-1 active:scale-[0.98]"
              >
                <MessageSquare size={10} className="text-amber-400" />
                <span>{s}</span>
                <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity ml-0.5" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Form Section */}
      <form
        onSubmit={handleSubmit}
        className="p-3 bg-slate-950 border-t border-slate-800/80 flex gap-2 items-center shrink-0"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isGenerating}
          placeholder={
            lang === 'kg' 
              ? 'Сурооңузду жазыңыз...' 
              : lang === 'en' 
              ? 'Type your question...' 
              : lang === 'ko' 
              ? '질문을 입력해 주세요...' 
              : 'Задайте ваш вопрос...'
          }
          className="flex-grow bg-slate-850 border border-slate-800 text-xs sm:text-sm text-white px-4 py-3 rounded-xl focus:ring-1 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all placeholder-slate-500 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!input.trim() || isGenerating}
          className="p-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all disabled:opacity-50 disabled:hover:bg-amber-500 active:scale-95"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
};

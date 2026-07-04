import React, { useState, useEffect } from 'react';
import { Property, FilterState, Lead, ChatMessage } from './types';
import { 
  initialProperties, 
  translations, 
  bishkekDistricts, 
  housingSeries, 
  agents 
} from './data';
import { PropertyCard } from './components/PropertyCard';
import { PropertyDetailsModal } from './components/PropertyDetailsModal';
import { AiConsultant } from './components/AiConsultant';
import { MortgageCalc } from './components/MortgageCalc';
import { AddListingModal } from './components/AddListingModal';
import { TourProgram } from './components/TourProgram';
import { RegistrationGuide } from './components/RegistrationGuide';
import { MarketInsights } from './components/MarketInsights';
import { TwoGisMap } from './components/TwoGisMap';
import { 
  Home, 
  Search, 
  Bot, 
  Calculator, 
  Heart, 
  Plus, 
  Globe, 
  Coins, 
  Menu, 
  X, 
  Sparkles, 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Info,
  ChevronRight,
  Filter,
  Check,
  Lock,
  Unlock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Hero background asset from the generation tool
import heroImage from './assets/images/hero_apartment_1782937613352.jpg';

export default function App() {
  // Localization & Currency State
  const [lang, setLang] = useState<'kg' | 'ru' | 'en' | 'ko'>('kg');
  const [currency, setCurrency] = useState<'USD' | 'KGS'>('USD');
  
  // Data State
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);

  // Navigation / UI State
  const [activeTab, setActiveTab] = useState<'properties' | 'ai' | 'calculator' | 'tour' | 'registration' | 'about' | 'insights' | 'map'>('properties');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isOwnerMode, setIsOwnerMode] = useState<boolean>(false);

  // Search & Filter State
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    district: 'all',
    minPrice: '',
    maxPrice: '',
    rooms: 'all',
    series: 'all',
    type: 'buy',
    isBarterOnly: false
  });

  // AI Chat State
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [intlQuestionCount, setIntlQuestionCount] = useState<number>(0);
  const [intlHasOfferedWhatsApp, setIntlHasOfferedWhatsApp] = useState<boolean>(false);

  // Initialize Chat History
  useEffect(() => {
    // Reset international guest counters when language changes
    setIntlQuestionCount(0);
    setIntlHasOfferedWhatsApp(false);

    const welcomeMsg = lang === 'kg' 
      ? "Саламатсызбы! Мен My Home Bishkek кыймылсыз мүлк борборунун кеңешчиси Манап Нуржановичмин. Сизге Бишкектен турак жай тандоого, ипотека шарттарын эсептөөгө жана райондордун бааларын салыштырууга жардам берем. Эмне жөнүндө билгиңиз келет?"
      : lang === 'en'
      ? "Hello! I am Zarena, the consultant for My Home Bishkek. I can help you find housing in Bishkek, compare district prices, and calculate mortgage conditions. What would you like to know today?"
      : lang === 'ko'
      ? "안녕하세요! My Home Bishkek 부동산 센터의 전문 상담사 Zarena입니다. 비슈케크에서 주택 찾기, 지역별 시세 비교, 담보 대출 계산 등을 도와드릴 수 있습니다. 오늘 어떤 점이 궁금하신가요?"
      : "Здравствуйте! Я консультант центра недвижимости My Home Bishkek Манап Нуржанович. Помогу вам выбрать жилье в Бишкеке, рассчитать условия ипотеки и сравнить цены по районам. О чем бы вы хотели узнать?";
    
    setChatHistory([
      {
        id: 'initial',
        role: 'assistant',
        text: welcomeMsg,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [lang]);

  // Load favorites from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('my_home_favorites');
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const t = translations[lang];

  // Toggle favorite property
  const handleToggleFavorite = (id: string) => {
    let updated: string[];
    if (favorites.includes(id)) {
      updated = favorites.filter(favId => favId !== id);
    } else {
      updated = [...favorites, id];
    }
    setFavorites(updated);
    localStorage.setItem('my_home_favorites', JSON.stringify(updated));
  };

  // Add custom user property
  const handleAddProperty = (newProp: Omit<Property, 'id' | 'addedDate'>) => {
    const created: Property = {
      ...newProp,
      id: `custom-${Date.now()}`,
      addedDate: new Date().toISOString().split('T')[0]
    };
    setProperties(prev => [created, ...prev]);
  };

  // Submit contact lead form
  const handleAddLead = (leadData: Omit<Lead, 'id' | 'date'>) => {
    const newLead: Lead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      date: new Date().toISOString()
    };
    setLeads(prev => [newLead, ...prev]);
  };

  // Clear Chat History
  const handleClearHistory = () => {
    setIntlQuestionCount(0);
    setIntlHasOfferedWhatsApp(false);
    const welcomeMsg = lang === 'kg' 
      ? "Маектешүү тарыхы тазаланды. Суроолоруңуз болсо жазыңыз!"
      : lang === 'en'
      ? "Chat history cleared. Please ask your questions!"
      : lang === 'ko'
      ? "대화 기록이 초기화되었습니다. 새로운 질문을 입력해 주세요!"
      : "История чата очищена. Задавайте ваши новые вопросы!";
    setChatHistory([
      {
        id: 'clear',
        role: 'assistant',
        text: welcomeMsg,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Send message to Express Proxy endpoint linked to Gemini 3.5 Flash
  const handleSendChatMessage = async (text: string) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const isAffirmative = (t: string): boolean => {
      const clean = t.trim().toLowerCase();
      return [
        'ok', 'okay', 'yes', 'y', 'yep', 'agree', 'sure', 'fine', 'of course', 'please', 'макул', 'макулмун', 'ок', 'окей', 'ооба', 'да', 'хорошо', 'конечно', 'давай', 'yes please', 'макулмун'
      ].some(aff => clean === aff || clean.startsWith(aff) || clean.includes(' ' + aff) || clean.includes(aff + ' '));
    };

    // Intercept affirmative responses after a WhatsApp offer has been made
    if ((lang === 'en' || lang === 'ko') && intlHasOfferedWhatsApp && isAffirmative(text)) {
      const currentHistory = [...chatHistory, userMsg];
      setChatHistory(currentHistory);
      setIsGenerating(true);

      setTimeout(() => {
        const confirmMsgText = lang === 'en'
          ? "Perfect! Connecting you to our direct WhatsApp line (+996995288288) for 1:1 premium assistance. If the chat doesn't open automatically, please click here: https://wa.me/996995288288"
          : "좋습니다! 1:1 프리미엄 맞춤 상담을 위해 WhatsApp 채널(+996995288288)로 바로 연결해 드리겠습니다. 대화방이 자동으로 열리지 않으면 다음 링크를 클릭해 주세요: https://wa.me/996995288288";
        
        const confirmMsg: ChatMessage = {
          id: `assistant-confirm-${Date.now()}`,
          role: 'assistant',
          text: confirmMsgText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        setChatHistory(prev => [...prev, confirmMsg]);
        setIsGenerating(false);
        window.open('https://wa.me/996995288288', '_blank');
      }, 600);
      return;
    }

    const currentHistory = [...chatHistory, userMsg];
    setChatHistory(currentHistory);
    setIsGenerating(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages: currentHistory })
      });

      if (!response.ok) {
        throw new Error('API server returned an error');
      }

      const data = await response.json();
      
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      if (lang === 'en' || lang === 'ko') {
        const nextCount = intlQuestionCount + 1;
        setIntlQuestionCount(nextCount);

        if (nextCount >= 4 && !intlHasOfferedWhatsApp) {
          setIntlHasOfferedWhatsApp(true);
          const offerMsgText = lang === 'en'
            ? "We have discussed quite a few options! Would you like me to connect you to our representative on WhatsApp for direct 1:1 premium assistance? (Type 'ok' or 'yes' to connect)"
            : "비슈케크 부동산에 대해 많은 이야기를 나누었네요! 더욱 빠르고 상세한 1:1 맞춤 상담을 위해 WhatsApp을 통해 전문 상담사와 즉시 연결해 드릴까요? ('ok' 또는 '마кул'을 입력하시면 연결됩니다)";
          
          const offerMsg: ChatMessage = {
            id: `assistant-offer-${Date.now()}`,
            role: 'assistant',
            text: offerMsgText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };

          setChatHistory(prev => [...prev, assistantMsg, offerMsg]);
        } else {
          setChatHistory(prev => [...prev, assistantMsg]);
        }
      } else {
        setChatHistory(prev => [...prev, assistantMsg]);
      }
    } catch (error) {
      console.error(error);
      const errText = lang === 'kg'
        ? "Кечиресиз, байланышта мүчүлүштүк болду. Кабарды кайра жөнөтүп көрүңүз же интернетти текшериңиз."
        : lang === 'en'
        ? "Sorry, there was a connection error. Please try sending your message again or check your internet connection."
        : lang === 'ko'
        ? "죄송합니다. 연결에 오류가 발생했습니다. 다시 메시지를 보내거나 인터넷 연결을 확인해 주세요."
        : "Извините, возникла ошибка соединения. Пожалуйста, попробуйте отправить сообщение снова.";
      
      const assistantMsg: ChatMessage = {
        id: `assistant-error-${Date.now()}`,
        role: 'assistant',
        text: errText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatHistory(prev => [...prev, assistantMsg]);
    } finally {
      setIsGenerating(false);
    }
  };

  // Reset Filters
  const handleResetFilters = () => {
    setFilters({
      search: '',
      district: 'all',
      minPrice: '',
      maxPrice: '',
      rooms: 'all',
      series: 'all',
      type: filters.type, // Keep current buy/rent tab type
      isBarterOnly: false
    });
    setShowFavoritesOnly(false);
  };

  // Filter Logic
  const filteredProperties = properties.filter(prop => {
    // Buy / Rent Type check
    if (prop.type !== filters.type) return false;

    // Barter check
    if (filters.isBarterOnly && !prop.isBarter) return false;

    // Search query check (title & address & series)
    if (filters.search) {
      const s = filters.search.toLowerCase();
      const titleMatch = prop.titleKg.toLowerCase().includes(s) || 
                         prop.titleRu.toLowerCase().includes(s) || 
                         (prop.titleEn && prop.titleEn.toLowerCase().includes(s)) || 
                         (prop.titleKo && prop.titleKo.toLowerCase().includes(s));
      const addressMatch = prop.addressKg.toLowerCase().includes(s) || 
                           prop.addressRu.toLowerCase().includes(s) || 
                           (prop.addressEn && prop.addressEn.toLowerCase().includes(s)) || 
                           (prop.addressKo && prop.addressKo.toLowerCase().includes(s));
      const seriesMatch = prop.seriesKg.toLowerCase().includes(s) || 
                          prop.seriesRu.toLowerCase().includes(s) || 
                          (prop.seriesEn && prop.seriesEn.toLowerCase().includes(s)) || 
                          (prop.seriesKo && prop.seriesKo.toLowerCase().includes(s));
      const barterMatch = prop.isBarter && (
        s.includes('бартер') || s.includes('обмен') || s.includes('алмашуу') || s.includes('barter') || s.includes('exchange')
      );
      if (!titleMatch && !addressMatch && !seriesMatch && !barterMatch) return false;
    }

    // District filter
    if (filters.district !== 'all') {
      const selectedDist = bishkekDistricts.find(d => d.id === filters.district);
      if (selectedDist) {
        const distMatch = prop.districtKg === selectedDist.kg || 
                          prop.districtRu === selectedDist.ru || 
                          (prop.districtEn && prop.districtEn === selectedDist.en) || 
                          (prop.districtKo && prop.districtKo === selectedDist.ko);
        if (!distMatch) return false;
      }
    }

    // Min Price
    if (filters.minPrice) {
      const min = parseInt(filters.minPrice);
      if (prop.priceUsd < min) return false;
    }

    // Max Price
    if (filters.maxPrice) {
      const max = parseInt(filters.maxPrice);
      if (prop.priceUsd > max) return false;
    }

    // Rooms count
    if (filters.rooms !== 'all') {
      if (filters.rooms === '4+') {
        if (prop.rooms < 4) return false;
      } else {
        if (prop.rooms !== parseInt(filters.rooms)) return false;
      }
    }

    // Housing series
    if (filters.series !== 'all') {
      const selectedSeries = housingSeries.find(s => s.id === filters.series);
      if (selectedSeries) {
        const seriesMatch = prop.seriesKg === selectedSeries.kg || 
                            prop.seriesRu === selectedSeries.ru || 
                            (prop.seriesEn && prop.seriesEn === selectedSeries.en) || 
                            (prop.seriesKo && prop.seriesKo === selectedSeries.ko);
        if (!seriesMatch) return false;
      }
    }

    // Favorites only filter
    if (showFavoritesOnly) {
      if (!favorites.includes(prop.id)) return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      
      {/* 1. TOP HEADER NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo Brand Title */}
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => { setActiveTab('properties'); handleResetFilters(); }}>
              <div className="w-11 h-11 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-lg shadow-slate-950/10">
                <Home size={22} className="text-amber-400 stroke-[2.2]" />
              </div>
              <div>
                <span className="font-extrabold text-lg tracking-tight text-slate-900 uppercase block leading-tight">
                  My Home
                </span>
                <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest block leading-none">
                  Bishkek
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <button
                id="nav-properties"
                onClick={() => { setActiveTab('properties'); setShowFavoritesOnly(false); }}
                className={`transition-all hover:text-slate-900 relative py-2 ${
                  activeTab === 'properties' && !showFavoritesOnly 
                    ? 'text-slate-900 font-extrabold border-b-2 border-amber-500' 
                    : ''
                }`}
              >
                {lang === 'kg' ? 'Каталог' : lang === 'en' ? 'Catalog' : lang === 'ko' ? '카탈로그' : 'Каталог'}
              </button>
              <button
                id="nav-map"
                onClick={() => setActiveTab('map')}
                className={`transition-all hover:text-slate-900 flex items-center gap-1.5 relative py-2 ${
                  activeTab === 'map' 
                    ? 'text-slate-900 font-extrabold border-b-2 border-amber-500' 
                    : ''
                }`}
              >
                <span>{lang === 'kg' ? '2GIS Карта' : lang === 'en' ? '2GIS Map' : lang === 'ko' ? '2GIS 지도' : 'Карта 2GIS'}</span>
                <span className="bg-blue-500 text-white font-black px-1.5 py-0.5 rounded text-[8px] tracking-normal leading-none animate-pulse">2GIS</span>
              </button>
              <button
                id="nav-ai"
                onClick={() => setActiveTab('ai')}
                className={`transition-all hover:text-slate-900 flex items-center gap-1.5 relative py-2 ${
                  activeTab === 'ai' 
                    ? 'text-slate-900 font-extrabold border-b-2 border-amber-500' 
                    : ''
                }`}
              >
                <Bot size={14} className="text-amber-500 animate-bounce" />
                <span>My Home AI</span>
              </button>
              <button
                id="nav-calc"
                onClick={() => setActiveTab('calculator')}
                className={`transition-all hover:text-slate-900 relative py-2 ${
                  activeTab === 'calculator' 
                    ? 'text-slate-900 font-extrabold border-b-2 border-amber-500' 
                    : ''
                }`}
              >
                {lang === 'kg' ? 'Ипотека' : lang === 'en' ? 'Mortgage' : lang === 'ko' ? '담보 대출' : 'Ипотека'}
              </button>
              <button
                id="nav-insights"
                onClick={() => setActiveTab('insights')}
                className={`transition-all hover:text-slate-900 flex items-center gap-1.5 relative py-2 ${
                  activeTab === 'insights' 
                    ? 'text-slate-900 font-extrabold border-b-2 border-amber-500' 
                    : ''
                }`}
              >
                <span>{lang === 'kg' ? 'Аналитика & Салыштыруу' : lang === 'en' ? 'Analytics & Comparison' : lang === 'ko' ? '시세 분석/비교' : 'Аналитика & Сравнение'}</span>
                <span className="bg-emerald-500 text-white font-black px-1.5 py-0.5 rounded text-[8px] tracking-normal leading-none">AI STAT</span>
              </button>
              <button
                id="nav-tour"
                onClick={() => setActiveTab('tour')}
                className={`transition-all hover:text-slate-900 flex items-center gap-1 relative py-2 ${
                  activeTab === 'tour' 
                    ? 'text-slate-900 font-extrabold border-b-2 border-amber-500' 
                    : ''
                }`}
              >
                <span>{lang === 'kg' ? 'Тур программасы' : lang === 'en' ? 'Property Tour' : lang === 'ko' ? '매물 투어' : 'Тур за жильем'}</span>
                <span className="bg-amber-500 text-slate-950 font-black px-1.5 py-0.5 rounded text-[8px] tracking-normal leading-none animate-pulse">NEW</span>
              </button>
              <button
                id="nav-registration"
                onClick={() => setActiveTab('registration')}
                className={`transition-all hover:text-slate-900 flex items-center gap-1 relative py-2 ${
                  activeTab === 'registration' 
                    ? 'text-slate-900 font-extrabold border-b-2 border-amber-500' 
                    : ''
                }`}
              >
                <span>{lang === 'kg' ? 'Өз атына каттоо' : lang === 'en' ? 'Property Registration' : lang === 'ko' ? '소유권 이전 등록' : 'Оформление на себя'}</span>
                <span className="bg-rose-500 text-white font-black px-1.5 py-0.5 rounded text-[8px] tracking-normal leading-none">ВАЖНО</span>
              </button>
              <button
                id="nav-about"
                onClick={() => setActiveTab('about')}
                className={`transition-all hover:text-slate-900 relative py-2 ${
                  activeTab === 'about' 
                    ? 'text-slate-900 font-extrabold border-b-2 border-amber-500' 
                    : ''
                }`}
              >
                {lang === 'kg' ? 'Биз жөнүндө' : lang === 'en' ? 'About Us' : lang === 'ko' ? '회사 소개' : 'О нас'}
              </button>
            </nav>

            {/* Language, Currency & Favorites Control Buttons */}
            <div className="hidden md:flex items-center gap-3">
              {/* Currency Selector (USD/KGS) */}
              <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-0.5 border border-slate-200/50">
                <button
                  id="currency-usd-btn"
                  onClick={() => setCurrency('USD')}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                    currency === 'USD' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  USD
                </button>
                <button
                  id="currency-kgs-btn"
                  onClick={() => setCurrency('KGS')}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                    currency === 'KGS' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  KGS
                </button>
              </div>

              {/* Site Owner Mode Switcher */}
              <button
                id="owner-mode-toggle-btn"
                onClick={() => setIsOwnerMode(!isOwnerMode)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-extrabold uppercase tracking-wider transition-all border ${
                  isOwnerMode 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm animate-pulse' 
                    : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100 hover:text-slate-800'
                }`}
                title={lang === 'kg' ? 'Сайттын ээси режими' : 'Режим владельца сайта'}
              >
                {isOwnerMode ? <Unlock size={11} className="text-emerald-600 shrink-0" /> : <Lock size={11} className="text-slate-400 shrink-0" />}
                <span>
                  {lang === 'kg' ? 'Ээси' : 'Владелец'}
                </span>
              </button>

              {/* Language Switcher */}
              <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-0.5 border border-slate-200/50">
                <button
                  id="lang-kg-btn"
                  onClick={() => setLang('kg')}
                  className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1 ${
                    lang === 'kg' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  KG
                </button>
                <button
                  id="lang-ru-btn"
                  onClick={() => setLang('ru')}
                  className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1 ${
                    lang === 'ru' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  RU
                </button>
                <button
                  id="lang-en-btn"
                  onClick={() => setLang('en')}
                  className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1 ${
                    lang === 'en' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  EN
                </button>
                <button
                  id="lang-ko-btn"
                  onClick={() => setLang('ko')}
                  className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1 ${
                    lang === 'ko' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  KO
                </button>
              </div>

              {/* Favorites Panel Toggle */}
              <button
                id="toggle-favs-btn"
                onClick={() => {
                  setShowFavoritesOnly(!showFavoritesOnly);
                  setActiveTab('properties');
                }}
                className={`p-2.5 rounded-xl transition-all relative ${
                  showFavoritesOnly 
                    ? 'bg-rose-50 text-rose-500 shadow-inner' 
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
                title={lang === 'kg' ? 'Тандалган мүлктөр' : 'Избранные объекты'}
              >
                <Heart size={18} className={showFavoritesOnly ? 'fill-rose-500' : ''} />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                    {favorites.length}
                  </span>
                )}
              </button>

              {/* Create listing button */}
              <button
                id="open-add-listing-btn"
                onClick={() => setIsAddModalOpen(true)}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md shadow-amber-500/10 hover:shadow-amber-500/20 active:scale-95"
              >
                <Plus size={14} className="stroke-[2.5]" />
                {lang === 'kg' ? 'Жарнама кошуу' : lang === 'en' ? 'Add Listing' : lang === 'ko' ? '매물 등록' : 'Подать объявление'}
              </button>
            </div>

            {/* Mobile Hamburger Burger Menu Icon */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => {
                  setShowFavoritesOnly(!showFavoritesOnly);
                  setActiveTab('properties');
                }}
                className={`p-2 rounded-lg relative ${
                  showFavoritesOnly ? 'text-rose-500' : 'text-slate-600'
                }`}
              >
                <Heart size={20} className={showFavoritesOnly ? 'fill-rose-500' : ''} />
                {favorites.length > 0 && (
                  <span className="absolute top-0 right-0 bg-rose-500 text-white text-[8px] font-extrabold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Sidebar Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-slate-100 overflow-hidden px-4 py-5 space-y-4"
            >
              <div className="flex flex-col gap-3 font-semibold text-slate-600 text-sm">
                <button
                  onClick={() => { setActiveTab('properties'); setShowFavoritesOnly(false); setIsMobileMenuOpen(false); }}
                  className={`py-2 px-3 rounded-lg text-left ${activeTab === 'properties' && !showFavoritesOnly ? 'bg-slate-100 text-slate-900 font-bold' : ''}`}
                >
                  {lang === 'kg' ? 'Каталог' : lang === 'en' ? 'Catalog' : lang === 'ko' ? '카탈로그' : 'Каталог'}
                </button>
                <button
                  onClick={() => { setActiveTab('map'); setIsMobileMenuOpen(false); }}
                  className={`py-2 px-3 rounded-lg text-left flex items-center justify-between ${activeTab === 'map' ? 'bg-slate-100 text-slate-900 font-bold' : ''}`}
                >
                  <span>{lang === 'kg' ? '2GIS Карта' : lang === 'en' ? '2GIS Map' : lang === 'ko' ? '2GIS 지도' : 'Карта 2GIS'}</span>
                  <span className="bg-blue-500 text-white font-black px-1.5 py-0.5 rounded text-[8px] uppercase">2GIS</span>
                </button>
                <button
                  onClick={() => { setActiveTab('ai'); setIsMobileMenuOpen(false); }}
                  className={`py-2 px-3 rounded-lg text-left flex items-center gap-2 ${activeTab === 'ai' ? 'bg-slate-100 text-slate-900 font-bold' : ''}`}
                >
                  <Bot size={16} className="text-amber-500" />
                  <span>My Home AI {lang === 'kg' ? 'Кеңешчи' : lang === 'en' ? 'Consultant' : lang === 'ko' ? '상담사' : 'Консультант'}</span>
                </button>
                <button
                  onClick={() => { setActiveTab('calculator'); setIsMobileMenuOpen(false); }}
                  className={`py-2 px-3 rounded-lg text-left ${activeTab === 'calculator' ? 'bg-slate-100 text-slate-900 font-bold' : ''}`}
                >
                  {lang === 'kg' ? 'Ипотека калькулятору' : lang === 'en' ? 'Mortgage Calculator' : lang === 'ko' ? '주택 대출 계산기' : 'Ипотечный калькулятор'}
                </button>
                <button
                  onClick={() => { setActiveTab('insights'); setIsMobileMenuOpen(false); }}
                  className={`py-2 px-3 rounded-lg text-left flex items-center justify-between ${activeTab === 'insights' ? 'bg-slate-100 text-slate-900 font-bold' : ''}`}
                >
                  <span>{lang === 'kg' ? 'Аналитика & Салыштыруу' : lang === 'en' ? 'Analytics & Comparison' : lang === 'ko' ? '시세 분석 및 비교' : 'Аналитика & Сравнение'}</span>
                  <span className="bg-emerald-500 text-white font-black px-1.5 py-0.5 rounded text-[8px] uppercase">AI STAT</span>
                </button>
                <button
                  onClick={() => { setActiveTab('tour'); setIsMobileMenuOpen(false); }}
                  className={`py-2 px-3 rounded-lg text-left flex items-center justify-between ${activeTab === 'tour' ? 'bg-slate-100 text-slate-900 font-bold' : ''}`}
                >
                  <span>{lang === 'kg' ? 'Тур программасы' : lang === 'en' ? 'Property Tour' : lang === 'ko' ? '매물 투어' : 'Тур за жильем'}</span>
                  <span className="bg-amber-500 text-slate-950 font-black px-1.5 py-0.5 rounded text-[8px] uppercase">NEW</span>
                </button>
                <button
                  onClick={() => { setActiveTab('registration'); setIsMobileMenuOpen(false); }}
                  className={`py-2 px-3 rounded-lg text-left flex items-center justify-between ${activeTab === 'registration' ? 'bg-slate-100 text-slate-900 font-bold' : ''}`}
                >
                  <span>{lang === 'kg' ? 'Өз атына каттоо' : lang === 'en' ? 'Property Registration' : lang === 'ko' ? '소유권 이전 등록' : 'Оформление на себя'}</span>
                  <span className="bg-rose-500 text-white font-black px-1.5 py-0.5 rounded text-[8px] uppercase">ВАЖНО</span>
                </button>
                <button
                  onClick={() => { setActiveTab('about'); setIsMobileMenuOpen(false); }}
                  className={`py-2 px-3 rounded-lg text-left ${activeTab === 'about' ? 'bg-slate-100 text-slate-900 font-bold' : ''}`}
                >
                  {lang === 'kg' ? 'Биз жөнүндө' : lang === 'en' ? 'About Us' : lang === 'ko' ? '회사 소개' : 'О нас'}
                </button>
              </div>

              {/* Site Owner Mode for Mobile */}
              <button
                onClick={() => setIsOwnerMode(!isOwnerMode)}
                className={`w-full py-2.5 px-3 rounded-xl text-xs text-left flex items-center justify-between border transition-all ${
                  isOwnerMode 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200 font-bold animate-pulse' 
                    : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span className="flex items-center gap-2">
                  {isOwnerMode ? <Unlock size={14} className="text-emerald-600" /> : <Lock size={14} className="text-slate-400" />}
                  <span>{lang === 'kg' ? 'Сайттын ээси режими' : 'Режим владельца сайта'}</span>
                </span>
                <span className="text-[9px] uppercase font-bold">
                  {isOwnerMode ? (lang === 'kg' ? 'Иштеп жатат' : 'Активен') : (lang === 'kg' ? 'Өчүк' : 'Выкл')}
                </span>
              </button>

              {/* Mobile controls */}
              <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
                {/* Currency */}
                <div className="bg-slate-100 p-0.5 rounded-lg flex items-center justify-around">
                  <button
                    onClick={() => setCurrency('USD')}
                    className={`flex-1 py-1 rounded-md text-xs font-bold ${currency === 'USD' ? 'bg-white text-slate-900' : 'text-slate-500'}`}
                  >
                    USD
                  </button>
                  <button
                    onClick={() => setCurrency('KGS')}
                    className={`flex-1 py-1 rounded-md text-xs font-bold ${currency === 'KGS' ? 'bg-white text-slate-900' : 'text-slate-500'}`}
                  >
                    KGS
                  </button>
                </div>

                {/* Language */}
                <div className="bg-slate-100 p-0.5 rounded-lg flex items-center justify-between w-full">
                  <button
                    onClick={() => setLang('kg')}
                    className={`flex-1 py-1 rounded-md text-[10px] font-bold text-center ${lang === 'kg' ? 'bg-slate-900 text-white' : 'text-slate-500'}`}
                  >
                    KG
                  </button>
                  <button
                    onClick={() => setLang('ru')}
                    className={`flex-1 py-1 rounded-md text-[10px] font-bold text-center ${lang === 'ru' ? 'bg-slate-900 text-white' : 'text-slate-500'}`}
                  >
                    RU
                  </button>
                  <button
                    onClick={() => setLang('en')}
                    className={`flex-1 py-1 rounded-md text-[10px] font-bold text-center ${lang === 'en' ? 'bg-slate-900 text-white' : 'text-slate-500'}`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => setLang('ko')}
                    className={`flex-1 py-1 rounded-md text-[10px] font-bold text-center ${lang === 'ko' ? 'bg-slate-900 text-white' : 'text-slate-500'}`}
                  >
                    KO
                  </button>
                </div>
              </div>

              <button
                onClick={() => { setIsAddModalOpen(true); setIsMobileMenuOpen(false); }}
                className="w-full bg-amber-500 text-slate-950 font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-1.5"
              >
                <Plus size={14} className="stroke-[2.5]" />
                {lang === 'kg' ? 'Жарнама кошуу' : lang === 'en' ? 'Add Listing' : lang === 'ko' ? '매물 등록' : 'Подать объявление'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 2. HERO LANDING BANNER (Only renders on Home Properties catalog page) */}
      {activeTab === 'properties' && !showFavoritesOnly && (
        <section className="relative bg-slate-900 text-white overflow-hidden py-16 sm:py-24 px-4 sm:px-6 lg:px-8 shrink-0">
          <div className="absolute inset-0 z-0">
            <img
              src={heroImage}
              alt="Bishkek Apartments"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-35 filter brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-slate-950/40" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-2"
            >
              <Sparkles size={12} className="animate-spin duration-1000" />
              <span>
                {lang === 'kg' 
                  ? 'Бишкектин алдыңкы агенттиги' 
                  : lang === 'en' 
                  ? 'Bishkek\'s leading agency' 
                  : lang === 'ko' 
                  ? '비슈케크 최고의 부동산 에이전시' 
                  : 'Ведущее агентство Бишкека'}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-none drop-shadow-md"
            >
              My Home <span className="text-amber-500">Bishkek</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm sm:text-lg text-slate-300 max-w-xl mx-auto font-medium"
            >
              {t.tagline}
            </motion.p>

            {/* Quick Hero Search Input Field */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/10 shadow-xl flex items-center"
            >
              <div className="flex-grow relative flex items-center pl-3">
                <Search size={18} className="text-amber-400 shrink-0" />
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="w-full bg-transparent border-none outline-none py-3 px-2 text-sm text-white placeholder-slate-300 font-medium"
                />
              </div>
              <button
                onClick={() => {
                  const el = document.getElementById('listings-grid-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md shadow-amber-500/20"
              >
                {lang === 'kg' ? 'Издөө' : lang === 'en' ? 'Search' : lang === 'ko' ? '검색' : 'Искать'}
              </button>
            </motion.div>
          </div>
        </section>
      )}

      {/* 3. CORE PAGE CONTENT ROUTER */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* TAB: PROPERTIES CATALOG (CATALOG & FILTER PANEL) */}
        {activeTab === 'properties' && (
          <div className="space-y-8">
            
            {/* Properties Page Title / Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-950 flex items-center gap-2">
                  {showFavoritesOnly ? (
                    <>
                      <Heart size={22} className="text-rose-500 fill-rose-500" />
                      <span>{t.favorites}</span>
                    </>
                  ) : (
                    <>
                      <span>{lang === 'kg' ? 'Кыймылсыз мүлктөр' : 'Объекты недвижимости'}</span>
                    </>
                  )}
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  {lang === 'kg' 
                    ? `Табылды: ${filteredProperties.length} мүлк` 
                    : `Найдено: ${filteredProperties.length} предложений`}
                </p>
              </div>

              {/* Buy / Rent tab Selector (Only if not favorites only view) */}
              {!showFavoritesOnly && (
                <div className="bg-slate-200/60 p-1 rounded-xl flex gap-1 w-fit border border-slate-200">
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, type: 'buy' }))}
                    className={`px-4.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                      filters.type === 'buy' 
                        ? 'bg-white text-slate-950 shadow-sm font-extrabold' 
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {lang === 'kg' ? 'Сатып алуу' : 'Купить'}
                  </button>
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, type: 'rent' }))}
                    className={`px-4.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                      filters.type === 'rent' 
                        ? 'bg-white text-slate-950 shadow-sm font-extrabold' 
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {lang === 'kg' ? 'Ижара' : 'Аренда'}
                  </button>
                </div>
              )}
            </div>

            {/* Advanced Filters Bento Grid Panel (Only visible on main catalog) */}
            {!showFavoritesOnly && (
              <div className="bg-white border border-slate-100 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-widest pb-3 border-b border-slate-100">
                  <Filter size={13} className="text-amber-500" />
                  <span>{lang === 'kg' ? 'Чыпкалар' : 'Фильтры поиска'}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* District Dropdown */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{t.district}</label>
                    <select
                      value={filters.district}
                      onChange={(e) => setFilters(prev => ({ ...prev, district: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-700 outline-none focus:ring-1 focus:ring-amber-500 transition-all font-semibold"
                    >
                      {bishkekDistricts.map(d => (
                        <option key={d.id} value={d.id}>{lang === 'kg' ? d.kg : d.ru}</option>
                      ))}
                    </select>
                  </div>

                  {/* Rooms Dropdown */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{t.rooms}</label>
                    <select
                      value={filters.rooms}
                      onChange={(e) => setFilters(prev => ({ ...prev, rooms: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-700 outline-none focus:ring-1 focus:ring-amber-500 transition-all font-semibold"
                    >
                      <option value="all">{lang === 'kg' ? 'Баары' : 'Все бөлмөлөр'}</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4+">4+</option>
                    </select>
                  </div>

                  {/* Series Dropdown */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{t.series}</label>
                    <select
                      value={filters.series}
                      onChange={(e) => setFilters(prev => ({ ...prev, series: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-700 outline-none focus:ring-1 focus:ring-amber-500 transition-all font-semibold"
                    >
                      {housingSeries.map(s => (
                        <option key={s.id} value={s.id}>{lang === 'kg' ? s.kg : s.ru}</option>
                      ))}
                    </select>
                  </div>

                  {/* Pricing Fields Range */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{lang === 'kg' ? 'Баасы (АКШ доллары менен)' : 'Цена (USD)'}</label>
                    <div className="flex gap-2 items-center">
                      <input
                        type="number"
                        placeholder="Min"
                        value={filters.minPrice}
                        onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2.5 text-xs text-slate-700 outline-none focus:ring-1 focus:ring-amber-500 transition-all font-semibold"
                      />
                      <span className="text-slate-400 text-xs">-</span>
                      <input
                        type="number"
                        placeholder="Max"
                        value={filters.maxPrice}
                        onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2.5 text-xs text-slate-700 outline-none focus:ring-1 focus:ring-amber-500 transition-all font-semibold"
                      />
                    </div>
                  </div>
                </div>

                {/* Filter Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 flex-wrap gap-3">
                  <label className="inline-flex items-center gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={filters.isBarterOnly || false}
                      onChange={(e) => setFilters(prev => ({ ...prev, isBarterOnly: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5.5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-[18px] after:w-[18px] after:transition-all peer-checked:bg-blue-600"></div>
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                      {lang === 'kg' 
                        ? 'Бартер менен гана' 
                        : lang === 'en' 
                        ? 'Only with Barter' 
                        : lang === 'ko' 
                        ? '바터 교환 가능만' 
                        : 'Только с бартером'}
                    </span>
                  </label>

                  <div className="flex gap-3">
                    {(filters.search || filters.district !== 'all' || filters.minPrice || filters.maxPrice || filters.rooms !== 'all' || filters.series !== 'all' || filters.isBarterOnly) && (
                      <button
                        id="reset-filters-btn"
                        onClick={handleResetFilters}
                        className="text-xs font-semibold text-rose-500 hover:text-rose-600 px-4 py-2 rounded-xl transition-all hover:bg-rose-50"
                      >
                        {t.reset}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Listings Grid section */}
            <section id="listings-grid-section" className="scroll-mt-24">
              <AnimatePresence mode="popLayout">
                {filteredProperties.length > 0 ? (
                  <motion.div 
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
                  >
                    {filteredProperties.map(property => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                        lang={lang}
                        currency={currency}
                        isFavorite={favorites.includes(property.id)}
                        onToggleFavorite={handleToggleFavorite}
                        onSelect={setSelectedProperty}
                        isOwnerMode={isOwnerMode}
                      />
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-white rounded-3xl border border-slate-100 p-12 text-center max-w-md mx-auto"
                  >
                    <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search size={28} />
                    </div>
                    <h3 className="font-extrabold text-slate-900 text-lg mb-2">
                      {lang === 'kg' ? 'Эч нерсе табылган жок' : 'Ничего не найдено'}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-6">
                      {lang === 'kg' 
                        ? 'Тандалган фильтрлер боюнча эч кандай мүлк табылган жок. Башка параметрлерди тандап көрүңүз.' 
                        : 'Объектов с такими критериями не найдено. Пожалуйста, измените параметры фильтра.'}
                    </p>
                    <button
                      onClick={handleResetFilters}
                      className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-5 rounded-xl text-xs uppercase tracking-wider transition-colors shadow"
                    >
                      {lang === 'kg' ? 'Фильтрлерди тазалоо' : 'Сбросить фильтры'}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>

          </div>
        )}

        {/* TAB: AI ASSISTANT PANEL */}
        {activeTab === 'ai' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex p-3 rounded-full bg-amber-500/10 text-amber-500 mb-1">
                <Bot size={32} className="animate-bounce" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950">
                My Home AI
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto font-medium">
                {t.aiDescription}
              </p>
            </div>

            <AiConsultant
              lang={lang}
              chatHistory={chatHistory}
              onSendMessage={handleSendChatMessage}
              onClearHistory={handleClearHistory}
              isGenerating={isGenerating}
            />
          </div>
        )}

        {/* TAB: MORTGAGE CALCULATOR */}
        {activeTab === 'calculator' && (
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex p-3 rounded-full bg-amber-500/10 text-amber-500 mb-1">
                <Calculator size={32} />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950">
                {t.calculator}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto font-medium">
                {lang === 'kg' 
                  ? 'Бишкек шаарындагы кыймылсыз мүлктүн баасына жараша ипотекалык айлык төлөмдү тез арада эсептеңиз.' 
                  : 'Быстрый расчет ежемесячного платежа по ипотеке на основе рыночных процентных ставок в Бишкеке.'}
              </p>
            </div>

            <MortgageCalc
              lang={lang}
              currency={currency}
            />
          </div>
        )}

        {/* TAB: ABOUT US */}
        {activeTab === 'about' && (
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Mission Section */}
            <div className="bg-white border border-slate-100 rounded-3xl p-8 sm:p-10 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest block">{lang === 'kg' ? 'Агенттик тууралуу' : 'О компании'}</span>
                <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  My Home Bishkek
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  {t.aboutText}
                </p>
                <div className="flex gap-4 pt-2">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <MapPin size={14} className="text-amber-500" />
                    <span>{t.legalAddress}</span>
                  </div>
                </div>
              </div>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow">
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800"
                  alt="My Home Bishkek Office"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Our Agents Listing Profiles */}
            <section className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-bold text-slate-900 tracking-tight uppercase">
                  {t.ourAgents}
                </h3>
                <p className="text-xs text-slate-400 mt-1">{lang === 'kg' ? 'Сизге жардам берүүгө даяр кесипкөйлөр' : 'Профессионалы, готовые помочь вам на каждом этапе сделки'}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {agents.map(agent => {
                  const agentRole = lang === 'kg' 
                    ? agent.roleKg 
                    : lang === 'en' 
                    ? (agent.roleEn || agent.roleRu) 
                    : lang === 'ko' 
                    ? (agent.roleKo || agent.roleRu) 
                    : agent.roleRu;

                  return (
                    <div key={agent.id} className="bg-white rounded-2xl border border-slate-150 p-6 text-center space-y-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                      <div className="space-y-4">
                        <img
                          src={agent.photo}
                          alt={agent.name}
                          referrerPolicy="no-referrer"
                          className="w-20 h-20 rounded-full object-cover mx-auto border-2 border-slate-100 shadow"
                        />
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">{agent.name}</h4>
                          <p className="text-[10px] text-slate-500 font-medium mt-0.5 min-h-[30px] flex items-center justify-center">{agentRole}</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 pt-2 text-xs">
                        <a
                          href={agent.whatsApp}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <MessageSquare size={13} />
                          <span>WhatsApp'та жазуу</span>
                        </a>
                        <a
                          href={`tel:${agent.phone}`}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <Phone size={13} />
                          <span className="truncate">{agent.phone}</span>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

          </div>
        )}

        {/* TAB: TOUR PROGRAM */}
        {activeTab === 'tour' && (
          <div className="max-w-7xl mx-auto">
            <TourProgram
              lang={lang}
              agencyPhone="+996 995 288 288"
            />
          </div>
        )}

        {/* TAB: REGISTRATION GUIDE */}
        {activeTab === 'registration' && (
          <div className="max-w-7xl mx-auto">
            <RegistrationGuide
              lang={lang}
              agencyPhone="+996 995 288 288"
            />
          </div>
        )}

        {/* TAB: MARKET INSIGHTS */}
        {activeTab === 'insights' && (
          <div className="max-w-7xl mx-auto animate-fadeIn">
            <MarketInsights
              lang={lang}
              currency={currency}
              properties={properties}
              onSelectProperty={setSelectedProperty}
            />
          </div>
        )}

        {/* TAB: 2GIS MAP */}
        {activeTab === 'map' && (
          <div className="max-w-7xl mx-auto animate-fadeIn">
            <TwoGisMap
              properties={properties}
              lang={lang}
              currency={currency}
              onSelectProperty={setSelectedProperty}
            />
          </div>
        )}

      </main>

      {/* 4. FOOTER */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white">
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center border border-amber-500/20">
                <Home size={18} />
              </div>
              <span className="font-bold text-base tracking-wider uppercase">My Home Bishkek</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed max-w-xs">
              {lang === 'kg' 
                ? 'Бишкек шаарындагы кыймылсыз мүлктү тез, коопсуз жана пайдалуу сатып алуу-сатуу боюнча Сиздин ишенимдүү өнөктөшүңүз.' 
                : 'Ваш надежный партнер для быстрой, безопасной и выгодной покупки и продажи недвижимости в Бишкеке.'}
            </p>
          </div>

          {/* Location & Legal Address */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white text-xs uppercase tracking-widest">{lang === 'kg' ? 'Байланышуу' : 'Контакты'}</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin size={13} className="text-amber-500 shrink-0" />
                <span>{t.legalAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={13} className="text-amber-500 shrink-0" />
                <span>{t.workingHours}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={13} className="text-amber-500 shrink-0" />
                <span>+996 995 288 288</span>
              </div>
            </div>
          </div>

          {/* AI Info & Copyright */}
          <div className="space-y-3 text-[11px] leading-relaxed">
            <h4 className="font-bold text-white text-xs uppercase tracking-widest">My Home AI</h4>
            <p className="text-slate-400">
              {lang === 'kg' 
                ? 'Сервердик жасалма интеллект технологиясы менен камсыздалган AI-консультант Бишкектин кыймылсыз мүлк баалары тууралуу каалаган маалыматты бере алат.' 
                : 'Наш ИИ-консультант, работающий на серверной технологии искусственного интеллекта, всегда готов проконсультировать вас по актуальным ценам.'}
            </p>
            <p className="text-[10px] text-slate-500 pt-1">
              &copy; {new Date().getFullYear()} My Home Bishkek. {t.allRightsReserved}
            </p>
          </div>

        </div>
      </footer>

      {/* 5. PORTAL / MODALS CONTROLLER */}
      
      {/* Property Details Sheet Modal */}
      <AnimatePresence>
        {selectedProperty && (
          <PropertyDetailsModal
            property={selectedProperty}
            agent={agents.find(a => a.id === selectedProperty.agentId)}
            lang={lang}
            currency={currency}
            onClose={() => setSelectedProperty(null)}
            onSubmitLead={handleAddLead}
            isOwnerMode={isOwnerMode}
          />
        )}
      </AnimatePresence>

      {/* Submit Custom Listing Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <AddListingModal
            lang={lang}
            onClose={() => setIsAddModalOpen(false)}
            onAddProperty={handleAddProperty}
          />
        )}
      </AnimatePresence>

    </div>
  );
}

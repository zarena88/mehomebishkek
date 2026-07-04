import React, { useState } from 'react';
import { Property, Agent, Lead } from '../types';
import { X, Phone, Mail, Calendar, User, MessageSquare, Send, CheckCircle2, Lock, Unlock, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PropertyDetailsModalProps {
  property: Property;
  agent: Agent | undefined;
  lang: 'kg' | 'ru' | 'en' | 'ko';
  currency: 'USD' | 'KGS';
  onClose: () => void;
  onSubmitLead: (lead: Omit<Lead, 'id' | 'date'>) => void;
  isOwnerMode?: boolean;
}

export const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({
  property,
  agent,
  lang,
  currency,
  onClose,
  onSubmitLead,
  isOwnerMode = false
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formatPrice = (priceInUsd: number) => {
    if (currency === 'USD') {
      return `$${priceInUsd.toLocaleString()}`;
    } else {
      const priceInKgs = priceInUsd * 89;
      return `${priceInKgs.toLocaleString()} сом`;
    }
  };

  const title = lang === 'kg' ? property.titleKg : lang === 'en' ? (property.titleEn || property.titleRu) : lang === 'ko' ? (property.titleKo || property.titleRu) : property.titleRu;
  const district = lang === 'kg' ? property.districtKg : lang === 'en' ? (property.districtEn || property.districtRu) : lang === 'ko' ? (property.districtKo || property.districtRu) : property.districtRu;
  const address = lang === 'kg' ? property.addressKg : lang === 'en' ? (property.addressEn || property.addressRu) : lang === 'ko' ? (property.addressKo || property.addressRu) : property.addressRu;
  const series = lang === 'kg' ? property.seriesKg : lang === 'en' ? (property.seriesEn || property.seriesRu) : lang === 'ko' ? (property.seriesKo || property.seriesRu) : property.seriesRu;
  const desc = lang === 'kg' ? property.descriptionKg : lang === 'en' ? (property.descriptionEn || property.descriptionRu) : lang === 'ko' ? (property.descriptionKo || property.descriptionRu) : property.descriptionRu;

  const isHiddenInfo = property.isCustom && !isOwnerMode && !property.revealContacts;
  const displayAddress = isHiddenInfo
    ? (lang === 'kg' ? 'Дареги жашырылган (сайттын ээсине гана көрүнөт)' : lang === 'en' ? 'Address hidden (visible to site owner only)' : lang === 'ko' ? '주소 숨김됨 (사이트 소유자에게만 표시)' : 'Адрес скрыт (виден только владельцу сайта)')
    : address;

  const agentRole = agent ? (lang === 'kg' ? agent.roleKg : lang === 'en' ? (agent.roleEn || agent.roleRu) : lang === 'ko' ? (agent.roleKo || agent.roleRu) : agent.roleRu) : '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    onSubmitLead({
      name,
      phone,
      email,
      message: message || (lang === 'kg' ? `Мүлккө кызыгуу: ${title}` : lang === 'en' ? `Interested in property: ${title}` : lang === 'ko' ? `매물 관심 상담: ${title}` : `Интересует объект: ${title}`),
      propertyId: property.id
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      />

      {/* Modal Container */}
      <motion.div
        id="property-details-modal"
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto z-10 flex flex-col"
      >
        {/* Header Image & Title Banner */}
        <div className="relative h-[250px] sm:h-[350px] shrink-0">
          <img
            src={property.image}
            alt={title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent" />
          
          <button
            id="close-details-btn"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/50 hover:bg-slate-900/80 text-white backdrop-blur-md transition-all active:scale-95"
          >
            <X size={20} />
          </button>

          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2.5 inline-block ${
              property.type === 'buy' ? 'bg-amber-500' : 'bg-emerald-500'
            }`}>
              {property.type === 'buy' 
                ? (lang === 'kg' ? 'Сатуу' : lang === 'en' ? 'Buy' : lang === 'ko' ? '매매' : 'Продажа') 
                : (lang === 'kg' ? 'Ижара' : lang === 'en' ? 'Rent' : lang === 'ko' ? '임대' : 'Аренда')}
            </span>
            <h2 className="text-xl sm:text-3xl font-bold tracking-tight mb-2 drop-shadow-md">
              {title}
            </h2>
            <div className="text-xs sm:text-sm text-slate-200 flex flex-wrap items-center gap-1.5 drop-shadow-sm">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>{district}, {displayAddress}</span>
              {isHiddenInfo && (
                <span className="flex items-center gap-1 bg-amber-500 text-slate-950 font-bold px-2 py-0.5 rounded text-[10px] ml-2 shrink-0">
                  <Lock size={10} />
                  {lang === 'kg' ? 'Жашырылган дарек' : lang === 'en' ? 'Hidden address' : lang === 'ko' ? '숨겨진 주소' : 'Скрытый адрес'}
                </span>
              )}
              {property.isCustom && isOwnerMode && (
                <span className="flex items-center gap-1 bg-emerald-500 text-white font-bold px-2 py-0.5 rounded text-[10px] ml-2 shrink-0 animate-pulse">
                  <Unlock size={10} />
                  {lang === 'kg' ? 'Сайттын ээси көрүүдө' : lang === 'en' ? 'Site owner mode' : lang === 'ko' ? '사이트 소유자 모드' : 'Владелец сайта видит'}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Details (Col-span 2) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Highlights Bar */}
            <div className="grid grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl text-center">
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">
                  {lang === 'kg' ? 'Бөлмө саны' : lang === 'en' ? 'Rooms' : lang === 'ko' ? '방 수' : 'Комнаты'}
                </p>
                <p className="text-base sm:text-lg font-bold text-slate-800">{property.rooms}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">
                  {lang === 'kg' ? 'Аянты' : lang === 'en' ? 'Area' : lang === 'ko' ? '면적' : 'Площадь'}
                </p>
                <p className="text-base sm:text-lg font-bold text-slate-800">{property.m2} м²</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">
                  {lang === 'kg' ? 'Кабат' : lang === 'en' ? 'Floor' : lang === 'ko' ? '층수' : 'Этаж'}
                </p>
                <p className="text-base sm:text-lg font-bold text-slate-800">{property.floor}/{property.maxFloor}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">
                  {lang === 'kg' ? 'Серия' : lang === 'en' ? 'Series' : lang === 'ko' ? '시리즈' : 'Серия'}
                </p>
                <p className="text-xs sm:text-sm font-bold text-slate-800 truncate px-1" title={series}>{series}</p>
              </div>
            </div>

            {/* Price Information */}
            <div className="border-b border-slate-100 pb-5">
              <p className="text-xs text-slate-400 font-medium mb-1">
                {lang === 'kg' ? 'Мүлктүн баасы' : lang === 'en' ? 'Property Value' : lang === 'ko' ? '매물 가격' : 'Стоимость объекта'}
              </p>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{formatPrice(property.priceUsd)}</span>
                {property.type === 'rent' && (
                  <span className="text-sm text-slate-500 font-semibold">
                    {lang === 'kg' ? '/ айына' : lang === 'en' ? '/ month' : lang === 'ko' ? '/ 월' : '/ месяц'}
                  </span>
                )}
              </div>
            </div>

            {/* Barter Option Information Box */}
            {property.isBarter && (
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-center gap-3.5 text-blue-900 shadow-sm shrink-0">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                  <RefreshCw className="animate-spin duration-10000 text-blue-500" size={18} />
                </div>
                <div>
                  <h5 className="font-bold text-xs uppercase tracking-wider text-blue-800">
                    {lang === 'kg' 
                      ? 'Бартер / Алмашуу каралат' 
                      : lang === 'en' 
                      ? 'Barter / Exchange considered' 
                      : lang === 'ko' 
                      ? '바터 대물 교환 가능' 
                      : 'Рассматривается бартер / обмен'}
                  </h5>
                  <p className="text-xs text-blue-700 mt-0.5 leading-relaxed">
                    {lang === 'kg'
                      ? 'Бул мүлктүн ээси автоунаага же башка кыймылсыз мүлккө алмашуу сунуштарын кароого даяр.'
                      : lang === 'en'
                      ? 'The owner of this property is open to exchange offers (car or other real estate options).'
                      : lang === 'ko'
                      ? '이 매물의 소유자는 차량 또는 다른 부동산 등으로 교환 거래 제안을 수락할 의향이 있습니다.'
                      : 'Владелец готов рассмотреть предложения обмена на автомобиль или другие объекты недвижимости.'}
                  </p>
                </div>
              </div>
            )}

            {/* Description */}
            <div>
              <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3">
                {lang === 'kg' ? 'Мүнөздөмөсү' : lang === 'en' ? 'Description' : lang === 'ko' ? '상세 설명' : 'Описание'}
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                {desc}
              </p>
            </div>

            {/* Confidential Owner Contact Info (For user request) */}
            {property.isCustom && (
              <div className={`p-5 rounded-2xl border transition-all ${
                property.revealContacts
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900 shadow-sm'
                  : isOwnerMode 
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
                  : 'bg-amber-50/50 border-amber-200/50 text-slate-700'
              }`}>
                {property.revealContacts ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Unlock className="text-emerald-600 shrink-0" size={18} />
                      <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-800">
                        {lang === 'kg' ? 'Ээсинин байланыш маалыматы ачык (Акы төлөнгөн)' : lang === 'en' ? 'Owner Contact Info Public (Paid)' : lang === 'ko' ? '매물 소유자 연락처 공개 (유료)' : 'Контакты владельца открыты (Оплачено)'}
                      </h4>
                    </div>
                    <p className="text-xs leading-relaxed text-emerald-700">
                      {lang === 'kg'
                        ? 'Бул жарнама берүүчү байланыш маалыматтарын жана дарегин ачык көрсөтүү үчүн акы төлөгөн. Сиз үй ээси менен түз байланыша аласыз.'
                        : lang === 'en'
                        ? 'This advertiser paid to publish their contact details and address publicly. You can contact the owner directly.'
                        : lang === 'ko'
                        ? '본 등록자는 연락처 및 상세 주소를 공개하기 위해 유료 옵션을 선택했습니다. 소유자와 직접 통화가 가능합니다.'
                        : 'Автор этого объявления оплатил услугу открытой публикации своих контактов и адреса. Вы можете связаться напрямую.'}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <div className="bg-white px-4 py-2.5 rounded-xl border border-emerald-100 flex items-center gap-2 text-slate-900 shadow-sm font-semibold text-sm">
                        <Phone size={14} className="text-emerald-600" />
                        <span>{property.ownerPhone || '—'}</span>
                      </div>
                      {property.ownerPhone && (
                        <a
                          href={`tel:${property.ownerPhone}`}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-sm shadow-emerald-600/10 active:scale-95 flex items-center gap-1.5"
                        >
                          <Phone size={12} />
                          {lang === 'kg' ? 'Үй ээсине чалуу' : lang === 'en' ? 'Call Owner' : lang === 'ko' ? '소유자에게 전화하기' : 'Позвонить владельцу'}
                        </a>
                      )}
                    </div>
                  </div>
                ) : isOwnerMode ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Unlock className="text-emerald-600 shrink-0" size={18} />
                      <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-800">
                        {lang === 'kg' ? 'Ээсинин байланыш маалыматы (Сайттын ээси режими)' : lang === 'en' ? 'Owner Contact Info (Site Owner Mode)' : lang === 'ko' ? '매물 소유자 연락처 (사이트 소유자 모드)' : 'Контактные данные владельца (Режим владельца сайта)'}
                      </h4>
                    </div>
                    <p className="text-xs leading-relaxed text-emerald-700">
                      {lang === 'kg'
                        ? 'Бул жарнаманы кошкон адамдын телефон номери жана толук дареги коопсуз жашырылган. Алар Сизге гана (сайттын ээси катары) көрүнүп турат.'
                        : lang === 'en'
                        ? 'The contact phone and exact address of the person who added this listing are securely hidden. They are visible only to you (as the site owner).'
                        : lang === 'ko'
                        ? '이 매물을 등록한 사람의 연락처와 정확한 주소는 안전하게 보호됩니다. 사이트 관리자인 귀하만 열람할 수 있습니다.'
                        : 'Номер телефона автора объявления и его точный адрес надежно скрыты. Они доступны только Вам как владельцу сайта.'}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <div className="bg-white px-4 py-2.5 rounded-xl border border-emerald-100 flex items-center gap-2 text-slate-900 shadow-sm font-semibold text-sm">
                        <Phone size={14} className="text-emerald-600" />
                        <span>{property.ownerPhone || '—'}</span>
                      </div>
                      {property.ownerPhone && (
                        <a
                          href={`tel:${property.ownerPhone}`}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-sm shadow-emerald-600/10 active:scale-95 flex items-center gap-1.5"
                        >
                          <Phone size={12} />
                          {lang === 'kg' ? 'Үй ээсине чалуу' : lang === 'en' ? 'Call Owner' : lang === 'ko' ? '소유자에게 전화하기' : 'Позвонить владельцу'}
                        </a>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Lock className="text-amber-500 shrink-0" size={18} />
                      <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                        {lang === 'kg' ? 'Баштапкы байланыш маалыматы жашырылган' : lang === 'en' ? 'Confidential contact info is hidden' : lang === 'ko' ? '개인 연락처 정보 숨김됨' : 'Контактная информация автора скрыта'}
                      </h4>
                    </div>
                    <p className="text-xs leading-relaxed text-slate-500">
                      {lang === 'kg'
                        ? 'Бул жарнаманы кошкон колдонуучунун телефон номери жана толук дареги сайттын коопсуздук эрежелерине ылайык жашырылган жана сайттын ээсинде гана коопсуз сакталат. Байланышуу үчүн оң жактагы форманы толтуруңуз же жооптуу агентке кайрылыңыз.'
                        : lang === 'en'
                        ? 'The contact number and exact address of this custom listing author are hidden for security reasons and saved securely only for the site owner. To get in touch, please complete the booking form on the right or message our assigned agent.'
                        : lang === 'ko'
                        ? '이 개별 등록 매물 소유자의 연락처와 주소는 개인정보 보호를 위해 비공개 처리되었습니다. 에이전트에게 문의하시거나 우측 상담 신청 양식을 작성해 주세요.'
                        : 'Номер телефона автора этого объявления и его точный адрес скрыты в целях безопасности и доступны только владельцу сайта. Для связи заполните форму справа или обратитесь к ответственному агенту.'}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Dedicated Agent profile Card */}
            {agent && (
              <div className="bg-slate-50/70 border border-slate-100 p-5 rounded-2xl">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3.5">
                  {lang === 'kg' ? 'Жооптуу агент' : lang === 'en' ? 'Assigned Agent' : lang === 'ko' ? '담당 에이전트' : 'Ответственный агент'}
                </h4>
                <div className="flex items-center gap-4">
                  <img
                    src={agent.photo}
                    alt={agent.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md shrink-0"
                  />
                  <div>
                    <h5 className="font-bold text-slate-800 text-base">{agent.name}</h5>
                    <p className="text-xs text-slate-500 mb-2">{agentRole}</p>
                    <div className="flex flex-wrap gap-2">
                      <a
                        href={agent.whatsApp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg inline-flex items-center gap-1 transition-colors"
                      >
                        <MessageSquare size={13} />
                        WhatsApp
                      </a>
                      <a
                        href={`tel:${agent.phone}`}
                        className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg inline-flex items-center gap-1 transition-colors"
                      >
                        <Phone size={13} />
                        {lang === 'kg' ? 'Чалуу' : lang === 'en' ? 'Call' : lang === 'ko' ? '전화' : 'Позвонить'}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Lead Booking Form (Col-span 1) */}
          <div className="lg:col-span-1">
            <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-6 sticky top-0">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <h4 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
                      <Calendar size={18} className="text-amber-500" />
                      {lang === 'kg' ? 'Көрүүгө жазылуу' : 'Запись на показ'}
                    </h4>
                    
                    <form onSubmit={handleSubmit} className="space-y-3.5">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                          {lang === 'kg' ? 'Атыңыз' : 'Ваше имя'} <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="text"
                            required
                            placeholder={lang === 'kg' ? 'Аскар Асанов' : 'Иван Иванов'}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                          {lang === 'kg' ? 'Телефон номериңиз' : 'Номер телефона'} <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="tel"
                            required
                            placeholder="+996 (555) 12-34-56"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                          E-mail ({lang === 'kg' ? 'милдеттүү эмес' : 'необязательно'})
                        </label>
                        <div className="relative">
                          <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="email"
                            placeholder="mail@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                          {lang === 'kg' ? 'Кабар' : 'Сообщение'}
                        </label>
                        <textarea
                          rows={3}
                          placeholder={lang === 'kg' ? 'Качан көрсөтө аласыз? Сүйлөшүүгө даярмын...' : 'Когда возможен показ? Интересует торг...'}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none resize-none transition-all"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 rounded-xl text-xs tracking-wide transition-all active:scale-[0.98] flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <Send size={13} />
                        {lang === 'kg' ? 'Арыз жөнөтүү' : 'Отправить заявку'}
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-8 space-y-4"
                  >
                    <div className="inline-flex p-3 rounded-full bg-emerald-100 text-emerald-600 mb-1">
                      <CheckCircle2 size={36} />
                    </div>
                    <h5 className="text-base font-bold text-slate-900">
                      {lang === 'kg' ? 'Арыз жөнөтүлдү!' : 'Заявка отправлена!'}
                    </h5>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {lang === 'kg' 
                        ? 'Агент жакынкы убакта сиз менен телефон аркылуу байланышат.' 
                        : 'Наш специалист свяжется с вами по указанному номеру в течение 15 минут.'}
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-xs font-semibold text-amber-500 hover:text-amber-600 underline"
                    >
                      {lang === 'kg' ? 'Жаңы арыз жөнөтүү' : 'Отправить еще одну'}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

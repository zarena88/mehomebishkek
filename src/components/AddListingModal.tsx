import React, { useState } from 'react';
import { Property } from '../types';
import { X, Plus, Upload, Sparkles, Building, MapPin, Tag, Phone, Lock, Unlock } from 'lucide-react';
import { bishkekDistricts, housingSeries } from '../data';
import { motion } from 'motion/react';

interface AddListingModalProps {
  lang: 'kg' | 'ru' | 'en' | 'ko';
  onClose: () => void;
  onAddProperty: (property: Omit<Property, 'id' | 'addedDate'>) => void;
}

export const AddListingModal: React.FC<AddListingModalProps> = ({
  lang,
  onClose,
  onAddProperty
}) => {
  const [type, setType] = useState<'buy' | 'rent'>('buy');
  const [titleKg, setTitleKg] = useState('');
  const [titleRu, setTitleRu] = useState('');
  const [priceUsd, setPriceUsd] = useState('');
  const [districtId, setDistrictId] = useState('center');
  const [addressKg, setAddressKg] = useState('');
  const [addressRu, setAddressRu] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [rooms, setRooms] = useState('2');
  const [m2, setM2] = useState('60');
  const [floor, setFloor] = useState('4');
  const [maxFloor, setMaxFloor] = useState('9');
  const [seriesId, setSeriesId] = useState('elite');
  const [descriptionKg, setDescriptionKg] = useState('');
  const [descriptionRu, setDescriptionRu] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isBarter, setIsBarter] = useState(false);
  const [revealContacts, setRevealContacts] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleKg || !titleRu || !priceUsd || !addressKg || !addressRu || !ownerPhone) return;

    const districtObj = bishkekDistricts.find(d => d.id === districtId) || bishkekDistricts[1];
    const seriesObj = housingSeries.find(s => s.id === seriesId) || housingSeries[1];

    // Default image if empty
    const img = imageUrl.trim() || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800';

    onAddProperty({
      titleKg,
      titleRu,
      priceUsd: parseInt(priceUsd) || 50000,
      districtKg: districtObj.kg,
      districtRu: districtObj.ru,
      addressKg,
      addressRu,
      rooms: parseInt(rooms) || 2,
      m2: parseInt(m2) || 60,
      floor: parseInt(floor) || 4,
      maxFloor: parseInt(maxFloor) || 9,
      seriesKg: seriesObj.kg,
      seriesRu: seriesObj.ru,
      descriptionKg: descriptionKg || titleKg,
      descriptionRu: descriptionRu || titleRu,
      image: img,
      type,
      agentId: 'agent-3', // Abdymanap is the default sales manager for user-added listings
      isPopular: false,
      ownerPhone,
      isCustom: true,
      isBarter,
      revealContacts
    });

    setIsSuccess(true);
    setTimeout(() => {
      onClose();
    }, 2000);
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

      {/* Modal Content */}
      <motion.div
        id="add-listing-modal"
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto z-10 flex flex-col"
      >
        {/* Header */}
        <div className="border-b border-slate-100 px-6 py-4 flex items-center justify-between sticky top-0 bg-white z-20 shrink-0">
          <div className="flex items-center gap-2">
            <Plus size={18} className="text-amber-500" />
            <h3 className="font-bold text-slate-800 text-base">
              {lang === 'kg' ? 'Жарнама кошуу' : 'Добавить объявление'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        {isSuccess ? (
          <div className="p-12 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <Sparkles size={32} />
            </div>
            <h4 className="text-lg font-bold text-slate-900">
              {lang === 'kg' ? 'Ийгиликтүү кошулду!' : 'Успешно добавлено!'}
            </h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
              {lang === 'kg' 
                ? 'Сиздин батириңиз каталогго ийгиликтүү кошулду. Азыр баракчадан көрө аласыз.' 
                : 'Ваше объявление успешно добавлено в каталог и доступно на главной странице.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Type Selector (Buy vs Rent) */}
            <div className="bg-slate-100 p-1 rounded-xl flex gap-1 w-fit">
              <button
                type="button"
                onClick={() => setType('buy')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  type === 'buy' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {lang === 'kg' ? 'Сатуу' : 'Продажа'}
              </button>
              <button
                type="button"
                onClick={() => setType('rent')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  type === 'rent' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {lang === 'kg' ? 'Ижара' : 'Аренда'}
              </button>
            </div>

            {/* Price (USD) */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                {lang === 'kg' ? 'Баасы (АКШ доллары менен)' : 'Цена (в долларах США)'} <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">$</span>
                <input
                  type="number"
                  required
                  placeholder="e.g. 75000"
                  value={priceUsd}
                  onChange={(e) => setPriceUsd(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-4 py-2.5 text-xs text-slate-800 font-semibold focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
                />
              </div>
            </div>

            {/* Bilingual Titles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Жарнаманын аты (Кыргызча) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="мис: Жалда 2 бөлмөлүү батир сатылат"
                  value={titleKg}
                  onChange={(e) => setTitleKg(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Название объявления (Русский) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="напр: Продается 2-комнатная квартира в Джале"
                  value={titleRu}
                  onChange={(e) => setTitleRu(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
                />
              </div>
            </div>

            {/* District & Series */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  {lang === 'kg' ? 'Район' : 'Район'}
                </label>
                <select
                  value={districtId}
                  onChange={(e) => setDistrictId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
                >
                  {bishkekDistricts.filter(d => d.id !== 'all').map(d => (
                    <option key={d.id} value={d.id}>
                      {lang === 'kg' ? d.kg : d.ru}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  {lang === 'kg' ? 'Сериясы' : 'Серия'}
                </label>
                <select
                  value={seriesId}
                  onChange={(e) => setSeriesId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
                >
                  {housingSeries.filter(s => s.id !== 'all').map(s => (
                    <option key={s.id} value={s.id}>
                      {lang === 'kg' ? s.kg : s.ru}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Owner Contact Information (Confidential) */}
            <div className="bg-amber-50/50 border border-amber-200/60 rounded-2xl p-4.5 space-y-3">
              <div className="flex items-start gap-2 text-amber-800">
                <Lock size={16} className="shrink-0 mt-0.5 text-amber-600" />
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider">
                    {lang === 'kg' ? 'Көбүрөөк коопсуздук жана жашыруундуулук' : 'Конфиденциальность данных'}
                  </h4>
                  <p className="text-[11px] text-amber-700/90 leading-relaxed">
                    {lang === 'kg' 
                      ? 'Сиз жазган телефон номериңиз жана толук дарегиңиз сатып алуучулардан толугу менен жашырылат. Аларды сайттын ээси гана көрө алат.'
                      : 'Введенный вами номер телефона и точный адрес будут скрыты от обычных покупателей. Их сможет видеть только владелец сайта.'}
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  {lang === 'kg' ? 'Байланыш телефон номериңиз' : 'Ваш контактный номер телефона'} <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Phone size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="tel"
                    required
                    placeholder="+996 (555) 123-456"
                    value={ownerPhone}
                    onChange={(e) => setOwnerPhone(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl pl-8 pr-3 py-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all font-semibold"
                  />
                </div>
              </div>

              {/* Option to show contacts (paid) */}
              <div className="pt-2 border-t border-amber-200/40 flex flex-col space-y-2">
                <label className="inline-flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={revealContacts}
                    onChange={(e) => setRevealContacts(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-amber-500 focus:ring-amber-500"
                  />
                  <span className="text-[11px] font-bold text-slate-700 leading-tight">
                    {lang === 'kg' 
                      ? 'Телефон номеримди жана толук дарегимди жашырбай, ачык көрсөтүү (Акы төлөнүүчү кызмат)' 
                      : lang === 'en' 
                      ? 'Do not hide my phone number and exact address, show them publicly (Paid service)' 
                      : lang === 'ko' 
                      ? '내 전화번호와 정확한 주소를 숨기지 않고 공개 (유료 서비스)' 
                      : 'Не скрывать мой номер телефона и точный адрес, показывать их открыто (Платная услуга)'}
                  </span>
                </label>

                {revealContacts && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-rose-900 text-[11px] leading-relaxed flex items-start gap-2"
                  >
                    <Unlock size={14} className="shrink-0 mt-0.5 text-rose-500" />
                    <div>
                      <p className="font-bold text-rose-800">
                        {lang === 'kg' 
                          ? 'Акы төлөө талап кылынат!' 
                          : lang === 'en' 
                          ? 'Payment required!' 
                          : lang === 'ko' 
                          ? '결제가 필요한 서비스입니다!' 
                          : 'Требуется оплата услуги!'}
                      </p>
                      <p className="text-rose-700/90 mt-0.5">
                        {lang === 'kg'
                          ? 'Конфиденциалдуулукту өчүрүү жана маалыматты ачык жарыялоо акы төлөнүүчү негизде гана иштейт. Биздин менеджер жарнаманы текшерүүдө сиз менен байланышып, төлөм шарттарын түшүндүрөт.'
                          : lang === 'en'
                          ? 'Disabling privacy and publishing contact details publicly is a paid feature. Our manager will contact you during verification to explain the payment terms.'
                          : lang === 'ko'
                          ? '개인정보 보호 기능을 비활성화하고 연락처를 공개적으로 노출하는 것은 유료 서비스입니다. 담당 매니저가 매물 확인 전화를 통해 결제 절차를 안내해 드립니다.'
                          : 'Отключение конфиденциальности и открытая публикация контактных данных осуществляются на платной основе. Наш менеджер свяжется с вами при верификации для обсуждения оплаты.'}
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Bilingual Addresses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Дареги (Кыргызча) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <MapPin size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="мис: Тыналиев көчөсү, 12, батир 45"
                    value={addressKg}
                    onChange={(e) => setAddressKg(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Адрес (Русский) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <MapPin size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="напр: ул. Тыналиева, 12, кв 45"
                    value={addressRu}
                    onChange={(e) => setAddressRu(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Specs Grid: Rooms, m2, Floor, MaxFloor */}
            <div className="grid grid-cols-4 gap-2 bg-slate-100/50 p-3 rounded-xl border border-slate-100">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                  {lang === 'kg' ? 'Бөлмө' : 'Комнаты'}
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={rooms}
                  onChange={(e) => setRooms(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-center text-slate-800 font-bold outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                  {lang === 'kg' ? 'Аянты' : 'Площадь'}
                </label>
                <input
                  type="number"
                  min="10"
                  max="500"
                  value={m2}
                  onChange={(e) => setM2(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-center text-slate-800 font-bold outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                  {lang === 'kg' ? 'Кабат' : 'Этаж'}
                </label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={floor}
                  onChange={(e) => setFloor(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-center text-slate-800 font-bold outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                  {lang === 'kg' ? 'Макс. кабат' : 'Всего этаж'}
                </label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={maxFloor}
                  onChange={(e) => setMaxFloor(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-center text-slate-800 font-bold outline-none"
                />
              </div>
            </div>

            {/* Barter Option */}
            <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-4 flex items-center justify-between gap-4">
              <div className="flex flex-col space-y-0.5">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                  {lang === 'kg' 
                    ? 'Бартер / Алмашуу каралабы?' 
                    : lang === 'en' 
                    ? 'Is Barter / Exchange considered?' 
                    : lang === 'ko' 
                    ? '바터 / 교환 가능 여부' 
                    : 'Рассматривается бартер / обмен?'}
                </span>
                <span className="text-[10px] text-slate-500 leading-relaxed max-w-md">
                  {lang === 'kg'
                    ? 'Автоунаага же башка кыймылсыз мүлккө алмашуу сунуштарын кабыл алууга даяр болсоңуз, белгилеп коюңуз.'
                    : lang === 'en'
                    ? 'Check this if you are willing to accept exchange offers (cars, other real estate, etc.).'
                    : lang === 'ko'
                    ? '차량이나 다른 부동산 등 교환 제안을 수락할 의향이 있는 경우 이를 활성화하십시오.'
                    : 'Включите эту опцию, если вы готовы рассматривать варианты обмена на автомобили или другую недвижимость.'}
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer select-none shrink-0">
                <input
                  type="checkbox"
                  checked={isBarter}
                  onChange={(e) => setIsBarter(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
              </label>
            </div>

            {/* Stock Image / URL */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block flex items-center gap-1">
                <Upload size={12} />
                {lang === 'kg' ? 'Сүрөт шилтемеси (милдеттүү эмес)' : 'Ссылка на фото (необязательно)'}
              </label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
              />
            </div>

            {/* Bilingual Descriptions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Толук мүнөздөмөсү (Кыргызча)
                </label>
                <textarea
                  rows={2}
                  placeholder="Батирдин абалы, кошумча шарттар..."
                  value={descriptionKg}
                  onChange={(e) => setDescriptionKg(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none resize-none transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Полное описание (Русский)
                </label>
                <textarea
                  rows={2}
                  placeholder="Состояние квартиры, ремонт, соседи..."
                  value={descriptionRu}
                  onChange={(e) => setDescriptionRu(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none resize-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3.5 rounded-xl text-xs tracking-wide transition-all active:scale-[0.98] flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/10"
            >
              <Building size={14} />
              {lang === 'kg' ? 'Жарнаманы кошуу' : 'Добавить объявление'}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

import React from 'react';
import { Property } from '../types';
import { Heart, Maximize2, Layers, MapPin, Sparkles, Lock, Unlock, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

interface PropertyCardProps {
  property: Property;
  lang: 'kg' | 'ru' | 'en' | 'ko';
  currency: 'USD' | 'KGS';
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelect: (property: Property) => void;
  isOwnerMode?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  lang,
  currency,
  isFavorite,
  onToggleFavorite,
  onSelect,
  isOwnerMode = false
}) => {
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

  const isHiddenInfo = property.isCustom && !isOwnerMode;
  const displayAddress = isHiddenInfo
    ? (lang === 'kg' ? 'Дареги жашырылган' : lang === 'en' ? 'Address hidden' : lang === 'ko' ? '주소 숨김됨' : 'Адрес скрыт')
    : address;

  return (
    <motion.div
      id={`property-card-${property.id}`}
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all flex flex-col h-full"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={property.image}
          alt={title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-md shadow-sm ${
            property.type === 'buy' 
              ? 'bg-amber-500/90 text-white' 
              : 'bg-emerald-500/90 text-white'
          }`}>
            {property.type === 'buy' 
              ? (lang === 'kg' ? 'Сатуу' : lang === 'en' ? 'Buy' : lang === 'ko' ? '매매' : 'Продажа') 
              : (lang === 'kg' ? 'Ижара' : lang === 'en' ? 'Rent' : lang === 'ko' ? '임대' : 'Аренда')}
          </span>
          {property.isBarter && (
            <span className="bg-blue-600/90 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-sm">
              <RefreshCw size={11} className="animate-spin duration-10000" />
              {lang === 'kg' ? 'Бартер' : lang === 'en' ? 'Barter' : lang === 'ko' ? '바터 교환' : 'Бартер'}
            </span>
          )}
          {property.isPopular && (
            <span className="bg-rose-500/90 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-sm">
              <Sparkles size={12} />
              Hot
            </span>
          )}
        </div>
        <button
          id={`favorite-btn-${property.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(property.id);
          }}
          className="absolute top-3 right-3 p-2.5 rounded-full bg-white/90 backdrop-blur-sm text-slate-600 hover:text-rose-500 hover:scale-110 transition-all shadow-md active:scale-95"
        >
          <Heart
            size={18}
            className={`transition-all ${isFavorite ? 'fill-rose-500 text-rose-500 scale-110' : 'text-slate-600'}`}
          />
        </button>
      </div>

      <div className="p-5 flex-grow flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start gap-2 mb-2">
            <span className="text-xl font-bold tracking-tight text-slate-900">
              {formatPrice(property.priceUsd)}
            </span>
            {property.type === 'rent' && (
              <span className="text-xs text-slate-500 font-medium self-end mb-1">
                {lang === 'kg' ? '/ айына' : lang === 'en' ? '/ month' : lang === 'ko' ? '/ 월' : '/ месяц'}
              </span>
            )}
          </div>

          <h3 className="font-semibold text-slate-800 text-base line-clamp-1 mb-2 hover:text-slate-900 transition-colors">
            {title}
          </h3>

          <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-4">
            {isHiddenInfo ? (
              <Lock size={12} className="text-amber-500 shrink-0" />
            ) : property.isCustom && isOwnerMode ? (
              <Unlock size={12} className="text-emerald-500 shrink-0" />
            ) : (
              <MapPin size={13} className="text-amber-500 shrink-0" />
            )}
            <span className={`line-clamp-1 ${isHiddenInfo ? 'text-amber-600 font-semibold bg-amber-50 px-2 py-0.5 rounded-md text-[11px]' : property.isCustom && isOwnerMode ? 'text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md text-[11px]' : ''}`}>
              {district}, {displayAddress}
            </span>
          </div>

          {/* Core Specs Grid */}
          <div className="grid grid-cols-3 gap-2 bg-slate-50/80 p-3 rounded-xl text-xs font-medium text-slate-600 mb-4">
            <div className="flex flex-col items-center justify-center p-1 border-r border-slate-200">
              <span className="text-[10px] text-slate-400 font-normal uppercase tracking-wider mb-0.5">
                {lang === 'kg' ? 'Бөлмө' : lang === 'en' ? 'Rooms' : lang === 'ko' ? '방 수' : 'Комнаты'}
              </span>
              <span className="text-slate-800 font-semibold">{property.rooms}</span>
            </div>
            <div className="flex flex-col items-center justify-center p-1 border-r border-slate-200">
              <span className="text-[10px] text-slate-400 font-normal uppercase tracking-wider mb-0.5">
                {lang === 'kg' ? 'Аянты' : lang === 'en' ? 'Area' : lang === 'ko' ? '면적' : 'Площадь'}
              </span>
              <span className="text-slate-800 font-semibold">{property.m2} {lang === 'kg' ? 'м²' : 'м²'}</span>
            </div>
            <div className="flex flex-col items-center justify-center p-1">
              <span className="text-[10px] text-slate-400 font-normal uppercase tracking-wider mb-0.5">
                {lang === 'kg' ? 'Кабаты' : lang === 'en' ? 'Floor' : lang === 'ko' ? '층수' : 'Этаж'}
              </span>
              <span className="text-slate-800 font-semibold">{property.floor}/{property.maxFloor}</span>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500 mb-4 bg-slate-100/50 py-1 px-2.5 rounded-md w-fit">
            <Layers size={11} className="text-slate-400" />
            <span>{series}</span>
          </div>

          <button
            id={`select-btn-${property.id}`}
            onClick={() => onSelect(property)}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl text-xs font-semibold tracking-wide transition-all shadow-sm hover:shadow active:scale-[0.98]"
          >
            {lang === 'kg' ? 'Кененирээк көрүү' : lang === 'en' ? 'View Details' : lang === 'ko' ? '상세 정보' : 'Подробнее'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

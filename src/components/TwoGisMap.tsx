import React, { useState } from 'react';
import { Property } from '../types';
import { MapPin, Building, ExternalLink, Navigation, Layers, Info } from 'lucide-react';

interface TwoGisMapProps {
  properties: Property[];
  lang: 'kg' | 'ru' | 'en' | 'ko';
  currency: 'USD' | 'KGS';
  onSelectProperty: (property: Property) => void;
}

export const TwoGisMap: React.FC<TwoGisMapProps> = ({
  properties,
  lang,
  currency,
  onSelectProperty
}) => {
  // Default coordinates center of Bishkek
  const defaultLat = 42.8746;
  const defaultLng = 74.5698;

  const [selectedProp, setSelectedProp] = useState<Property | null>(properties[0] || null);
  const [zoom, setZoom] = useState<number>(14);
  const [districtFilter, setDistrictFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'buy' | 'rent'>('all');

  // Translations
  const t = {
    kg: {
      title: "2GIS Интерактивдүү Картасы",
      subtitle: "Бишкек шаарындагы биздин объекттерди 2GIS картасынан көрүңүз",
      sidebarTitle: "Объекттердин тизмеси",
      allDistricts: "Бардык райондор",
      allTypes: "Баардыгы",
      buy: "Сатуу",
      rent: "Ижара",
      viewOnMap: "Картадан көрүү",
      openIn2gis: "2GIS тиркемесинде ачуу",
      detailsBtn: "Кененирээк маалымат",
      floor: "кабат",
      rooms: "бөлмөлүү",
      noProperties: "Бул категорияда объекттер табылган жок.",
      routeTo: "Маршрут куруу"
    },
    ru: {
      title: "Интерактивная Карта 2GIS",
      subtitle: "Просматривайте наши объекты на карте Бишкека через виджет 2GIS",
      sidebarTitle: "Список объектов",
      allDistricts: "Все районы",
      allTypes: "Все типы",
      buy: "Продажа",
      rent: "Аренда",
      viewOnMap: "Показать на карте",
      openIn2gis: "Открыть в приложении 2GIS",
      detailsBtn: "Подробнее об объекте",
      floor: "этаж",
      rooms: "комн.",
      noProperties: "Объекты не найдены в этой категории.",
      routeTo: "Проложить маршрут"
    },
    en: {
      title: "2GIS Interactive Map",
      subtitle: "Browse our properties on the map of Bishkek via 2GIS widget",
      sidebarTitle: "Available Properties",
      allDistricts: "All Districts",
      allTypes: "All Types",
      buy: "Buy",
      rent: "Rent",
      viewOnMap: "Show on Map",
      openIn2gis: "Open in 2GIS App",
      detailsBtn: "View Details",
      floor: "floor",
      rooms: "rms",
      noProperties: "No properties found in this category.",
      routeTo: "Build Route"
    },
    ko: {
      title: "2GIS 대화형 지도",
      subtitle: "2GIS 위젯을 통해 비슈케크 지도에서 부동산 매물을 확인하세요",
      sidebarTitle: "매물 리스트",
      allDistricts: "모든 지역",
      allTypes: "모든 구분",
      buy: "매매",
      rent: "임대",
      viewOnMap: "지도에 표시",
      openIn2gis: "2GIS 앱에서 열기",
      detailsBtn: "상세 정보",
      floor: "층",
      rooms: "개 방",
      noProperties: "이 카테고리에 매물이 없습니다.",
      routeTo: "경로 찾기"
    }
  }[lang] || {
    title: "Интерактивная Карта 2GIS",
    subtitle: "Просматривайте наши объекты на карте Бишкека через виджет 2GIS",
    sidebarTitle: "Список объектов",
    allDistricts: "Все районы",
    allTypes: "Все типы",
    buy: "Продажа",
    rent: "Аренда",
    viewOnMap: "Показать на карте",
    openIn2gis: "Открыть в приложении 2GIS",
    detailsBtn: "Подробнее",
    floor: "этаж",
    rooms: "комн.",
    noProperties: "Объекты не найдены.",
    routeTo: "Маршрут"
  };

  // Get unique districts for filtering
  const districts = ['all', ...Array.from(new Set(properties.map(p => p.districtRu)))];

  // Filter properties
  const filteredProperties = properties.filter(p => {
    const matchesDistrict = districtFilter === 'all' || p.districtRu === districtFilter;
    const matchesType = typeFilter === 'all' || p.type === typeFilter;
    return matchesDistrict && matchesType;
  });

  const activeLat = selectedProp?.lat || defaultLat;
  const activeLng = selectedProp?.lng || defaultLng;

  // Formatting Price
  const formatPrice = (usdPrice: number) => {
    if (currency === 'KGS') {
      const kgsPrice = usdPrice * 89; // Exch rate
      return `${kgsPrice.toLocaleString()} сом`;
    }
    return `$${usdPrice.toLocaleString()}`;
  };

  // 2GIS widget URL
  const mapUrl = `https://widgets.2gis.com/widget?type=doublegis&city=bishkek&id=doublegis&width=100%&height=100%&lat=${activeLat}&lon=${activeLng}&zoom=${zoom}`;

  // Redirect to 2GIS search / coordinate view
  const handleOpenIn2Gis = (p: Property) => {
    if (p.lat && p.lng) {
      // 2GIS direct map URL format with lat,lng and zoom
      window.open(`https://2gis.kg/bishkek/geo/${p.lng}%2C${p.lat}?m=${p.lng}%2C${p.lat}%2F16`, '_blank');
    } else {
      window.open(`https://2gis.kg/bishkek/search/${encodeURIComponent(p.addressRu)}`, '_blank');
    }
  };

  return (
    <div className="space-y-6" id="two-gis-map-section">
      {/* Title block */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span className="p-1.5 bg-blue-500 rounded-xl text-white inline-block">
              <Navigation size={20} className="transform rotate-45" />
            </span>
            {t.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            {t.subtitle}
          </p>
        </div>

        {/* Filters bar */}
        <div className="flex flex-wrap gap-2">
          {/* Type Filter */}
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setTypeFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                typeFilter === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {t.allTypes}
            </button>
            <button
              onClick={() => setTypeFilter('buy')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                typeFilter === 'buy' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {t.buy}
            </button>
            <button
              onClick={() => setTypeFilter('rent')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                typeFilter === 'rent' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {t.rent}
            </button>
          </div>

          {/* District Select */}
          <select
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
            className="bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
          >
            <option value="all">{t.allDistricts}</option>
            {districts.filter(d => d !== 'all').map((dist, idx) => (
              <option key={idx} value={dist}>
                {dist}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Split Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[600px] lg:h-[650px] items-stretch">
        
        {/* Left Side: Sidebar of properties */}
        <div className="lg:col-span-4 bg-white border border-slate-100 rounded-3xl p-5 shadow-sm flex flex-col h-full overflow-hidden">
          <h3 className="font-extrabold text-slate-900 text-sm tracking-tight uppercase border-b border-slate-100 pb-3 mb-4 flex items-center justify-between">
            <span>{t.sidebarTitle}</span>
            <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
              {filteredProperties.length}
            </span>
          </h3>

          <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin">
            {filteredProperties.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs font-medium space-y-2">
                <Layers size={32} className="mx-auto text-slate-300" />
                <p>{t.noProperties}</p>
              </div>
            ) : (
              filteredProperties.map(property => {
                const isSelected = selectedProp?.id === property.id;
                return (
                  <div
                    key={property.id}
                    onClick={() => {
                      setSelectedProp(property);
                      setZoom(15);
                    }}
                    className={`group border rounded-2xl p-3 cursor-pointer transition-all duration-300 flex gap-3 text-left ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50/40 ring-1 ring-blue-500/20'
                        : 'border-slate-100 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden relative shrink-0">
                      <img
                        src={property.image}
                        alt={property.titleRu}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className={`absolute top-1 left-1 text-[8px] font-extrabold px-1.5 py-0.5 rounded text-white shadow-sm uppercase ${
                        property.type === 'buy' ? 'bg-blue-600' : 'bg-emerald-600'
                      }`}>
                        {property.type === 'buy' ? t.buy : t.rent}
                      </span>
                    </div>

                    <div className="flex flex-col justify-between min-w-0 flex-1">
                      <div>
                        <h4 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1 group-hover:text-blue-600 transition-colors">
                          {lang === 'kg' ? property.titleKg : lang === 'en' ? property.titleEn : lang === 'ko' ? property.titleKo : property.titleRu}
                        </h4>
                        <div className="flex items-center gap-1 text-slate-400 text-[10px] mt-1 font-medium">
                          <MapPin size={10} className="shrink-0 text-slate-400" />
                          <span className="truncate">{lang === 'kg' ? property.addressKg : property.addressRu}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-1 mt-2">
                        <span className="font-extrabold text-blue-600 text-xs sm:text-sm">
                          {formatPrice(property.priceUsd)}
                        </span>
                        <span className="text-[10px] text-slate-500 font-bold bg-slate-100 px-2 py-0.5 rounded-md">
                          {property.rooms} {t.rooms} • {property.m2} м²
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Side: Interactive 2GIS Map Widget */}
        <div className="lg:col-span-8 bg-slate-100 rounded-3xl overflow-hidden shadow-inner border border-slate-200/60 relative flex flex-col h-full min-h-[350px]">
          {/* Iframe widget */}
          <iframe
            title="2GIS Map Widget"
            src={mapUrl}
            width="100%"
            height="100%"
            className="border-0 w-full flex-1"
            allowFullScreen
          ></iframe>

          {/* Floater overlay details panel for Selected Property */}
          {selectedProp && (
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur border border-slate-100 p-4 rounded-2xl shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 max-w-full">
              <div className="flex gap-3 items-center min-w-0">
                <div className="p-2.5 bg-blue-500/10 text-blue-600 rounded-xl shrink-0">
                  <Building size={20} />
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] font-extrabold uppercase text-blue-600 tracking-wider block">
                    {lang === 'kg' ? selectedProp.districtKg : selectedProp.districtRu}
                  </span>
                  <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm truncate pr-2">
                    {lang === 'kg' ? selectedProp.titleKg : lang === 'en' ? selectedProp.titleEn : lang === 'ko' ? selectedProp.titleKo : selectedProp.titleRu}
                  </h4>
                  <p className="text-[10px] text-slate-500 truncate font-semibold mt-0.5">
                    {lang === 'kg' ? selectedProp.addressKg : selectedProp.addressRu}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 justify-end sm:justify-start">
                {/* View details */}
                <button
                  onClick={() => onSelectProperty(selectedProp)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-3 py-2 rounded-xl transition-all flex items-center gap-1"
                >
                  <Info size={13} />
                  <span>{t.detailsBtn}</span>
                </button>

                {/* Open in 2GIS */}
                <button
                  onClick={() => handleOpenIn2Gis(selectedProp)}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold px-3.5 py-2 rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center gap-1.5"
                >
                  <ExternalLink size={13} />
                  <span>2GIS</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

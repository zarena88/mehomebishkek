import React, { useState } from 'react';
import { Property } from '../types';
import { 
  TrendingUp, 
  Search, 
  Layers, 
  HelpCircle, 
  Flame, 
  ShieldAlert, 
  CheckCircle, 
  Coins, 
  Scale, 
  Maximize2, 
  Building, 
  Grid,
  Info,
  Award,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MarketInsightsProps {
  lang: 'kg' | 'ru';
  currency: 'USD' | 'KGS';
  properties: Property[];
  onSelectProperty: (property: Property) => void;
}

export const MarketInsights: React.FC<MarketInsightsProps> = ({
  lang,
  currency,
  properties,
  onSelectProperty
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'analytics' | 'series' | 'compare'>('analytics');
  
  // -------------------------------------------------------------
  // Data State for Analytics
  // -------------------------------------------------------------
  const [budgetInput, setBudgetInput] = useState<string>('70000');
  const [selectedDistrictDetail, setSelectedDistrictDetail] = useState<string>('center');
  const [seriesFilter, setSeriesFilter] = useState<string>('all');

  // Bishkek District Statistics Data
  const districtStats = [
    {
      id: 'center',
      nameKg: 'Борбор (Центр)',
      nameRu: 'Центр',
      avgPriceBuyUsd: 1350,
      avgPriceRentUsd: 650,
      trend: 'up',
      percentChange: '+4.8%',
      prosKg: 'Инфраструктура өнүккөн, жогорку суроо-талап, сейил бактар жанында',
      prosRu: 'Развитая инфраструктура, высокий спрос, парки поблизости',
      consKg: 'Унаа тыгындары көп, абанын сапаты начар, кымбат баалар',
      consRu: 'Частые пробки, качество воздуха хуже в пиковые сезоны, высокие цены'
    },
    {
      id: 'asanbay',
      nameKg: 'Асанбай / 12-мкр',
      nameRu: 'Асанбай / 12-мкр',
      avgPriceBuyUsd: 1280,
      avgPriceRentUsd: 550,
      trend: 'up',
      percentChange: '+3.5%',
      prosKg: 'Таза аба, тоого жакын, коопсуз жана тынч район, жаңы үйлөр көп',
      prosRu: 'Чистый воздух, близость к горам, безопасный и тихий район, много новостроек',
      consKg: 'Борбордон алыс, коомдук транспорт кээде узак убакытты алат',
      consRu: 'Удаленность от центра, общественный транспорт в часы пик идет дольше'
    },
    {
      id: 'jal',
      nameKg: 'Жал (Жал-23, 15, 29)',
      nameRu: 'Джал (Джал-23, 15, 29)',
      avgPriceBuyUsd: 1100,
      avgPriceRentUsd: 450,
      trend: 'stable',
      percentChange: '+1.2%',
      prosKg: 'Инфраструктура жакшы, мектептер жана жогорку окуу жайлары жакын, орточо баалар',
      prosRu: 'Хорошая инфраструктура, школы и вузы поблизости, умеренные цены',
      consKg: 'Суу түтүктөрү кээде басымы төмөн, курулуш иштери дагы деле уланууда',
      consRu: 'В пиковые периоды слабый напор воды, местами продолжаются стройки'
    },
    {
      id: 'vostok5',
      nameKg: 'Чыгыш-5 / Түндүк райондор',
      nameRu: 'Восток-5 / Северные районы',
      avgPriceBuyUsd: 980,
      avgPriceRentUsd: 380,
      trend: 'stable',
      percentChange: '+0.8%',
      prosKg: 'Ыңгайлуу транспорттук байланыш, борборго жакын, баасы жеткиликтүү',
      prosRu: 'Удобная транспортная развязка, близость к центру, доступная стоимость',
      consKg: 'Эски советтик үйлөр көп, кээ бир жерлери начар жарыктандырылган',
      consRu: 'Много старого советского жилого фонда, слабая освещенность дворов местами'
    },
    {
      id: 'tunguch',
      nameKg: 'Тунгуч / Чыгыш кичи райондор',
      nameRu: 'Тунгуч / Восточные микрорайоны',
      avgPriceBuyUsd: 920,
      avgPriceRentUsd: 320,
      trend: 'up',
      percentChange: '+2.1%',
      prosKg: 'Жаңы мектептер, тынч аймак, ипотекага алуу оңой, экологиялык тазалык',
      prosRu: 'Новые школы, спокойный район, легче купить в ипотеку, чистый климат',
      consKg: 'Шаардын борборунан абдан алыс жайгашкан, кечкисин тыгындар',
      consRu: 'Значительная удаленность от центра города, заторы по улице Ахунбаева'
    }
  ];

  // -------------------------------------------------------------
  // Housing Series Data
  // -------------------------------------------------------------
  const housingSeriesData = [
    {
      id: '104',
      name: '104-серия',
      years: '1970 - 1980',
      wallsKg: 'Керамзит-бетон панелдери',
      wallsRu: 'Керамзитобетонные панели',
      ceilingHeight: '2.5m',
      kitchenSizeKg: '6 - 7.5 м²',
      kitchenSizeRu: '6 - 7.5 м²',
      prosKg: ['Сейсмикалык туруктуулугу жогору', 'Бөлмөлөрү өзүнчө (көпчүлүк учурда)', 'Борбордук жылытуу абдан жакшы иштейт'],
      prosRu: ['Высокая сейсмостойкость', 'Изолированные комнаты (в большинстве)', 'Очень теплое центральное отопление'],
      consKg: ['Шыптары төмөн (2.5м)', 'Ашканасы тар', 'Батирдин жалпы аянты кичинекей'],
      consRu: ['Низкие потолки (2.5м)', 'Маленькая кухня', 'Небольшая общая площадь квартир'],
      avgPriceBuyUsd: 950,
      descKg: 'Бишкек шаарындагы эң көп таралган советтик сериялардын бири. Баасы орточо болгондуктан, жаш үй-бүлөлөр үчүн ыңгайлуу курам.',
      descRu: 'Одна из самых распространенных советских серий в Бишкеке. Отличный стартовый вариант благодаря доступности по цене.'
    },
    {
      id: '105',
      name: '105-серия',
      years: '1980 - 1995',
      wallsKg: 'Керамзит-бетон же кирпич',
      wallsRu: 'Керамзитобетон или кирпич',
      ceilingHeight: '2.6m',
      kitchenSizeKg: '8 - 9 м²',
      kitchenSizeRu: '8 - 9 м²',
      prosKg: ['Чоң жана кенен лоджиясы бар', 'Ашканасы чоңураак', 'Кире беришинде кошумча коридор (тамбур) түзсө болот'],
      prosRu: ['Большая удобная лоджия', 'Более просторная кухня', 'Возможность сделать тамбур на две квартиры'],
      consKg: ['Панелдик үйлөрдө үн изоляциясы орточо', 'Лифттер гана 9 кабаттуу үйлөрдө бар'],
      consRu: ['Средняя шумоизоляция в панельных домах', 'Лифты присутствуют только в 9-этажках'],
      avgPriceBuyUsd: 1100,
      descKg: 'Абдан популярдуу серия. Лоджияларынын кенендиги жана пландаштырылышынын ыңгайлуулугу менен айырмаланат.',
      descRu: 'Очень популярная серия. Отличается большими прямоугольными лоджиями и удобным расположением комнат.'
    },
    {
      id: '106',
      name: '106-серия',
      years: '1990 - 2005',
      wallsKg: 'Жакшыртылган бетон панелдери',
      wallsRu: 'Улучшенные бетонные панели',
      ceilingHeight: '2.7m',
      kitchenSizeKg: '9 - 11 м²',
      kitchenSizeRu: '9 - 11 м²',
      prosKg: ['Шыптары бийик (2.7м)', 'Чоң ашкана жана кең коридор', 'Бөлмөлөрү толугу менен өзүнчө, батирлер эки тарапка тең карайт (распашонка)'],
      prosRu: ['Высокие потолки (2.7м)', 'Большая кухня и холл', 'Планировка-распашонка (окна выходят на обе стороны дома)'],
      consKg: ['Панелдер кээде бурчтардан суук өткөрөт', 'Сырткы дубалдарын кошумча жылуулоо талап кылынат'],
      consRu: ['Угловые комнаты могут промерзать при плохих швах', 'Часто требуется наружное утепление фасада'],
      avgPriceBuyUsd: 1200,
      descKg: 'Кеңири пландаштырылган, ашканасы абдан кенен жана заманбап үйлөргө жакындатылган мыкты серия.',
      descRu: 'Улучшенная серия советского типа. Просторные прихожие и большие кухни делают её фаворитом среди панельных домов.'
    },
    {
      id: 'elite',
      name: 'Элитка (Жаңы курулуштар)',
      years: '2010 - Азыркы убакыт',
      wallsKg: 'Монолит рамка, бышкан кирпич',
      wallsRu: 'Монолитный каркас, жженый кирпич',
      ceilingHeight: '3.0m - 3.2m',
      kitchenSizeKg: '12 - 18 м²',
      kitchenSizeRu: '12 - 18 м²',
      prosKg: ['Абдан бийик шыптар жана эркин пландаштыруу', 'Заманбап коопсуздук, видеокөзөмөл жана жер астындагы паркинг', 'Өздүк жылытуу системасы же газ орнотулган'],
      prosRu: ['Очень высокие потолки и свободная планировка', 'Современные системы безопасности, консьерж и подземный паркинг', 'Автономные котельные или газовое отопление'],
      consKg: ['Баалары өтө кымбат', 'Ай сайын үй тейлөө акысы (ТСЖ) жогору', 'Курулуш сапаты компаниядан көз каранды'],
      consRu: ['Высокая стоимость покупки и ремонта', 'Дорогое ежемесячное обслуживание (ТСЖ)', 'Качество строительства сильно разнится у застройщиков'],
      avgPriceBuyUsd: 1400,
      descKg: 'Бишкектин заманбап архитектурасын түзгөн турак жайлар. Тез өнүгүп жаткан райондордо жайгашкан.',
      descRu: 'Современные многоэтажные жилые комплексы. Строятся по монолитно-каркасной технологии с заполнением кирпичом.'
    }
  ];

  // -------------------------------------------------------------
  // Compare Properties State
  // -------------------------------------------------------------
  const [comparePropertyId1, setComparePropertyId1] = useState<string>('');
  const [comparePropertyId2, setComparePropertyId2] = useState<string>('');

  const handleSelectCompare1 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setComparePropertyId1(e.target.value);
  };

  const handleSelectCompare2 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setComparePropertyId2(e.target.value);
  };

  const property1 = properties.find(p => p.id === comparePropertyId1);
  const property2 = properties.find(p => p.id === comparePropertyId2);

  const formatPriceVal = (priceUsd: number) => {
    if (currency === 'USD') {
      return `$${priceUsd.toLocaleString()}`;
    } else {
      return `${(priceUsd * 87).toLocaleString()} сом`;
    }
  };

  // Convert USD price to localized display
  const getDisplayPrice = (usdVal: number) => {
    return currency === 'USD' ? `$${usdVal}` : `${(usdVal * 87).toLocaleString()} сом`;
  };

  // Filter properties by selected series
  const filteredPropertiesForCompare = properties.filter(p => {
    if (seriesFilter === 'all') return true;
    return p.seriesId === seriesFilter;
  });

  // Calculate budget matcher
  const matchedDistricts = districtStats.filter(stat => {
    const numericBudget = parseFloat(budgetInput) || 0;
    if (numericBudget === 0) return true;
    return stat.avgPriceBuyUsd <= numericBudget;
  });

  const selectedDistrictData = districtStats.find(d => d.id === selectedDistrictDetail) || districtStats[0];

  return (
    <div className="bg-white rounded-3xl border border-slate-150 shadow-sm overflow-hidden" id="market-insights-panel">
      {/* Visual Header Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 p-6 sm:p-8 text-white relative">
        <div className="absolute right-0 top-0 bottom-0 opacity-15 pointer-events-none flex items-center pr-8">
          <TrendingUp size={160} />
        </div>
        <div className="max-w-3xl space-y-2">
          <span className="bg-amber-400 text-slate-950 font-extrabold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full">
            {lang === 'kg' ? 'Базар көрсөткүчтөрү' : 'Рыночные показатели'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {lang === 'kg' ? 'Бишкек кыймылсыз мүлк аналитикасы' : 'Аналитика недвижимости Бишкека'}
          </h2>
          <p className="text-xs sm:text-sm text-amber-50/95 leading-relaxed font-medium">
            {lang === 'kg' 
              ? 'Бишкек шаарынын райондорундагы баалардын динамикасы, ар бир турак жай сериясынын (104, 105, 106, Элитка) өзгөчөлүктөрү жана батирлерди онлайн салыштыруу куралы.' 
              : 'Динамика цен по районам Бишкека, особенности каждой серии жилья (104, 105, 106, Элитка) и удобный калькулятор онлайн сравнения объектов.'}
          </p>
        </div>
      </div>

      {/* Internal Navigation Sub-tabs */}
      <div className="flex border-b border-slate-100 bg-slate-50 p-1.5 gap-1.5">
        <button
          onClick={() => setActiveSubTab('analytics')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            activeSubTab === 'analytics'
              ? 'bg-white text-slate-900 shadow-sm border border-slate-150'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <TrendingUp size={15} className={activeSubTab === 'analytics' ? 'text-amber-500' : 'text-slate-400'} />
          <span>{lang === 'kg' ? 'Баалар & Райондор' : 'Цены и Районы'}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('series')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            activeSubTab === 'series'
              ? 'bg-white text-slate-900 shadow-sm border border-slate-150'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Building size={15} className={activeSubTab === 'series' ? 'text-amber-500' : 'text-slate-400'} />
          <span>{lang === 'kg' ? 'Сериялардын сөздүгү' : 'Словарь серий'}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('compare')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            activeSubTab === 'compare'
              ? 'bg-white text-slate-900 shadow-sm border border-slate-150'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Scale size={15} className={activeSubTab === 'compare' ? 'text-amber-500' : 'text-slate-400'} />
          <span>{lang === 'kg' ? 'Мүлктөрдү салыштыруу' : 'Сравнение объектов'}</span>
        </button>
      </div>

      <div className="p-6">
        {/* SUBTAB 1: DISTRICT PRICE ANALYTICS */}
        {activeSubTab === 'analytics' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: List of Districts with prices */}
              <div className="lg:col-span-7 space-y-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Grid size={15} className="text-amber-500" />
                  <span>{lang === 'kg' ? 'Райондордун орточо баасы (1 м² үчүн)' : 'Средняя стоимость районов за 1 м²'}</span>
                </h3>

                <div className="overflow-x-auto border border-slate-100 rounded-2xl">
                  <table className="w-full text-left text-xs text-slate-600 border-collapse">
                    <thead>
                      <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-500 font-extrabold uppercase text-[10px] tracking-wider">
                        <th className="py-3 px-4">{lang === 'kg' ? 'Район' : 'Район'}</th>
                        <th className="py-3 px-4 text-right">{lang === 'kg' ? 'Сатып алуу (орточо)' : 'Покупка (сред.)'}</th>
                        <th className="py-3 px-4 text-right">{lang === 'kg' ? 'Ижара (айына)' : 'Аренда (в мес.)'}</th>
                        <th className="py-3 px-4 text-center">{lang === 'kg' ? 'Динамика' : 'Динамика'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {districtStats.map(stat => (
                        <tr 
                          key={stat.id} 
                          onClick={() => setSelectedDistrictDetail(stat.id)}
                          className={`hover:bg-amber-50/30 cursor-pointer transition-all ${
                            selectedDistrictDetail === stat.id ? 'bg-amber-50/50 font-semibold' : ''
                          }`}
                        >
                          <td className="py-3.5 px-4 text-slate-900">
                            {lang === 'kg' ? stat.nameKg : stat.nameRu}
                          </td>
                          <td className="py-3.5 px-4 text-right text-slate-800 font-bold">
                            {getDisplayPrice(stat.avgPriceBuyUsd)}
                          </td>
                          <td className="py-3.5 px-4 text-right text-slate-500 font-semibold">
                            {currency === 'USD' ? `$${stat.avgPriceRentUsd}` : `${(stat.avgPriceRentUsd * 87).toLocaleString()} сом`}
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              stat.trend === 'up' 
                                ? 'bg-emerald-50 text-emerald-600' 
                                : 'bg-slate-100 text-slate-600'
                            }`}>
                              {stat.trend === 'up' ? '▲' : '●'} {stat.percentChange}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="text-[10px] text-slate-400 italic">
                  {lang === 'kg' 
                    ? '* Бул баалар My Home Bishkek базасынын акыркы 3 айдагы анализинин негизинде чыгарылган.' 
                    : '* Цены рассчитаны на основе анализа базы сделок My Home Bishkek за последние 3 месяца.'}
                </p>
              </div>

              {/* Right Column: Dynamic District DetailsCard & Interactive Budget Matcher */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* District Detail Card */}
                <div className="bg-amber-50/30 border border-amber-200/40 rounded-2xl p-5 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-extrabold text-amber-600 uppercase tracking-wider block">
                        {lang === 'kg' ? 'Тандалган район мүнөздөмөсү' : 'Особенности выбранного района'}
                      </span>
                      <h4 className="text-base font-bold text-slate-900">
                        {lang === 'kg' ? selectedDistrictData.nameKg : selectedDistrictData.nameRu}
                      </h4>
                    </div>
                    <div className="bg-white border border-amber-200 px-3 py-1 rounded-xl text-center shadow-sm">
                      <span className="text-[9px] text-slate-400 block uppercase font-bold leading-none">{lang === 'kg' ? 'Сатып алуу' : 'Покупка'}</span>
                      <span className="text-xs font-black text-amber-700">{getDisplayPrice(selectedDistrictData.avgPriceBuyUsd)} / м²</span>
                    </div>
                  </div>

                  <div className="space-y-3.5 pt-2">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs text-emerald-850 font-bold uppercase tracking-wider">
                        <CheckCircle size={13} className="text-emerald-600" />
                        <span>{lang === 'kg' ? 'Артыкчылыктары:' : 'Плюсы:'}</span>
                      </div>
                      <p className="text-xs text-slate-650 leading-relaxed pl-5 font-medium">
                        {lang === 'kg' ? selectedDistrictData.prosKg : selectedDistrictData.prosRu}
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs text-rose-850 font-bold uppercase tracking-wider">
                        <ShieldAlert size={13} className="text-rose-500" />
                        <span>{lang === 'kg' ? 'Кемчиликтери:' : 'Минусы:'}</span>
                      </div>
                      <p className="text-xs text-slate-650 leading-relaxed pl-5 font-medium">
                        {lang === 'kg' ? selectedDistrictData.consKg : selectedDistrictData.consRu}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Interactive Budget Matcher */}
                <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-5 space-y-4">
                  <div className="space-y-1">
                    <span className="bg-slate-200/80 text-slate-700 font-extrabold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded">
                      {lang === 'kg' ? 'Район тапкыч' : 'Подборщик района'}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">
                      {lang === 'kg' ? 'Сиздин 1 м² бюджетиңизге кайсы район туура келет?' : 'Какой район подходит под ваш бюджет за 1 м²?'}
                    </h4>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase block">
                      {lang === 'kg' ? 'Сиздин орточо бюджетиңиз (1 м² үчүн, USD)' : 'Ваш средний бюджет (за 1 м² в USD)'}
                    </label>
                    <div className="flex gap-2">
                      <span className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 flex items-center justify-center shadow-sm">
                        $
                      </span>
                      <input
                        type="number"
                        value={budgetInput}
                        onChange={(e) => setBudgetInput(e.target.value)}
                        placeholder="мис: 1000"
                        className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-amber-500/25 outline-none focus:border-amber-500 transition-all shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 pt-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      {lang === 'kg' ? 'Ылайыктуу райондор:' : 'Подходящие районы:'}
                    </span>
                    {matchedDistricts.length === 0 ? (
                      <p className="text-xs text-rose-600 font-semibold">
                        {lang === 'kg' ? 'Бул бюджетке туура келген район табылган жок. Көбүрөөк сумма жазып көрүңүз.' : 'Районов с таким бюджетом не найдено. Попробуйте увеличить сумму.'}
                      </p>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {matchedDistricts.map(d => (
                          <button
                            key={d.id}
                            onClick={() => setSelectedDistrictDetail(d.id)}
                            className="bg-white border border-slate-150 hover:border-amber-500 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 shadow-sm hover:shadow transition-all flex items-center gap-1.5"
                          >
                            <span>{lang === 'kg' ? d.nameKg : d.nameRu}</span>
                            <span className="text-[10px] font-extrabold text-amber-600">(${d.avgPriceBuyUsd})</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 2: HOUSING SERIES GUIDE */}
        {activeSubTab === 'series' && (
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-1">
              <h3 className="text-base font-bold text-slate-900 tracking-tight uppercase">
                {lang === 'kg' ? 'Бишкек шаарындагы турак жай серияларынын колдонмосу' : 'Справочник серий жилья города Бишкек'}
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                {lang === 'kg' 
                  ? 'Совет доорунан тартып ушул күнгө чейин курулган батирлердин айырмачылыктары, артыкчылыктары жана мүнөздөмөлөрү.' 
                  : 'Различия, преимущества и недостатки типов многоквартирных домов, построенных в Бишкеке.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {housingSeriesData.map(series => (
                <div 
                  key={series.id}
                  className="bg-slate-50/45 border border-slate-150 rounded-2xl p-5 hover:border-amber-500/40 hover:bg-white hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="bg-amber-500 text-slate-950 font-black px-2.5 py-1 rounded-xl text-xs tracking-wider">
                        {series.name}
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                        {series.years}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      {lang === 'kg' ? series.descKg : series.descRu}
                    </p>

                    {/* Metadata Grid */}
                    <div className="bg-white/70 border border-slate-100 rounded-xl p-3 space-y-2 text-[11px] font-semibold text-slate-700">
                      <div className="flex justify-between">
                        <span className="text-slate-400">{lang === 'kg' ? 'Дубалдары:' : 'Стены:'}</span>
                        <span className="text-slate-800 text-right font-bold">{lang === 'kg' ? series.wallsKg : series.wallsRu}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">{lang === 'kg' ? 'Шып бийиктиги:' : 'Высота потолков:'}</span>
                        <span className="text-slate-800 font-bold">{series.ceilingHeight}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">{lang === 'kg' ? 'Ашкана аянты:' : 'Площадь кухни:'}</span>
                        <span className="text-slate-800 font-bold">{lang === 'kg' ? series.kitchenSizeKg : series.kitchenSizeRu}</span>
                      </div>
                    </div>

                    {/* Pros and Cons */}
                    <div className="space-y-2 pt-2 border-t border-slate-100/60">
                      <span className="text-[10px] font-black uppercase text-emerald-600 block tracking-wider">{lang === 'kg' ? 'Артыкчылыктары' : 'Плюсы'}</span>
                      <ul className="space-y-1">
                        {(lang === 'kg' ? series.prosKg : series.prosRu).map((pro, index) => (
                          <li key={index} className="text-[10px] text-slate-550 flex items-start gap-1 font-semibold leading-relaxed">
                            <span className="text-emerald-500 font-bold shrink-0">✓</span>
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>

                      <span className="text-[10px] font-black uppercase text-rose-500 block tracking-wider pt-1">{lang === 'kg' ? 'Кемчиликтери' : 'Минусы'}</span>
                      <ul className="space-y-1">
                        {(lang === 'kg' ? series.consKg : series.consRu).map((con, index) => (
                          <li key={index} className="text-[10px] text-slate-550 flex items-start gap-1 font-semibold leading-relaxed">
                            <span className="text-rose-400 font-bold shrink-0">✗</span>
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-slate-100 p-2.5 rounded-xl text-center">
                    <span className="text-[9px] text-slate-400 block font-bold uppercase leading-none mb-0.5">{lang === 'kg' ? 'Базардагы орточо баасы' : 'Средняя цена на рынке'}</span>
                    <span className="text-xs font-black text-slate-800">{getDisplayPrice(series.avgPriceBuyUsd)} / м²</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUBTAB 3: PROPERTY COMPARISON TOOL */}
        {activeSubTab === 'compare' && (
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-1">
              <h3 className="text-base font-bold text-slate-900 tracking-tight uppercase">
                {lang === 'kg' ? 'Батирлерди салыштыруу куралы' : 'Инструмент сравнения объектов'}
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                {lang === 'kg' 
                  ? 'Каталогдогу эки каалаган мүлктү тандап, алардын баасын, аянтын, кабатын жана башка техникалык көрсөткүчтөрүн бетме-бет салыштырыңыз.' 
                  : 'Выберите два любых объекта из каталога, чтобы сравнить их стоимость, квадратуру, этажность и другие важные технические показатели.'}
              </p>
            </div>

            {/* Compare Selectors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-5 rounded-2xl border border-slate-200/50">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">
                  {lang === 'kg' ? '1-мүлктү тандаңыз' : 'Выберите 1-й объект'}
                </label>
                <select
                  value={comparePropertyId1}
                  onChange={handleSelectCompare1}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 font-bold focus:ring-2 focus:ring-amber-500/25 outline-none transition-all shadow-sm"
                >
                  <option value="">-- {lang === 'kg' ? 'Тизмеден тандаңыз' : 'Выберите из списка'} --</option>
                  {properties.map(p => (
                    <option key={p.id} value={p.id}>
                      {lang === 'kg' ? p.titleKg : p.titleRu} ({formatPriceVal(p.priceUsd)})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">
                  {lang === 'kg' ? '2-мүлктү тандаңыз' : 'Выберите 2-й объект'}
                </label>
                <select
                  value={comparePropertyId2}
                  onChange={handleSelectCompare2}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 font-bold focus:ring-2 focus:ring-amber-500/25 outline-none transition-all shadow-sm"
                >
                  <option value="">-- {lang === 'kg' ? 'Тизмеден тандаңыз' : 'Выберите из списка'} --</option>
                  {properties.map(p => (
                    <option key={p.id} value={p.id}>
                      {lang === 'kg' ? p.titleKg : p.titleRu} ({formatPriceVal(p.priceUsd)})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Comparison Side-by-side Sheet Grid */}
            {(!property1 || !property2) ? (
              <div className="text-center py-12 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50 space-y-3">
                <Scale size={40} className="text-slate-300 mx-auto" />
                <p className="text-xs text-slate-500 font-medium">
                  {lang === 'kg' 
                    ? 'Салыштырууну баштоо үчүн жогорудагы тизмеден эки мүлктү тең тандаңыз.' 
                    : 'Для начала сравнения выберите оба объекта из списков выше.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border border-slate-150 rounded-2xl overflow-hidden shadow-sm">
                
                {/* Specs Titles Column (Hidden on small screens, shown side by side) */}
                <div className="hidden md:block bg-slate-50 p-5 space-y-5 border-r border-slate-100 font-bold text-slate-400 text-[10px] uppercase tracking-wider pt-32">
                  <div className="py-2.5 border-b border-slate-100">{lang === 'kg' ? 'Келишим түрү' : 'Тип сделки'}</div>
                  <div className="py-2.5 border-b border-slate-100">{lang === 'kg' ? 'Жалпы баасы' : 'Общая стоимость'}</div>
                  <div className="py-2.5 border-b border-slate-100">{lang === 'kg' ? 'Бөлмөлөр' : 'Комнаты'}</div>
                  <div className="py-2.5 border-b border-slate-100">{lang === 'kg' ? 'Аянты' : 'Площадь'}</div>
                  <div className="py-2.5 border-b border-slate-100">{lang === 'kg' ? '1 м² үчүн баасы' : 'Цена за 1 м²'}</div>
                  <div className="py-2.5 border-b border-slate-100">{lang === 'kg' ? 'Кабаты' : 'Этаж'}</div>
                  <div className="py-2.5 border-b border-slate-100">{lang === 'kg' ? 'Сериясы' : 'Серия'}</div>
                  <div className="py-2.5 border-b border-slate-100">{lang === 'kg' ? 'Жайгашкан району' : 'Район расположения'}</div>
                </div>

                {/* Property 1 Column */}
                <div className="p-5 space-y-5 bg-white border-b md:border-b-0 md:border-r border-slate-100">
                  <div className="text-center pb-4 border-b border-slate-100 space-y-2">
                    <img 
                      src={property1.image} 
                      alt={property1.titleKg} 
                      className="w-full h-28 object-cover rounded-xl shadow-sm"
                    />
                    <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm line-clamp-1">
                      {lang === 'kg' ? property1.titleKg : property1.titleRu}
                    </h4>
                    <button
                      onClick={() => onSelectProperty(property1)}
                      className="text-amber-600 hover:text-amber-700 text-[11px] font-bold inline-flex items-center gap-1 mt-1 hover:underline"
                    >
                      <span>{lang === 'kg' ? 'Баракчасын ачуу' : 'Открыть карточку'}</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>

                  <div className="space-y-4 text-xs">
                    {/* Deal Type */}
                    <div className="py-1 border-b border-slate-50 flex justify-between md:block">
                      <span className="md:hidden text-[10px] uppercase font-bold text-slate-400">{lang === 'kg' ? 'Келишим түрү' : 'Тип сделки'}:</span>
                      <span className="font-extrabold text-slate-800 uppercase text-[10px] bg-slate-100 px-2 py-0.5 rounded">
                        {property1.type === 'buy' ? (lang === 'kg' ? 'Сатуу' : 'Продажа') : (lang === 'kg' ? 'Ижара' : 'Аренда')}
                      </span>
                    </div>

                    {/* Total Price */}
                    <div className="py-1 border-b border-slate-50 flex justify-between md:block">
                      <span className="md:hidden text-[10px] uppercase font-bold text-slate-400">{lang === 'kg' ? 'Жалпы баасы' : 'Общая стоимость'}:</span>
                      <span className="font-black text-slate-900 text-sm">
                        {formatPriceVal(property1.priceUsd)}
                      </span>
                    </div>

                    {/* Rooms */}
                    <div className="py-1 border-b border-slate-50 flex justify-between md:block">
                      <span className="md:hidden text-[10px] uppercase font-bold text-slate-400">{lang === 'kg' ? 'Бөлмөлөр' : 'Комнаты'}:</span>
                      <span className="font-bold text-slate-800">{property1.rooms} бөлмөлүү</span>
                    </div>

                    {/* Area */}
                    <div className="py-1 border-b border-slate-50 flex justify-between md:block">
                      <span className="md:hidden text-[10px] uppercase font-bold text-slate-400">{lang === 'kg' ? 'Аянты' : 'Площадь'}:</span>
                      <span className="font-bold text-slate-800">{property1.m2} {lang === 'kg' ? 'м²' : 'м²'}</span>
                    </div>

                    {/* Cost per m2 */}
                    <div className="py-1 border-b border-slate-50 flex justify-between md:block">
                      <span className="md:hidden text-[10px] uppercase font-bold text-slate-400">{lang === 'kg' ? '1 м² үчүн баасы' : 'Цена за 1 м²'}:</span>
                      <span className="font-bold text-amber-700">
                        {formatPriceVal(Math.round(property1.priceUsd / property1.m2))} / м²
                      </span>
                    </div>

                    {/* Floor */}
                    <div className="py-1 border-b border-slate-50 flex justify-between md:block">
                      <span className="md:hidden text-[10px] uppercase font-bold text-slate-400">{lang === 'kg' ? 'Кабаты' : 'Этаж'}:</span>
                      <span className="font-bold text-slate-800">{property1.floor} / {property1.totalFloors}</span>
                    </div>

                    {/* Series */}
                    <div className="py-1 border-b border-slate-50 flex justify-between md:block">
                      <span className="md:hidden text-[10px] uppercase font-bold text-slate-400">{lang === 'kg' ? 'Сериясы' : 'Серия'}:</span>
                      <span className="font-bold text-slate-800">{lang === 'kg' ? property1.seriesKg : property1.seriesRu}</span>
                    </div>

                    {/* District */}
                    <div className="py-1 flex justify-between md:block">
                      <span className="md:hidden text-[10px] uppercase font-bold text-slate-400">{lang === 'kg' ? 'Жайгашкан району' : 'Район расположения'}:</span>
                      <span className="font-bold text-slate-800">{lang === 'kg' ? property1.districtKg : property1.districtRu}</span>
                    </div>
                  </div>
                </div>

                {/* Property 2 Column */}
                <div className="p-5 space-y-5 bg-white">
                  <div className="text-center pb-4 border-b border-slate-100 space-y-2">
                    <img 
                      src={property2.image} 
                      alt={property2.titleKg} 
                      className="w-full h-28 object-cover rounded-xl shadow-sm"
                    />
                    <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm line-clamp-1">
                      {lang === 'kg' ? property2.titleKg : property2.titleRu}
                    </h4>
                    <button
                      onClick={() => onSelectProperty(property2)}
                      className="text-amber-600 hover:text-amber-700 text-[11px] font-bold inline-flex items-center gap-1 mt-1 hover:underline"
                    >
                      <span>{lang === 'kg' ? 'Баракчасын ачуу' : 'Открыть карточку'}</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>

                  <div className="space-y-4 text-xs">
                    {/* Deal Type */}
                    <div className="py-1 border-b border-slate-50 flex justify-between md:block">
                      <span className="md:hidden text-[10px] uppercase font-bold text-slate-400">{lang === 'kg' ? 'Келишим түрү' : 'Тип сделки'}:</span>
                      <span className="font-extrabold text-slate-800 uppercase text-[10px] bg-slate-100 px-2 py-0.5 rounded">
                        {property2.type === 'buy' ? (lang === 'kg' ? 'Сатуу' : 'Продажа') : (lang === 'kg' ? 'Ижара' : 'Аренда')}
                      </span>
                    </div>

                    {/* Total Price */}
                    <div className="py-1 border-b border-slate-50 flex justify-between md:block">
                      <span className="md:hidden text-[10px] uppercase font-bold text-slate-400">{lang === 'kg' ? 'Жалпы баасы' : 'Общая стоимость'}:</span>
                      <span className="font-black text-slate-900 text-sm">
                        {formatPriceVal(property2.priceUsd)}
                      </span>
                    </div>

                    {/* Rooms */}
                    <div className="py-1 border-b border-slate-50 flex justify-between md:block">
                      <span className="md:hidden text-[10px] uppercase font-bold text-slate-400">{lang === 'kg' ? 'Бөлмөлөр' : 'Комнаты'}:</span>
                      <span className="font-bold text-slate-800">{property2.rooms} бөлмөлүү</span>
                    </div>

                    {/* Area */}
                    <div className="py-1 border-b border-slate-50 flex justify-between md:block">
                      <span className="md:hidden text-[10px] uppercase font-bold text-slate-400">{lang === 'kg' ? 'Аянты' : 'Площадь'}:</span>
                      <span className="font-bold text-slate-800">{property2.m2} {lang === 'kg' ? 'м²' : 'м²'}</span>
                    </div>

                    {/* Cost per m2 */}
                    <div className="py-1 border-b border-slate-50 flex justify-between md:block">
                      <span className="md:hidden text-[10px] uppercase font-bold text-slate-400">{lang === 'kg' ? '1 м² үчүн баасы' : 'Цена за 1 м²'}:</span>
                      <span className="font-bold text-amber-700">
                        {formatPriceVal(Math.round(property2.priceUsd / property2.m2))} / м²
                      </span>
                    </div>

                    {/* Floor */}
                    <div className="py-1 border-b border-slate-50 flex justify-between md:block">
                      <span className="md:hidden text-[10px] uppercase font-bold text-slate-400">{lang === 'kg' ? 'Кабаты' : 'Этаж'}:</span>
                      <span className="font-bold text-slate-800">{property2.floor} / {property2.totalFloors}</span>
                    </div>

                    {/* Series */}
                    <div className="py-1 border-b border-slate-50 flex justify-between md:block">
                      <span className="md:hidden text-[10px] uppercase font-bold text-slate-400">{lang === 'kg' ? 'Сериясы' : 'Серия'}:</span>
                      <span className="font-bold text-slate-800">{lang === 'kg' ? property2.seriesKg : property2.seriesRu}</span>
                    </div>

                    {/* District */}
                    <div className="py-1 flex justify-between md:block">
                      <span className="md:hidden text-[10px] uppercase font-bold text-slate-400">{lang === 'kg' ? 'Жайгашкан району' : 'Район расположения'}:</span>
                      <span className="font-bold text-slate-800">{lang === 'kg' ? property2.districtKg : property2.districtRu}</span>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

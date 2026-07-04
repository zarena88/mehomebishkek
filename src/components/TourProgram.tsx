import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plane, 
  Hotel, 
  Map, 
  Gift, 
  CheckCircle2, 
  PhoneCall, 
  MessageSquare, 
  Calendar, 
  Sparkles, 
  Check, 
  ArrowRight,
  HelpCircle,
  Coins
} from 'lucide-react';

interface TourProgramProps {
  lang: 'kg' | 'ru';
  agencyPhone: string;
}

export function TourProgram({ lang, agencyPhone }: TourProgramProps) {
  const [willBuy, setWillBuy] = useState<'yes' | 'no' | 'undecided'>('yes');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Formatting agency phone for whatsapp: remove non-digits
  const waPhone = agencyPhone.replace(/\+/g, '').replace(/\s/g, '');

  const text = {
    kg: {
      badge: "Атайын программа",
      title: "Бишкектен кыймылсыз мүлк издөө туру",
      subtitle: "Биз сизди тосуп алабыз, отелге жайгаштырабыз жана 7 күн ичинде кыялыңыздагы турак жайды таап беребиз!",
      priceLabel: "Турдун баасы:",
      priceValue: "15 000 сом",
      freeConditionBadge: "АКЫСЫЗ БОЛОТ!",
      freeConditionText: "Эгерде сиз бир жуманын ичинде кыймылсыз мүлк сатып алсаңыз, анда тур толугу менен акысыз болот (төлөнгөн 15 000 сом келишимде кайтарылып берилет же батирдин баасынан кемитилет)!",
      
      // Steps
      step1Title: "1. Тосуп алуу жана жайгаштыруу",
      step1Desc: "Аэропорттон же вокзалдан унаа менен тосуп алабыз. Шаардын борборундагы ыңгайлуу отелге 7 күнгө жайгаштырабыз.",
      step2Title: "2. 7 күндүк кесипкөй кыдыруу",
      step2Desc: "Биздин унаа менен 7 күн бою Бишкектин ар бир районундагы мыкты батирлерди, үйлөрдү көрөсүз. Серияларын жана бааларын салыштырабыз.",
      step3Title: "3. Юридикалык коопсуздук",
      step3Desc: "Табылган кыймылсыз мүлктүн документтерин биздин юристтер кылдат текшерип, келишимди мыйзамдуу түрдө коопсуз каттап беришет.",
      step4Title: "4. Кэшбэк же акысыз тур",
      step4Desc: "Турак жай сатып алган учурда, турдун 15 000 сом акысы сизге толугу менен кайтарылат. Сиз үчүн бардыгы акысыз болот!",

      // Interactive section
      calcTitle: "Турдун баасын алдын ала эсептөө",
      calcQuestion: "Тур учурунда кыймылсыз мүлк сатып алууну пландап жатасызбы?",
      calcYes: "Ооба, сатып алууну пландап жатам (Тур акысыз болот)",
      calcNo: "Жок, азырынча таанышуу максатында гана келем",
      calcUndecided: "Азырынча так чечим кабыл ала элекмин",
      calcResultFree: "Сиздин турдун баасы: АКЫСЫЗ (0 сом) 🎉",
      calcResultFreeSub: "Эгерде сиз бир жумада мүлк алсаңыз, 15,000 сом толук кайтарылат!",
      calcResultPaid: "Сиздин турдун баасы: 15 000 сом",
      calcResultPaidSub: "Бул баага трансфер, 7 күн отелде жашоо жана баардык унаа менен кыдыруу кызматтары кирет.",

      // Form
      formTitle: "Турга катышуу үчүн билдирүү калтырыңыз",
      formName: "Атыңыз",
      setNamePlaceholder: "Мисалы: Асан",
      formPhone: "Телефон номериңиз",
      setPhonePlaceholder: "Мисалы: 0995 288 288",
      formDate: "Келүү убактысы (болжолдуу)",
      formSubmit: "Турга жазылуу",
      formSuccess: "Ийгиликтүү жөнөтүлдү!",
      formSuccessDesc: "Рахмат! Биздин менеджер жакында сиз менен байланышып, отелди брондойт жана трансферди уюштурат.",
      
      contactUs: "Түз байланышуу",
      whatsAppText: "WhatsApp аркылуу жазуу",
      callText: "Чалуу: "
    },
    ru: {
      badge: "Специальная программа",
      title: "Тур за недвижимостью в Бишкеке",
      subtitle: "Мы встретим вас, заселим в отель и за 7 дней поможем найти идеальное жилье!",
      priceLabel: "Стоимость тура:",
      priceValue: "15 000 сом",
      freeConditionBadge: "СТАНЕТ БЕСПЛАТНЫМ!",
      freeConditionText: "Если вы приобретаете недвижимость в течение недели, тур становится абсолютно бесплатным (оплаченные 15 000 сом полностью возвращаются или вычитаются из стоимости квартиры)!",
      
      // Steps
      step1Title: "1. Встреча и заселение",
      step1Desc: "Встретим вас из аэропорта или вокзала на комфортном авто. Заселим в уютный отель в центре города на 7 дней.",
      step2Title: "2. 7 дней профессиональных показов",
      step2Desc: "На нашем транспорте покажем вам лучшие квартиры и дома в разных районах Бишкека. Сравним серии и цены.",
      step3Title: "3. Юридическая безопасность",
      step3Desc: "Наши юристы тщательно проверят все документы выбранного объекта недвижимости и обеспечат полную безопасность сделки.",
      step4Title: "4. Кэшбэк или бесплатный тур",
      step4Desc: "При покупке жилья стоимость тура (15 000 сом) полностью возвращается вам. Все услуги для вас станут бесплатными!",

      // Interactive section
      calcTitle: "Предварительный расчет стоимости тура",
      calcQuestion: "Планируете ли вы покупку недвижимости во время тура?",
      calcYes: "Да, планирую покупку (Тур будет бесплатным)",
      calcNo: "Нет, пока только ознакомление и консультация",
      calcUndecided: "Пока не принял точного решения",
      calcResultFree: "Стоимость вашего тура: БЕСПЛАТНО (0 сом) 🎉",
      calcResultFreeSub: "При покупке недвижимости за неделю вся сумма 15 000 сом возвращается вам!",
      calcResultPaid: "Стоимость вашего тура: 15 000 сом",
      calcResultPaidSub: "В стоимость включен трансфер, проживание в отеле 7 дней и все выезды на автомобиле компании.",

      // Form
      formTitle: "Оставить заявку на участие в туре",
      formName: "Ваше имя",
      setNamePlaceholder: "Например: Асан",
      formPhone: "Номер телефона",
      setPhonePlaceholder: "Например: 0995 288 288",
      formDate: "Примерная дата приезда",
      formSubmit: "Записаться на тур",
      formSuccess: "Заявка успешно отправлена!",
      formSuccessDesc: "Спасибо! Наш менеджер свяжется с вами в ближайшее время, чтобы забронировать отель и согласовать трансфер.",

      contactUs: "Связаться напрямую",
      whatsAppText: "Написать в WhatsApp",
      callText: "Позвонить: "
    }
  }[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setIsSubmitted(true);
  };

  return (
    <div className="space-y-12">
      
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden bg-slate-900 rounded-3xl text-white p-8 md:p-12 shadow-xl border border-slate-800">
        <div className="absolute inset-0 bg-cover bg-center opacity-20 filter brightness-50" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1200')` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-900/40" />
        
        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-1.5 bg-amber-500/20 border border-amber-500/30 text-amber-400 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase">
            <Sparkles size={12} className="animate-pulse" />
            <span>{text.badge}</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-display leading-tight">
            {text.title}
          </h1>
          
          <p className="text-sm md:text-base text-slate-300 font-medium leading-relaxed">
            {text.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl px-5 py-3 border border-white/15">
              <span className="block text-[10px] text-slate-300 uppercase tracking-wider font-semibold">{text.priceLabel}</span>
              <span className="text-2xl font-black text-amber-400">{text.priceValue}</span>
            </div>
            <div className="bg-amber-500/20 rounded-2xl px-5 py-3 border border-amber-500/30 flex-1">
              <span className="inline-block bg-amber-500 text-slate-950 text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider mb-1">{text.freeConditionBadge}</span>
              <p className="text-xs text-amber-200 font-semibold leading-relaxed">
                {text.freeConditionText}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Process Timeline Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        
        {/* Step 1 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">
              <Hotel size={24} />
            </div>
            <h3 className="font-extrabold text-slate-900 text-sm tracking-tight">{text.step1Title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">{text.step1Desc}</p>
          </div>
          <div className="text-[50px] font-black text-slate-50 leading-none absolute bottom-1 right-2 pointer-events-none">01</div>
        </div>

        {/* Step 2 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
              <Map size={24} />
            </div>
            <h3 className="font-extrabold text-slate-900 text-sm tracking-tight">{text.step2Title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">{text.step2Desc}</p>
          </div>
          <div className="text-[50px] font-black text-slate-50 leading-none absolute bottom-1 right-2 pointer-events-none">02</div>
        </div>

        {/* Step 3 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center">
              <CheckCircle2 size={24} />
            </div>
            <h3 className="font-extrabold text-slate-900 text-sm tracking-tight">{text.step3Title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">{text.step3Desc}</p>
          </div>
          <div className="text-[50px] font-black text-slate-50 leading-none absolute bottom-1 right-2 pointer-events-none">03</div>
        </div>

        {/* Step 4 */}
        <div className="bg-amber-50/50 p-6 rounded-2xl border border-amber-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center">
              <Gift size={24} className="animate-bounce" />
            </div>
            <h3 className="font-extrabold text-amber-950 text-sm tracking-tight">{text.step4Title}</h3>
            <p className="text-xs text-amber-900 leading-relaxed font-semibold">{text.step4Desc}</p>
          </div>
          <div className="text-[50px] font-black text-amber-100/50 leading-none absolute bottom-1 right-2 pointer-events-none">04</div>
        </div>

      </div>

      {/* 3. Interactive Pricing Tool & Lead form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Interactive Price Selector (5 Cols) */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm lg:col-span-5 space-y-6">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base tracking-tight flex items-center gap-1.5">
              <Coins size={18} className="text-amber-500" />
              <span>{text.calcTitle}</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">{text.calcQuestion}</p>
          </div>

          <div className="space-y-2.5">
            <button
              onClick={() => setWillBuy('yes')}
              className={`w-full p-4 rounded-2xl border text-left text-xs font-bold transition-all flex items-center justify-between ${
                willBuy === 'yes'
                  ? 'bg-amber-500/10 border-amber-500 text-slate-900 shadow-inner'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>{text.calcYes}</span>
              {willBuy === 'yes' && <Check size={16} className="text-amber-600 stroke-[3]" />}
            </button>

            <button
              onClick={() => setWillBuy('no')}
              className={`w-full p-4 rounded-2xl border text-left text-xs font-bold transition-all flex items-center justify-between ${
                willBuy === 'no'
                  ? 'bg-slate-900/10 border-slate-900 text-slate-900 shadow-inner'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>{text.calcNo}</span>
              {willBuy === 'no' && <Check size={16} className="text-slate-900 stroke-[3]" />}
            </button>

            <button
              onClick={() => setWillBuy('undecided')}
              className={`w-full p-4 rounded-2xl border text-left text-xs font-bold transition-all flex items-center justify-between ${
                willBuy === 'undecided'
                  ? 'bg-slate-200 border-slate-300 text-slate-900 shadow-inner'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>{text.calcUndecided}</span>
              {willBuy === 'undecided' && <Check size={16} className="text-slate-800 stroke-[3]" />}
            </button>
          </div>

          {/* Pricing Result Card */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/50">
            {willBuy === 'yes' ? (
              <div className="space-y-1">
                <span className="text-emerald-600 font-extrabold text-sm block">{text.calcResultFree}</span>
                <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">{text.calcResultFreeSub}</p>
              </div>
            ) : (
              <div className="space-y-1">
                <span className="text-slate-900 font-black text-sm block">{text.calcResultPaid}</span>
                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">{text.calcResultPaidSub}</p>
              </div>
            )}
          </div>
        </div>

        {/* Lead Submission Form (7 Cols) */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm lg:col-span-7">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base tracking-tight">{text.formTitle}</h3>
                  <p className="text-xs text-slate-400 mt-1">{lang === 'kg' ? 'Отелди жана трансферди алдын ала даярдоо үчүн маалыматтарыңызды калтырыңыз' : 'Оставьте ваши контакты, чтобы мы подготовили бронь отеля и трансфер'}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{text.formName}</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={text.setNamePlaceholder}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-700 outline-none focus:ring-1 focus:ring-amber-500 transition-all font-semibold"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{text.formPhone}</label>
                      <input
                        type="text"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={text.setPhonePlaceholder}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-700 outline-none focus:ring-1 focus:ring-amber-500 transition-all font-semibold"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{text.formDate}</label>
                    <div className="relative flex items-center">
                      <Calendar size={14} className="text-slate-400 absolute left-3.5" />
                      <input
                        type="date"
                        value={arrivalDate}
                        onChange={(e) => setArrivalDate(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-700 outline-none focus:ring-1 focus:ring-amber-500 transition-all font-semibold"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition-colors shadow flex items-center justify-center gap-2"
                  >
                    <span>{text.formSubmit}</span>
                    <ArrowRight size={14} />
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-4"
              >
                <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 size={32} />
                </div>
                <div className="space-y-1 max-w-sm mx-auto">
                  <h4 className="font-extrabold text-slate-900 text-base">{text.formSuccess}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                    {text.formSuccessDesc}
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => { setIsSubmitted(false); setName(''); setPhone(''); }}
                    className="text-xs text-amber-500 hover:text-amber-600 font-bold"
                  >
                    {lang === 'kg' ? 'Башка билдирүү жөнөтүү' : 'Отправить другую заявку'}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* 4. Direct Communication Buttons section */}
      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/40 text-center space-y-4">
        <div>
          <h4 className="font-bold text-slate-900 text-sm">{text.contactUs}</h4>
          <p className="text-[11px] text-slate-400 mt-0.5">{lang === 'kg' ? 'Тур тууралуу суроолоруңуз калса, бизге түздөн-түз байланышыңыз' : 'Если у вас остались вопросы о туре, свяжитесь с нами напрямую'}</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={`https://wa.me/${waPhone}?text=Саламатсызбы,%20недвижимость%20тур%20программасы%20боюнча%20билгим%20келет.`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2.5 px-6 rounded-xl text-xs flex items-center gap-1.5 transition-colors shadow-sm shadow-emerald-500/10"
          >
            <MessageSquare size={14} />
            <span>{text.whatsAppText}</span>
          </a>
          <a
            href={`tel:${agencyPhone.replace(/\s/g, '')}`}
            className="bg-white hover:bg-slate-100 text-slate-800 font-bold py-2.5 px-6 rounded-xl border border-slate-200 text-xs flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <PhoneCall size={14} className="text-amber-500" />
            <span>{text.callText} {agencyPhone}</span>
          </a>
        </div>
      </div>

    </div>
  );
}

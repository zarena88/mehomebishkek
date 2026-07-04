import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldAlert, 
  FileText, 
  Users, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight, 
  MessageSquare, 
  PhoneCall, 
  Globe, 
  Key,
  Scale
} from 'lucide-react';

interface RegistrationGuideProps {
  lang: 'kg' | 'ru';
  agencyPhone: string;
}

export function RegistrationGuide({ lang, agencyPhone }: RegistrationGuideProps) {
  const [activeCase, setActiveCase] = useState<number | null>(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');

  const waPhone = agencyPhone.replace(/\+/g, '').replace(/\s/g, '');

  const text = {
    kg: {
      title: "Мүлктү өз атыңызга каттоо",
      subtitle: "Ишеним кат (доверенность) аркылуу чет өлкөдө туруп эле Бишкектен мүлктү өз атыңызга коопсуз каттатыңыз!",
      
      // Power of Attorney Section
      poaTitle: "Ишеним кат аркылуу аралыктан сатып алуу",
      poaDesc: "Чет өлкөдө (Орусия, АКШ, Европа ж.б.) иштеп же жашап жатсаңыз, Бишкекке келбей эле мүлктү өз атыңызга каттата аласыз. Бул абдан жөнөкөй жана 100% мыйзамдуу:",
      poaStep1: "Кыргызстандын чет өлкөдөгү консулдугунан же жергиликтүү нотариустан ишеним кат (доверенность) жаздырасыз.",
      poaStep2: "Ишеним катты биздин ишенимдүү өкүлгө же өзүңүздүн жакын адамыңызга жибересиз.",
      poaStep3: "Биз мүлктү таап, Мамлекеттик каттоо кызматынан (Госрегистр) СИЗДИН атыңызга гана мыйзамдуу түрдө каттап беребиз.",

      // Risks Section Header
      risksHeader: "Өз атыңызга каттабай коюунун кесепеттери",
      risksSub: "Көптөгөн мекендештер убакытты үнөмдөө же башка себептер менен батирди туугандарына каттап, кийин чоң көйгөйлөргө туш болушат. Төмөнкү реалдуу учурларды карап көрүңүз:",

      // Case 1: Parents
      case1Title: "Ата-эненин атына каттоо (кооптуу жагдай)",
      case1Desc: "Батирди карыган ата-энеге каттасаңыз, кокус алар бул дүйнөдөн өтүп кетсе, ал мүлк бардык бир туугандарга мурас (наследство) катары калат. Ошол себептен, мүлктү кайра өзүңүзгө өткөрүү үчүн бардык бир туугандардын макулдугу керек болот жана бул айлап-жылдап соттошуу менен убаракерчиликти талап кылат.",

      // Case 2: Siblings
      case2Title: "Ага-ини же эже-сиңдилердин атына каттоо",
      case2Desc: "Батирди бир туугандарыңызга каттатсаңыз, алар сиздин кабарыңыз жок эле ал мүлктү күрөөгө (залогго) коюп, банктан ири өлчөмдө КРЕДИТ каттатып алышы мүмкүн. Кийин сизге акча керек болуп сатайын десеңиз, үй залогдо тургандыктан сата албай каласыз жана ортодо үй-бүлөлүк келишпестиктер жаралат.",

      // Case 3: Taxes & Hidden Risks
      case3Title: "Башка жагдайлар жана финансылык тобокелдиктер",
      case3Desc: "Эгер мүлк ээсинин кандайдыр бир соттук иштери же карыздары болсо, мамлекет тарабынан анын атындагы мүлктөргө (анын ичинде сиздин батириңизге да) арест коюлуп калышы мүмкүн. Өз мүлкүңүздү коргоонун бир гана жолу — аны башынан эле өз атыңызга мыйзамдуу каттоо!",

      // Interactive Action
      warningTip: "Маанилүү кеңеш: Ак эмгек менен тапкан каражатыңызды тобокелге салбаңыз. Ишеним кат аркылуу мүлктү өз атыңызга каттоо — эң туура жана коопсуз чечим!",

      // Call to Action Form
      formHeader: "Юристтен акысыз кеңеш алыңыз",
      formSub: "Чет өлкөдөн туруп ишеним кат даярдоо жана мүлктү өз атыңызга жаздыруу боюнча толук маалымат беребиз.",
      formName: "Атыңыз",
      formPhone: "Телефон номериңиз",
      formCountry: "Учурда жашаган өлкөңүз",
      formSubmit: "Юристтин кеңешин алуу",
      formSuccess: "Билдирүүңүз кабыл алынды!",
      formSuccessDesc: "Биздин кыймылсыз мүлк юристибиз жакында сиз жашаган өлкөнүн убактысына ылайык WhatsApp аркылуу байланышат.",

      directContact: "Түз байланышуу",
      waButton: "WhatsApp юристке жазуу",
      callButton: "Бизге чалыңыз: "
    },
    ru: {
      title: "Оформление недвижимости на себя",
      subtitle: "Оформите жилье в Бишкеке на свое имя дистанционно по доверенности, находясь за границей!",
      
      // Power of Attorney Section
      poaTitle: "Дистанционная покупка по доверенности",
      poaDesc: "Если вы работаете или живете за рубежом (Россия, США, Европа и др.), вам не нужно приезжать в Бишкек для оформления. Это абсолютно безопасно и на 100% законно:",
      poaStep1: "Оформляете доверенность в консульстве Кыргызстана в вашей стране или у местного нотариуса.",
      poaStep2: "Отправляете доверенность нашему доверенному юристу или вашему близкому человеку.",
      poaStep3: "Мы подбираем недвижимость и регистрируем в Госрегистре строго на ВАШЕ имя.",

      // Risks Section Header
      risksHeader: "Риски при оформлении жилья на других лиц",
      risksSub: "Многие соотечественники ради экономии времени оформляют недвижимость на родственников, что часто приводит к серьезным юридическим проблемам. Ознакомьтесь с реальными рисками:",

      // Case 1: Parents
      case1Title: "Оформление на пожилых родителей (высокий риск)",
      case1Desc: "Если вы оформляете квартиру на родителей, в случае их ухода из жизни это имущество автоматически переходит в общую наследственную массу. Вам придется делить собственную квартиру со всеми братьями и сестрами. Переоформление на себя потребует согласия всех родственников, кучу времени, нервов и пошлин.",

      // Case 2: Siblings
      case2Title: "Оформление на братьев, сестер или родственников",
      case2Desc: "Оформляя жилье на братьев или сестер, вы рискуете тем, что они могут без вашего ведома использовать вашу квартиру в качестве залога для получения крупного кредита в банке. Если вам срочно понадобятся деньги или вы решите продать квартиру, сделать это не удастся, так как недвижимость будет под обременением (в залоге).",

      // Case 3: Taxes & Hidden Risks
      case3Title: "Аресты имущества и другие финансовые споры",
      case3Desc: "Если у человека, на которого оформлена ваша недвижимость, возникнут долги, судебные иски или проблемы с налогами, государственные органы могут наложить арест на все его имущество — включая вашу квартиру. Единственный способ защитить свои деньги — оформлять недвижимость только на себя!",

      // Interactive Action
      warningTip: "Важный совет: Не рискуйте заработанными честным трудом деньгами. Оформление недвижимости строго на свое имя по доверенности — это единственное юридически грамотное решение!",

      // Call to Action Form
      formHeader: "Получите бесплатную консультацию юриста",
      formSub: "Мы подробно объясним, как правильно оформить доверенность из-за рубежа и зарегистрировать покупку строго на ваше имя.",
      formName: "Ваше имя",
      formPhone: "Номер телефона",
      formCountry: "В какой стране вы сейчас?",
      formSubmit: "Получить консультацию",
      formSuccess: "Заявка успешно принята!",
      formSuccessDesc: "Наш юрист по недвижимости свяжется с вами по WhatsApp в ближайшее время с учетом вашего часового пояса.",

      directContact: "Связаться напрямую",
      waButton: "Написать юристу в WhatsApp",
      callButton: "Позвонить нам: "
    }
  }[lang];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setIsFormSubmitted(true);
  };

  const cases = [
    {
      id: 1,
      title: text.case1Title,
      desc: text.case1Desc,
      icon: Users,
      color: "from-amber-500/10 to-amber-500/20 text-amber-600 border-amber-200"
    },
    {
      id: 2,
      title: text.case2Title,
      desc: text.case2Desc,
      icon: AlertTriangle,
      color: "from-rose-500/10 to-rose-500/20 text-rose-600 border-rose-200"
    },
    {
      id: 3,
      title: text.case3Title,
      desc: text.case3Desc,
      icon: ShieldAlert,
      color: "from-slate-900/10 to-slate-900/20 text-slate-800 border-slate-300"
    }
  ];

  return (
    <div className="space-y-12">
      
      {/* 1. TOP HERO HERO BANNER */}
      <div className="relative overflow-hidden bg-slate-900 rounded-3xl text-white p-8 md:p-12 shadow-xl border border-slate-800">
        <div className="absolute inset-0 bg-cover bg-center opacity-15 filter brightness-50" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200')` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-900/40" />
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-amber-500/20 border border-amber-500/30 text-amber-400 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase">
            <Scale size={12} />
            <span>Юридикалык кеңеш / Юридическая чистота</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-display leading-tight">
            {text.title}
          </h1>
          
          <p className="text-sm md:text-base text-slate-300 font-medium leading-relaxed">
            {text.subtitle}
          </p>
        </div>
      </div>

      {/* 2. HOW DISTANT REGISTRATION WORKS (POA SECTION) */}
      <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center border border-amber-500/20">
            <FileText size={20} />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">{text.poaTitle}</h2>
            <p className="text-xs text-slate-400 font-medium">{lang === 'kg' ? 'Чет өлкөдөн туруп каттоо тартиби' : 'Порядок оформления из-за рубежа'}</p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
          {text.poaDesc}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          
          {/* Step 1 */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/50 space-y-3 relative">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-extrabold text-xs">1</div>
            <h4 className="font-extrabold text-slate-900 text-xs tracking-tight">{lang === 'kg' ? 'Консулдук же Нотариус' : 'Консульство или Нотариус'}</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed font-medium">{text.poaStep1}</p>
          </div>

          {/* Step 2 */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/50 space-y-3 relative">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-extrabold text-xs">2</div>
            <h4 className="font-extrabold text-slate-900 text-xs tracking-tight">{lang === 'kg' ? 'Ишеним катты жөнөтүү' : 'Отправка документа'}</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed font-medium">{text.poaStep2}</p>
          </div>

          {/* Step 3 */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/50 space-y-3 relative">
            <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-extrabold text-xs">3</div>
            <h4 className="font-extrabold text-slate-900 text-xs tracking-tight">{lang === 'kg' ? 'Мамлекеттик каттоо' : 'Госрегистрация в КР'}</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed font-medium">{text.poaStep3}</p>
          </div>

        </div>

        {/* Foreign Citizens Special Rules */}
        <div className="p-5 rounded-2xl bg-sky-50/60 border border-sky-100 space-y-3.5">
          <div className="flex items-center gap-2 text-sky-900">
            <Globe size={18} className="text-sky-600 shrink-0" />
            <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider">
              {lang === 'kg' ? 'Чет өлкөнүн жарандары үчүн маанилүү шарттар' : 'Важные условия для иностранных граждан'}
            </h4>
          </div>
          <div className="text-xs text-slate-650 leading-relaxed font-semibold space-y-2.5">
            <p>
              {lang === 'kg' 
                ? 'Эгер сиз чет өлкөнүн жараны болсоңуз, Кыргызстандан өз атыңызга батир (көп кабаттуу үйдөн) жана жер үй (турак жай) сатып алып, мыйзамдуу түрдө каттатсаңыз болот.' 
                : 'Если вы являетесь иностранным гражданином, вы можете приобрести и официально зарегистрировать на свое имя квартиру (в многоквартирном доме) и жилой дом.'}
            </p>
            <div className="bg-rose-50/50 p-3 rounded-xl border border-rose-100 flex items-start gap-2.5 text-rose-950">
              <span className="font-black text-rose-600 bg-rose-100 px-2 py-0.5 rounded text-[10px] uppercase shrink-0 mt-0.5">
                {lang === 'kg' ? 'Тыюу салынат' : 'Запрещено'}
              </span>
              <p className="text-[11px] font-medium leading-relaxed">
                {lang === 'kg'
                  ? 'Айдоо жерлерин (айыл чарба багытындагы жерлерди) жана дачаларды (садоводдук шериктештиктердеги жерлерди) чет өлкөлүк жарандардын өз атына каттоого мыйзам тарабынан катуу тыюу салынат.'
                  : 'Законодательство КР строго запрещает регистрацию пахотных (сельскохозяйственных) земель и дачных участков (в садоводческих товариществах) на имя иностранных граждан.'}
              </p>
            </div>
            <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-200/50 flex items-start gap-2.5 text-amber-950">
              <span className="font-black text-amber-700 bg-amber-100 px-2 py-0.5 rounded text-[10px] uppercase shrink-0 mt-0.5">
                {lang === 'kg' ? 'Келишим түзүү' : 'Договор'}
              </span>
              <p className="text-[11px] font-medium leading-relaxed">
                {lang === 'kg'
                  ? 'Эгерде сиз мындай мүлктөрдү Кыргызстандын жараны болгон жакыныңызга (тууганыңызга же ишенимдүү адамыңызга) каттоону чечсеңиз — ортодогу укуктарыңызды жана каражатыңызды коргоо үчүн сөзсүз түрдө расмий өнөктөштүк же инвестициялык келишим түзүү шарт!'
                  : 'Если вы решите оформить такую недвижимость на близкого человека — гражданина КР, то для защиты ваших прав и вложенных средств обязательным условием является составление официального соглашения или инвестиционного договора между вами!'}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* 3. CASE STUDY: INTERACTIVE RISKS CARD */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">{text.risksHeader}</h2>
          <p className="text-xs text-slate-400 font-medium leading-relaxed">{text.risksSub}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {cases.map((c) => {
            const IconComponent = c.icon;
            const isOpen = activeCase === c.id;

            return (
              <div 
                key={c.id} 
                className={`bg-white rounded-3xl border p-6 flex flex-col justify-between transition-all duration-300 ${
                  isOpen ? 'ring-2 ring-rose-500 shadow-md border-rose-100' : 'border-slate-100 shadow-sm hover:shadow-md'
                }`}
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${c.color} flex items-center justify-center border`}>
                    <IconComponent size={24} />
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm tracking-tight leading-snug">{c.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">{c.desc}</p>
                </div>

                <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest flex items-center gap-1">
                    <AlertTriangle size={12} />
                    <span>{lang === 'kg' ? 'Олуттуу тобокелдик' : 'Высокий риск'}</span>
                  </span>
                  <button 
                    onClick={() => setActiveCase(isOpen ? null : c.id)}
                    className="text-xs font-bold text-slate-900 hover:text-amber-500 transition-colors"
                  >
                    {isOpen ? (lang === 'kg' ? 'Жабуу' : 'Скрыть') : (lang === 'kg' ? 'Кененирээк' : 'Подробнее')}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlighted Advice Box */}
        <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-5 flex items-start gap-3 max-w-3xl mx-auto">
          <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-900 leading-relaxed font-semibold">
            {text.warningTip}
          </p>
        </div>
      </div>

      {/* 4. LEGAL CONSULTATION FORM */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: Text description */}
        <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-6 md:p-8 flex flex-col justify-between border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center opacity-10 filter brightness-50" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600')` }} />
          
          <div className="space-y-4 relative z-10">
            <span className="text-[10px] text-amber-400 font-extrabold uppercase tracking-widest block">{lang === 'kg' ? 'Кесипкөй жардам' : 'Профессиональная помощь'}</span>
            <h3 className="text-xl md:text-2xl font-black font-display leading-tight">{text.formHeader}</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">{text.formSub}</p>
          </div>

          <div className="pt-6 relative z-10 space-y-4">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <CheckCircle2 size={14} className="text-amber-400" />
              <span>{lang === 'kg' ? 'Чет өлкөдө туруп ишеним кат толтуруунун үлгүсү' : 'Образцы доверенностей из разных стран'}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <CheckCircle2 size={14} className="text-amber-400" />
              <span>{lang === 'kg' ? 'Госрегистрде мүлктү текшерүү' : 'Проверка чистоты объекта в Госрегистре'}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Lead submission form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-sm flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {!isFormSubmitted ? (
              <motion.form 
                key="legal-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleFormSubmit} 
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{text.formName}</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={lang === 'kg' ? 'Атыңыз' : 'Ваше имя'}
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
                      placeholder="WhatsApp (Мисалы: +7... / +996...)"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-700 outline-none focus:ring-1 focus:ring-amber-500 transition-all font-semibold"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{text.formCountry}</label>
                  <input
                    type="text"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder={lang === 'kg' ? 'Мисалы: Орусия, АКШ, Түркия' : 'Например: Россия, США, Турция'}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-700 outline-none focus:ring-1 focus:ring-amber-500 transition-all font-semibold"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition-colors shadow flex items-center justify-center gap-2"
                >
                  <span>{text.formSubmit}</span>
                  <ArrowRight size={14} />
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="legal-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 space-y-4"
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
                    onClick={() => { setIsFormSubmitted(false); setName(''); setPhone(''); setCountry(''); }}
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

      {/* 5. DIRECT WHATSAPP AND PHONE ACTIONS */}
      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/40 text-center space-y-4">
        <div>
          <h4 className="font-bold text-slate-900 text-sm">{text.directContact}</h4>
          <p className="text-[11px] text-slate-400 mt-0.5">{lang === 'kg' ? 'Сизге дароо жооп берүүгө даяр юристибиз менен байланышыңыз' : 'Свяжитесь напрямую с нашим юристом для моментальной консультации'}</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={`https://wa.me/${waPhone}?text=Саламатсызбы,%20ишеним%20кат%20менен%20мүлктү%20өз%20атыма%20каттоо%20боюнча%20кеңеш%20алгым%20келет.`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2.5 px-6 rounded-xl text-xs flex items-center gap-1.5 transition-colors shadow-sm shadow-emerald-500/10"
          >
            <MessageSquare size={14} />
            <span>{text.waButton}</span>
          </a>
          <a
            href={`tel:${agencyPhone.replace(/\s/g, '')}`}
            className="bg-white hover:bg-slate-100 text-slate-800 font-bold py-2.5 px-6 rounded-xl border border-slate-200 text-xs flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <PhoneCall size={14} className="text-amber-500" />
            <span>{text.callButton} {agencyPhone}</span>
          </a>
        </div>
      </div>

    </div>
  );
}

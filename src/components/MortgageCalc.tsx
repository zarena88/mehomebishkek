import React, { useState, useEffect } from 'react';
import { Calculator, Percent, Calendar, DollarSign, Wallet, ArrowRight, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface MortgageCalcProps {
  lang: 'kg' | 'ru';
  currency: 'USD' | 'KGS';
  initialPrice?: number;
}

export const MortgageCalc: React.FC<MortgageCalcProps> = ({
  lang,
  currency,
  initialPrice = 80000
}) => {
  const [propertyPrice, setPropertyPrice] = useState<number>(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30);
  const [interestRate, setInterestRate] = useState<number>(14); // 14% is a realistic middle-ground
  const [termYears, setTermYears] = useState<number>(10);
  
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalLoan, setTotalLoan] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalRepayment, setTotalRepayment] = useState<number>(0);

  // Sync initialPrice if it changes
  useEffect(() => {
    if (initialPrice) {
      setPropertyPrice(initialPrice);
    }
  }, [initialPrice]);

  const downPaymentAmount = Math.round((propertyPrice * downPaymentPercent) / 100);
  const principal = propertyPrice - downPaymentAmount;

  useEffect(() => {
    // If no principal or interest rate is 0
    if (principal <= 0) {
      setMonthlyPayment(0);
      setTotalLoan(0);
      setTotalInterest(0);
      setTotalRepayment(0);
      return;
    }

    const monthlyRate = interestRate / 12 / 100;
    const totalPayments = termYears * 12;

    let payment = 0;
    if (interestRate === 0) {
      payment = principal / totalPayments;
    } else {
      payment = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                (Math.pow(1 + monthlyRate, totalPayments) - 1);
    }

    const totalRepay = payment * totalPayments;
    const totalInt = totalRepay - principal;

    setMonthlyPayment(Math.round(payment));
    setTotalLoan(principal);
    setTotalInterest(Math.round(totalInt));
    setTotalRepayment(Math.round(totalRepay));
  }, [propertyPrice, downPaymentPercent, interestRate, termYears]);

  const formatValue = (val: number) => {
    if (currency === 'USD') {
      return `$${val.toLocaleString()}`;
    } else {
      const valKgs = val * 89;
      return `${valKgs.toLocaleString()} сом`;
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left Column: Inputs */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-amber-500/10 text-amber-500 rounded-xl">
            <Calculator size={20} />
          </div>
          <h3 className="font-bold text-slate-800 text-lg">
            {lang === 'kg' ? 'Ипотека эсептөө' : 'Параметры ипотеки'}
          </h3>
        </div>

        {/* Property Price Input & Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span>{lang === 'kg' ? 'Мүлктүн баасы' : 'Стоимость имущества'}</span>
            <span className="text-slate-800 text-sm font-extrabold">{formatValue(propertyPrice)}</span>
          </div>
          <div className="relative">
            <DollarSign size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="number"
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-3 text-sm text-slate-800 font-semibold outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
            />
          </div>
          <input
            type="range"
            min={10000}
            max={300000}
            step={5000}
            value={propertyPrice}
            onChange={(e) => setPropertyPrice(parseInt(e.target.value))}
            className="w-full accent-amber-500 h-1 rounded-lg cursor-pointer"
          />
        </div>

        {/* Down Payment Percent Input & Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span>{lang === 'kg' ? 'Баштапкы төлөм' : 'Первоначальный взнос'}</span>
            <span className="text-slate-800 text-sm font-extrabold">
              {downPaymentPercent}% ({formatValue(downPaymentAmount)})
            </span>
          </div>
          <div className="relative flex items-center gap-3">
            <div className="relative flex-grow">
              <Wallet size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="number"
                min={10}
                max={90}
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Math.min(90, Math.max(10, parseInt(e.target.value) || 10)))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-12 py-3 text-sm text-slate-800 font-semibold outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">%</span>
            </div>
          </div>
          <input
            type="range"
            min={10}
            max={90}
            step={5}
            value={downPaymentPercent}
            onChange={(e) => setDownPaymentPercent(parseInt(e.target.value))}
            className="w-full accent-amber-500 h-1 rounded-lg cursor-pointer"
          />
        </div>

        {/* Interest Rate & Term Years (Side-by-side) */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase tracking-wider">
              <span>{lang === 'kg' ? 'Жылдык пайыз' : 'Годовая ставка'}</span>
            </div>
            <div className="relative">
              <Percent size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="number"
                step="0.5"
                min="1"
                max="30"
                value={interestRate}
                onChange={(e) => setInterestRate(Math.min(30, Math.max(0, parseFloat(e.target.value) || 0)))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2.5 text-xs text-slate-800 font-bold outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
              />
            </div>
            <p className="text-[10px] text-slate-400 font-medium">
              {interestRate <= 8 
                ? (lang === 'kg' ? 'МИК жеңилдетилген шарт' : 'МИК льготная ставка') 
                : (lang === 'kg' ? 'Коммерциялык банктар' : 'Коммерческий банк')}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase tracking-wider">
              <span>{lang === 'kg' ? 'Мөөнөтү (жыл)' : 'Срок (лет)'}</span>
            </div>
            <div className="relative">
              <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="number"
                min="1"
                max="25"
                value={termYears}
                onChange={(e) => setTermYears(Math.min(25, Math.max(1, parseInt(e.target.value) || 1)))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2.5 text-xs text-slate-800 font-bold outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
              />
            </div>
            <p className="text-[10px] text-slate-400 font-medium">
              {termYears * 12} {lang === 'kg' ? 'айлык төлөм' : 'месяцев'}
            </p>
          </div>
        </div>
      </div>

      {/* Right Column: Amortization & Analytical Breakdown */}
      <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl flex flex-col justify-between border border-slate-100">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
            {lang === 'kg' ? 'Сиздин айлык төлөмүңүз:' : 'Ваш ежемесячный платеж:'}
          </span>
          <div className="text-3xl sm:text-4xl font-extrabold text-amber-500 mb-6 flex items-baseline gap-1">
            {formatValue(monthlyPayment)}
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider ml-1">
              {lang === 'kg' ? '/ айына' : '/ месяц'}
            </span>
          </div>

          <div className="space-y-3 border-t border-slate-200/60 pt-5 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-150">
              <span className="text-slate-500 font-medium">{lang === 'kg' ? 'Кредит суммасы:' : 'Сумма кредита:'}</span>
              <span className="text-slate-800 font-bold">{formatValue(totalLoan)}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-150">
              <span className="text-slate-500 font-medium">{lang === 'kg' ? 'Жалпы үстөк пайыз:' : 'Всего начислено процентов:'}</span>
              <span className="text-rose-500 font-bold">+{formatValue(totalInterest)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500 font-medium">{lang === 'kg' ? 'Бардыгы болуп төлөм:' : 'Итоговая выплата:'}</span>
              <span className="text-slate-900 font-extrabold">{formatValue(totalRepayment)}</span>
            </div>
          </div>
        </div>

        {/* Informative advice based on Kyrgyzstan conditions */}
        <div className="mt-8 bg-white p-4 rounded-xl border border-slate-200/50 space-y-2">
          <div className="flex items-start gap-2.5">
            <HelpCircle size={14} className="text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                {lang === 'kg' ? 'Маанилүү кеңеш:' : 'Справочная информация:'}
              </p>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                {lang === 'kg' 
                  ? 'Эгер Сиз бюджеттик мекемеде иштесеңиз, МИКтин (жылдык 4-8%) программаларына кайрылыңыз. Коммерциялык банктарда сом менен чендер жогору (16-24%), бирок батырыраак берилет.'
                  : 'Льготная ипотека ГИК (4-8% годовых) доступна госслужащим и соцкатегориям. В коммерческих банках ставки в сомах составляют 16-24%, в валюте — 9-14%.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { useState, useEffect, useRef } from "react";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import { Calculator, Download, Share2 } from "lucide-react";
import { useLang, t } from "@/lib/i18n";

// Animated counter component for smooth number transitions
const AnimatedNumber = ({ value, format }: { value: number; format: (n: number) => string }) => {
  const motionValue = useMotionValue(value);
  const springValue = useSpring(motionValue, { duration: 800, bounce: 0 });
  const displayValue = useTransform(springValue, (current) => format(Math.round(current)));
  const [renderedValue, setRenderedValue] = useState(format(value));

  useEffect(() => {
    motionValue.set(value);
    const unsubscribe = displayValue.on("change", (latest) => {
      setRenderedValue(latest);
    });
    return unsubscribe;
  }, [value, motionValue, displayValue]);

  return <span>{renderedValue}</span>;
};

// Simple donut chart component
const DonutChart = ({ principal, interest }: { principal: number; interest: number }) => {
  const total = principal + interest;
  const principalPercent = total > 0 ? (principal / total) * 100 : 50;
  const interestPercent = total > 0 ? (interest / total) * 100 : 50;
  
  // SVG circle calculations
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const principalOffset = circumference - (principalPercent / 100) * circumference;
  const interestOffset = circumference - (interestPercent / 100) * circumference;

  return (
    <div className="relative w-32 h-32 mx-auto">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
        {/* Principal segment */}
        <circle
          cx="50" cy="50" r={radius} fill="none"
          stroke="#C9A227" strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={principalOffset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
        {/* Interest segment */}
        <circle
          cx="50" cy="50" r={radius} fill="none"
          stroke="rgba(255,255,255,0.6)" strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={interestOffset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
          style={{ transform: `rotate(${principalPercent * 3.6}deg)`, transformOrigin: "50% 50%" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-[10px] text-white/60 leading-none">Principal</span>
        <span className="text-xs font-bold text-gold leading-none mt-0.5">{Math.round(principalPercent)}%</span>
      </div>
    </div>
  );
};

const EMICalculator = () => {
  const { lang } = useLang();
  const [price, setPrice] = useState(5000000);
  const [down, setDown] = useState(1000000);
  const [rate, setRate] = useState(9);
  const [years, setYears] = useState(15);
  const resultRef = useRef<HTMLDivElement>(null);

  const loanAmount = price - down;
  const monthlyRate = rate / 100 / 12;
  const months = years * 12;
  const emi = monthlyRate > 0
    ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
    : loanAmount / months;
  const totalPayable = emi * months;
  const totalInterest = totalPayable - loanAmount;

  const fmt = (n: number) => new Intl.NumberFormat("en-BD").format(Math.round(n));

  const handleShare = async () => {
    const shareData = {
      title: t("EMI Calculation Result", "ইএমআই গণনা ফলাফল", lang),
      text: `${t("Monthly EMI", "মাসিক ইএমআই", lang)}: ৳ ${fmt(emi)}\n${t("Total Payable", "মোট পরিশোধযোগ্য", lang)}: ৳ ${fmt(totalPayable)}`,
    };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch {}
    } else {
      await navigator.clipboard.writeText(shareData.text);
    }
  };

  const fields = [
    { label: t("Property Price (৳)", "সম্পত্তির মূল্য (৳)", lang), value: price, onChange: (v: number) => { setPrice(v); if (down > v) setDown(v); }, min: 1000000, max: 50000000, step: 500000, isCurrency: true },
    { label: t("Down Payment (৳)", "ডাউন পেমেন্ট (৳)", lang), value: down, onChange: (v: number) => setDown(v > price ? price : v), min: 0, max: Math.max(price, 100000), step: 100000, isCurrency: true },
    { label: t("Interest Rate (%)", "সুদের হার (%)", lang), value: rate, onChange: setRate, min: 1, max: 20, step: 0.5, isCurrency: false },
    { label: t("Loan Duration (Years)", "লোনের মেয়াদ (বছর)", lang), value: years, onChange: setYears, min: 1, max: 30, step: 1, isCurrency: false },
  ];

  return (
    <section className="section-padding bg-secondary">
      <div className="container-wide">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
              {t("EMI Calculator", "ইএমআই ক্যালকুলেটর", lang)}
            </h2>
            <p className="text-muted-foreground">
              {t("Plan your home loan with our instant calculator", "আমাদের ক্যালকুলেটর দিয়ে আপনার হোম লোন পরিকল্পনা করুন", lang)}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-5 gap-8 bg-card rounded-2xl shadow-premium border border-border p-6 md:p-8"
          >
            {/* Inputs Column */}
            <div className="lg:col-span-3 space-y-6">
              {fields.map((field) => (
                <div key={field.label}>
                  <label className="block text-sm font-medium text-foreground mb-2">{field.label}</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min={field.min}
                      max={field.max}
                      step={field.step}
                      value={field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="flex-1 accent-gold h-2 bg-secondary dark:bg-border rounded-lg cursor-pointer"
                    />
                    <input
                      type="number"
                      min={field.min}
                      max={field.max}
                      step={field.step}
                      value={field.value}
                      onChange={(e) => {
                        const v = Number(e.target.value);
                        if (v >= field.min && v <= field.max) field.onChange(v);
                      }}
                      className="w-28 px-3 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 text-right"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Results Column */}
            <div ref={resultRef} className="lg:col-span-2 flex flex-col justify-center">
              <div className="bg-navy rounded-2xl p-6 md:p-8 text-white space-y-6 shadow-premium h-full">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-gold" />
                    <h3 className="font-heading font-semibold">{t("Your EMI", "আপনার ইএমআই", lang)}</h3>
                  </div>
                  <button
                    onClick={handleShare}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/70 hover:text-white"
                    aria-label="Share result"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Monthly EMI */}
                <div>
                  <p className="text-4xl font-heading font-bold text-gold tracking-tight">
                    ৳ <AnimatedNumber value={emi} format={fmt} />
                  </p>
                  <p className="text-xs text-white/60 mt-1">{t("per month", "প্রতি মাসে", lang)}</p>
                </div>

                {/* Donut Chart */}
                <DonutChart principal={loanAmount} interest={totalInterest} />

                {/* Breakdown */}
                <div className="border-t border-white/10 pt-5 space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70 font-medium">{t("Loan Amount", "ঋণের পরিমাণ", lang)}</span>
                    <span className="font-semibold text-white/90">৳ {fmt(loanAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70 font-medium">{t("Total Interest", "মোট সুদ", lang)}</span>
                    <span className="font-semibold text-white/90">৳ {fmt(totalInterest)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-white/10">
                    <span className="font-bold text-white text-base">{t("Total Payable", "মোট পরিশোধযোগ্য", lang)}</span>
                    <span className="font-bold text-gold text-lg">৳ <AnimatedNumber value={totalPayable} format={fmt} /></span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EMICalculator;

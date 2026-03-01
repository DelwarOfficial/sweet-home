import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator } from "lucide-react";
import { useLang, t } from "@/lib/i18n";

const EMICalculator = () => {
  const { lang } = useLang();
  const [price, setPrice] = useState(5000000);
  const [down, setDown] = useState(1000000);
  const [rate, setRate] = useState(9);
  const [years, setYears] = useState(15);

  const loanAmount = price - down;
  const monthlyRate = rate / 100 / 12;
  const months = years * 12;
  const emi = monthlyRate > 0
    ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
    : loanAmount / months;
  const totalPayable = emi * months;
  const totalInterest = totalPayable - loanAmount;

  const fmt = (n: number) => new Intl.NumberFormat("en-BD").format(Math.round(n));

  return (
    <section className="section-padding bg-secondary">
      <div className="container-wide">
        <div className="max-w-4xl mx-auto">
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
            className="grid md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-premium border border-border p-6 md:p-8"
          >
            <div className="space-y-6">
              {[
                { label: t("Property Price (৳)", "সম্পত্তির মূল্য (৳)", lang), value: price, set: setPrice, min: 1000000, max: 50000000, step: 500000 },
                { label: t("Down Payment (৳)", "ডাউন পেমেন্ট (৳)", lang), value: down, set: setDown, min: 0, max: price, step: 100000 },
                { label: t("Interest Rate (%)", "সুদের হার (%)", lang), value: rate, set: setRate, min: 1, max: 20, step: 0.5 },
                { label: t("Loan Duration (Years)", "লোনের মেয়াদ (বছর)", lang), value: years, set: setYears, min: 1, max: 30, step: 1 },
              ].map((field) => (
                <div key={field.label}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-secondary-foreground/80 font-medium">{field.label}</span>
                    <span className="font-bold text-primary">
                      {typeof field.value === "number" && field.step >= 1 ? fmt(field.value) : field.value}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={field.min}
                    max={field.max}
                    step={field.step}
                    value={field.value}
                    onChange={(e) => field.set(Number(e.target.value))}
                    className="w-full accent-gold h-2 rounded-lg cursor-pointer"
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col justify-center">
              <div className="bg-primary rounded-2xl p-6 md:p-8 text-white space-y-6 shadow-premium">
                <div className="flex items-center gap-2 mb-2">
                  <Calculator className="w-5 h-5 text-gold" />
                  <h3 className="font-heading font-semibold">{t("Your EMI", "আপনার ইএমআই", lang)}</h3>
                </div>
                <div>
                  <p className="text-3xl font-heading font-bold text-gold">৳ {fmt(emi)}</p>
                  <p className="text-xs opacity-70 mt-1">{t("per month", "প্রতি মাসে", lang)}</p>
                </div>
                <div className="border-t border-white/10 pt-5 space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70 font-medium">{t("Loan Amount", "ঋণের পরিমাণ", lang)}</span>
                    <span className="font-semibold text-white/90">৳ {fmt(loanAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70 font-medium">{t("Total Interest", "মোট সুদ", lang)}</span>
                    <span className="font-semibold text-white/90">৳ {fmt(totalInterest)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="font-semibold text-white">{t("Total Payable", "মোট পরিশোধযোগ্য", lang)}</span>
                    <span className="font-bold text-gold">৳ {fmt(totalPayable)}</span>
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

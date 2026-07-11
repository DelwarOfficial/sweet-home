import { motion } from "framer-motion";
import { Shield, Clock, Building2, Heart } from "lucide-react";
import { useLang, t } from "@/lib/i18n";

const valueProps = [
  {
    icon: Shield,
    titleEn: "Licensed Developer",
    titleBn: "লাইসেন্সকৃত ডেভেলপার",
    descEn: "REHAB & RAJUK enlisted, ensuring full regulatory compliance",
    descBn: "রিহ্যাব ও রাজউক তালিকাভুক্ত, সম্পূর্ণ নিয়ন্ত্রক সম্মতি নিশ্চিত",
  },
  {
    icon: Building2,
    titleEn: "Quality Materials",
    titleBn: "উন্নতমানের সামগ্রী",
    descEn: "Premium-grade materials sourced through our trusted sister concerns",
    descBn: "আমাদের বিশ্বস্ত সহযোগী প্রতিষ্ঠানের মাধ্যমে প্রিমিয়াম-গ্রেড সামগ্রী সংগ্রহ",
  },
  {
    icon: Clock,
    titleEn: "On-Time Delivery",
    titleBn: "সময়মতো হস্তান্তর",
    descEn: "Proven track record of completing projects on schedule",
    descBn: "নির্ধারিত সময়ে প্রকল্প সম্পন্ন করার প্রমাণিত রেকর্ড",
  },
  {
    icon: Heart,
    titleEn: "Customer First",
    titleBn: "গ্রাহক সবার আগে",
    descEn: "Dedicated support and transparent communication at every step",
    descBn: "প্রতিটি ধাপে নিবেদিত সাপোর্ট এবং স্বচ্ছ যোগাযোগ",
  },
];

const WhyChooseUs = () => {
  const { lang } = useLang();

  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
            {t("Why Choose Us", "কেন আমাদের নির্বাচন করবেন", lang)}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t(
              "We combine experience, quality, and trust to deliver your dream home",
              "আমরা অভিজ্ঞতা, গুণমান এবং বিশ্বাসের সমন্বয়ে আপনার স্বপ্নের বাড়ি প্রদান করি",
              lang
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {valueProps.map((prop, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group flex flex-col items-center text-center p-6 rounded-2xl border border-border bg-card hover:border-gold/30 hover:shadow-premium hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                <prop.icon className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                {lang === "bn" ? prop.titleBn : prop.titleEn}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {lang === "bn" ? prop.descBn : prop.descEn}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

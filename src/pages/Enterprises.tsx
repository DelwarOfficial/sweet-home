import { motion } from "framer-motion";
import { Truck, ShieldCheck, Gem } from "lucide-react";
import { useLang, t } from "@/lib/i18n";

const enterprises = [
  {
    nameEn: "Messrs Diba Enterprise",
    nameBn: "মেসার্স দিবা এন্টারপ্রাইজ",
    icon: Truck,
    descEn: "Supplying premium construction materials including steel, cement, and aggregates. Ensures every S & D project meets the highest structural standards.",
    descBn: "ইস্পাত, সিমেন্ট এবং অ্যাগ্রিগেট সহ প্রিমিয়াম নির্মাণ সামগ্রী সরবরাহ করে। প্রতিটি এস অ্যান্ড ডি প্রকল্প সর্বোচ্চ কাঠামোগত মান পূরণ করে।",
  },
  {
    nameEn: "Messrs Sabiya Enterprise",
    nameBn: "মেসার্স সাবিয়া এন্টারপ্রাইজ",
    icon: Gem,
    descEn: "Specializing in finishing materials and interior solutions. Delivers the luxurious finish that defines every Sweet Home residence.",
    descBn: "ফিনিশিং ম্যাটেরিয়াল এবং ইন্টেরিয়র সমাধানে বিশেষজ্ঞ। প্রতিটি সুইট হোম বাসভবনের বিলাসবহুল ফিনিশিং প্রদান করে।",
  },
];

const Enterprises = () => {
  const { lang } = useLang();

  return (
    <div className="pt-20">
      <section className="section-padding navy-gradient text-primary-foreground">
        <div className="container-wide">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-3">
            {t("Our Enterprises", "আমাদের এন্টারপ্রাইজ", lang)}
          </h1>
          <p className="text-lg opacity-80">
            {t("Sister concerns powering quality from foundation to finish", "ভিত্তি থেকে ফিনিশিং পর্যন্ত মান নিশ্চিতকারী সিস্টার কনসার্ন", lang)}
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-wide max-w-4xl mx-auto">
          <div className="grid gap-8">
            {enterprises.map((e, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card rounded-xl border border-border p-8 flex flex-col md:flex-row gap-6"
              >
                <div className="w-16 h-16 rounded-xl gold-gradient flex items-center justify-center shrink-0">
                  <e.icon className="w-7 h-7 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-heading font-semibold mb-2">{lang === "bn" ? e.nameBn : e.nameEn}</h3>
                  <p className="text-muted-foreground leading-relaxed">{lang === "bn" ? e.descBn : e.descEn}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 bg-primary rounded-xl p-8 text-center text-primary-foreground"
          >
            <ShieldCheck className="w-10 h-10 text-gold mx-auto mb-4" />
            <h3 className="text-xl font-heading font-semibold mb-2">{t("Vertically Integrated Quality", "উল্লম্বভাবে সমন্বিত মান", lang)}</h3>
            <p className="opacity-80 max-w-xl mx-auto">
              {t(
                "By controlling the supply chain through our sister concerns, we guarantee material quality, reduce costs, and deliver on time — every time.",
                "আমাদের সিস্টার কনসার্নের মাধ্যমে সরবরাহ শৃঙ্খল নিয়ন্ত্রণ করে, আমরা উপকরণের মান নিশ্চিত করি, খরচ কমাই এবং সময়মতো ডেলিভারি দিই।",
                lang
              )}
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Enterprises;

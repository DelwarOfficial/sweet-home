import { motion } from "framer-motion";
import { Building, ShieldCheck } from "lucide-react";
import { useLang, t } from "@/lib/i18n";

const partners = [
    { name: "GPH Ispat", logo: "/Sister Concern/GPH-ISPAT.png" },
    { name: "Partex", logo: "/Sister Concern/Partex.png" },
    { name: "RFL", logo: "/Sister Concern/RFL.png" },
    { name: "Aman Cement", logo: "/Sister Concern/aman-cement.png.webp" },
    { name: "Bashundhara Cement", logo: "/Sister Concern/bashundhara-cement.png" },
    { name: "BTB", logo: "/Sister Concern/btb.png.webp" },
    { name: "National Polymer", logo: "/Sister Concern/national-polymer.png.webp" },
    { name: "Supercrete Cement", logo: "/Sister Concern/supercrete-cement.png" },
];

const SisterConcern = () => {
    const { lang } = useLang();

    return (
        <section className="section-padding bg-[#F8FAFC] border-t border-[rgba(15,47,70,0.10)] dark:bg-[#0B2239] dark:border-white/10">
            <div className="container-wide">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-primary font-semibold text-xs mb-4">
                        <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                        {t("Quality Assurance", "মান নিশ্চিতকরণ", lang)}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                        {t("Our Sister Concerns", "আমাদের সহযোগী প্রতিষ্ঠান", lang)}
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed dark:text-slate-400">
                        {t(
                            "Supported by Messrs Diba Enterprise and Messrs Sabiya Enterprise. Our sister concerns ensure a robust supply chain, providing premium grade materials and unwavering quality assurance across all our projects.",
                            "মেসার্স দিবা এন্টারপ্রাইজ এবং মেসার্স সাবিয়া এন্টারপ্রাইজের সহায়তায় পরিচালিত। আমাদের সহযোগী প্রতিষ্ঠানগুলো একটি শক্তিশালী সাপ্লাই চেইন নিশ্চিত করে। এর মাধ্যমে প্রতিটি প্রকল্পে প্রিমিয়াম গ্রেডের সরঞ্জাম এবং নিরবচ্ছিন্ন গুণগত মান বজায় রাখা হয়।",
                            lang
                        )}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="group flex items-start gap-4 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-[#ffffff] to-[#f8fafc] border border-border shadow-subtle hover:-translate-y-[6px] hover:shadow-premium transition-all duration-250 ease-out dark:from-white/5 dark:to-white/5 dark:border-white/10 dark:hover:border-white/20 dark:hover:shadow-[0_8px_24px_rgba(201,162,39,0.08)]"
                    >
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0F2F46] to-[#0A4D68] flex items-center justify-center shrink-0 shadow-inner dark:bg-white/10 dark:from-transparent dark:to-transparent">
                            <Building className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="font-heading font-bold text-lg text-[#1E293B] mb-2 relative inline-block dark:text-slate-100">
                                {t("Messrs Diba Enterprise", "মেসার্স দিবা এন্টারপ্রাইজ", lang)}
                                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#C9A227] transition-all duration-300 group-hover:w-full rounded-full"></span>
                            </h3>
                            <p className="text-sm text-[#475569] leading-relaxed dark:text-slate-400">
                                {t(
                                    "As a key pillar of our supply chain, Diba Enterprise specializes in sourcing elite construction materials directly from the nation's most trusted manufacturers.",
                                    "আমাদের সাপ্লাই চেইনের মূল ভিত্তি হিসেবে কাজ করছে দিবা এন্টারপ্রাইজ। দেশের সবচেয়ে নির্ভরযোগ্য নির্মাতাদের কাছ থেকে উন্নত মানের নির্মাণসামগ্রী সংগ্রহ করতে তারা বিশেষভাবে পারদর্শী।",
                                    lang
                                )}
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="group flex items-start gap-4 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-[#ffffff] to-[#f8fafc] border border-border shadow-subtle hover:-translate-y-[6px] hover:shadow-premium transition-all duration-250 ease-out dark:from-white/5 dark:to-white/5 dark:border-white/10 dark:hover:border-white/20 dark:hover:shadow-[0_8px_24px_rgba(201,162,39,0.08)]"
                    >
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0F2F46] to-[#0A4D68] flex items-center justify-center shrink-0 shadow-inner dark:bg-white/10 dark:from-transparent dark:to-transparent">
                            <Building className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="font-heading font-bold text-lg text-[#1E293B] mb-2 relative inline-block dark:text-slate-100">
                                {t("Messrs Sabiya Enterprise", "মেসার্স সাবিয়া এন্টারপ্রাইজ", lang)}
                                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#C9A227] transition-all duration-300 group-hover:w-full rounded-full"></span>
                            </h3>
                            <p className="text-sm text-[#475569] leading-relaxed dark:text-slate-400">
                                {t(
                                    "Dedicated to uncompromising quality control operations, ensuring only structurally perfect raw materials make their way into our residential developments.",
                                    "আপসহীন মান নিয়ন্ত্রণ কার্যক্রমে নিবেদিত। তারা নিশ্চিত করে, যেন শুধুমাত্র কাঠামোগতভাবে নিখুঁত কাঁচামাল আমাদের আবাসিক প্রকল্পগুলোতে ব্যবহৃত হয়।",
                                    lang
                                )}
                            </p>
                        </div>
                    </motion.div>
                </div>

                <div>
                    <div className="flex flex-col items-center justify-center mb-10">
                        <h4 className="text-sm font-semibold text-[#475569] uppercase tracking-[0.15em] mb-4 text-center dark:text-slate-400">
                            {t("Our Trusted Material Partners", "আমাদের বিশ্বস্ত নির্মাণ সামগ্রী পার্টনার", lang)}
                        </h4>
                        <div className="w-16 h-0.5 bg-[#C9A227] rounded-full"></div>
                    </div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-2 lg:grid-cols-4 lg:gap-8 gap-4 px-2"
                    >
                        {partners.map((partner, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-2xl p-6 md:p-8 flex items-center justify-center shadow-subtle border border-border hover:scale-105 hover:shadow-premium transition-all duration-300 ease-out h-32 md:h-40 dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10 dark:hover:border-white/20"
                            >
                                <img
                                    src={partner.logo}
                                    alt={partner.name}
                                    className="w-full h-full max-h-16 md:max-h-24 object-contain"
                                    width="160"
                                    height="96"
                                    decoding="async"
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default SisterConcern;

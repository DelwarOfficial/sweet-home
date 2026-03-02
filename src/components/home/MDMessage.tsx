import { useLang, t } from "@/lib/i18n";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import mdImage from "@/assets/md-latif-tapadar.jpg";
import mdTextRawBn from "@/assets/Md-text.txt?raw";
import mdTextRawEn from "@/assets/Md-text-en.txt?raw";

const MDMessage = () => {
    const { lang } = useLang();

    // We split the text into paragraphs and remove empty lines
    const textRaw = lang === 'bn' ? mdTextRawBn : mdTextRawEn;
    const paragraphs = textRaw
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

    return (
        <section className="section-padding bg-background/50">
            <div className="container-wide">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="bg-card rounded-[24px] shadow-premium border border-border overflow-hidden"
                >
                    <div className="flex flex-col md:flex-row p-6 md:p-8 lg:p-12 gap-8 lg:gap-12 items-start">

                        {/* Left Column: Image */}
                        <div className="w-full md:w-[30%] lg:w-1/4 shrink-0 flex flex-col items-center">
                            <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-full md:h-auto md:aspect-[4/5] relative rounded-full md:rounded-[20px] overflow-hidden border border-border shadow-subtle group">
                                <img
                                    src={mdImage}
                                    alt={t("Md. Latif Tapadar – Managing Director", "মোঃ লতিফ তাপাদার - ব্যবস্থাপনা পরিচালক", lang)}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                        </div>

                        {/* Right Column: Content */}
                        <div className="flex-1 flex flex-col w-full">
                            <div className="mb-6">
                                <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-foreground mb-3">
                                    {t("Message from the Managing Director", "ব্যবস্থাপনা পরিচালকের বার্তা", lang)}
                                </h2>
                                <div className="w-16 h-1 bg-gradient-to-r from-gold to-gold-light rounded-full mb-6"></div>

                                <h3 className="font-heading font-bold text-xl sm:text-2xl text-primary mb-1">
                                    {t("Md. Latif Tapadar", "মোঃ লতিফ তাপাদার", lang)}
                                </h3>
                                <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                                    {t("Managing Director", "ব্যবস্থাপনা পরিচালক", lang)}
                                </p>
                            </div>

                            <div className="relative text-foreground/80 text-sm sm:text-base leading-relaxed font-body">
                                <div className="space-y-4 transition-all duration-500 overflow-hidden line-clamp-4 sm:line-clamp-5">
                                    {paragraphs.map((p, idx) => (
                                        <p key={idx} className="text-justify md:text-left">{p}</p>
                                    ))}
                                </div>

                                {/* Gradient fade-out overlay when collapsed */}
                                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-card to-transparent pointer-events-none"></div>
                            </div>

                            <Link
                                to="/managing-director-message"
                                className="mt-6 inline-flex items-center gap-2 text-primary font-bold hover:text-gold transition-colors self-start group px-4 py-2 -ml-4 rounded-lg hover:bg-secondary"
                            >
                                {t("Read More", "আরও পড়ুন", lang)}
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>

                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default MDMessage;

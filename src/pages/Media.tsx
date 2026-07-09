import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Camera, Newspaper, PartyPopper, Play, X, Clock, Eye } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useLang, t } from "@/lib/i18n";
import { reels, getFacebookEmbedUrl, Reel } from "@/data/reels";

const categories = [
  { icon: Award, labelEn: "Awards", labelBn: "পুরস্কার", count: 5 },
  { icon: PartyPopper, labelEn: "Handover Ceremonies", labelBn: "হ্যান্ডওভার অনুষ্ঠান", count: 8 },
  { icon: Newspaper, labelEn: "Press Coverage", labelBn: "প্রেস কভারেজ", count: 12 },
  { icon: Camera, labelEn: "Events", labelBn: "ইভেন্ট", count: 6 },
];

const Media = () => {
  const { lang } = useLang();
  const [selectedReel, setSelectedReel] = useState<Reel | null>(null);

  return (
    <div className="pt-20">
      <Helmet>
        <title>{t("Media & Updates | S & D Sweet Home Developers Ltd.", "মিডিয়া ও আপডেট | এস অ্যান্ড ডি সুইট হোম ডেভেলপারস লিমিটেড", lang)}</title>
        <meta name="description" content={t(
          "Watch S & D Sweet Home Developers project reels, awards, handover ceremonies, and corporate events.",
          "এস অ্যান্ড ডি সুইট হোম ডেভেলপারসের প্রকল্প রিল, পুরস্কার, হস্তান্তর অনুষ্ঠান ও কর্পোরেট ইভেন্ট দেখুন।",
          lang
        )} />
      </Helmet>
      <section className="section-padding navy-gradient text-primary-foreground">
        <div className="container-wide">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-3">
            {t("Media & Updates", "মিডিয়া ও আপডেট", lang)}
          </h1>
          <p className="text-lg opacity-80">
            {t("Awards, ceremonies, and press coverage", "পুরস্কার, অনুষ্ঠান এবং প্রেস কভারেজ", lang)}
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-wide">
          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {categories.map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl border border-border p-6 text-center hover:border-gold/40 transition-colors cursor-pointer"
              >
                <div className="w-14 h-14 rounded-xl gold-gradient flex items-center justify-center mx-auto mb-4">
                  <cat.icon className="w-6 h-6 text-accent-foreground" />
                </div>
                <h3 className="font-heading font-semibold">{lang === "bn" ? cat.labelBn : cat.labelEn}</h3>
                <p className="text-sm text-muted-foreground mt-1">{cat.count} {t("items", "আইটেম", lang)}</p>
              </motion.div>
            ))}
          </div>

          {/* Section Divider */}
          <div className="border-t border-border my-12" />

          {/* Video Gallery Header */}
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground mb-2">
              {t("Video Gallery", "ভিডিও গ্যালারি", lang)}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              {t("Watch our project walkthroughs, client handovers, and corporate events.", "আমাদের প্রকল্পের ওয়াকথ্রু, ক্লায়েন্ট হস্তান্তর এবং কর্পোরেট ইভেন্টগুলো দেখুন।", lang)}
            </p>
          </div>

          {/* Reels Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {reels.map((reel, i) => (
              <motion.div
                key={reel.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                onClick={() => setSelectedReel(reel)}
                className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-gold/40 hover:shadow-premium hover:-translate-y-[2px] transition-all duration-300 flex flex-col cursor-pointer"
              >
                {/* Thumbnail Container */}
                <div className="aspect-[9/16] bg-secondary relative overflow-hidden shrink-0">
                  <img
                    src={reel.thumbnail}
                    alt={lang === "bn" ? reel.titleBn : reel.titleEn}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                  
                  {/* Hover Overlay with Play Button */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                    <div className="w-14 h-14 rounded-full bg-gold/90 text-navy flex items-center justify-center scale-90 group-hover:scale-100 transition-transform duration-300 shadow-lg">
                      <Play className="w-6 h-6 fill-current ml-1 text-primary" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  {reel.duration && (
                    <span className="absolute bottom-3 right-3 z-20 px-2 py-1 text-[10px] font-semibold rounded bg-black/75 text-white flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {reel.duration}
                    </span>
                  )}

                  {/* Views Badge */}
                  {(reel.viewsEn || reel.viewsBn) && (
                    <span className="absolute bottom-3 left-3 z-20 px-2 py-1 text-[10px] font-semibold rounded bg-black/75 text-white flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {lang === "bn" ? reel.viewsBn : reel.viewsEn}
                    </span>
                  )}
                </div>

                {/* Info Footer */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <h3 className="font-heading font-semibold text-sm line-clamp-2 text-foreground group-hover:text-gold transition-colors">
                    {lang === "bn" ? reel.titleBn : reel.titleEn}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Lightbox Modal */}
          <AnimatePresence>
            {selectedReel && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
                onClick={() => setSelectedReel(null)}
              >
                <motion.div
                  initial={{ scale: 0.95, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.95, y: 20 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  className="relative w-full max-w-[420px] aspect-[9/16] bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close Button inside Modal Header for easy access */}
                  <button
                    onClick={() => setSelectedReel(null)}
                    className="absolute top-4 right-4 z-50 p-2 bg-black/50 text-white rounded-full hover:bg-black/80 transition-colors border border-white/10"
                    aria-label="Close video player"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Iframe Embed */}
                  <iframe
                    src={getFacebookEmbedUrl(selectedReel.url)}
                    className="w-full h-full border-none"
                    scrolling="no"
                    allowFullScreen={true}
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    title={lang === "bn" ? selectedReel.titleBn : selectedReel.titleEn}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default Media;


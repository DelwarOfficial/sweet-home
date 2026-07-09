import { useRef, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Camera, Play, X, Clock, Eye } from "lucide-react";
import { useLang, t } from "@/lib/i18n";
import { reels, getFacebookEmbedUrl, Reel } from "@/data/reels";

const ProjectGallery = () => {
  const { lang } = useLang();
  const [selectedReel, setSelectedReel] = useState<Reel | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  }, []);

  const scrollRight = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  }, []);

  return (
    <section className="section-padding bg-secondary/50">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-primary font-semibold text-xs mb-4">
            <Camera className="w-3.5 h-3.5 text-gold" />
            {t("Video Gallery", "ভিডিও গ্যালারি", lang)}
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
            {t("A Glimpse of Our Work", "আমাদের কাজের এক ঝলক", lang)}
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            {t(
              "Watch our project walkthroughs, client handovers, and corporate events.",
              "আমাদের প্রকল্পের ওয়াকথ্রু, ক্লায়েন্ট হস্তান্তর এবং কর্পোরেট ইভেন্টগুলো দেখুন",
              lang
            )}
          </p>
        </motion.div>

        <div className="relative group">
          <button
            onClick={scrollLeft}
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-30 hidden lg:flex items-center justify-center w-12 h-12 rounded-full bg-background border border-border shadow-md hover:shadow-premium text-foreground hover:text-primary transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label="Scroll left"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-5 pb-6 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-4 px-4 sm:mx-0 sm:px-0"
          >
            {reels.map((reel, i) => (
              <div
                key={reel.id}
                className="snap-start flex-shrink-0 w-[75vw] sm:w-[280px] md:w-[300px]"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  onClick={() => setSelectedReel(reel)}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-subtle hover:shadow-premium hover:-translate-y-[2px] transition-all duration-300 cursor-pointer aspect-[9/16]"
                >
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

                  {/* Title Overlay gradient */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-20">
                    <h3 className="font-heading font-semibold text-sm line-clamp-2 text-white group-hover:text-gold transition-colors">
                      {lang === "bn" ? reel.titleBn : reel.titleEn}
                    </h3>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

          <button
            onClick={scrollRight}
            className="absolute -right-5 top-1/2 -translate-y-1/2 z-30 hidden lg:flex items-center justify-center w-12 h-12 rounded-full bg-background border border-border shadow-md hover:shadow-premium text-foreground hover:text-primary transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label="Scroll right"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
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
              {/* Close Button */}
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
    </section>
  );
};

export default ProjectGallery;

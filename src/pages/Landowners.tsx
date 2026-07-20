import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { MapPin, Phone, MessageCircle, ArrowRight, FileSignature, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useLang, t } from "@/lib/i18n";
import { landownerArticles } from "@/data/landowners-data";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

const Landowners = () => {
  const { lang } = useLang();

  return (
    <div className="pt-20">
      {/* SEO Helmet */}
      <Helmet>
        <title>
          {t(
            "Landowner Agreements & Signing Ceremonies | S & D Sweet Home Developers Ltd.",
            "ভূমির মালিকদের চুক্তি ও স্বাক্ষর অনুষ্ঠান | এস অ্যান্ড ডি সুইট হোম ডেভেলপারস লিমিটেড",
            lang
          )}
        </title>
        <meta
          name="description"
          content={t(
            "Selected landowner agreement and signing ceremony updates for S & D Sweet Home Developers Ltd. projects in Dhaka.",
            "ঢাকায় এস অ্যান্ড ডি সুইট হোম ডেভেলপারস লিমিটেডের নির্বাচিত প্রকল্পের ভূমির মালিকদের সঙ্গে চুক্তি ও স্বাক্ষর অনুষ্ঠানের তথ্য।",
            lang
          )}
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Landowner Agreements & Signing Ceremonies",
            description:
              "Selected landowner agreement and signing ceremony updates for S & D Sweet Home Developers Ltd. projects in Dhaka.",
            publisher: {
              "@type": "Organization",
              name: "S & D Sweet Home Developers Ltd.",
              url: "https://sdsweethome.com",
            },
          })}
        </script>
      </Helmet>

      {/* ── PAGE HERO ─────────────────────────────────────────── */}
      <section className="section-padding navy-gradient text-primary-foreground relative overflow-hidden">
        {/* Subtle decorative pattern */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: "28px 28px",
          }}
        />
        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 bg-white/10 text-sm font-medium mb-6">
              <FileSignature className="w-4 h-4" aria-hidden="true" />
              {t("Landowner Agreements", "ভূমি মালিক চুক্তি", lang)}
            </div>

            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 leading-tight">
              {t(
                "Landowner Agreements & Signing Ceremonies",
                "ভূমির মালিকদের সঙ্গে চুক্তি ও স্বাক্ষর অনুষ্ঠান",
                lang
              )}
            </h1>

            <p className="text-lg md:text-xl opacity-80 leading-relaxed max-w-2xl">
              {t(
                "A factual record of selected project signing ceremonies and landowner collaboration updates by S & D Sweet Home Developers Ltd.",
                "এস অ্যান্ড ডি সুইট হোম ডেভেলপারস লিমিটেডের নির্বাচিত প্রকল্প চুক্তি স্বাক্ষর অনুষ্ঠান ও ভূমির মালিকদের সঙ্গে সমন্বয় সংক্রান্ত তথ্যভিত্তিক উপস্থাপন।",
                lang
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── INTRO CARD ────────────────────────────────────────── */}
      <section className="bg-background py-10 md:py-14">
        <div className="container-wide max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="flex gap-4 p-6 md:p-8 rounded-2xl border border-border bg-card shadow-subtle"
          >
            <div className="shrink-0 w-10 h-10 rounded-lg gold-gradient flex items-center justify-center mt-0.5">
              <Building2 className="w-5 h-5 text-accent-foreground" aria-hidden="true" />
            </div>
            <p className="text-muted-foreground leading-relaxed text-base">
              {t(
                "This page presents selected signing ceremony updates related to S & D Sweet Home development projects. Each article includes the project name, address, and a short factual summary of the agreement process.",
                "এই পৃষ্ঠায় এস অ্যান্ড ডি সুইট হোমের নির্বাচিত উন্নয়ন প্রকল্পের চুক্তি স্বাক্ষর সংক্রান্ত তথ্য উপস্থাপন করা হয়েছে। প্রতিটি নিবন্ধে প্রকল্পের নাম, ঠিকানা এবং চুক্তি প্রক্রিয়ার সংক্ষিপ্ত তথ্যভিত্তিক বিবরণ রয়েছে।",
                lang
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── ARTICLE LIST ─────────────────────────────────────── */}
      <section className="section-padding bg-secondary/40 pt-2 md:pt-4">
        <div className="container-wide max-w-4xl space-y-10 md:space-y-14">
          {landownerArticles.map((article, i) => {
            const content = lang === "bn" ? article.contentBn : article.contentEn;
            return (
              <motion.article
                key={article.id}
                id={article.slug}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                className="bg-card border border-border rounded-2xl shadow-subtle hover:shadow-premium transition-shadow duration-300 overflow-hidden"
                aria-label={content.title}
              >
                {/* Article inner padding */}
                <div className="p-6 md:p-10">
                  {/* Article header */}
                  <header className="mb-6">
                    {/* Eyebrow */}
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-gold/40 bg-gold/10 text-xs font-semibold text-gold-dark mb-4">
                      <FileSignature className="w-3 h-3" aria-hidden="true" />
                      {content.eyebrow}
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4 leading-snug">
                      {content.title}
                    </h2>

                    {/* Address */}
                    <address className="not-italic flex items-start gap-2 text-muted-foreground text-sm">
                      <MapPin
                        className="w-4 h-4 shrink-0 mt-0.5 text-gold"
                        aria-hidden="true"
                      />
                      <span>
                        {lang === "bn" ? article.addressBn : article.addressEn}
                      </span>
                    </address>
                  </header>

                  {/* ── Article body ── */}

                  {/* Intro paragraph */}
                  <p className="text-foreground leading-relaxed mb-5 text-base">
                    {content.intro}
                  </p>

                  {/* Before-image paragraph */}
                  <p className="text-muted-foreground leading-relaxed mb-8 text-base">
                    {content.beforeImage}
                  </p>

                  {/* ── Image in the middle of article ── */}
                  <figure className="mb-8">
                    <img
                      src={article.image}
                      alt={lang === "bn" ? article.imageAltBn : article.imageAltEn}
                      className="w-full max-h-[520px] object-cover rounded-xl border border-border"
                      loading="lazy"
                      decoding="async"
                    />
                    <figcaption className="mt-3 text-xs text-muted-foreground text-center italic">
                      {lang === "bn" ? article.imageAltBn : article.imageAltEn}
                    </figcaption>
                  </figure>

                  {/* After-image paragraph */}
                  <p className="text-muted-foreground leading-relaxed mb-5 text-base">
                    {content.afterImage}
                  </p>

                  {/* Closing paragraph */}
                  <p className="text-muted-foreground leading-relaxed mb-8 text-base">
                    {content.closing}
                  </p>

                  {/* Article footer */}
                  <footer className="border-t border-border pt-4">
                    <p className="text-xs text-muted-foreground">
                      <span className="font-semibold text-foreground">
                        {t("Project", "প্রকল্প", lang)}:{" "}
                      </span>
                      {lang === "bn"
                        ? article.projectNameBn
                        : article.projectNameEn}
                    </p>
                  </footer>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* ── CTA SECTION ──────────────────────────────────────── */}
      <section className="section-padding bg-background">
        <div className="container-wide max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-border bg-card shadow-subtle p-8 md:p-12 text-center"
          >
            {/* Gold icon */}
            <div className="w-14 h-14 rounded-xl gold-gradient flex items-center justify-center mx-auto mb-6">
              <FileSignature className="w-6 h-6 text-accent-foreground" aria-hidden="true" />
            </div>

            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3">
              {t(
                "Discuss a Land Development Proposal",
                "ভূমি উন্নয়ন প্রস্তাব নিয়ে আলোচনা করুন",
                lang
              )}
            </h2>

            <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto mb-8 text-base">
              {t(
                "For land development or joint project discussions, contact S & D Sweet Home Developers Ltd. through the official contact channels.",
                "ভূমি উন্নয়ন বা যৌথ প্রকল্প নিয়ে আলোচনার জন্য এস অ্যান্ড ডি সুইট হোম ডেভেলপারস লিমিটেডের অফিসিয়াল যোগাযোগ মাধ্যমে যোগাযোগ করুন।",
                lang
              )}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Call Now */}
              <a
                href="tel:+8801806999979"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-linear-to-r from-primary to-navy-light text-white font-semibold text-sm shadow-premium hover:opacity-90 transition-opacity focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-hidden"
                aria-label={t("Call S & D Sweet Home Developers", "এস অ্যান্ড ডি-তে ফোন করুন", lang)}
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                {t("Call Now", "এখনই কল করুন", lang)}
              </a>

              {/* Contact Us */}
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-border bg-card text-foreground font-semibold text-sm hover:border-gold/50 hover:text-primary hover:shadow-subtle transition-all duration-300 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-hidden"
              >
                {t("Contact Us", "যোগাযোগ করুন", lang)}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>

              {/* WhatsApp */}
              <a
                href="https://wa.me/8801806999979"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-green-500/40 bg-green-500/10 text-green-600 dark:text-green-400 font-semibold text-sm hover:bg-green-500/20 transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-hidden"
                aria-label={t("Message on WhatsApp", "WhatsApp-এ বার্তা করুন", lang)}
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Landowners;

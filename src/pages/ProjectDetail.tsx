import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  MapPin,
  Maximize,
  Building,
  Ruler,
  Compass,
  CalendarClock,
  Layers,
  CheckCircle,
  ArrowLeft,
  FileDown,
  Map as MapIcon,
  Loader2,
} from "lucide-react";
import { useLang, t } from "@/lib/i18n";
import { projects, getImage, type Project } from "@/lib/projects";
import { LeadForm } from "@/components/projects/LeadForm";

/** Site origin used for absolute OG / canonical / JSON-LD URLs. */
const SITE_ORIGIN =
  (typeof window !== "undefined" && window.location?.origin) ||
  "https://sdsweethome.com";

/**
 * URL-encode an image path so spaces / `&` / commas don't break the request.
 * Absolute URLs and already-encoded paths pass through unchanged.
 */
function encodeUriPath(src: string): string {
  if (!src) return "";
  if (/^https?:\/\//i.test(src) || src.includes("%20")) return src;
  if (src.startsWith("/")) return "/" + encodeURI(src.slice(1));
  return encodeURI(src);
}

/** Build a RealEstateListing JSON-LD object for the project. */
function buildJsonLd(p: Project, origin: string) {
  const cover = p.coverImage || p.image;
  const imageAbs = cover ? new URL(cover, origin).toString() : undefined;
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: p.name,
    alternateName: p.nameBn || undefined,
    description: p.description || undefined,
    url: `${origin}/projects/${p.slug}`,
    image: imageAbs,
    address: {
      "@type": "PostalAddress",
      streetAddress: p.location,
      addressLocality: p.city,
      addressCountry: "BD",
    },
    amenityFeature: (p.amenities || []).map((a) => ({
      "@type": "LocationFeatureSpecification",
      name: a,
      value: true,
    })),
    floorSize:
      p.flatSizes && p.flatSizes.length
        ? {
            "@type": "QuantitativeValue",
            value: Math.min(...p.flatSizes),
            unitText: "sft",
          }
        : undefined,
  };
}

const ProjectDetail = () => {
  const { slug } = useParams();
  const { lang } = useLang();
  const project = projects.find((p) => p.slug === slug);
  const [activeImage, setActiveImage] = useState(0);
  const [leadOpen, setLeadOpen] = useState(false);

  if (!project) {
    return (
      <div className="pt-20 section-padding text-center">
        <h1 className="text-2xl font-heading font-bold">
          {t("Project not found", "প্রকল্গ পাওয়া যায়নি", lang)}
        </h1>
        <Link to="/projects" className="text-gold-dark mt-4 inline-block">
          {t("← Back to projects", "← প্রজেক্টে ফিরে যান", lang)}
        </Link>
      </div>
    );
  }

  // --- SEO inputs ---
  const name = lang === "bn" ? project.nameBn : project.name;
  const description = lang === "bn" ? project.descriptionBn : project.description;
  const ogImage = getImage(project);
  const ogImageAbs = ogImage ? new URL(ogImage, SITE_ORIGIN).toString() : undefined;
  const pageUrl = `${SITE_ORIGIN}/projects/${project.slug}`;
  const jsonLd = buildJsonLd(project, SITE_ORIGIN);

  // --- Gallery (cover fallback) ---
  const gallery = (() => {
    const imgs = project.images && project.images.length > 0
      ? project.images
      : getImage(project)
      ? [getImage(project)]
      : [];
    // De-dup while keeping order.
    return [...new Set(imgs)];
  })();
  const activeIdx = Math.min(activeImage, Math.max(gallery.length - 1, 0));

  // --- At-a-Glance: 6 boxes ---
  const landValue = project.landSize
    ? `${project.landSize.value} ${project.landSize.unit}`
    : project.landArea || "—";
  const storiedValue =
    project.buildingHeight != null ? `G+${project.buildingHeight}` : project.floors || "—";
  const flatSizesValue = project.flatSizes?.length
    ? project.flatSizes.length === 1
      ? `${project.flatSizes[0]} sft`
      : `${Math.min(...project.flatSizes)}–${Math.max(...project.flatSizes)} sft`
    : project.flatSize || "—";
  const facingValue = project.facing || "—";
  const handoverValue = project.handover || "—";
  const totalFlatsValue =
    project.flatSizes?.length != null
      ? `${project.flatSizes.length} type${project.flatSizes.length === 1 ? "" : "s"}`
      : "—";

  const atAGlance = [
    { icon: Maximize, label: t("Land", "জমি", lang), value: landValue },
    { icon: Layers, label: t("Storied", "তলা", lang), value: storiedValue },
    { icon: Ruler, label: t("Flat Sizes", "ফ্ল্যাট সাইজ", lang), value: flatSizesValue },
    { icon: Compass, label: t("Facing", "মুখী", lang), value: facingValue },
    { icon: CalendarClock, label: t("Handover", "হস্তান্তর", lang), value: handoverValue },
    { icon: Building, label: t("Flats", "ফ্ল্যাট", lang), value: totalFlatsValue },
  ];

  // --- Brochure gating: lead form first, then open external URL ---
  const brochureUrl = project.brochureUrl || project.brochure;
  const openBrochure = () => {
    if (!brochureUrl) return;
    window.open(encodeURI(brochureUrl), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="pt-20">
      <Helmet>
        <title>{`${name} | ${t("S & D Sweet Home", "এস এন্ড ডি সুইট হোম", lang)}`}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={pageUrl} />

        {/* OpenGraph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={name} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={pageUrl} />
        {ogImageAbs && <meta property="og:image" content={ogImageAbs} />}
        <meta property="og:site_name" content="S & D Sweet Home" />
        <meta property="og:locale" content={lang === "bn" ? "bn_BD" : "en_US"} />
        <meta property="og:locale:alternate" content={lang === "bn" ? "en_US" : "bn_BD"} />

        {/* Twitter */}
        <meta name="twitter:card" content={ogImageAbs ? "summary_large_image" : "summary"} />
        <meta name="twitter:title" content={name} />
        <meta name="twitter:description" content={description} />
        {ogImageAbs && <meta name="twitter:image" content={ogImageAbs} />}

        {/* RealEstateListing structured data */}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Hero */}
      <section className="section-padding navy-gradient text-primary-foreground">
        <div className="container-wide">
          <Link
            to="/projects"
            className="inline-flex items-center gap-1 text-sm opacity-70 hover:opacity-100 mb-4 transition-opacity"
          >
            <ArrowLeft className="w-4 h-4" /> {t("All Projects", "সব প্রজেক্ট", lang)}
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-2">{name}</h1>
            <p className="flex items-center gap-1 text-lg opacity-80">
              <MapPin className="w-4 h-4" />{" "}
              {lang === "bn"
                ? `${project.city === "Dhaka" ? "ঢাকা" : "চাঁদপুর"} > ${project.locationBn}`
                : `${project.city} > ${project.location}`}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left column: gallery + At-a-Glance + description + amenities + map */}
            <div className="lg:col-span-2 space-y-10">
              {/* Cover / Gallery */}
              {gallery.length === 0 ? (
                <div className="aspect-[4/5] lg:aspect-[5/4] bg-[#F1F5F9] rounded-2xl flex items-center justify-center border border-[rgba(15,47,70,0.10)]">
                  <Building className="w-16 h-16 text-[#94A3B8]/30" />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="aspect-[4/5] lg:aspect-[5/4] bg-linear-to-br from-[#0F2F46]/5 to-[#0A4D68]/10 rounded-2xl flex items-center justify-center overflow-hidden border border-[rgba(15,47,70,0.10)] relative">
                    <img
                      src={encodeUriPath(gallery[activeIdx])}
                      alt={name}
                      className="w-full h-full object-contain p-4 drop-shadow-lg transition-opacity duration-300"
                      onError={(e) => {
                        const el = e.currentTarget;
                        el.style.visibility = "hidden";
                      }}
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-transparent to-[rgba(15,47,70,0.05)] pointer-events-none" />
                  </div>
                  {gallery.length > 1 && (
                    <div className="flex gap-3 overflow-x-auto pb-2 px-1 snap-x scrollbar-hide">
                      {gallery.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveImage(i)}
                          className={`relative h-20 w-28 shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                            activeIdx === i
                              ? "border-[#C9A227] shadow-md opacity-100 scale-105"
                              : "border-transparent opacity-50 hover:opacity-100"
                          }`}
                        >
                          <img
                            src={encodeUriPath(img)}
                            alt={`Thumbnail ${i}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* At-a-Glance: 6 boxes */}
              <div>
                <h2 className="text-2xl font-heading font-semibold mb-4">
                  {t("At a Glance", "এক নজরে", lang)}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {atAGlance.map((box) => {
                    const Icon = box.icon;
                    return (
                      <div
                        key={box.label}
                        className="bg-card rounded-xl border border-border p-4 flex flex-col gap-2"
                      >
                        <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                          <Icon className="w-4 h-4 text-gold" />
                        </div>
                        <p className="text-xs text-muted-foreground">{box.label}</p>
                        <p className="text-sm font-semibold text-foreground">{box.value}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Description (bilingual) */}
              <div>
                <h2 className="text-2xl font-heading font-semibold mb-3">
                  {t("Overview", "সংক্ষিপ্ত বিবরণ", lang)}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {lang === "bn" ? project.descriptionBn : project.description}
                </p>
              </div>

              {/* Amenities */}
              <div>
                <h2 className="text-2xl font-heading font-semibold mb-4">
                  {t("Amenities", "সুযোগ-সুবিধা", lang)}
                </h2>
                {project.amenities.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {project.amenities.map((a) => (
                      <div key={a} className="flex items-center gap-2 text-sm text-foreground">
                        <CheckCircle className="w-4 h-4 text-gold" /> {a}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {t("Amenities list coming soon.", "সুযোগ-সুবিধার তালিকা শীঘ্রই আসবে।", lang)}
                  </p>
                )}
              </div>

              {/* Location Map */}
              {project.mapEmbedUrl && (
                <div>
                  <h2 className="text-2xl font-heading font-semibold mb-3 flex items-center gap-2">
                    <MapIcon className="w-5 h-5 text-gold" />
                    {t("Location", "অবস্থান", lang)}
                  </h2>
                  <div className="rounded-2xl overflow-hidden border border-border aspect-video bg-secondary">
                    <iframe
                      src={project.mapEmbedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`${project.name} map`}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Right column: brochure CTA + status */}
            <div className="space-y-6">
              <div className="bg-card rounded-xl border border-border p-6 space-y-4 lg:sticky lg:top-24">
                <div>
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full ${
                      project.status === "ongoing"
                        ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                        : project.status === "completed"
                        ? "bg-[#C9A227]/15 text-[#C9A227]"
                        : "bg-sky-500/15 text-sky-600 dark:text-sky-400"
                    }`}
                  >
                    {project.status === "ongoing" && t("Ongoing", "চলমান", lang)}
                    {project.status === "completed" && t("Completed", "সম্পন্ন", lang)}
                    {project.status === "upcoming" && t("Upcoming", "আসন্ন", lang)}
                  </span>
                </div>

                <h3 className="font-heading font-semibold text-lg">
                  {t("Project Brochure", "প্রকল্প ব্রোশার", lang)}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t(
                    "Full PDF brochure with floor plans, specs, and pricing. Enter your details to download.",
                    "ফ্লোর প্ল্যান, স্পেসিফিকেশন ও দামসহ সম্পূর্ণ পিডিএফ ব্রোশার। ডাউনলোড করতে আপনার তথ্য দিন।",
                    lang
                  )}
                </p>

                {brochureUrl ? (
                  <button
                    onClick={() => setLeadOpen(true)}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-linear-to-r from-[#C9A227] to-[#e0bc46] text-[#0F2F46] shadow-md font-bold text-sm hover:opacity-90 transition-opacity"
                  >
                    <FileDown className="w-4 h-4" /> {t("Download Brochure", "ব্রোশার ডাউনলোড", lang)}
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-[#F1F5F9] text-[#94A3B8] border border-[rgba(15,47,70,0.05)] font-semibold text-sm cursor-not-allowed"
                  >
                    <Loader2 className="w-4 h-4" />
                    {t("Brochure Coming Soon", "ব্রোশার শিঘ্রই আসবে", lang)}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gated lead form — opens brochure on success */}
      <LeadForm
        open={leadOpen}
        onClose={() => setLeadOpen(false)}
        onSuccess={openBrochure}
        subject={`Brochure lead: ${project.name}`}
        contextLabel={`${project.name} brochure`}
      />
    </div>
  );
};

export default ProjectDetail;

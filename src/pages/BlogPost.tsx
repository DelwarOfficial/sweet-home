import { useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { Calendar, User, ArrowLeft, ArrowRight } from "lucide-react";
import { useLang, t } from "@/lib/i18n";
import { blogPosts } from "@/data/blog";

const BlogPost = () => {
    const { slug } = useParams<{ slug: string }>();
    const { lang } = useLang();

    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        return <Navigate to="/blog" replace />;
    }

    // Set document title for basic SEO. (Note: Recommend using react-helmet-async or Next.js App Router Metadata for full SSR SEO)
    useEffect(() => {
        document.title = `${lang === "bn" ? post.titleBn : post.titleEn} | S & D Sweet Home`;
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute("content", lang === "bn" ? post.excerptBn : post.excerptEn);
        }
    }, [lang, post]);

    return (
        <div className="pt-20">
            {/* JSON-LD Structured Data Schema for Search Engines */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BlogPosting",
                        headline: post.titleEn,
                        description: post.excerptEn,
                        image: post.imageUrl || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200",
                        author: {
                            "@type": "Organization",
                            name: post.authorEn,
                            url: "https://sndsweethome.com",
                        },
                        publisher: {
                            "@type": "Organization",
                            name: "S & D Sweet Home Developers Ltd.",
                            logo: {
                                "@type": "ImageObject",
                                url: "https://sndsweethome.com/sd Logo.webp",
                            },
                        },
                        datePublished: post.publishDate,
                        mainEntityOfPage: {
                            "@type": "WebPage",
                            "@id": `https://sndsweethome.com/blog/${post.slug}`,
                        },
                    }),
                }}
            />

            <article className="min-h-screen pb-20">
                {/* Post Hero */}
                <section className="relative h-[40vh] md:h-[50vh] min-h-[400px] flex items-end">
                    <div className="absolute inset-0 z-0">
                        <img
                            src={post.imageUrl || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920"}
                            alt={lang === "bn" ? post.titleBn : post.titleEn}
                            className="w-full h-full object-cover"
                        />
                        {/* Gradient Overlay for Text Readability */}
                        <div className="absolute inset-0 bg-linear-to-t from-background via-background/80 to-transparent" />
                    </div>

                    <div className="container-wide relative z-10 pb-10">
                        <Link
                            to="/blog"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/80 text-secondary-foreground backdrop-blur-md rounded-full text-sm font-medium hover:bg-secondary transition-colors mb-6"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            {t("Back to Blog", "ব্লগে ফিরে যান", lang)}
                        </Link>

                        <div className="max-w-4xl">
                            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-primary text-primary-foreground mb-4 shadow-sm">
                                {lang === "bn" ? post.categoryBn : post.categoryEn}
                            </span>
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6 leading-tight">
                                {lang === "bn" ? post.titleBn : post.titleEn}
                            </h1>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                                        <User className="w-4 h-4 text-secondary-foreground" />
                                    </div>
                                    <span className="font-medium text-foreground">
                                        {lang === "bn" ? post.authorBn : post.authorEn}
                                    </span>
                                </div>
                                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <time dateTime={post.publishDate}>
                                        {new Date(post.publishDate).toLocaleDateString(lang === "bn" ? "bn-BD" : "en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </time>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Content Area */}
                <section className="container-wide pt-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                        {/* Main Content */}
                        <div className="lg:col-span-8">
                            <div
                                className="prose prose-lg dark:prose-invert max-w-none 
                prose-headings:font-heading prose-headings:font-bold prose-headings:text-foreground
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-ul:text-muted-foreground prose-ul:my-6 prose-li:my-2
                prose-ol:text-muted-foreground prose-ol:my-6 prose-li:my-2
                prose-strong:text-foreground prose-strong:font-semibold"
                                dangerouslySetInnerHTML={{ __html: lang === "bn" ? post.contentBn : post.contentEn }}
                            />

                            {/* Related internal CTA block per the requirements */}
                            <div className="mt-12 p-8 bg-secondary rounded-2xl border border-border flex flex-col sm:flex-row items-center justify-between gap-6">
                                <div>
                                    <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                                        {t("Ready to find your dream apartment?", "আপনার স্বপ্নের অ্যাপার্টমেন্ট খুঁজে পেতে প্রস্তুত?", lang)}
                                    </h3>
                                    <p className="text-muted-foreground">
                                        {t("Explore our latest ongoing and completed projects in prime locations.", "প্রধান অবস্থানগুলোতে আমাদের সর্বশেষ চলমান এবং সম্পূর্ণ হওয়া প্রকল্পগুলো ঘুরে দেখুন।", lang)}
                                    </p>
                                </div>
                                <Link
                                    to="/projects"
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-full hover:opacity-90 transition-opacity whitespace-nowrap"
                                >
                                    {t("View Projects", "প্রকল্পগুলি দেখুন", lang)}
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>

                        {/* Sidebar (Table of Contents / Categories) */}
                        <div className="lg:col-span-4 hidden lg:block">
                            <div className="sticky top-28 select-none">
                                <div className="bg-card border border-border rounded-xl p-6 shadow-subtle mb-8">
                                    <h3 className="text-lg font-heading font-bold text-foreground mb-4">
                                        {t("About the Author", "লেখক সম্পর্কে", lang)}
                                    </h3>
                                    <div className="flex items-center gap-4 mb-4">
                                        <img
                                            src="/sd Logo.webp"
                                            alt="Company Logo"
                                            className="w-12 h-12 rounded-full object-contain bg-background"
                                        />
                                        <div>
                                            <h4 className="font-semibold text-foreground text-sm">
                                                {lang === "bn" ? post.authorBn : post.authorEn}
                                            </h4>
                                            <p className="text-xs text-muted-foreground">{t("Real Estate Developer", "রিয়েল এস্টেট ডেভেলপার", lang)}</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {lang === "bn"
                                            ? "এস অ্যান্ড ডি সুইট হোম ডেভেলপার্স লিমিটেড ঢাকা এবং চাঁদপুরে একটি বিশ্বস্ত রিহ্যাব এবং রাজউক তালিকাভুক্ত রিয়েল এস্টেট কোম্পানী।"
                                            : "S & D Sweet Home Developers Ltd. is a trusted REHAB and RAJUK enlisted real estate company operating in Dhaka and Chandpur."}
                                    </p>
                                </div>

                                <div className="bg-card border border-border rounded-xl p-6 shadow-subtle">
                                    <h3 className="text-lg font-heading font-bold text-foreground mb-4 border-b border-border pb-2">
                                        {t("Categories", "বিভাগ", lang)}
                                    </h3>
                                    <ul className="space-y-3">
                                        {blogPosts.map((p) => (
                                            <li key={p.id}>
                                                <Link
                                                    to={`/blog/${p.slug}`}
                                                    className={`text-sm hover:text-primary transition-colors ${p.slug === slug ? "text-primary font-medium" : "text-muted-foreground"}`}
                                                >
                                                    {lang === "bn" ? p.titleBn : p.titleEn}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
            </article>
        </div>
    );
};

export default BlogPost;

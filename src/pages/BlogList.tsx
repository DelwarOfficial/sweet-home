import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight } from "lucide-react";
import { useLang, t } from "@/lib/i18n";
import { blogPosts, blogCategories } from "@/data/blog";

const BlogList = () => {
    const { lang } = useLang();
    const [activeCategory, setActiveCategory] = useState("all");

    useEffect(() => {
        document.title = t(
            "Real Estate Blog & Insights | S & D Sweet Home Developers Ltd.",
            "রিয়েল এস্টেট ব্লগ ও অন্তর্দৃষ্টি | এস অ্যান্ড ডি সুইট হোম ডেভেলপারস লিমিটেড।",
            lang
        );
    }, [lang]);

    const filteredPosts =
        activeCategory === "all"
            ? blogPosts
            : blogPosts.filter((post) => post.categoryEn === blogCategories.find((c) => c.id === activeCategory)?.labelEn);

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="section-padding navy-gradient text-primary-foreground">
                <div className="container-wide">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                            {t("Our Blog & Insights", "আমাদের ব্লগ ও নির্দেশিকা", lang)}
                        </h1>
                        <p className="text-lg opacity-80 leading-relaxed">
                            {t(
                                "Stay updated with the latest real estate trends, buying guides, and market insights in Bangladesh.",
                                "বাংলাদেশের সর্বশেষ রিয়েল এস্টেট প্রবণতা, ক্রয় নির্দেশিকা এবং বাজারের অন্তর্দৃষ্টিগুলির সাথে আপডেট থাকুন।",
                                lang
                            )}
                        </p>
                    </div>
                </div>
            </section>

            {/* Blog Content */}
            <section className="section-padding bg-background min-h-screen">
                <div className="container-wide">
                    {/* Categories Filter */}
                    <div className="flex flex-wrap gap-2 md:gap-4 mb-10">
                        <button
                            onClick={() => setActiveCategory("all")}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === "all"
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                                }`}
                        >
                            {t("All Articles", "সব প্রবন্ধ", lang)}
                        </button>
                        {blogCategories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === category.id
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                                    }`}
                            >
                                {lang === "bn" ? category.labelBn : category.labelEn}
                            </button>
                        ))}
                    </div>

                    {/* Grid of Posts */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPosts.map((post) => (
                            <article key={post.id} className="group bg-card rounded-2xl border border-border overflow-hidden shadow-subtle hover:shadow-premium transition-all duration-300 flex flex-col h-full">
                                <Link to={`/blog/${post.slug}`} className="block relative aspect-video overflow-hidden">
                                    <div className="absolute top-4 left-4 z-10">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary/90 text-primary-foreground backdrop-blur-sm">
                                            {lang === "bn" ? post.categoryBn : post.categoryEn}
                                        </span>
                                    </div>
                                    <img
                                        src={post.imageUrl || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800"}
                                        alt={lang === "bn" ? post.titleBn : post.titleEn}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </Link>

                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5" />
                                            <time dateTime={post.publishDate}>
                                                {new Date(post.publishDate).toLocaleDateString(lang === "bn" ? "bn-BD" : "en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </time>
                                        </div>
                                    </div>

                                    <Link to={`/blog/${post.slug}`} className="block mb-3">
                                        <h2 className="text-xl font-heading font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                                            {lang === "bn" ? post.titleBn : post.titleEn}
                                        </h2>
                                    </Link>

                                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
                                        {lang === "bn" ? post.excerptBn : post.excerptEn}
                                    </p>

                                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-border/50">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
                                                <User className="w-3 h-3 text-secondary-foreground" />
                                            </div>
                                            <span className="text-xs font-medium text-foreground">
                                                S & D Sweet Home
                                            </span>
                                        </div>
                                        <Link
                                            to={`/blog/${post.slug}`}
                                            className="text-primary hover:text-primary/80 transition-colors"
                                            aria-label={t(
                                                `Read the full article: ${post.titleEn}`,
                                                `সম্পূর্ণ প্রবন্ধটি পড়ুন: ${post.titleBn}`,
                                                lang
                                            )}
                                        >
                                            <span className="sr-only">
                                                {t("Read full article", "সম্পূর্ণ প্রবন্ধটি পড়ুন", lang)}
                                            </span>
                                            <ArrowRight className="w-5 h-5" aria-hidden="true" />
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    {filteredPosts.length === 0 && (
                        <div className="text-center py-20 text-muted-foreground">
                            {t("No articles found in this category.", "এই বিভাগে কোন প্রবন্ধ পাওয়া যায়নি।", lang)}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default BlogList;

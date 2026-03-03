import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLang, t } from "@/lib/i18n";
import { ChevronRight, Home } from "lucide-react";
import mdImage from "@/assets/md-latif-tapader.jpg";
import mdTextRawBn from "@/assets/Md-text.txt?raw";
import mdTextRawEn from "@/assets/Md-text-en.txt?raw";

const SEO = () => {
    useEffect(() => {
        // Essential Titles & Meta Tags
        document.title = "Managing Director’s Message | S & D Sweet Home Developers Ltd.";

        const setMeta = (name: string, content: string, propertyAttr = 'name') => {
            let element = document.querySelector(`meta[${propertyAttr}="${name}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute(propertyAttr, name);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
            return element;
        };

        const desc = "Message from the Managing Director of S & D Sweet Home Developers Ltd. Building trust and long-term commitment in Dhaka real estate with RAJUK & REHAB credibility.";

        const tags = [
            setMeta('description', desc),
            setMeta('og:title', 'Managing Director’s Message | S & D Sweet Home Developers Ltd.', 'property'),
            setMeta('og:description', desc, 'property'),
            setMeta('og:type', 'article', 'property'),
            setMeta('og:image', `${window.location.origin}${mdImage}`, 'property'),
            setMeta('twitter:card', 'summary_large_image'),
            setMeta('twitter:title', 'Managing Director’s Message | S & D Sweet Home Developers Ltd.'),
            setMeta('twitter:description', desc)
        ];

        let linkCanonical = document.querySelector('link[rel="canonical"]');
        if (!linkCanonical) {
            linkCanonical = document.createElement('link');
            // @ts-ignore
            linkCanonical.setAttribute('rel', 'canonical');
            document.head.appendChild(linkCanonical);
        }
        // @ts-ignore
        linkCanonical.setAttribute('href', window.location.href);

        return () => {
            tags.forEach(tag => tag && tag.remove());
            if (linkCanonical) linkCanonical.remove();
        };
    }, []);

    const personStructuredData = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Md. Latif Tapader",
        "jobTitle": "Managing Director",
        "worksFor": {
            "@type": "Organization",
            "name": "S & D Sweet Home Developers Ltd."
        },
        "image": `${window.location.origin}${mdImage}`,
        "description": "Message from the Managing Director of S & D Sweet Home Developers Ltd. Building trust and commitment in Dhaka real estate with RAJUK & REHAB credibility."
    };

    const breadcrumbData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [{
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": window.location.origin
        }, {
            "@type": "ListItem",
            "position": 2,
            "name": "Managing Director Message",
            "item": window.location.href
        }]
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personStructuredData) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
        </>
    );
};

const ManagingDirectorMessage = () => {
    const { lang } = useLang();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const textRaw = lang === 'bn' ? mdTextRawBn : mdTextRawEn;
    const paragraphs = textRaw
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

    return (
        <div className="pt-24 pb-16 min-h-screen bg-background text-foreground">
            <SEO />

            <div className="container-wide px-4 sm:px-6 lg:px-8">

                {/* SEO-Optimized Breadcrumbs */}
                <nav className="mb-8 flex items-center text-sm font-medium text-muted-foreground" aria-label="Breadcrumb">
                    <Link to="/" className="flex items-center hover:text-primary transition-colors">
                        <Home className="w-4 h-4 mr-1.5" />
                        {t("Home", "হোম", lang)}
                    </Link>
                    <ChevronRight className="w-4 h-4 mx-2 opacity-50" />
                    <span className="text-foreground" aria-current="page">
                        {t("Managing Director Message", "ব্যবস্থাপনা পরিচালকের বার্তা", lang)}
                    </span>
                </nav>

                <div className="bg-card rounded-[24px] shadow-premium border border-border p-6 md:p-12 lg:p-16">
                    <div className="flex flex-col lg:flex-row gap-12 items-start">

                        {/* Left Column: Image with proper explicit attributes to prevent CLS */}
                        <div className="w-full lg:w-1/3 shrink-0 flex flex-col items-center">
                            <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-full lg:h-auto lg:aspect-[4/5] relative rounded-3xl overflow-hidden border border-border shadow-subtle mb-6 bg-secondary/50">
                                <img
                                    src={mdImage}
                                    alt="Md. Latif Tapader – Managing Director of S & D Sweet Home Developers Ltd."
                                    loading="eager"
                                    decoding="async"
                                    width={400}
                                    height={500}
                                    className="w-full h-full object-cover object-top"
                                />
                            </div>
                            <div className="text-center lg:text-left w-full">
                                <h2 className="font-heading font-bold text-2xl text-primary mb-1">
                                    {t("Md. Latif Tapader", "মোঃ লতিফ তপাদার", lang)}
                                </h2>
                                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                                    {t("Managing Director", "ব্যবস্থাপনা পরিচালক", lang)}
                                </h3>
                            </div>
                        </div>

                        {/* Right Column: Semantically structured Content */}
                        <div className="flex-1 w-full lg:pl-8">
                            <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-6 leading-tight">
                                {t("Message from the Managing Director", "ব্যবস্থাপনা পরিচালকের বার্তা", lang)}
                            </h1>
                            <div className="w-20 h-1.5 bg-gradient-to-r from-gold to-gold-light rounded-full mb-10"></div>

                            {/* Optional H2 block to add structural depth, hidden visually if not explicitly in text, but let's wrap text paragraphs cleanly */}
                            <div className="space-y-6 text-foreground/80 text-base sm:text-lg leading-relaxed font-body">
                                {paragraphs.map((p, idx) => (
                                    <p key={idx} className="text-justify md:text-left">{p}</p>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagingDirectorMessage;

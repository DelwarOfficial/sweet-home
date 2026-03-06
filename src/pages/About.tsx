import { motion } from "framer-motion";
import { Award, Users, Target, Eye, Shield, FileCheck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLang, t } from "@/lib/i18n";

const About = () => {
  const { lang } = useLang();

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="section-padding navy-gradient text-primary-foreground">
        <div className="container-wide">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              {t("About S & D Sweet Home Developers Ltd.", "এস অ্যান্ড ডি সুইট হোম ডেভেলপারস লিমিটেড সম্পর্কে", lang)}
            </h1>
            <p className="text-xl md:text-2xl font-medium mb-3">
              {t(
                "A REHAB & RAJUK enlisted real estate developer building premium residential apartments in Dhaka and Chandpur.",
                "ঢাকা ও চাঁদপুরে প্রিমিয়াম আবাসিক অ্যাপার্টমেন্ট নির্মাণকারী রিহ্যাব ও রাজউক তালিকাভুক্ত রিয়েল এস্টেট ডেভেলপার।",
                lang
              )}
            </p>
            <p className="text-lg opacity-80 leading-relaxed">
              {t(
                "S & D Sweet Home Developers Ltd. is a trusted real estate developer in Bangladesh specializing in residential and commercial projects with modern architecture, quality materials, and long-term investment value.",
                "এস অ্যান্ড ডি সুইট হোম ডেভেলপারস লিমিটেড বাংলাদেশের একটি বিশ্বস্ত রিয়েল এস্টেট ডেভেলপার, যারা আধুনিক স্থাপত্য, মানসম্পন্ন উপকরণ এবং দীর্ঘমেয়াদী বিনিয়োগ মূল্যের সাথে আবাসিক এবং বাণিজ্যিক প্রকল্পে বিশেষজ্ঞ।",
                lang
              )}
            </p>

            {/* Hidden SEO Content */}
            <div className="sr-only">
              <h2>Real Estate Developer in Dhaka and Chandpur</h2>
              <p>
                S & D Sweet Home Developers Ltd. develops modern residential apartments and commercial properties across Dhaka and Chandpur. The company focuses on quality construction, trusted materials, and comfortable urban living.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SEO Introduction Section */}
      <section className="section-padding bg-background pb-0">
        <div className="container-wide text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-heading font-bold mb-4">
            {t("Trusted Real Estate Developer in Bangladesh", "বাংলাদেশের বিশ্বস্ত রিয়েল এস্টেট ডেভেলপার", lang)}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {t(
              "S & D Sweet Home Developers Ltd. is a REHAB and RAJUK enlisted real estate developer committed to delivering high-quality apartments in prime locations of Dhaka and Chandpur.",
              "এস অ্যান্ড ডি সুইট হোম ডেভেলপারস লিমিটেড রিহ্যাব এবং রাজউক তালিকাভুক্ত একটি রিয়েল এস্টেট ডেভেলপার যারা ঢাকা এবং চাঁদপুরের প্রধান অবস্থানগুলোতে উচ্চমানের অ্যাপার্টমেন্ট প্রদানে প্রতিশ্রুতিবদ্ধ।",
              lang
            )}
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-background">
        <div className="container-wide grid md:grid-cols-2 gap-8">
          {[
            { icon: Target, titleEn: "Our Mission", titleBn: "আমাদের লক্ষ্য", textEn: "To deliver exceptional residential and commercial properties that exceed expectations through innovation, transparency, and unwavering commitment to quality.", textBn: "উদ্ভাবন, স্বচ্ছতা এবং মানের প্রতি অটল প্রতিশ্রুতির মাধ্যমে প্রত্যাশা ছাড়িয়ে যাওয়া ব্যতিক্রমী আবাসিক ও বাণিজ্যিক সম্পত্তি প্রদান করা।" },
            { icon: Eye, titleEn: "Our Vision", titleBn: "আমাদের দৃষ্টিভঙ্গি", textEn: "To be the most trusted real estate developer in Bangladesh, known for building communities where families thrive and investments grow.", textBn: "বাংলাদেশের সবচেয়ে বিশ্বস্ত রিয়েল এস্টেট ডেভেলপার হওয়া, যেখানে পরিবারগুলো সমৃদ্ধ হয় এবং বিনিয়োগ বৃদ্ধি পায়।" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="p-8 rounded-xl border border-border bg-card"
            >
              <div className="w-12 h-12 rounded-lg gold-gradient flex items-center justify-center mb-4">
                <item.icon className="w-5 h-5 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3">{lang === "bn" ? item.titleBn : item.titleEn}</h3>
              <p className="text-muted-foreground leading-relaxed">{lang === "bn" ? item.textBn : item.textEn}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Leadership */}
      <section className="section-padding bg-card">
        <div className="container-wide max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-gold-dark text-xs font-medium mb-6">
              <Award className="w-3.5 h-3.5" />
              {t("Leadership", "নেতৃত্ব", lang)}
            </div>
            <h2 className="text-3xl font-heading font-bold mb-4">{t("Managing Director", "ব্যবস্থাপনা পরিচালক", lang)}</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {t(
                "Under visionary leadership, S & D Sweet Home has grown into one of the most respected developers in the region. Our Managing Director has been recognized with consecutive Best Taxpayer Awards — a testament to the company's integrity and financial transparency.",
                "দূরদর্শী নেতৃত্বে, এস অ্যান্ড ডি সুইট হোম এই অঞ্চলের সবচেয়ে সম্মানিত ডেভেলপারদের মধ্যে একটিতে পরিণত হয়েছে। আমাদের ব্যবস্থাপনা পরিচালক পরপর সেরা করদাতা পুরস্কারে ভূষিত হয়েছেন — যা কোম্পানির সততা ও আর্থিক স্বচ্ছতার প্রমাণ।",
                lang
              )}
            </p>
            <div className="mb-8">
              <Link to="/managing-director-message" className="inline-flex items-center gap-2 text-primary font-bold hover:text-gold transition-colors">
                {t("Read Full Message", "সম্পূর্ণ বার্তা পড়ুন", lang)}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex items-center justify-center gap-4">
              {[Shield, FileCheck, Award].map((Icon, i) => (
                <div key={i} className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center">
                  <Icon className="w-5 h-5 text-accent-foreground" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;

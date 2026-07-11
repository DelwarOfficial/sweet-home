import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send, CheckCircle2 } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useLang, t } from "@/lib/i18n";

const Contact = () => {
  const { lang } = useLang();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const offices = [
    {
      titleEn: "Dhaka Office",
      titleBn: "ঢাকা অফিস",
      addressEn: "House 65, Road 2, Block C, Aftabnagar Badda. Dhaka: 1212",
      addressBn: "হাউস ৬৫, রোড ২, ব্লক সি, আফতাবনগর বাড্ডা। ঢাকা: ১২১২",
      phone: "+880 1806-999979",
      email: "info@sdsweethome.com",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.5!2d90.43!3d23.77!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ2JzEyLjAiTiA5MMKwMjUnNDguMCJF!5e0!3m2!1sen!2sbd!4v1!",
    },
    {
      titleEn: "Chandpur Office",
      titleBn: "চাঁদপুর অফিস",
      addressEn: "S & D Majeda Garden, 750 Abdul Karim Patwary Sarok Taltola, Chandpur.",
      addressBn: "এস অ্যান্ড ডি মাজেদা গার্ডেন, ৭৫০ আব্দুল করিম পাটওয়ারী সড়ক, তালতলা, চাঁদপুর।",
      phone: "+880 1806-999979",
      email: "info@sdsweethome.com",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.5!2d90.65!3d23.23!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDEzJzQ4LjAiTiA5MMKwMzknMDAuMCJF!5e0!3m2!1sen!2sbd!4v1!",
    },
  ];

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.name.trim())
      e.name = t("Name is required.", "নাম আবশ্যক।", lang);
    if (!formData.email.trim())
      e.email = t("Email is required.", "ইমেইল আবশ্যক।", lang);
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      e.email = t("Enter a valid email.", "সঠিক ইমেইল দিন।", lang);
    if (!formData.message.trim())
      e.message = t("Message is required.", "বার্তা আবশ্যক।", lang);
    return e;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // Submit via formsubmit.co
    const form = e.target as HTMLFormElement;
    form.submit();
    setSubmitted(true);
  };

  const inputBase =
    "w-full px-4 py-3 rounded-xl border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 transition-colors";
  const inputNormal = `${inputBase} border-border`;
  const inputError = `${inputBase} border-red-400 dark:border-red-500 focus:ring-red-400/30`;

  return (
    <div className="pt-20">
      <Helmet>
        <title>
          {t(
            "Contact Us | S & D Sweet Home Developers Ltd.",
            "যোগাযোগ করুন | এস অ্যান্ড ডি সুইট হোম ডেভেলপারস লিমিটেড",
            lang
          )}
        </title>
        <meta
          name="description"
          content={t(
            "Contact S & D Sweet Home Developers Ltd. for residential project inquiries. Dhaka and Chandpur offices available.",
            "আবাসিক প্রকল্পের বিষয়ে এস অ্যান্ড ডি সুইট হোম ডেভেলপারস লিমিটেডের সাথে যোগাযোগ করুন। ঢাকা ও চাঁদপুর অফিস।",
            lang
          )}
        />
      </Helmet>

      {/* Hero */}
      <section className="section-padding navy-gradient text-primary-foreground">
        <div className="container-wide">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-3">
            {t("Contact Us", "যোগাযোগ করুন", lang)}
          </h1>
          <p className="text-lg opacity-80">
            {t(
              "Get in touch with our sales team",
              "আমাদের সেলস টিমের সাথে যোগাযোগ করুন",
              lang
            )}
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Office Cards */}
            <div className="space-y-6">
              {offices.map((office, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card rounded-xl border border-border p-6"
                >
                  <h3 className="font-heading font-semibold text-lg mb-4">
                    {lang === "bn" ? office.titleBn : office.titleEn}
                  </h3>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                      {lang === "bn" ? office.addressBn : office.addressEn}
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="w-4 h-4 shrink-0" />
                      <a
                        href={`tel:${office.phone.replace(/\s|-/g, "")}`}
                        className="hover:text-foreground transition-colors"
                      >
                        {office.phone}
                      </a>
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail className="w-4 h-4 shrink-0" />
                      <a
                        href={`mailto:${office.email}`}
                        className="hover:text-foreground transition-colors"
                      >
                        {office.email}
                      </a>
                    </p>
                  </div>
                  <div className="mt-4 rounded-lg overflow-hidden aspect-video">
                    <iframe
                      src={office.mapUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={lang === "bn" ? office.titleBn : office.titleEn}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-card rounded-xl border border-border p-6 md:p-8 sticky top-24">
                <h3 className="font-heading font-semibold text-xl mb-6">
                  {t("Send us a message", "আমাদের বার্তা পাঠান", lang)}
                </h3>

                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                    <p className="font-semibold text-foreground text-lg">
                      {t("Message Sent!", "বার্তা পাঠানো হয়েছে!", lang)}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {t(
                        "We'll get back to you as soon as possible.",
                        "আমরা যত দ্রুত সম্ভব আপনার সাথে যোগাযোগ করব।",
                        lang
                      )}
                    </p>
                  </div>
                ) : (
                  <form
                    action="https://formsubmit.co/info@sdsweethome.com"
                    method="POST"
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    noValidate
                  >
                    {/* Honeypot */}
                    <input type="text" name="_honey" className="hidden" />
                    <input type="hidden" name="_captcha" value="false" />
                    <input
                      type="hidden"
                      name="_subject"
                      value="New inquiry from sdsweethome.com"
                    />

                    {/* Name */}
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-sm font-medium text-foreground mb-1.5"
                      >
                        {t("Full Name", "পূর্ণ নাম", lang)}{" "}
                        <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t("Your full name", "আপনার পূর্ণ নাম", lang)}
                        className={errors.name ? inputError : inputNormal}
                        aria-required="true"
                        aria-describedby={errors.name ? "name-error" : undefined}
                      />
                      {errors.name && (
                        <p id="name-error" className="mt-1 text-xs text-red-500" role="alert">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-sm font-medium text-foreground mb-1.5"
                      >
                        {t("Email Address", "ইমেইল ঠিকানা", lang)}{" "}
                        <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t("your@email.com", "আপনার@ইমেইল.com", lang)}
                        className={errors.email ? inputError : inputNormal}
                        aria-required="true"
                        aria-describedby={errors.email ? "email-error" : undefined}
                      />
                      {errors.email && (
                        <p id="email-error" className="mt-1 text-xs text-red-500" role="alert">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Phone (optional) */}
                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-sm font-medium text-foreground mb-1.5"
                      >
                        {t("Phone Number", "ফোন নম্বর", lang)}{" "}
                        <span className="text-muted-foreground text-xs font-normal">
                          ({t("optional", "ঐচ্ছিক", lang)})
                        </span>
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+880 1XXX-XXXXXX"
                        className={inputNormal}
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-sm font-medium text-foreground mb-1.5"
                      >
                        {t("Message", "বার্তা", lang)}{" "}
                        <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={t(
                          "Tell us about your property inquiry…",
                          "আপনার সম্পত্তি সম্পর্কে আমাদের জানান…",
                          lang
                        )}
                        className={`${errors.message ? inputError : inputNormal} resize-none`}
                        aria-required="true"
                        aria-describedby={errors.message ? "message-error" : undefined}
                      />
                      {errors.message && (
                        <p id="message-error" className="mt-1 text-xs text-red-500" role="alert">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-primary to-navy-light text-white font-semibold text-sm hover:opacity-90 transition-opacity shadow-premium focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                    >
                      <Send className="w-4 h-4" aria-hidden="true" />
                      {t("Send Message", "বার্তা পাঠান", lang)}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

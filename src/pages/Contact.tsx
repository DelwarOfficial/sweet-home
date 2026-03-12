import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";
import { useLang, t } from "@/lib/i18n";

const Contact = () => {
  const { lang } = useLang();

  const offices = [
    { titleEn: "Dhaka Office", titleBn: "ঢাকা অফিস", address: "Aftabnagar, Dhaka-1212", phone: "+880 1806-999979", email: "dhaka@sdsweethome.com", mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.5!2d90.43!3d23.77!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ2JzEyLjAiTiA5MMKwMjUnNDguMCJF!5e0!3m2!1sen!2sbd!4v1!" },
    { titleEn: "Chandpur Office", titleBn: "চাঁদপুর অফিস", address: "Chandpur Sadar, Chandpur", phone: "+880 1806-999979", email: "chandpur@sdsweethome.com", mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.5!2d90.65!3d23.23!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDEzJzQ4LjAiTiA5MMKwMzknMDAuMCJF!5e0!3m2!1sen!2sbd!4v1!" },
  ];

  return (
    <div className="pt-20">
      <section className="section-padding navy-gradient text-primary-foreground">
        <div className="container-wide">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-3">
            {t("Contact Us", "যোগাযোগ করুন", lang)}
          </h1>
          <p className="text-lg opacity-80">
            {t("Get in touch with our sales team", "আমাদের সেলস টিমের সাথে যোগাযোগ করুন", lang)}
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-10">
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
                  <h3 className="font-heading font-semibold text-lg mb-4">{lang === "bn" ? office.titleBn : office.titleEn}</h3>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2"><MapPin className="w-4 h-4 shrink-0" /> {office.address}</p>
                    <p className="flex items-center gap-2"><Phone className="w-4 h-4 shrink-0" /> {office.phone}</p>
                    <p className="flex items-center gap-2"><Mail className="w-4 h-4 shrink-0" /> {office.email}</p>
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
                      title={office.titleEn}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="bg-card rounded-xl border border-border p-6 md:p-8 sticky top-24">
                <h3 className="font-heading font-semibold text-xl mb-6">{t("Send us a message", "আমাদের বার্তা পাঠান", lang)}</h3>
                <form action="https://formsubmit.co/info@sdsweethome.com" method="POST" className="space-y-4">
                  <input type="text" name="name" required />
                  <input type="email" name="email" required />
                  <button type="submit">Send</button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

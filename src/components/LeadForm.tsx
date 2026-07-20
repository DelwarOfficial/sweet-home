import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle2, User, Mail, Phone, MessageSquare } from "lucide-react";
import { useLang, t } from "@/lib/i18n";

/**
 * Gated-content lead form.
 *
 * Opens a modal, collects name/email (+optional phone/message), posts to
 * FormSubmit (`info@sdsweethome.com`) with a `_honey` honeypot, then fires
 * `onSuccess` so the caller can release the gated asset (e.g. open the
 * external brochure URL).
 *
 * Mirrors the validation + FormSubmit conventions used in `Contact.tsx` so the
 * inbox treats both lead sources identically.
 */

interface LeadFormProps {
  open: boolean;
  onClose: () => void;
  /** Fired after a successful submit (FormSubmit redirect / network ok). */
  onSuccess?: () => void;
  /** Hidden FormSubmit subject line so leads are sortable in the inbox. */
  subject?: string;
  /** What the user is trying to unlock — shown in the modal header. */
  contextLabel?: string;
}

const FORMSUBMIT_ENDPOINT = "https://formsubmit.co/info@sdsweethome.com";

export function LeadForm({
  open,
  onClose,
  onSuccess,
  subject = "New brochure lead from sdsweethome.com",
  contextLabel,
}: LeadFormProps) {
  const { lang } = useLang();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const dialogRef = useRef<HTMLDivElement>(null);

  // Trap Escape to close + lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  // Reset internal state whenever the modal is (re)opened.
  useEffect(() => {
    if (open) {
      setSubmitted(false);
      setSubmitting(false);
      setErrors({});
    }
  }, [open]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.name.trim()) e.name = t("Name is required.", "নাম আবশ্যক।", lang);
    if (!formData.email.trim()) e.email = t("Email is required.", "ইমেইল আবশ্যক।", lang);
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      e.email = t("Enter a valid email.", "সঠিক ইমেইল দিন।", lang);
    return e;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // POST as multipart form to FormSubmit (AJAX mode via _subject + fetch).
    // Honeypot `_honey` stays empty for humans; bots fill it and get dropped.
    setSubmitting(true);
    try {
      const body = new FormData();
      body.append("name", formData.name);
      body.append("email", formData.email);
      body.append("phone", formData.phone);
      body.append("message", formData.message || contextLabel || "");
      body.append("_subject", subject);
      body.append("_template", "table");
      body.append("_captcha", "false");
      // Honeypot: real users never see this field.
      body.append("_honey", "");

      await fetch(FORMSUBMIT_ENDPOINT, { method: "POST", body });
      setSubmitted(true);
      // Give the user a beat to see the success state, then release the asset.
      setTimeout(() => {
        onSuccess?.();
        onClose();
      }, 900);
    } catch {
      setErrors({
        email: t("Submission failed. Please try again.", "জমা দিতে ব্যর্থ। আবার চেষ্টা করুন।", lang),
      });
    } finally {
      setSubmitting(false);
    }
  };

  const inputBase =
    "w-full pl-10 pr-4 py-2.5 rounded-xl border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 transition-colors";
  const inputNormal = `${inputBase} border-border`;
  const inputErrorCls = `${inputBase} border-red-400 dark:border-red-500 focus:ring-red-400/30`;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="leadform-title"
        >
          {/* Backdrop */}
          <button
            aria-label={t("Close", "বন্ধ করুন", lang)}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            ref={dialogRef}
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-md bg-card rounded-2xl border border-border shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h3 id="leadform-title" className="font-heading font-semibold text-lg">
                {t("Get the Brochure", "ব্রোশার নিন", lang)}
              </h3>
              <button
                onClick={onClose}
                aria-label={t("Close", "বন্ধ করুন", lang)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5">
              {contextLabel && !submitted && (
                <p className="text-xs text-muted-foreground mb-4">
                  {t("Share your details to download:", "ডাউনলোড করতে আপনার তথ্য দিন:", lang)}{" "}
                  <span className="text-foreground font-medium">{contextLabel}</span>
                </p>
              )}

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-8 text-center gap-3">
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                  <p className="font-semibold text-foreground">
                    {t("Thank you!", "ধন্যবাদ!", lang)}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {t("Your download is starting.", "আপনার ডাউনলোড শুরু হচ্ছে।", lang)}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  {/* Honeypot (also sent in the fetch body for parity) */}
                  <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />
                  <input type="hidden" name="_captcha" value="false" />

                  {/* Name */}
                  <div>
                    <label htmlFor="lead-name" className="block text-sm font-medium text-foreground mb-1.5">
                      {t("Full Name", "পূর্ণ নাম", lang)}{" "}
                      <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        id="lead-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t("Your full name", "আপনার পূর্ণ নাম", lang)}
                        className={errors.name ? inputErrorCls : inputNormal}
                        aria-required="true"
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500" role="alert">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="lead-email" className="block text-sm font-medium text-foreground mb-1.5">
                      {t("Email Address", "ইমেইল ঠিকানা", lang)}{" "}
                      <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        id="lead-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t("your@email.com", "আপনার@ইমেইল.com", lang)}
                        className={errors.email ? inputErrorCls : inputNormal}
                        aria-required="true"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500" role="alert">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone (optional) */}
                  <div>
                    <label htmlFor="lead-phone" className="block text-sm font-medium text-foreground mb-1.5">
                      {t("Phone Number", "ফোন নম্বর", lang)}{" "}
                      <span className="text-muted-foreground text-xs font-normal">
                        ({t("optional", "ঐচ্ছিক", lang)})
                      </span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        id="lead-phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+880 1XXX-XXXXXX"
                        className={inputNormal}
                      />
                    </div>
                  </div>

                  {/* Message (optional) */}
                  <div>
                    <label htmlFor="lead-message" className="block text-sm font-medium text-foreground mb-1.5">
                      {t("Message", "বার্তা", lang)}{" "}
                      <span className="text-muted-foreground text-xs font-normal">
                        ({t("optional", "ঐচ্ছিক", lang)})
                      </span>
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <textarea
                        id="lead-message"
                        name="message"
                        rows={2}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={t("Anything you'd like to ask?", "কিছু জিজ্ঞাসা করতে চান?", lang)}
                        className={`${errors.message ? inputErrorCls : inputNormal} resize-none`}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-[#C9A227] to-[#e0bc46] text-[#0F2F46] font-bold text-sm hover:opacity-90 transition-opacity shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" aria-hidden="true" />
                    {submitting
                      ? t("Sending…", "পাঠানো হচ্ছে…", lang)
                      : t("Unlock Brochure", "ব্রোশার আনলক করুন", lang)}
                  </button>
                  <p className="text-[11px] text-muted-foreground text-center">
                    {t(
                      "We'll email you occasionally. No spam.",
                      "আমরা মাঝে মাঝে ইমেইল করব। কোনো স্প্যাম নেই।",
                      lang
                    )}
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LeadForm;

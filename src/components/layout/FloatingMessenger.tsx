import { useEffect, useRef, useState, useCallback } from "react";
import { MessageSquare } from "lucide-react";

// Facebook Page ID for sdsweethome — update this constant to change the linked page
const FB_PAGE_ID = "sdsweethome";

// Shape of the FB SDK globals we touch. Declared on `Window` so casts stay
// type-safe instead of going through `Record<string, unknown>`.
interface FBXFBML {
  parse: (el: HTMLElement) => void;
}
interface FBSdk {
  XFBML?: FBXFBML;
}
declare global {
  interface Window {
    FB?: FBSdk;
  }
}

const FloatingMessenger = () => {
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const pluginRef = useRef<HTMLDivElement>(null);

  // Set custom FB attributes via DOM API after mount to avoid TSX type errors
  useEffect(() => {
    if (sdkLoaded && pluginRef.current) {
      const el = pluginRef.current;
      el.setAttribute("messenger_app_id", "");
      el.setAttribute("page_id", FB_PAGE_ID);
      el.setAttribute("data-ref", "");
      el.setAttribute("data-size", "large");
      el.setAttribute("data-colortheme", "light");
      // Re-parse XFBML after attributes are set
      window.FB?.XFBML?.parse(el);
    }
  }, [sdkLoaded]);

  const loadSDK = useCallback(() => {
    if (window.FB) return;

    const script = document.createElement("script");
    script.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v19.0";
    script.async = true;
    script.defer = true;
    script.crossOrigin = "anonymous";
    script.onload = () => {
      setSdkLoaded(true);
    };
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 300) {
        loadSDK();
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [loadSDK]);

  const handleClick = () => {
    if (!window.FB) {
      loadSDK();
    }
  };

  return (
    <div className="fixed bottom-6 right-24 z-50 flex flex-col items-end">
      {/* Messenger Chat Plugin placeholder — attributes set via ref after SDK loads */}
      {sdkLoaded && (
        <div
          ref={pluginRef}
          className="fb-messengermessageus"
        />
      )}

      {/* Fallback / trigger button matching WhatsApp style */}
      <a
        href={`https://m.me/${FB_PAGE_ID}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="w-14 h-14 rounded-full bg-[#0084FF] flex items-center justify-center shadow-lg hover:scale-110 transition-transform mt-3"
        aria-label="Chat on Facebook Messenger"
      >
        <MessageSquare className="w-6 h-6 text-white" />
      </a>
    </div>
  );
};

export default FloatingMessenger;


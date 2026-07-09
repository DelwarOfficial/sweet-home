import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import FloatingMessenger from "@/components/FloatingMessenger";
import Index from "./pages/Index";
import About from "./pages/About";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Enterprises from "./pages/Enterprises";
import Media from "./pages/Media";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import ManagingDirectorMessage from "./pages/ManagingDirectorMessage";
import BlogList from "./pages/BlogList";
import BlogPost from "./pages/BlogPost";
import Landowners from "./pages/Landowners";

const App = () => (
  <ThemeProvider defaultTheme="dark" storageKey="theme" enableSystem={false} attribute="class">
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HelmetProvider>
        <BrowserRouter>
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />
              <Route path="/enterprises" element={<Enterprises />} />
              <Route path="/media" element={<Media />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/managing-director-message" element={<ManagingDirectorMessage />} />
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/landowners" element={<Landowners />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <FloatingMessenger />
          <FloatingWhatsApp />
        </BrowserRouter>
      </HelmetProvider>
    </TooltipProvider>
  </ThemeProvider>
);

export default App;

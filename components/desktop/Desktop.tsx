"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Github, Linkedin, Mail, Download } from "lucide-react";
import SearchHero from "./SearchHero";
import ChatPanel from "./ChatPanel";
import ProjectsGrid from "./ProjectsGrid";
import ProjectModal from "./ProjectModal";
import AboutPanel from "./AboutPanel";
import { PROJECTS, type Project } from "@/lib/projects";

interface DesktopProps {
  onExitToOffice: () => void;
}

export default function Desktop({ onExitToOffice }: DesktopProps) {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-[#f8fafc] via-white to-[#f1f5f9]">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgb(0 0 0) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Top navigation bar */}
      <div className="relative z-10 flex items-center justify-between px-6 md:px-10 py-4 border-b border-black/5">
        <div className="flex items-center gap-4">
          <button
            onClick={onExitToOffice}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            back to office
          </button>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <button
            onClick={() => setAboutOpen(true)}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            about
          </button>
          <a
            href="https://github.com/Keerthisriallavarapu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            github
          </a>
          <a
            href="https://www.linkedin.com/in/keerthisriallavarapu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            linkedin
          </a>
          <a
            href="/resume.pdf"
            className="px-3 py-1.5 rounded-full bg-gray-900 text-white hover:bg-gray-700 transition-colors flex items-center gap-1.5 text-xs font-medium"
          >
            <Download className="w-3.5 h-3.5" />
            resume
          </a>
        </div>
      </div>

      {/* Main scrollable content */}
      <div className="relative h-[calc(100%-65px)] overflow-y-auto scrollbar-thin">
        <div className="min-h-full flex flex-col">
          {/* Hero search section */}
          <SearchHero onAskClick={() => setChatOpen(true)} />

          {/* Projects */}
          <div className="px-6 md:px-12 pb-16">
            <ProjectsGrid
              projects={PROJECTS}
              onSelectProject={setActiveProject}
            />
          </div>

          {/* Footer */}
          <footer className="mt-auto px-6 md:px-12 py-8 border-t border-black/5 text-gray-500 text-sm">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="font-mono text-xs">
                © 2026 Keerthi S · built with care
              </div>
              <div className="flex items-center gap-5">
                <a
                  href="mailto:akeerthis1714@gmail.com"
                  className="hover:text-gray-900 transition-colors"
                  aria-label="email"
                >
                  <Mail className="w-4 h-4" />
                </a>
                <a
                  href="https://github.com/Keerthisriallavarapu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-900 transition-colors"
                  aria-label="github"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/keerthisriallavarapu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-900 transition-colors"
                  aria-label="linkedin"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>

      {/* Chat panel */}
      <AnimatePresence>
        {chatOpen && (
          <ChatPanel onClose={() => setChatOpen(false)} />
        )}
      </AnimatePresence>

      {/* Project modal */}
      <AnimatePresence>
        {activeProject && (
          <ProjectModal
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>

      {/* About panel */}
      <AnimatePresence>
        {aboutOpen && (
          <AboutPanel onClose={() => setAboutOpen(false)} />
        )}
      </AnimatePresence>

      {/* Floating chat button (always visible) */}
      <AnimatePresence>
        {!chatOpen && (
          <motion.button
            onClick={() => setChatOpen(true)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1 }}
            className="fixed bottom-6 right-6 z-40 group flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-accent-500 to-purple-500 text-white shadow-2xl shadow-accent-500/30 hover:shadow-accent-500/50 transition-shadow"
          >
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-sm font-medium">ask my resume</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

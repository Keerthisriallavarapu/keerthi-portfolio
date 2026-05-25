"use client";

import { motion } from "framer-motion";
import { X, Github, ExternalLink, Check } from "lucide-react";
import { type Project } from "@/lib/projects";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 250 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 pointer-events-none"
      >
        <div className="pointer-events-auto bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl">
          {/* Header */}
          <div className="relative px-6 md:px-8 pt-6 pb-6 border-b border-gray-100">
            <div
              className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${project.color}`}
            />
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${project.color} flex items-center justify-center text-2xl shadow-lg`}
                >
                  {project.emoji}
                </div>
                <div>
                  <div className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-0.5">
                    {project.category}
                  </div>
                  <h2 className="text-2xl font-medium text-gray-900">
                    {project.name}
                  </h2>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {project.tagline}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-6 md:px-8 py-6 scrollbar-thin">
            {/* Description */}
            <div className="prose prose-sm max-w-none mb-8 text-gray-700">
              {project.longDescription.split("\n\n").map((para, i) => (
                <p key={i} className="leading-relaxed mb-3">
                  {para}
                </p>
              ))}
            </div>

            {/* Highlights */}
            <div className="mb-8">
              <h3 className="text-xs font-mono uppercase tracking-wider text-gray-500 mb-3">
                key highlights
              </h3>
              <ul className="space-y-2">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                    <div className="mt-1 w-4 h-4 rounded-full bg-gradient-to-br from-accent-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                    </div>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stack */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-gray-500 mb-3">
                tech stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-3 py-1.5 rounded-md bg-gray-100 text-gray-700 font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer with CTAs */}
          <div className="px-6 md:px-8 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between gap-3">
            <span className="text-xs text-gray-500 font-mono">
              {project.id}
            </span>
            <div className="flex items-center gap-2">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors"
              >
                <Github className="w-4 h-4" />
                view on github
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

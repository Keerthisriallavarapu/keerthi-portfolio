"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { type Project } from "@/lib/projects";

interface ProjectsGridProps {
  projects: Project[];
  onSelectProject: (p: Project) => void;
}

export default function ProjectsGrid({ projects, onSelectProject }: ProjectsGridProps) {
  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-baseline justify-between mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-light text-gray-900">
          projects<span className="text-gray-400">.</span>
        </h2>
        <span className="text-xs font-mono text-gray-500">
          5 open-source repositories
        </span>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <ProjectCard
              project={project}
              onClick={() => onSelectProject(project)}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group relative w-full text-left bg-white border border-gray-200 hover:border-gray-300 rounded-2xl p-6 transition-all hover:shadow-xl hover:-translate-y-0.5 overflow-hidden"
    >
      {/* Decorative gradient blob */}
      <div
        className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${project.color} opacity-10 group-hover:opacity-20 blur-2xl transition-opacity`}
      />

      <div className="relative flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-11 h-11 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center text-xl shadow-lg`}
          >
            {project.emoji}
          </div>
          <div>
            <div className="text-xs font-mono text-gray-500 uppercase tracking-wider">
              {project.category}
            </div>
            <h3 className="text-xl font-medium text-gray-900">
              {project.name}
            </h3>
          </div>
        </div>
        <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-gray-900 group-hover:rotate-12 transition-all" />
      </div>

      <p className="relative text-sm text-gray-600 mb-4 leading-relaxed">
        {project.description}
      </p>

      <div className="relative flex flex-wrap gap-1.5">
        {project.stack.slice(0, 5).map((tech) => (
          <span
            key={tech}
            className="text-[11px] px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 font-mono"
          >
            {tech}
          </span>
        ))}
      </div>
    </button>
  );
}

"use client";

import { motion } from "framer-motion";
import { X, MapPin, Briefcase, GraduationCap } from "lucide-react";

interface AboutPanelProps {
  onClose: () => void;
}

const EXPERIENCE = [
  {
    role: "Software Development Engineer II",
    company: "Amazon",
    period: "Jun 2023 — Present",
  },
  {
    role: "Software Engineer",
    company: "Google",
    period: "Jul 2021 — Aug 2022",
  },
];

const SKILLS = [
  { category: "Languages", items: "Python, C++, Go, TypeScript, CUDA C/C++, SQL" },
  { category: "ML Frameworks", items: "PyTorch, TensorFlow, JAX, Transformers, PEFT" },
  { category: "Inference", items: "vLLM, TensorRT, Triton, ONNX, DeepSpeed, Ray" },
  { category: "Cloud", items: "GCP (Vertex AI, GKE), AWS (SageMaker, EKS), Azure ML" },
  { category: "Data", items: "Spark, Kafka, Airflow, Delta Lake, Snowflake, DuckDB" },
  { category: "Observability", items: "Prometheus, Grafana, Nsight, PyTorch Profiler" },
];

export default function AboutPanel({ onClose }: AboutPanelProps) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 250 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 pointer-events-none"
      >
        <div className="pointer-events-auto bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl">
          {/* Header */}
          <div className="px-6 md:px-8 pt-7 pb-5 border-b border-gray-100 flex items-start justify-between">
            <div>
              <h2 className="text-3xl font-light text-gray-900 mb-1">
                Keerthi S
              </h2>
              <p className="text-gray-500 text-sm">
                Senior Software Engineer · AI/ML Infrastructure
              </p>
              <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-500 font-mono">
                <MapPin className="w-3 h-3" />
                Warsaw, Poland · Open to relocation
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-6 md:px-8 py-6 scrollbar-thin space-y-7">
            {/* Summary */}
            <p className="text-gray-700 text-sm leading-relaxed">
              Senior Software Engineer with 4+ years of experience designing,
              building, and optimizing AI/ML infrastructure at scale, including
              3+ years specializing in model deployment, large-scale model
              evaluation, inference and training optimization, distributed data
              processing, and performance debugging across GPU and TPU clusters.
            </p>

            {/* Experience */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-1.5">
                <Briefcase className="w-3 h-3" />
                experience
              </h3>
              <div className="space-y-3">
                {EXPERIENCE.map((exp, i) => (
                  <div key={i} className="flex justify-between gap-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {exp.role}
                      </div>
                      <div className="text-xs text-gray-500">{exp.company}</div>
                    </div>
                    <div className="text-xs text-gray-400 font-mono whitespace-nowrap">
                      {exp.period}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-gray-500 mb-3">
                core skills
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {SKILLS.map((s) => (
                  <div key={s.category}>
                    <div className="text-gray-500 font-mono mb-0.5">
                      {s.category}
                    </div>
                    <div className="text-gray-800">{s.items}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-1.5">
                <GraduationCap className="w-3 h-3" />
                education
              </h3>
              <div className="flex justify-between gap-4">
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    University of Maryland, Baltimore County
                  </div>
                  <div className="text-xs text-gray-500">
                    M.S. Information Systems
                  </div>
                </div>
                <div className="text-xs text-gray-400 font-mono whitespace-nowrap">
                  Aug 2022 — May 2024
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

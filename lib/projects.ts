export type Project = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  github: string;
  stack: string[];
  highlights: string[];
  category: "LLM" | "MLOps" | "Inference" | "Recsys" | "Multimodal";
  color: string;
  emoji: string;
};

export const PROJECTS: Project[] = [
  {
    id: "agentforge",
    name: "AgentForge",
    tagline: "Multi-agent LLM orchestration framework",
    description:
      "Planner/executor/critic architecture with sandboxed tool execution and a real-time trace viewer.",
    longDescription: `AgentForge is a multi-agent LLM orchestration framework with three specialized roles — a planner that decomposes goals into structured steps, an executor that calls tools, and a critic that validates outputs against typed schemas.

The framework solves the most common failure mode in production agent systems: agents that confidently report completion of tasks they didn't actually finish. By forcing structured JSON validation in the critic, false completions are caught before they propagate.

The tool layer runs in subprocess sandboxes with RLIMIT-based resource caps and timeout enforcement. Tools are provider-agnostic — the same tool spec works with Anthropic Claude and OpenAI APIs.

A custom tracing system streams every agent decision, tool call, and LLM cost in real time to a Next.js trace viewer via Server-Sent Events.`,
    github: "https://github.com/Keerthisriallavarapu/agentforge",
    stack: ["Python", "FastAPI", "Pydantic", "Qdrant", "Next.js", "TypeScript"],
    highlights: [
      "Three-role architecture (planner, executor, critic) with structured output validation",
      "Sandboxed tool layer with subprocess isolation and RLIMIT caps",
      "Provider-agnostic LLM wrapper supporting Anthropic + OpenAI",
      "Real-time trace viewer with SSE streaming under 100ms latency",
    ],
    category: "LLM",
    color: "from-blue-500 to-purple-500",
    emoji: "🤖",
  },
  {
    id: "inferencelab",
    name: "InferenceLab",
    tagline: "LLM inference optimization research",
    description:
      "Five experiments comparing speculative decoding, continuous batching, KV-cache strategies, and quantization.",
    longDescription: `InferenceLab is a series of LLM inference optimization experiments — each implemented from scratch with statistical rigor — covering the techniques that production serving frameworks like vLLM and TGI are built on.

Experiment 01 implements speculative decoding from scratch following Leviathan et al. (2022), characterizing the acceptance rate curve and identifying k=4 as the throughput sweet spot for Llama 3.1 8B paired with Llama 3.2 1B as the draft model.

Experiment 02 builds a continuous-batching scheduler with pluggable admission policies and quantifies the head-of-line blocking penalty of FCFS under variable prompt lengths.

Experiment 03 simulates PagedAttention-style block allocation, demonstrating the memory savings (40-60% on variable-length workloads) that enable 2-3x more concurrent requests in the same VRAM budget.

Experiments 04 and 05 cover quantization tradeoffs (BF16 vs INT8 vs INT4 NF4) and admission policy effects on tail latency.

Each experiment includes a benchmark harness with warmup, multiple repeats, percentiles (p50/p99/p99.9), and 95% confidence intervals.`,
    github: "https://github.com/Keerthisriallavarapu/inferencelab",
    stack: ["Python", "PyTorch", "Transformers", "bitsandbytes", "matplotlib"],
    highlights: [
      "Speculative decoding implemented from scratch with acceptance-rate characterization",
      "Continuous-batching scheduler with FCFS / shortest-first / longest-first policies",
      "PagedAttention allocator simulator showing 40-60% memory savings",
      "Rigorous benchmark harness with percentiles, CIs, environment metadata",
    ],
    category: "Inference",
    color: "from-orange-500 to-red-500",
    emoji: "⚡",
  },
  {
    id: "featureflow",
    name: "FeatureFlow",
    tagline: "Self-hosted ML feature store + serving",
    description:
      "Redis online + DuckDB offline parity, canary/shadow routing, and Kafka streaming ingestion.",
    longDescription: `FeatureFlow is a self-hosted ML feature store and serving platform inspired by the patterns in Uber's Michelangelo and Meta's FBLearner — scaled down to something a small team can actually run.

The platform has online (Redis) and offline (Parquet + DuckDB) stores with a single source of truth — the feature registry — that eliminates training/serving skew. Redis keys are hash-tagged for Cluster compatibility, so a single MGET pipeline retrieves all features for an entity even across shards.

Point-in-time correct training data joins use DuckDB's native ASOF JOIN — handles 10M label rows joined against 50M feature rows in about 12 seconds on a 16-core laptop.

The prediction router supports production / canary / shadow deployment modes with consistent-hash entity routing (SHA-256 mod 100), enabling clean A/B analysis without user-version flapping.

Streaming ingestion from Kafka writes to both stores with at-least-once delivery; drift detection uses PSI for numeric features and chi-square for categoricals.`,
    github: "https://github.com/Keerthisriallavarapu/featureflow",
    stack: ["Python", "FastAPI", "Redis", "DuckDB", "Kafka", "Prometheus"],
    highlights: [
      "Online + offline stores with single registry eliminates training/serving skew",
      "Production / canary / shadow routing with consistent SHA-256 hashing",
      "Point-in-time joins via DuckDB ASOF JOIN — no Spark cluster required",
      "Schema evolution enforced at registration time to prevent breaking changes",
    ],
    category: "MLOps",
    color: "from-emerald-500 to-teal-500",
    emoji: "🏪",
  },
  {
    id: "twotowerrecs",
    name: "TwoTowerRecs",
    tagline: "Two-tower retrieval recommender",
    description:
      "PyTorch model with in-batch negatives + LogQ correction, FAISS HNSW serving, MMR diversity reranking.",
    longDescription: `TwoTowerRecs is a two-tower retrieval recommender — the architecture Netflix, YouTube, TikTok, and Pinterest use for the retrieval stage of their recommenders before a heavier ranker re-orders the top candidates.

The model uses cosine similarity (L2-normalized outputs) and in-batch negative sampling with LogQ correction (Yi et al. 2019) to debias against popular items appearing more frequently as in-batch negatives.

Training uses temporal train/test split (per-user, hold out most-recent N%) instead of random splits — random splits inflate Recall@10 by about 2x via label leakage. This is the dominant evaluation bug in published recsys results.

Serving uses FAISS HNSW (M=32, efConstruction=200) with cosine similarity, MMR re-ranking for top-K diversity, and a popularity-based cold-start fallback for unseen users.

A Next.js UI exposes a real-time diversity slider so you can watch the MMR reranker rebalance results live.`,
    github: "https://github.com/Keerthisriallavarapu/twotowerrecs",
    stack: ["PyTorch", "FAISS", "FastAPI", "Next.js", "TypeScript"],
    highlights: [
      "In-batch negatives + LogQ correction debiases against popular items",
      "Temporal train/test split prevents label leakage (fixes 2x metric inflation)",
      "FAISS HNSW serving with MMR diversity reranking",
      "Cold-start fallback + Next.js UI with live diversity controls",
    ],
    category: "Recsys",
    color: "from-pink-500 to-rose-500",
    emoji: "🎯",
  },
  {
    id: "visiontalk",
    name: "VisionTalk",
    tagline: "Vision-language assistant with LoRA",
    description:
      "LLaVA-NeXT fine-tuning with INT4 serving, streaming SSE, and drag-and-drop frontend.",
    longDescription: `VisionTalk is a vision-language assistant built on LLaVA-NeXT 7B with PEFT-based LoRA fine-tuning. The setup targets only the LLM backbone's q_proj/v_proj layers (vision encoder frozen), reducing trainable parameters to ~0.5% of the model and fitting in 24GB VRAM at training.

At inference time, INT4 quantization via bitsandbytes (NF4 with double quantization) reduces the memory footprint to ~8GB while maintaining quality on VQA tasks.

The serving layer streams generated tokens to the frontend via Server-Sent Events. HuggingFace's TextIteratorStreamer runs generation in a background thread; tokens are marshalled into asyncio via a queue for safe async iteration.

The VQAv2 grader is implemented exactly as the official benchmark spec — article stripping, punctuation normalization, min(matches/3, 1.0) scoring — to ensure benchmark numbers are comparable to published results.

Frontend: Next.js with drag-and-drop image upload, live token streaming, and request cancellation via AbortController.`,
    github: "https://github.com/Keerthisriallavarapu/visiontalk",
    stack: ["PyTorch", "Transformers", "PEFT", "bitsandbytes", "FastAPI", "Next.js"],
    highlights: [
      "LoRA fine-tuning (rank 16, q_proj/v_proj only) on LLaVA-NeXT 7B",
      "INT4 NF4 quantization with double quant for 8GB VRAM inference",
      "Streaming SSE API with TextIteratorStreamer + asyncio queue",
      "Official VQAv2 grader implementation for benchmark-comparable numbers",
    ],
    category: "Multimodal",
    color: "from-violet-500 to-fuchsia-500",
    emoji: "👁️",
  },
];

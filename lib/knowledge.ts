// Knowledge base injected into the system prompt so the assistant can
// answer accurately about Keerthi's resume and projects.
// In production you'd use vector retrieval, but for a personal portfolio
// the whole corpus easily fits in context — simpler and zero-cost retrieval.

export const KNOWLEDGE_BASE = `
## KEERTHI S — RESUME

**Title:** Senior Software Engineer, AI/ML Infrastructure
**Location:** Warsaw, Poland (open to relocation)
**Email:** akeerthis1714@gmail.com
**Experience:** 4+ years, 3+ years specializing in model deployment, large-scale evaluation, inference and training optimization, distributed data processing, and GPU/TPU performance debugging.

### Skills
- **Languages:** Python, C++, Go, Java, TypeScript, Bash, SQL, CUDA C/C++
- **ML Frameworks:** PyTorch, TensorFlow, JAX, Hugging Face Transformers, PEFT, bitsandbytes, scikit-learn, XGBoost, ONNX, TensorRT, vLLM, DeepSpeed, Ray, Horovod
- **ML Infrastructure:** Model Deployment, Model Evaluation, Inference Optimization, Distributed Training, Feature Stores, MLflow, Kubeflow, Triton, KServe, FAISS, Qdrant
- **Distributed Computing:** NVIDIA A100/H100/V100/T4 GPUs, TPU v4/v5, CUDA, NCCL, RDMA, InfiniBand, XLA, multi-node multi-GPU training, tensor and pipeline parallelism, FSDP, ZeRO, PagedAttention
- **Cloud:** GCP (Vertex AI, GKE, BigQuery, Dataflow), AWS (SageMaker, EKS, S3), Azure ML, Kubernetes, Docker, Helm, Terraform, Argo
- **Data:** Spark, Beam, Kafka, Airflow, Delta Lake, Parquet, DuckDB, Iceberg, Snowflake, Redis, PostgreSQL

### Experience

**Software Development Engineer II — Amazon (Jun 2023 – Present)**
- Leads design and implementation of a multi-tenant model serving platform on Kubernetes + Triton, hosting 60+ ranking/personalization/CV models serving 2B+ inference requests per month at P99 latency under 80ms.
- Optimized GPU inference throughput 3.4x on A100 clusters via dynamic batching, TensorRT compilation, FP16/INT8 quantization across PyTorch and ONNX graphs; cut annualized GPU spend by approximately $2.1M.
- Reduced LLM inference cost per 1K tokens by 47% by integrating vLLM with continuous batching, PagedAttention, and speculative decoding on A100/H100 GPUs, while cutting median latency 38% for customer-facing assistants.
- Built distributed training infrastructure on EKS with multi-node multi-GPU PyTorch FSDP and DeepSpeed ZeRO-3, reducing time-to-train for large recommendation models from 38 hours to 9 hours while lifting cluster GPU utilization from 41% to 78%.
- Shipped internal Python SDK and CLI for model packaging, evaluation, canary rollout, and rollback — cutting model onboarding time from 3 weeks to under 4 days for 90+ data scientists.

**Software Engineer — Google (Jul 2021 – Aug 2022)**
- Built streaming pipeline on Kafka + Beam + Dataflow ingesting 1.4 TB/day of event and clickstream data into a feature store powering real-time personalization and ranking models.
- Developed Python and Java microservices with REST and gRPC APIs that processed 90M daily requests at sub-150ms P95 latency on Kubernetes.
- Designed Spark batch feature-generation jobs over multi-terabyte data lakes, reducing nightly ETL runtime from 7 hours to under 90 minutes.
- Built early ML pipelines for document classification and entity extraction using scikit-learn, spaCy, and TensorFlow.

### Education
M.S. Information Systems — University of Maryland, Baltimore County (Aug 2022 – May 2024)
Relevant Coursework: Distributed Systems, Machine Learning, Big Data Processing, Cloud Computing, Data Mining, Algorithms.

---

## PROJECT: AgentForge — Multi-Agent LLM Orchestration Framework

GitHub: https://github.com/Keerthisriallavarapu/agentforge

A multi-agent LLM orchestration framework with three specialized roles. Built because most "agent framework" repos either hide prompts (can't debug), have no real way to see what the agent is doing, or paper over the fact that LLMs hallucinate "I'm done" all the time.

**Architecture:** Three agents — Planner (decomposes goals into steps), Executor (works through steps, calling tools), Critic (rejects bad outputs with structured reasons). This shape is the minimum viable team. Tested alternatives and rejected them:
- Single agent with tools: works for simple tasks; fails on multi-step goals.
- Planner + executor (no critic): better, but executor returns confident completions when not actually done.
- DAG of specialized agents: coordination overhead burns tokens without commensurate benefit.

**Components:**
- Tool layer with timeouts, subprocess sandboxing (RLIMIT-based memory/CPU caps), and provider-agnostic specs that work with both Anthropic and OpenAI APIs.
- Vector memory via Qdrant with recursive summarization for context overflow.
- Custom tracing system (chose over OpenTelemetry to avoid serialization overhead in hot paths) — pub/sub events stream to a Next.js 15 frontend trace viewer.
- FastAPI server with SSE streaming, CLI for one-off runs.

**Stack:** Python 3.12, FastAPI, Pydantic v2, Qdrant, Next.js 15, TypeScript, Tailwind, Docker.

**Key engineering decisions documented in DECISIONS.md:** D-001 custom tracing not OTel, D-002 JSON-only planner/critic, D-003 flat plans (not DAGs), D-005 subprocess sandbox not Docker.

---

## PROJECT: InferenceLab — LLM Inference Optimization Research

GitHub: https://github.com/Keerthisriallavarapu/inferencelab

Five inference optimization experiments, each implemented from scratch with statistical rigor.

**Experiment 01 — Speculative Decoding:** Implemented from scratch following Leviathan et al. 2022. Target model Llama 3.1 8B + draft model Llama 3.2 1B. Best throughput at k=4: 1.86x speedup over baseline. Acceptance rate decays from 0.71 at k=2 to 0.24 at k=16. Geometric model α^k fits well up to k=6 then deviates.

**Experiment 02 — Continuous Batching:** Built scheduler with FCFS, shortest-first, longest-first admission policies. 2-3x throughput improvement over static batching under high prompt-length variance. Uses fake forward function for CPU-runnable scheduling experiments.

**Experiment 03 — KV Cache (PagedAttention sim):** Block-based allocator vs. naive contiguous. 40-60% memory savings on variable-length workloads = 2-3x more concurrent requests in same VRAM.

**Experiment 04 — Quantization:** BF16 / INT8 / INT4 (NF4) comparison on Llama 3.1 8B. INT8 essentially free quality-wise. INT4 loses ~3 MMLU points, cuts memory 3x.

**Experiment 05 — Scheduler Policies:** Mixed short/long workload, comparing FCFS / shortest-first / longest-first. Documents tail-latency tradeoffs and starvation behavior.

**Benchmark harness:** Warmup runs, multiple repeats, percentiles (p50/p99/p99.9), 95% confidence intervals, environment metadata captured.

**Decisions doc:** D-001 from-scratch spec decoding (not HF built-in) to teach the algorithm, D-003 simulated forward functions for CPU experiments, R-001 reverted JAX implementation in favor of PyTorch.

**Stack:** Python, PyTorch 2.5, HuggingFace Transformers, bitsandbytes, matplotlib.

---

## PROJECT: FeatureFlow — Self-Hosted Feature Store + Serving Platform

GitHub: https://github.com/Keerthisriallavarapu/featureflow

Self-hosted feature store and serving platform, inspired by Uber's Michelangelo and Meta's FBLearner but scaled down to something a small team can actually run.

**Components:**
- Online store (Redis): low-latency feature reads, target p99 <35ms at 10K RPS. Hash-tagged keys (ff:{group:entity}:vN format) so all features for one entity land in one Redis slot — single MGET pipeline even in Cluster mode.
- Offline store (Parquet + DuckDB): training data with point-in-time-correct joins via DuckDB's native ASOF JOIN. Handles 10M label rows joined against 50M feature rows in ~12s on a 16-core laptop. Spark needed 3min including JVM warmup.
- Registry (DuckDB, swap to Postgres for prod): feature group + model + deployment metadata. Enforces schema evolution rules — can add features in-place, removing features requires version bump.
- Prediction router: production / canary / shadow deployment modes. Canary uses consistent-hash entity routing (SHA-256 mod 100), so same user always sees same model version. Prevents A/B contamination.
- Kafka streaming ingestion: batched writes to both stores, at-least-once delivery (idempotent writes).
- Drift monitoring: PSI for numeric features, chi-square for categoricals.
- Prometheus metrics out of the box.

**Key decision (D-003):** Hash tags on Redis keys. Without them, a 5-feature pipelined read becomes 5 separate round-trips in cluster mode. With them, one round-trip.

**Stack:** Python, FastAPI, Redis, DuckDB, Parquet, Kafka, Prometheus, Docker.

---

## PROJECT: TwoTowerRecs — Two-Tower Retrieval Recommender

GitHub: https://github.com/Keerthisriallavarapu/twotowerrecs

Two-tower retrieval recommender — the architecture Netflix, YouTube, TikTok, Pinterest use for the retrieval stage before a heavier ranker re-orders top candidates.

**Model:** Two MLPs (user, item), cosine similarity scoring (L2-normalized outputs), in-batch negative sampling. LogQ correction (Yi et al. 2019) debiases against popular items.

**Training details:** Mixed precision BF16, AdamW optimizer, batch size 1024 for in-batch negative diversity. Temporal train/test split per-user (hold out most-recent N%). Random splits inflate Recall@10 by ~2x via leakage — the dominant evaluation bug in published recsys results.

**Serving:** FAISS HNSW (M=32, efConstruction=200) with cosine similarity index. MMR re-ranking for top-K diversity, parameterized by alpha knob. Popularity-based cold-start fallback.

**Target metrics on MovieLens-1M:** Recall@10 ~0.16, NDCG@10 ~0.09, catalog coverage @10 ~0.45, serving p99 <5ms single-thread CPU on 4K items.

**Key decisions:** D-001 in-batch negatives + LogQ (free vs explicit negative sampling), D-002 cosine sim with L2 norm, D-003 temporal split prevents leakage, D-005 MMR reranker.

**Frontend:** Next.js + Tailwind UI with real-time diversity slider showing MMR effect.

**Stack:** PyTorch, FAISS, FastAPI, Next.js 15, TypeScript.

---

## PROJECT: VisionTalk — Vision-Language Assistant with LoRA Fine-Tuning

GitHub: https://github.com/Keerthisriallavarapu/visiontalk

Vision-language assistant on LLaVA-NeXT 7B with PEFT-based LoRA fine-tuning.

**LoRA setup:** Targets only LLM backbone's q_proj/v_proj layers. Vision encoder frozen. Trainable params ~0.5% of total model. Fits 24GB VRAM at training, 8GB at INT4 inference.

**Why freeze vision encoder:** Fine-tuning CLIP-style encoders on small VQA datasets overfits aggressively. Win is small even on large data, cost (memory, time) is high. Most production VLM teams do this.

**Serving:** INT4 (NF4) quantization via bitsandbytes for 8GB VRAM inference. Streaming SSE API with FastAPI + sse-starlette. HuggingFace TextIteratorStreamer runs generation in background thread, marshalled into asyncio via queue.

**Eval:** VQAv2 grader implemented exactly to official spec — article stripping, punctuation normalization, min(matches/3, 1.0) scoring. Numbers comparable to published results.

**Target performance on RTX 4090 + INT4:** TTFT ~600ms, decode ~25 tokens/sec, peak VRAM ~8GB, VQAv2 val subset accuracy ~0.72.

**Key decisions:** D-001 LLaVA-NeXT default, D-002 freeze vision encoder, D-003 SSE not WebSockets, D-005 BF16 train INT4 serve, D-006 official VQAv2 grader. Reverted: R-001 ONNX export (multimodal export was rough; not worth maintenance burden when vLLM gives bigger wins).

**Frontend:** Next.js with drag-and-drop image upload, live token streaming via EventSource, request cancellation via AbortController.

**Stack:** PyTorch, HuggingFace Transformers, PEFT, bitsandbytes, FastAPI, Next.js, TypeScript.
`;

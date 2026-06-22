# Backtest Auditor Benchmark Training Assets

This folder contains reproducible benchmark cases for audit calibration, RAG, and future fine-tuning.

Boundary: these cases train fake-backtest detection and evidence review. They do not predict returns, provide investment advice, or recommend live trading.

## Outputs

- `cases/benchmark_cases.json`: structured benchmark case library.
- `cases/benchmark_cases.csv`: compact review table.
- `rag/benchmark_rag_documents.jsonl`: retrieval documents for AI audit memo generation.
- `fine_tune/audit_memo_training.jsonl`: chat-style fine-tuning seed data.
- `benchmark_manifest.json`: data source status and generation settings.

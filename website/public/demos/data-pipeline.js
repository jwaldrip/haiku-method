window.HAIKU_DEMO_CONFIG = {
  title: "data-pipeline",
  studio: "data-pipeline",
  stages: ["discovery","extraction","transformation","validation","deployment"],
  completionText: "All 5 stages passed. customer-analytics-etl delivered.",
  steps: [
  // === User invokes ===
  {delay:800,actions:[function(){addMsg("user","you","/haiku:new")}]},
  {delay:1200,actions:[function(){addMsg("agent","agent","What do you want to accomplish?")}]},
  {delay:1500,actions:[function(){addMsg("user","you","Build a customer analytics ETL pipeline")}]},
  {delay:1200,actions:[function(){addMsg("agent","agent","Creating intent: customer-analytics-etl...");addFile(".haiku/intents/customer-analytics-etl/intent.md")}]},
  {delay:800,actions:[function(){addMsg("system","system","Intent created. Studio: data-pipeline. 5 stages: discovery \u2192 extraction \u2192 transformation \u2192 validation \u2192 deployment")}]},

  // === DISCOVERY ===
  {delay:1000,actions:[function(){activateStage("discovery");addMsg("agent","agent","Entering discovery stage. Hat: data-architect.\nWhat are your data sources? And the target \u2014 warehouse, lake?");addFile(".haiku/intents/customer-analytics-etl/stages/discovery/state.json")}]},
  {delay:2000,actions:[function(){addMsg("user","you","PostgreSQL (transactions), Stripe API (payments), Segment (events). Target is BigQuery.")}]},
  {delay:1000,actions:[function(){addMsg("agent","agent","Hat: schema-analyst. Three sources, one target. Cataloging schemas and mapping lineage.");addFile(".haiku/intents/customer-analytics-etl/stages/discovery/units/unit-01-source-catalog.md");addFile(".haiku/intents/customer-analytics-etl/stages/discovery/units/unit-02-schema-analysis.md");addCard("discovery","source-catalog","in-progress");addCard("discovery","schema-analysis","")}]},
  {delay:500,actions:[function(){addFastForward("40")}]},
  {delay:2000,actions:[function(){removeFastForward();addMsg("agent","agent","Source catalog:\n  \u2022 PostgreSQL: 12 tables, ~5M rows/day, watermark-based\n  \u2022 Stripe: ~200K events/day, cursor pagination\n  \u2022 Segment: ~2M events/day, needs dedup\n\nSchema issues: Stripe cents vs decimal, inconsistent timezones, UUID-to-string join key mismatch. SLA: 1-hour freshness.");updateCard("discovery","source-catalog","completed");updateCard("discovery","schema-analysis","completed");addFile(".haiku/intents/customer-analytics-etl/knowledge/SOURCE-CATALOG.md")}]},
  {delay:800,actions:[function(){addMsg("system","system","Discovery complete. Review gate: auto. All criteria met \u2014 advancing.")}]},

  // === EXTRACTION ===
  {delay:1000,actions:[function(){activateStage("extraction");addMsg("agent","agent","Entering extraction stage. Hat: extractor.");addFile(".haiku/intents/customer-analytics-etl/stages/extraction/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 discovery/source-catalog (knowledge/SOURCE-CATALOG.md)");addCard("extraction","postgres-connector","in-progress");addCard("extraction","stripe-connector","");addCard("extraction","segment-connector","")}]},
  {delay:500,actions:[function(){addFastForward("45")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","PostgreSQL: incremental via updated_at watermarks. Stripe: cursor pagination, exponential backoff, dead-letter queue for failed webhooks.");updateCard("extraction","postgres-connector","completed");updateCard("extraction","stripe-connector","completed");updateCard("extraction","segment-connector","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("35")}]},
  {delay:1200,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: connector-reviewer. Segment: dedup via event_id. All 3 connectors: idempotent, schema drift alerts, raw data in staging with metadata.");updateCard("extraction","segment-connector","completed");addFile("pipelines/extract/postgres_connector.py");addFile("pipelines/extract/stripe_connector.py");addFile("pipelines/extract/segment_connector.py");addFile(".haiku/intents/customer-analytics-etl/knowledge/STAGED-DATA.md")}]},
  {delay:1000,actions:[function(){addMsg("system","system","Extraction complete. Review gate: ask.");showCriteriaReview("Extraction","customer-analytics-etl",["Incremental loads use watermark columns","Retry logic with backoff and dead-letter handling","Schema drift detection raises alerts","All connectors are idempotent"])}]},
  {delay:800,actions:[function(){animateCheckmarks()}]},
  {delay:1800,actions:[function(){highlightApproveBtn()}]},
  {delay:1200,actions:[function(){hideReviewOverlay();addMsg("user","you","Approved. The dead-letter queue for Stripe is a nice touch.")}]},

  // === TRANSFORMATION ===
  {delay:1000,actions:[function(){activateStage("transformation");addMsg("agent","agent","Entering transformation stage. Hat: transformer.");addFile(".haiku/intents/customer-analytics-etl/stages/transformation/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 extraction/staged-data (knowledge/STAGED-DATA.md)");addCard("transformation","customer-dim","in-progress");addCard("transformation","transaction-fact","");addCard("transformation","event-fact","")}]},
  {delay:500,actions:[function(){addFastForward("40")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","Customer dimension: SCD Type 2, UUID-to-Stripe-ID mapping table. How do you handle refunds \u2014 separate row or status flag?");updateCard("transformation","customer-dim","completed");updateCard("transformation","transaction-fact","in-progress")}]},
  {delay:2000,actions:[function(){addMsg("user","you","Separate row with negative amount. Track refund timing independently.")}]},
  {delay:500,actions:[function(){addFastForward("35")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: data-modeler. Refunds as separate rows with refund_of FK. Cents converted to decimal, UTC normalized. Events sessionized with 30-min window. All idempotent.");updateCard("transformation","transaction-fact","completed");updateCard("transformation","event-fact","completed");addFile("pipelines/transform/customer_dim.sql");addFile("pipelines/transform/transaction_fact.sql");addFile("pipelines/transform/event_fact.sql");addFile(".haiku/intents/customer-analytics-etl/knowledge/MODELED-DATA.md")}]},
  {delay:1000,actions:[function(){addMsg("system","system","Transformation complete. Review gate: ask.");showCriteriaReview("Transformation","customer-analytics-etl",["Idempotent with deterministic output","SCD Type 2 for customer dimension","Business logic in named CTEs","Refunds as separate rows per spec"])}]},
  {delay:800,actions:[function(){animateCheckmarks()}]},
  {delay:1800,actions:[function(){highlightApproveBtn()}]},
  {delay:1200,actions:[function(){hideReviewOverlay();addMsg("user","you","Approved.")}]},

  // === VALIDATION ===
  {delay:1000,actions:[function(){activateStage("validation");addMsg("agent","agent","Entering validation stage. Hat: validator.");addFile(".haiku/intents/customer-analytics-etl/stages/validation/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 transformation/modeled-data (knowledge/MODELED-DATA.md)");addCard("validation","schema-checks","in-progress");addCard("validation","business-rules","")}]},
  {delay:500,actions:[function(){addFastForward("35")}]},
  {delay:1800,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: data-quality-reviewer. Schema checks passed (uniqueness, not-null, referential integrity). Row count reconciliation: 0.02% variance.\n\nBusiness rules: timezone normalization, cents-to-decimal, refund FK integrity, null propagation \u2014 all verified. Correctness review agent passed.");updateCard("validation","schema-checks","completed");updateCard("validation","business-rules","completed");addFile("pipelines/tests/test_schema_checks.py");addFile("pipelines/tests/test_business_rules.py");addFile(".haiku/intents/customer-analytics-etl/knowledge/VALIDATION-REPORT.md")}]},
  {delay:1000,actions:[function(){addMsg("system","system","Validation complete. Review gate: ask.");showCriteriaReview("Validation","customer-analytics-etl",["Schema checks: uniqueness, not-null, referential integrity","Row count reconciliation within 0.1% tolerance","Business rule tests verify edge cases"])}]},
  {delay:800,actions:[function(){animateCheckmarks()}]},
  {delay:1800,actions:[function(){highlightApproveBtn()}]},
  {delay:1200,actions:[function(){hideReviewOverlay();addMsg("user","you","Approved.")}]},

  // === DEPLOYMENT ===
  {delay:1000,actions:[function(){activateStage("deployment");addMsg("agent","agent","Entering deployment stage. Hat: pipeline-engineer.");addFile(".haiku/intents/customer-analytics-etl/stages/deployment/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 validation/validation-report (knowledge/VALIDATION-REPORT.md)");addCard("deployment","orchestration","in-progress");addCard("deployment","monitoring","")}]},
  {delay:500,actions:[function(){addFastForward("40")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: sre. Airflow DAG: hourly, extract\u2192transform\u2192validate\u2192load, 3 retries, SLA alert at 45min. Monitoring: runtime, row counts, freshness. Runbook for 3 failure modes.");updateCard("deployment","orchestration","completed");updateCard("deployment","monitoring","completed");addFile("pipelines/dags/customer_analytics_dag.py");addFile("pipelines/monitoring/dashboards.json");addFile(".haiku/intents/customer-analytics-etl/knowledge/RUNBOOK.md")}]},
  {delay:800,actions:[function(){addMsg("system","system","Deployment complete. Review gate: external.");addMsg("agent","agent","Sharing browse URL for external deployment review...")}]},
  {delay:1000,actions:[function(){showCriteriaReview("Deployment","customer-analytics-etl",["Pipeline DAG with correct dependencies and retry policies","Monitoring covers runtime, row counts, and freshness","Runbook for 3 most likely failure modes"],"external gate")}]},
  {delay:800,actions:[function(){animateCheckmarks()}]},
  {delay:2000,actions:[function(){highlightApproveBtn()}]},
  {delay:1200,actions:[function(){hideReviewOverlay();addMsg("system","system","External deployment review approved via browse page.")}]},

  // === Complete ===
  {delay:1200,actions:[function(){completeAllStages();addMsg("agent","agent","All 5 stages complete for customer-analytics-etl.\n\nDelivered:\n  \u2022 Source catalog: PostgreSQL, Stripe, Segment with schema analysis\n  \u2022 3 extraction connectors with incremental loads and dead-letter queues\n  \u2022 Dimensional model: customer (SCD2), transaction fact, event fact\n  \u2022 Validation suite with schema checks and business rule tests\n  \u2022 Airflow DAG with hourly schedule, monitoring, and runbook\n\nIntent status: complete.")}]},
  {delay:1500,actions:[function(){overlay.classList.add("visible")}]}
]
};

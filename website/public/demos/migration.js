var P = ".haiku/intents/migrate-postgresql-12-to-16";
window.HAIKU_DEMO_CONFIG = {
  title: "migration",
  studio: "migration",
  stages: ["assessment","mapping","migrate","validation","cutover"],
  completionText: "All 5 stages passed. migrate-postgresql-12-to-16 delivered.",
  steps: [
  // User invokes
  {delay:800,actions:[function(){addMsg("user","you","/haiku:new")}]},
  {delay:1000,actions:[function(){addTyping()}]},
  {delay:800,actions:[function(){removeTyping();addMsg("agent","agent","What do you want to accomplish?")}]},
  {delay:1500,actions:[function(){addMsg("user","you","Migrate our production PostgreSQL 12 cluster to PostgreSQL 16")}]},

  // Intent created
  {delay:800,actions:[function(){addTyping()}]},
  {delay:1000,actions:[function(){removeTyping();addMsg("agent","agent","Creating intent: migrate-postgresql-12-to-16...");addFile(P+"/intent.md")}]},
  {delay:800,actions:[function(){addMsg("system","system","Intent created. Studio: migration. 5 stages: assessment \u2192 mapping \u2192 migrate \u2192 validation \u2192 cutover")}]},

  // === ASSESSMENT ===
  {delay:1000,actions:[function(){activateStage("assessment");addMsg("agent","agent","Entering assessment stage. Hat: migration-analyst.\nHow large is the current cluster? What\u2019s the data volume?");addFile(P+"/stages/assessment/state.json")}]},
  {delay:2000,actions:[function(){addMsg("user","you","Primary + 2 read replicas. 1.2TB data across 340 tables. Heavy use of pg_trgm extensions and several custom functions. Runs on RDS.")}]},
  {delay:800,actions:[function(){addTyping()}]},
  {delay:1200,actions:[function(){removeTyping();addMsg("agent","agent","1.2TB with extensions and custom functions \u2014 that adds complexity. Decomposing assessment...")}]},
  {delay:800,actions:[function(){addFile(P+"/stages/assessment/units/unit-01-schema-inventory.md");addFile(P+"/stages/assessment/units/unit-02-dependency-graph.md");addFile(P+"/stages/assessment/units/unit-03-risk-register.md");addCard("assessment","schema-inventory","in-progress");addCard("assessment","dependency-graph","");addCard("assessment","risk-register","")}]},
  {delay:500,actions:[function(){addFastForward("35")}]},
  {delay:1800,actions:[function(){removeFastForward();addMsg("agent","agent","Schema inventory complete:\n  \u2022 340 tables, 47 views, 23 materialized views\n  \u2022 12 custom functions (PL/pgSQL)\n  \u2022 3 extensions: pg_trgm, uuid-ossp, hstore\n  \u2022 156 indexes including 18 GIN indexes for text search\n  \u2022 Largest table: events (420GB, 2.1B rows)");updateCard("assessment","schema-inventory","completed");updateCard("assessment","dependency-graph","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("25")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: risk-assessor. Dependency graph shows 8 downstream services reading from replicas. Migration must maintain read availability.\n\nRisk register:\n  1. [High] pg_trgm index format changed in PG14 \u2014 requires REINDEX\n  2. [High] 420GB events table \u2014 migration time risk\n  3. [Medium] Custom PL/pgSQL functions may use deprecated syntax\n  4. [Low] hstore extension \u2014 compatible, no changes needed");updateCard("assessment","dependency-graph","completed");updateCard("assessment","risk-register","completed");addFile(P+"/knowledge/MIGRATION-INVENTORY.md")}]},

  // Assessment gate - auto
  {delay:800,actions:[function(){addMsg("system","system","Assessment complete. Review gate: auto. All criteria met \u2014 advancing.");addMsg("agent","agent","Advancing to mapping stage.")}]},

  // === MAPPING ===
  {delay:1000,actions:[function(){activateStage("mapping");addMsg("agent","agent","Entering mapping stage. Hat: schema-mapper.\nLoading migration inventory...");addFile(P+"/stages/mapping/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 assessment/migration-inventory (knowledge/MIGRATION-INVENTORY.md)");addMsg("agent","agent","Mapping source PG12 schemas to PG16 target. Checking for breaking changes...")}]},
  {delay:800,actions:[function(){addFile(P+"/stages/mapping/units/unit-01-schema-mapping.md");addFile(P+"/stages/mapping/units/unit-02-function-compat.md");addFile(P+"/stages/mapping/units/unit-03-extension-mapping.md");addCard("mapping","schema-mapping","in-progress");addCard("mapping","function-compat","");addCard("mapping","extension-mapping","")}]},
  {delay:500,actions:[function(){addFastForward("40")}]},
  {delay:1800,actions:[function(){removeFastForward();addMsg("agent","agent","Schema mapping: 340 tables map 1:1. No column type changes needed. 3 views reference deprecated implicit casts (integer to text) \u2014 these need explicit CAST expressions in PG16.\n\nHat: compatibility-reviewer. Edge cases flagged:\n  \u2022 Null handling: 2 functions rely on PG12\u2019s implicit null coercion\n  \u2022 Encoding: UTF-8 throughout, no issues\n  \u2022 Precision: numeric(18,6) columns are safe");updateCard("mapping","schema-mapping","completed");updateCard("mapping","function-compat","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("25")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","Function compatibility: 10 of 12 functions pass. 2 need updates:\n  \u2022 calculate_trending_score() uses removed operator class\n  \u2022 merge_user_profiles() uses implicit type coercion\n\nBoth are straightforward fixes. Want me to show the diffs?")}]},
  {delay:1800,actions:[function(){addMsg("user","you","Yes, show the diffs. Also \u2014 make sure the trending score function doesn\u2019t break our recommendation engine.")}]},
  {delay:800,actions:[function(){addMsg("agent","agent","Good call. The trending score function feeds 3 materialized views that the recommendation engine queries. I\u2019ll verify the output is identical after the fix.");updateCard("mapping","function-compat","completed");updateCard("mapping","extension-mapping","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("15")}]},
  {delay:1200,actions:[function(){removeFastForward();addMsg("agent","agent","Extensions: all 3 are available in PG16 on RDS. pg_trgm requires REINDEX after upgrade for GIN indexes. uuid-ossp and hstore are drop-in compatible.");updateCard("mapping","extension-mapping","completed");addFile(P+"/knowledge/MAPPING-SPEC.md")}]},

  // Mapping gate - ask
  {delay:800,actions:[function(){addMsg("system","system","Mapping stage complete. Review gate: ask.")}]},
  {delay:800,actions:[function(){showCriteriaReview("Mapping",INTENT,["340 tables mapped 1:1 with transformation rules","3 views need explicit CAST expressions","2 functions updated with compatibility fixes","pg_trgm REINDEX planned for 18 GIN indexes","Recommendation engine impact verified"],"ask gate")}]},
  {delay:800,actions:[function(){animateCheckmarks()}]},
  {delay:2200,actions:[function(){highlightApproveBtn()}]},
  {delay:1200,actions:[function(){hideReviewOverlay();addMsg("user","you","Approved. Build the migration scripts.");addMsg("agent","agent","Advancing to migrate stage.")}]},

  // === MIGRATE ===
  {delay:1000,actions:[function(){activateStage("migrate");addMsg("agent","agent","Entering migrate stage. Hat: migration-engineer.\nLoading mapping spec...");addFile(P+"/stages/migrate/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 mapping/mapping-spec (knowledge/MAPPING-SPEC.md)");addMsg("agent","agent","Building idempotent migration scripts with dry-run mode...")}]},
  {delay:800,actions:[function(){addFile(P+"/stages/migrate/units/unit-01-migration-scripts.md");addFile(P+"/stages/migrate/units/unit-02-rollback-plan.md");addFile(P+"/stages/migrate/units/unit-03-integration-tests.md");addCard("migrate","migration-scripts","in-progress");addCard("migrate","rollback-plan","");addCard("migrate","integration-tests","")}]},
  {delay:500,actions:[function(){addFastForward("50")}]},
  {delay:2000,actions:[function(){removeFastForward();addMsg("agent","agent","Migration scripts ready:\n  \u2022 01-pre-checks.sql: validates source state\n  \u2022 02-schema-migrate.sql: DDL changes with explicit casts\n  \u2022 03-function-updates.sql: 2 function fixes\n  \u2022 04-data-migrate.sh: pg_dump/pg_restore with parallel jobs\n  \u2022 05-reindex.sql: GIN index rebuild for pg_trgm\n  \u2022 06-post-checks.sql: validates target state\n\nAll scripts are idempotent. Dry-run mode produces diff report.");updateCard("migrate","migration-scripts","completed");updateCard("migrate","rollback-plan","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("25")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","Rollback plan documented. Point-of-no-return: after data migration starts (step 04). Before that, rollback is instant \u2014 just point services back to PG12. After, we need a reverse pg_restore.");updateCard("migrate","rollback-plan","completed");updateCard("migrate","integration-tests","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("35")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: integration-tester. Tests cover:\n  \u2022 Row count reconciliation for all 340 tables\n  \u2022 Null handling edge cases for the 2 updated functions\n  \u2022 GIN index queries return identical results\n  \u2022 Materialized view refresh produces same output\n  \u2022 Trending score function output matches to 6 decimal places");updateCard("migrate","integration-tests","completed");addFile(P+"/knowledge/MIGRATION-ARTIFACTS.md");addFile("migration/scripts/01-pre-checks.sql");addFile("migration/scripts/02-schema-migrate.sql");addFile("migration/scripts/03-function-updates.sql");addFile("migration/scripts/04-data-migrate.sh");addFile("migration/scripts/05-reindex.sql");addFile("migration/scripts/06-post-checks.sql")}]},

  // Migrate gate - ask
  {delay:800,actions:[function(){addMsg("system","system","Migrate stage complete. Review gate: ask.")}]},
  {delay:1500,actions:[function(){addMsg("user","you","Scripts look solid. Run validation against staging.");addMsg("agent","agent","Advancing to validation stage.")}]},

  // === VALIDATION ===
  {delay:1000,actions:[function(){activateStage("validation");addMsg("agent","agent","Entering validation stage. Hat: validator.\nLoading migration artifacts...");addFile(P+"/stages/validation/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 migrate/migration-artifacts (knowledge/MIGRATION-ARTIFACTS.md)");addMsg("agent","agent","Running full validation suite against staging PG16 instance...")}]},
  {delay:800,actions:[function(){addFile(P+"/stages/validation/units/unit-01-data-integrity.md");addFile(P+"/stages/validation/units/unit-02-functional-parity.md");addFile(P+"/stages/validation/units/unit-03-performance.md");addCard("validation","data-integrity","in-progress");addCard("validation","functional-parity","");addCard("validation","performance","")}]},
  {delay:500,actions:[function(){addFastForward("45")}]},
  {delay:1800,actions:[function(){removeFastForward();addMsg("agent","agent","Data integrity:\n  \u2022 Row counts: 340/340 tables match exactly\n  \u2022 Checksum validation: 100% match on sampled records (1000 per table)\n  \u2022 Foreign key constraints: all satisfied\n  \u2022 Events table: 2,104,837,291 rows \u2014 exact match");updateCard("validation","data-integrity","completed");updateCard("validation","functional-parity","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("30")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: regression-tester. Functional parity:\n  \u2022 All 47 views return identical results\n  \u2022 23 materialized views refresh with same output\n  \u2022 12 functions return identical output\n  \u2022 Recommendation engine queries: output matches 100%\n  \u2022 Text search (pg_trgm): identical result sets after REINDEX");updateCard("validation","functional-parity","completed");updateCard("validation","performance","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("25")}]},
  {delay:1200,actions:[function(){removeFastForward();addMsg("agent","agent","Performance benchmarks:\n  \u2022 Read queries: 8% faster on PG16 (query planner improvements)\n  \u2022 Write throughput: comparable (within 2%)\n  \u2022 Complex joins: 12% faster (incremental sort feature)\n  \u2022 Text search: 5% faster after GIN REINDEX\n\nAll within thresholds. PG16 is actually faster on most workloads.");updateCard("validation","performance","completed");addFile(P+"/knowledge/VALIDATION-REPORT.md")}]},

  // Validation gate - ask
  {delay:800,actions:[function(){addMsg("system","system","Validation stage complete. Review gate: ask.")}]},
  {delay:1500,actions:[function(){addMsg("user","you","Numbers look great. Schedule the production cutover.");addMsg("agent","agent","Advancing to cutover stage.")}]},

  // === CUTOVER ===
  {delay:1000,actions:[function(){activateStage("cutover");addMsg("agent","agent","Entering cutover stage. Hat: cutover-coordinator.\nLoading validation report...");addFile(P+"/stages/cutover/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 validation/validation-report (knowledge/VALIDATION-REPORT.md)");addMsg("agent","agent","Building cutover runbook with go/no-go checkpoints...")}]},
  {delay:800,actions:[function(){addFile(P+"/stages/cutover/units/unit-01-cutover-runbook.md");addFile(P+"/stages/cutover/units/unit-02-rollback-verification.md");addCard("cutover","cutover-runbook","in-progress");addCard("cutover","rollback-verification","")}]},
  {delay:500,actions:[function(){addFastForward("35")}]},
  {delay:1800,actions:[function(){removeFastForward();addMsg("agent","agent","Cutover runbook:\n  Step 1: Enable maintenance mode (owner: platform-team)\n  Step 2: Final WAL replay to sync target (owner: DBA)\n  Step 3: Run pre-checks on PG16 target\n  Step 4: Swap connection strings in config (go/no-go checkpoint)\n  Step 5: Verify all 8 services connect successfully\n  Step 6: Run post-checks and smoke tests\n  Step 7: Disable maintenance mode\n  Step 8: Monitor for 30 minutes (go/no-go checkpoint)\n\nPoint-of-no-return: Step 4. Rollback before that is instant.");updateCard("cutover","cutover-runbook","completed");updateCard("cutover","rollback-verification","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("20")}]},
  {delay:1200,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: rollback-engineer. Rollback procedure tested end-to-end on staging. Restores PG12 service within 3 minutes. Communication plan sent to all 8 downstream service owners.");updateCard("cutover","rollback-verification","completed");addFile(P+"/knowledge/CUTOVER-RUNBOOK.md")}]},

  // Cutover gate - external + await
  {delay:800,actions:[function(){addMsg("system","system","Cutover stage complete. Review gate: external.")}]},
  {delay:800,actions:[function(){addMsg("system","system","Await gate: waiting for maintenance window and DBA sign-off...")}]},
  {delay:1500,actions:[function(){addMsg("system","system","Await resolved \u2014 DBA approved cutover. Maintenance window confirmed.")}]},
  {delay:800,actions:[function(){showCriteriaReview("Cutover",INTENT,["Runbook with sequenced steps and go/no-go checkpoints","Rollback tested: 3-minute restore on staging","All 8 downstream services notified","Point-of-no-return clearly marked at Step 4","Post-cutover monitoring plan: 30-minute watch period"],"external gate")}]},
  {delay:800,actions:[function(){animateCheckmarks()}]},
  {delay:2400,actions:[function(){highlightApproveBtn()}]},
  {delay:1200,actions:[function(){hideReviewOverlay();addMsg("system","system","External review approved. Cutover executed successfully. PG16 serving production traffic.")}]},

  // Complete
  {delay:1200,actions:[function(){completeAllStages();addMsg("agent","agent","All 5 stages complete for migrate-postgresql-12-to-16.\n\nDelivered:\n  \u2022 Assessment: 340 tables, 12 functions, 3 extensions inventoried with risk register\n  \u2022 Mapping: full schema mapping with 2 function fixes and 3 view updates\n  \u2022 Migration: 6 idempotent scripts with dry-run mode and rollback plan\n  \u2022 Validation: 100% data integrity, functional parity, 8% faster reads\n  \u2022 Cutover: runbook executed, PG16 serving production with 0 downtime incidents\n\nMigrated: 1.2TB, 2.1B rows, 340 tables. Intent status: complete.")}]},
  {delay:1500,actions:[function(){overlay.classList.add("visible")}]}
]
};

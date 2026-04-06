var P = ".haiku/intents/q3-product-launch-campaign";
window.HAIKU_DEMO_CONFIG = {
  title: "marketing",
  studio: "marketing",
  stages: ["research","strategy","content","launch","measure"],
  completionText: "All 5 stages passed. q3-product-launch-campaign delivered.",
  steps: [
  // User invokes
  {delay:800,actions:[function(){addMsg("user","you","/haiku:new")}]},
  {delay:1000,actions:[function(){addTyping()}]},
  {delay:800,actions:[function(){removeTyping();addMsg("agent","agent","What do you want to accomplish?")}]},
  {delay:1500,actions:[function(){addMsg("user","you","Q3 product launch campaign for our new analytics dashboard feature")}]},

  // Intent created
  {delay:800,actions:[function(){addTyping()}]},
  {delay:1000,actions:[function(){removeTyping();addMsg("agent","agent","Creating intent: q3-product-launch-campaign...");addFile(P+"/intent.md")}]},
  {delay:800,actions:[function(){addMsg("system","system","Intent created. Studio: marketing. 5 stages: research \u2192 strategy \u2192 content \u2192 launch \u2192 measure")}]},

  // === RESEARCH ===
  {delay:1000,actions:[function(){activateStage("research");addMsg("agent","agent","Entering research stage. Hat: market-researcher.\nWhat\u2019s the target audience for the analytics dashboard?");addFile(P+"/stages/research/state.json")}]},
  {delay:2000,actions:[function(){addMsg("user","you","Product managers and data analysts at mid-market SaaS companies. 200-2000 employees. They\u2019re currently using a mix of Looker, Amplitude, and spreadsheets.")}]},
  {delay:800,actions:[function(){addTyping()}]},
  {delay:1200,actions:[function(){removeTyping();addMsg("agent","agent","Good \u2014 fragmented tooling is a strong pain point to exploit. Decomposing research...")}]},
  {delay:800,actions:[function(){addFile(P+"/stages/research/units/unit-01-audience-segments.md");addFile(P+"/stages/research/units/unit-02-competitive-analysis.md");addFile(P+"/stages/research/units/unit-03-positioning.md");addCard("research","audience-segments","in-progress");addCard("research","competitive-analysis","");addCard("research","positioning","")}]},
  {delay:500,actions:[function(){addFastForward("30")}]},
  {delay:1800,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: audience-analyst. Three audience segments defined:\n  1. Data-Driven PMs: want self-serve insights, hate waiting on analyst requests\n  2. Analytics Engineers: want SQL-native workflows, custom metric definitions\n  3. Exec Stakeholders: want automated reports, trend alerts\n\nPrimary segment: Data-Driven PMs (largest, highest intent).");updateCard("research","audience-segments","completed");updateCard("research","competitive-analysis","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("25")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","Competitive landscape:\n  \u2022 Looker: powerful but expensive, steep learning curve\n  \u2022 Amplitude: product analytics focused, weak on custom metrics\n  \u2022 Mixpanel: self-serve friendly but limited data modeling\n\nGap: none offer embedded analytics + custom metric builder in one tool.");updateCard("research","competitive-analysis","completed");updateCard("research","positioning","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("20")}]},
  {delay:1200,actions:[function(){removeFastForward();addMsg("agent","agent","Positioning opportunity: \u201CThe analytics dashboard you don\u2019t need a data team to use.\u201D Underserved angle: self-serve custom metrics without SQL knowledge.");updateCard("research","positioning","completed");addFile(P+"/knowledge/MARKET-BRIEF.md")}]},

  // Research gate - auto
  {delay:800,actions:[function(){addMsg("system","system","Research complete. Review gate: auto. All criteria met \u2014 advancing.");addMsg("agent","agent","Advancing to strategy stage.")}]},

  // === STRATEGY ===
  {delay:1000,actions:[function(){activateStage("strategy");addMsg("agent","agent","Entering strategy stage. Hat: strategist.\nLoading market brief...");addFile(P+"/stages/strategy/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 research/market-brief (knowledge/MARKET-BRIEF.md)");addMsg("agent","agent","Building messaging framework and channel strategy from research findings...")}]},
  {delay:800,actions:[function(){addFile(P+"/stages/strategy/units/unit-01-messaging-framework.md");addFile(P+"/stages/strategy/units/unit-02-channel-strategy.md");addFile(P+"/stages/strategy/units/unit-03-campaign-goals.md");addCard("strategy","messaging-framework","in-progress");addCard("strategy","channel-strategy","");addCard("strategy","campaign-goals","")}]},
  {delay:500,actions:[function(){addFastForward("35")}]},
  {delay:1800,actions:[function(){removeFastForward();addMsg("agent","agent","Messaging framework draft:\n  Primary value prop: \u201CBuild custom dashboards in minutes, not sprints\u201D\n  Proof points:\n    1. No-code metric builder (vs. SQL-only competitors)\n    2. Real-time data, not overnight batch refreshes\n    3. Embedded sharing \u2014 dashboards live where your team works\n\nTone: confident but approachable. Technical credibility without jargon.\n\nWhat tone adjustments do you want?")}]},
  {delay:2200,actions:[function(){addMsg("user","you","I like the direction. But make it slightly more provocative \u2014 lean into the pain of waiting on data teams. Something like \u201Cstop filing Jira tickets for charts.\u201D")}]},
  {delay:800,actions:[function(){addTyping()}]},
  {delay:1000,actions:[function(){removeTyping();addMsg("agent","agent","Love it. Updated primary hook: \u201CStop filing Jira tickets for charts. Build your own dashboard in 5 minutes.\u201D\nHat: brand-reviewer. Tone check: provocative but professional. Brand-aligned.");updateCard("strategy","messaging-framework","completed");updateCard("strategy","channel-strategy","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("25")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","Channel strategy:\n  \u2022 LinkedIn (PMs + analysts): thought leadership + product demos\n  \u2022 Twitter/X: launch thread + customer testimonial clips\n  \u2022 Email: segmented nurture (3-email sequence per persona)\n  \u2022 Product Hunt: launch day listing\n  \u2022 Blog: deep-dive feature walkthrough + comparison posts");updateCard("strategy","channel-strategy","completed");updateCard("strategy","campaign-goals","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("15")}]},
  {delay:1200,actions:[function(){removeFastForward();addMsg("agent","agent","Campaign goals (SMART):\n  \u2022 1,000 landing page signups in first 2 weeks\n  \u2022 150 Product Hunt upvotes on launch day\n  \u2022 25% email open rate on nurture sequence\n  \u2022 50 qualified demo requests from LinkedIn");updateCard("strategy","campaign-goals","completed");addFile(P+"/knowledge/MESSAGING-FRAMEWORK.md")}]},

  // Strategy gate - ask
  {delay:800,actions:[function(){addMsg("system","system","Strategy stage complete. Review gate: ask.")}]},
  {delay:800,actions:[function(){showCriteriaReview("Strategy",INTENT,["Messaging framework with value prop hierarchy","Provocative tone aligned with brand","Channel strategy maps segments to channels","SMART goals: signups, upvotes, open rate, demos","Brand reviewer validated positioning"],"ask gate")}]},
  {delay:800,actions:[function(){animateCheckmarks()}]},
  {delay:2200,actions:[function(){highlightApproveBtn()}]},
  {delay:1200,actions:[function(){hideReviewOverlay();addMsg("user","you","Approved. Let\u2019s create the content.");addMsg("agent","agent","Advancing to content stage.")}]},

  // === CONTENT ===
  {delay:1000,actions:[function(){activateStage("content");addMsg("agent","agent","Entering content stage. Hat: content-creator.\nLoading messaging framework...");addFile(P+"/stages/content/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 strategy/messaging-framework (knowledge/MESSAGING-FRAMEWORK.md)");addMsg("agent","agent","Creating campaign assets for all channels...")}]},
  {delay:800,actions:[function(){addFile(P+"/stages/content/units/unit-01-landing-page.md");addFile(P+"/stages/content/units/unit-02-email-sequence.md");addFile(P+"/stages/content/units/unit-03-social-posts.md");addFile(P+"/stages/content/units/unit-04-blog-post.md");addCard("content","landing-page","in-progress");addCard("content","email-sequence","");addCard("content","social-posts","");addCard("content","blog-post","")}]},
  {delay:500,actions:[function(){addFastForward("40")}]},
  {delay:1800,actions:[function(){removeFastForward();addMsg("agent","agent","Landing page copy ready:\n  Headline: \u201CStop filing Jira tickets for charts.\u201D\n  Subhead: \u201CBuild custom analytics dashboards in minutes. No SQL. No data team. No waiting.\u201D\n  CTA: \u201CStart your free dashboard\u201D\n  Social proof: 3 customer logos + \u201C2,400 dashboards created in beta\u201D\n\nAddresses 2 objections from audience research: complexity and data team dependency.");updateCard("content","landing-page","completed");updateCard("content","email-sequence","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("30")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","3-email nurture sequence per segment:\n  PMs: pain \u2192 demo video \u2192 case study\n  Engineers: architecture deep-dive \u2192 API docs \u2192 free trial\n  Execs: ROI calculator \u2192 automated reports preview \u2192 custom demo\n\nHat: copy-editor. All emails refined for clarity and CTA consistency.");updateCard("content","email-sequence","completed");updateCard("content","social-posts","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("25")}]},
  {delay:1200,actions:[function(){removeFastForward();addMsg("agent","agent","Social posts ready: 8 LinkedIn posts, 12 tweets, Product Hunt listing copy. Launch thread drafted with 7 tweets.");updateCard("content","social-posts","completed");updateCard("content","blog-post","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("30")}]},
  {delay:1200,actions:[function(){removeFastForward();addMsg("agent","agent","Blog post: \u201CWhy we built a dashboard builder PMs actually want to use\u201D \u2014 2,200 words with embedded demo GIFs and comparison table.");updateCard("content","blog-post","completed");addFile(P+"/knowledge/ASSETS.md")}]},

  // Content gate - ask
  {delay:800,actions:[function(){addMsg("system","system","Content stage complete. Review gate: ask.")}]},
  {delay:1500,actions:[function(){addMsg("user","you","The landing page headline is perfect. Approved.");addMsg("agent","agent","Advancing to launch stage.")}]},

  // === LAUNCH ===
  {delay:1000,actions:[function(){activateStage("launch");addMsg("agent","agent","Entering launch stage. Hat: campaign-manager.\nLoading content assets...");addFile(P+"/stages/launch/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 content/assets (knowledge/ASSETS.md)");addMsg("agent","agent","Coordinating multi-channel launch sequence...")}]},
  {delay:800,actions:[function(){addFile(P+"/stages/launch/units/unit-01-launch-sequence.md");addFile(P+"/stages/launch/units/unit-02-distribution.md");addCard("launch","launch-sequence","in-progress");addCard("launch","distribution","")}]},
  {delay:500,actions:[function(){addFastForward("30")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: channel-coordinator. Launch sequence finalized:\n  T-1 day: Landing page live, tracking verified\n  T-0 morning: Product Hunt listing goes live\n  T-0 +1hr: LinkedIn launch post from company page\n  T-0 +2hr: Twitter launch thread\n  T-0 +4hr: Email blast to segmented lists\n  T+1 day: Blog post published\n  T+3 days: Nurture sequence activated for non-converters");updateCard("launch","launch-sequence","completed");updateCard("launch","distribution","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("20")}]},
  {delay:1200,actions:[function(){removeFastForward();addMsg("agent","agent","All channels activated. Campaign log:\n  \u2022 Landing page: live, UTM tracking confirmed\n  \u2022 Product Hunt: listed, first 20 upvotes in 30 minutes\n  \u2022 LinkedIn: posted, 1,200 impressions in first hour\n  \u2022 Email: sent to 8,400 contacts across 3 segments\n  \u2022 Blog: published, indexed by Google\n\nAll tracking is active.");updateCard("launch","distribution","completed");addFile(P+"/knowledge/CAMPAIGN-LOG.md")}]},

  // Launch gate - ask
  {delay:800,actions:[function(){addMsg("system","system","Launch stage complete. Review gate: ask.")}]},
  {delay:1500,actions:[function(){addMsg("user","you","Everything looks live. Let\u2019s measure.");addMsg("agent","agent","Advancing to measure stage.")}]},

  // === MEASURE ===
  {delay:1000,actions:[function(){activateStage("measure");addMsg("agent","agent","Entering measure stage. Hat: analyst.\nLoading campaign log...");addFile(P+"/stages/measure/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 launch/campaign-log (knowledge/CAMPAIGN-LOG.md)");addMsg("agent","agent","Analyzing performance against campaign goals...")}]},
  {delay:800,actions:[function(){addFile(P+"/stages/measure/units/unit-01-kpi-analysis.md");addFile(P+"/stages/measure/units/unit-02-channel-breakdown.md");addFile(P+"/stages/measure/units/unit-03-recommendations.md");addCard("measure","kpi-analysis","in-progress");addCard("measure","channel-breakdown","");addCard("measure","recommendations","")}]},
  {delay:500,actions:[function(){addFastForward("35")}]},
  {delay:1800,actions:[function(){removeFastForward();addMsg("agent","agent","KPI results (2-week mark):\n  \u2022 Landing page signups: 1,340 / 1,000 goal (134%)\n  \u2022 Product Hunt upvotes: 187 / 150 goal (125%)\n  \u2022 Email open rate: 31% / 25% goal (124%)\n  \u2022 LinkedIn demo requests: 38 / 50 goal (76%) \u2190 below target");updateCard("measure","kpi-analysis","completed");updateCard("measure","channel-breakdown","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("20")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","Channel breakdown:\n  Top performer: Product Hunt (42% of signups, lowest CAC)\n  Surprise: Engineer segment email had 38% open rate (highest)\n  Underperformer: LinkedIn \u2014 high impressions but low conversion to demo requests\n\nLinkedIn issue: posts are getting engagement but CTA is buried. The demo request form requires too many fields.");updateCard("measure","channel-breakdown","completed");updateCard("measure","recommendations","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("15")}]},
  {delay:1200,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: report-writer. Recommendations:\n  1. [High impact] Simplify LinkedIn demo form to 3 fields (projected +40% conversion)\n  2. [Medium] Double down on engineer segment \u2014 create technical webinar series\n  3. [Medium] Run Product Hunt \u201CShip\u201D update to recapture momentum\n  4. [Low] A/B test email subject lines for PM segment (31% open rate has room to grow)");updateCard("measure","recommendations","completed");addFile(P+"/knowledge/PERFORMANCE-REPORT.md")}]},

  // Measure gate - auto
  {delay:800,actions:[function(){addMsg("system","system","Measure stage complete. Review gate: auto. All criteria met.")}]},

  // Complete
  {delay:1200,actions:[function(){completeAllStages();addMsg("agent","agent","All 5 stages complete for q3-product-launch-campaign.\n\nDelivered:\n  \u2022 Research: 3 audience segments, competitive gaps mapped\n  \u2022 Strategy: provocative messaging framework, 5-channel plan, SMART goals\n  \u2022 Content: landing page, 9 nurture emails, 20 social posts, blog post\n  \u2022 Launch: multi-channel activation with tracking verified\n  \u2022 Measurement: 3/4 goals exceeded, 4 data-backed recommendations\n\nTop line: 1,340 signups in 2 weeks (34% over goal). Intent status: complete.")}]},
  {delay:1500,actions:[function(){overlay.classList.add("visible")}]}
]
};

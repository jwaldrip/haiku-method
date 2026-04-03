---
name: dev
description: Working implementation

# Stage context flow
requires: [design-tokens, wireframes, behavioral-specs, acceptance-criteria, data-contracts]
produces: [implementation, tests, deployed-code]

# Execution configuration
unit_types: [backend, api, frontend, devops, infrastructure, observability]
available_workflows: [default, tdd, adversarial, bdd]
default_workflow: default
---

# Dev Stage

Orient all work toward tested, deployable code. Use design direction and product specs from prior stages as guiding context.

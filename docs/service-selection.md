# Power Platform service selection

This page provides a workload-selection model for architects. Choose a service by runtime and interaction characteristics, not by familiarity or by a preference to keep every part of a solution inside one product.

## Executive summary

Start with the primary user or system interaction: application UI, workflow automation, analytics, external web experience, or conversational agent. Then validate data ownership, integration complexity, security, volume, latency, operational support, and ALM. Use a hybrid Power Platform plus Azure/custom design when the workload crosses the practical boundary of the managed low-code runtime.

## Selection principles

1. Choose the product that naturally owns the interaction model.
2. Keep systems of record authoritative unless there is a deliberate migration or replication design.
3. Treat connectors as integration boundaries with external dependency behavior.
4. Use Dataverse when its business data and application-platform capabilities fit the domain.
5. Introduce APIs or pro-code services when integration or computation becomes a reusable domain concern.
6. Do not use a low-code client or workflow as the authoritative security boundary.
7. Validate reliability, performance, security, operations, and experience together instead of optimizing only for delivery speed.

## Service-selection matrix

| Requirement | Primary Power Platform fit | Architecture notes |
| --- | --- | --- |
| Internal business application | Power Apps | Validate UX model, data source, security, delegation, offline needs, and ALM |
| Workflow or approval automation | Power Automate | Validate trigger model, retries, idempotency, concurrency, limits, and failure recovery |
| Analytics and dashboards | Power BI | Validate semantic model ownership, refresh, query path, capacity, and access control |
| External business website | Power Pages | Validate external identity, authorization, Dataverse exposure, web security, and public/partner scale |
| Conversational or agent experience | Copilot Studio | Validate grounding, actions/tools, identity, governance, safety, and observability |
| Transactional business data | Dataverse when fit is strong | Validate domain ownership, capacity, security model, and integration requirements |
| Simple SaaS or Microsoft service integration | Managed connector | Validate authentication, throttling, data policy, and upstream service behavior |
| Complex reusable integration | Enterprise API or service boundary | Centralize domain logic, resilience, protocol mediation, security, and observability |
| High-volume asynchronous integration | Hybrid with Azure or other messaging/runtime services | Keep Power Platform at the business-experience edge if appropriate |
| Specialized compute | Hybrid or custom service | Avoid forcing heavy compute into an interaction or automation runtime not designed for it |

## Power Platform-only workload

A Power Platform-only design is strongest when:

- the interaction model matches a Power Platform product
- data volume and latency are within platform and dependency boundaries
- connector behavior is acceptable
- business logic fits managed platform capabilities
- security can be expressed through supported identity and data controls
- ALM and monitoring requirements can be met with the platform and connected operational tooling

**Trade-off:** the design minimizes custom infrastructure but accepts more SaaS platform constraints.

## Hybrid Power Platform plus Azure or pro-code

Use a hybrid design when one or more responsibilities need a stronger service boundary.

Common reasons include:

- custom compute
- asynchronous messaging
- event processing
- API mediation
- complex authorization
- rate-limit protection
- caching
- specialized storage
- cross-system transaction coordination
- reusable domain logic
- end-to-end tracing across several services

A hybrid design should keep responsibilities clear. Power Platform should not become a thin wrapper around an undocumented set of custom services, and custom services should not duplicate capabilities already provided cleanly by the platform.

**Trade-off:** hybrid architecture adds operational cost, deployment complexity, and more failure domains in exchange for greater control and specialization.

## When Power Platform is a poor architectural fit

Reconsider a Power Platform-first design when the workload fundamentally requires:

- infrastructure or network controls unavailable in the SaaS boundary
- sustained high-throughput event processing
- specialized runtime behavior
- extremely latency-sensitive synchronous paths
- storage semantics that do not fit Dataverse or supported data sources
- a custom user experience whose dominant behavior depends on a pro-code frontend runtime
- a large amount of custom code whose lifecycle is easier to own in a conventional application platform

This is a boundary decision, not a product criticism. A workload can still use Power Platform for administration, workflow, analytics, or adjacent business experiences while core runtime responsibilities live elsewhere.

## Decision path

Use this sequence during architecture review:

1. Identify the primary interaction or automation need.
2. Select the natural Power Platform product.
3. Identify the authoritative data owner.
4. List all synchronous and asynchronous external dependencies.
5. Check security and identity boundaries.
6. Check volume, latency, throttling, and availability constraints.
7. Define environment placement and lifecycle.
8. Define ALM, monitoring, and operational ownership.
9. Move any responsibility that exceeds the managed runtime boundary behind an API, messaging, compute, or storage service designed for it.

The outcome should be a workload architecture, not a product checklist.

## Follow-up architecture reviews

The next service-specific design frontier is Power Apps. Its detailed review should cover canvas versus model-driven applications, delegation, runtime/data access, component strategy, extensibility, offline behavior, performance, and the boundary where pro-code UI or APIs become preferable. Those decisions are intentionally not locked by this initial Overview PR.

## Authoritative references

- [Microsoft Power Platform guidance](https://learn.microsoft.com/en-us/power-platform/guidance/)
- [Power Platform and Copilot Studio Architecture Center](https://learn.microsoft.com/en-us/power-platform/architecture/architecture-center-overview)
- [Power Platform Well-Architected pillars](https://learn.microsoft.com/en-us/power-platform/well-architected/pillars)
- [Application lifecycle management with Power Platform](https://learn.microsoft.com/en-us/power-platform/alm/)

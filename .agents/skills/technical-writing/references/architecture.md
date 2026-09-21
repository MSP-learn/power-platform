# Architecture documentation

Architecture documentation helps a reader reason about system shape and make a change without crossing an unknown boundary.

## Select the view

Choose the smallest view that answers the reader's decision:

- **Context:** the system, its users, external systems, and trust boundaries.
- **Container or service:** deployable units, responsibilities, protocols, and ownership.
- **Component:** important internals and collaboration within one boundary.
- **Data or state:** records, ownership, lifetime, consistency, and movement.
- **Deployment:** runtime placement, network boundaries, scaling, and operational dependencies.
- **Decision:** chosen approach, constraints, alternatives, and consequences.

Name the selected view and its scope. Do not combine unrelated abstraction levels in one diagram or table.

## Cover consequential relationships

Include the parts that change how a reader designs, operates, or troubleshoots the system:

- boundary and out-of-scope systems
- component responsibility and owner
- inputs, outputs, and interface or protocol
- control flow and data flow when they differ
- state ownership and persistence
- authentication, authorization, and trust transitions
- failure propagation, retries, and observability
- deployment, scale, and lifecycle constraints
- important decisions and trade-offs

Omit a category when it has no bearing on the page; do not add empty template sections.

## Evidence standard

Derive names and relationships from implementation, configuration, deployment definitions, tests, or an approved design record. If the implemented state differs from a proposed design, label both and identify which one the diagram represents.

End with the implication the reader needs: what is safe to change, what contract must remain stable, or where to investigate a failure.

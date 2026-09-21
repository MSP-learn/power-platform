# Workflow documentation

A workflow makes action, responsibility, decisions, and state change visible. It should let the reader perform or diagnose the process, not merely name its phases.

## Establish the contract

State the trigger, actor, prerequisites, starting state, expected end state, and systems in scope. Distinguish a human procedure from an automated runtime flow; they need different detail.

## Describe the path

Use numbered steps for an action-oriented procedure. Each step should name the actor, action, affected system or artifact, and observable result when those are not obvious.

For runtime or multi-actor flows, account for:

- decisions and branch conditions
- state transitions and ownership
- synchronous versus asynchronous boundaries
- retries, timeouts, cancellation, and idempotency
- partial failure and compensation
- authorization and approval points
- logs, events, metrics, or records that confirm progress

Keep the happy path contiguous. Put alternative and recovery paths after it unless a warning must appear before a risky action.

## Select a visual

- Use a flow diagram for branching and decision logic.
- Use a sequence diagram for ordered messages across actors.
- Use a state diagram for lifecycle rules and allowed transitions.
- Use a table when the primary question is a compact mapping of state, owner, input, and result.

Follow the diagram reference for any visual. After the workflow, give a concrete success check and the first diagnostic step for the most likely failure.

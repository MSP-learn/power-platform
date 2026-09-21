# Technical breakdowns

A breakdown turns a dense system, feature, or concept into a usable mental model without severing the relationships that make it work.

## Set the frame

Open with the subject, why it matters, the audience, and the boundary of the explanation. Establish the whole before decomposing it.

## Decompose along one axis

Choose the axis that matches the reader's question:

- responsibilities for "what does each part do?"
- lifecycle for "what happens over time?"
- layers for "where does behavior live?"
- data path for "where does information go?"
- decision factors for "which option should I use?"
- failure surface for "where can this break?"

Keep peer sections at the same conceptual level. For each part, explain its responsibility, inputs, outputs, collaborators, and constraint only when relevant.

## Reassemble the model

After the parts, show how they interact through a representative example, trace, or compact diagram. Call out the most important invariant, trade-off, and failure mode. End with the decision or next action the reader can now take.

Use tables for repeated fields across three or more peers. Use prose for causality and nuance. Define unfamiliar terms at first use and link to a glossary or authoritative reference when the definition is shared across pages.

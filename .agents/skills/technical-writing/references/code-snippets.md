# Code snippets and commands

A snippet must be accurate enough to run or intentionally illustrative enough that the boundary is unmistakable.

## Ground the example

Prefer code drawn from the repository or verified against the exact supported API and version. State prerequisites, file location, execution context, inputs, and side effects when they affect the result. Label pseudocode and partial examples explicitly.

## Keep the teaching surface focused

- Put a language on every fenced block.
- Show the smallest complete unit that demonstrates the idea. Around 30 lines is a useful review threshold, not a hard maximum.
- Explain consequential choices before or after the block; comments inside code should clarify intent that the code cannot express.
- When omitting code, use a valid comment or a clearly marked excerpt. Never imply that an excerpt is directly runnable.
- Keep sample names and values consistent across prose, code, output, and diagrams.
- Never include real credentials, tokens, private endpoints, or personal data. Use unmistakable placeholders and say where the value comes from.

## Make success observable

Provide the command or action that exercises the example and the expected signal: output, status, file change, test result, or UI state. Include the likely failure and corrective action when setup or permissions commonly block execution.

Run or compile examples when the environment allows it. If execution is unavailable, perform a syntax and API check and state that runtime validation was not performed.

Use portal-specific preview or embedding fences only when they improve the reader's task and the source still makes sense on GitHub. Follow the MSP Markdown contract for their constraints.

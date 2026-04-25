from agents.base import run_agent

INSTRUCTIONS = """
You are the VIRAL PATTERN ANALYZER for @msj_community.

Your job: break down the exact formulas that make short-form football/performance content
go viral. Not theory — the actual repeatable patterns used by accounts with millions of views.

OUTPUT FORMAT — follow exactly:
Use clear section headers. Under each, use bullet points.
Be precise. Name patterns explicitly. Give 2-sentence max explanations.
"""

TASK = """
Break down the viral system for @msj_community content across these dimensions:

HOOK TYPES (with examples for each):
- Attack hooks (direct challenge to the viewer)
- Curiosity hooks (information gap)
- Contrarian hooks (challenge common belief)
- Direct hooks (no setup, immediate value)
- Identity hooks (speaks to who they are)

VIDEO STRUCTURE PATTERNS:
- 3 structures that work best for this niche (15-60 second format)
- Describe the exact arc of each

PACING AND DELIVERY:
- Sentence length patterns that retain attention
- When to use silence/pause
- Word density per second recommendations

RETENTION TECHNIQUES:
- Open loops (how to set them up)
- Pattern interrupts (when and how to use them)
- Loops/callbacks (how to end where you began)
- Visual vs. verbal tension

WHAT TRIGGERS SAVES vs. SHARES vs. COMMENTS:
- Content types that get saved (utility)
- Content types that get shared (identity)
- Content types that get comments (emotion/debate)

Be specific. Every bullet must be something a creator can implement tomorrow.
"""


def run() -> str:
    return run_agent(INSTRUCTIONS, TASK, max_tokens=3000)

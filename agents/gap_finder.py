from agents.base import run_agent

INSTRUCTIONS = """
You are the GAP FINDER for @msj_community.

Your job: identify the exact content angles, conversations, and formats that NO competitor
is currently owning — and explain why @msj_community is uniquely positioned to claim them.

This is strategic intelligence. Be sharp. Be specific. No filler.

Think like a brand strategist who just audited the entire football performance content space.
"""

TASK = """
Identify the strategic gaps in the football performance content space for @msj_community.

SECTION 1 — CONTENT ANGLES NOBODY IS OWNING
List 7 specific, untapped content angles in the football performance/mindset space.
For each: name the angle, explain why it's a gap, and give one example script concept.

SECTION 2 — MESSAGING WEAKNESSES IN THE COMPETITION
What are 5 things every competitor in this space does wrong or poorly?
For each: name the weakness and explain why @msj_community can exploit it.

SECTION 3 — UNDERSERVED AUDIENCE MOMENTS
What specific moments in a football player's journey is nobody making content about?
List 6 specific moments (e.g., "the week after getting dropped from a squad").
For each: explain why it hits and what @msj_community could say.

SECTION 4 — FORMAT GAPS
What content formats or series structures are missing from this niche entirely?
List 5. For each: describe the format and why it would work for @msj_community.

SECTION 5 — THE ONE UNFAIR ADVANTAGE
What is the single most underutilized competitive edge available to @msj_community right now?
Give one paragraph. Be direct. Make it actionable.
"""


def run() -> str:
    return run_agent(INSTRUCTIONS, TASK, max_tokens=3500)

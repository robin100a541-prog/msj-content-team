from agents.base import run_agent

INSTRUCTIONS = """
You are the COMPETITOR ANALYST for @msj_community.

Your job: identify and dissect the top 5 Instagram/short-form competitors in the football
training and football mindset space. Analyze what makes their content perform and extract
the exact patterns that drive views, saves, and shares.

OUTPUT FORMAT — follow exactly:
- Use bullet points, no long paragraphs
- Be specific: name real content types, real hook styles, real structures
- Keep each bullet under 15 words
- No filler sentences
- Label each competitor clearly
"""

TASK = """
Identify the 5 top competitors to @msj_community across:
- Football training content
- Football mindset/psychology content
- Discipline and performance content

For each competitor analyze:
1. Their most viral content type
2. Their hook style (with examples)
3. Their video structure pattern
4. Their posting cadence
5. What emotional trigger they rely on most

Then add a final bullet section: PATTERNS ACROSS ALL 5 — what every successful account
in this space does that @msj_community must understand.

Be sharp. No fluff. This is intelligence work.
"""


def run() -> str:
    return run_agent(INSTRUCTIONS, TASK, max_tokens=3000)

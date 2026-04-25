from agents.base import run_agent

INSTRUCTIONS = """
You are the TREND ADAPTER for @msj_community.

Your job: take existing scripts or concepts and reformat them for current short-form trends.
You understand what's working RIGHT NOW on Instagram Reels and TikTok in 2024-2025:
- Ultra-fast cuts (every 1-2 seconds)
- No warm-up — value in the first frame
- Single-sentence lines max
- Strong visual direction built into the script
- Comment bait endings
- "Part 2" hooks that create series momentum

You adapt without losing the @msj_community identity. Sharp stays sharp. Just faster.
"""


def run(script: str = "") -> str:
    if script:
        task = f"""
Adapt this script for current short-form trends (faster, shorter, sharper).

ORIGINAL:
---
{script}
---

Output:

TREND-ADAPTED VERSION:

HOOK: [punchy — must work as on-screen text AND spoken]

BODY:
[1 sentence per line, max 6 words each, rapid fire]

PATTERN INTERRUPT: [visual direction OR a sharp pivot line]

ENDING: [comment bait OR "save this" trigger OR part 2 tease]

VISUAL NOTES:
[3 bullet points on how to film/edit this for maximum retention]

FORMAT USED: [name the current trend format applied]
"""
    else:
        task = """
Generate 5 trend-native content concepts for @msj_community.

Each concept should use a different current short-form format:
1. Ultra-fast cut style (POV or talking head)
2. Text-on-screen only (no talking)
3. "This vs That" split comparison
4. Countdown/list format (3 things, 5 things)
5. One-take confessional

For each concept provide:
- FORMAT NAME
- HOOK (max 7 words)
- BODY (rapid-fire lines)
- ENDING
- WHY IT WORKS NOW (1 sentence)
"""
    return run_agent(INSTRUCTIONS, task, max_tokens=2500)

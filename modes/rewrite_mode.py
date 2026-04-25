from agents.base import run_agent

INSTRUCTIONS = """
You are the SCRIPT EDITOR for @msj_community.

Your job: take an existing script and make it significantly better.
You are ruthless about quality. Every word earns its place or gets cut.

REWRITE PROCESS:
1. Diagnose: identify what's wrong (weak hook, slow pacing, generic language, etc.)
2. Rewrite: produce the improved version
3. Explain: briefly note what you changed and why

EDITING STANDARDS:
- Cut any line that doesn't earn its place
- Replace any generic word with a more specific, sharp one
- Tighten pacing — if 3 lines can become 2, make it 2
- Strengthen the hook first — it's the most important element
- Make the ending hit harder
"""


def run(script: str) -> str:
    task = f"""
Rewrite the following script for @msj_community to maximum performance level.

ORIGINAL SCRIPT:
---
{script}
---

Output format:

DIAGNOSIS:
[What's weak about the original — bullet points, max 5]

REWRITTEN SCRIPT:

HOOK: [improved hook]

BODY:
[improved body]

PATTERN INTERRUPT: [improved or added]

ENDING: [improved ending]

WHAT CHANGED:
[3 bullet points explaining key improvements]
"""
    return run_agent(INSTRUCTIONS, task, max_tokens=2000)

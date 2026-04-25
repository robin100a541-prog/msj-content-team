import anthropic
from config import MODEL, BRAND_CONTEXT

_client = None


def get_client() -> anthropic.Anthropic:
    global _client
    if _client is None:
        _client = anthropic.Anthropic()
    return _client


def run_agent(agent_instructions: str, task: str, max_tokens: int = 4096) -> str:
    """
    Run an agent with the shared cached brand context + agent-specific instructions.
    Streams the response and returns the full text.
    """
    client = get_client()

    system = [
        {
            "type": "text",
            "text": BRAND_CONTEXT,
            "cache_control": {"type": "ephemeral"},
        },
        {
            "type": "text",
            "text": agent_instructions,
        },
    ]

    full_text = ""
    with client.messages.stream(
        model=MODEL,
        max_tokens=max_tokens,
        thinking={"type": "adaptive"},
        system=system,
        messages=[{"role": "user", "content": task}],
    ) as stream:
        for text in stream.text_stream:
            print(text, end="", flush=True)
            full_text += text

    print()
    return full_text

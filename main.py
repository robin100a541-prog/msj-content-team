#!/usr/bin/env python3
"""
MSJ COMMUNITY — AI Content Team
@msj_community | Football development · Flow state · Elite mindset
"""

import argparse
import sys
import os

try:
    from rich.console import Console
    from rich.panel import Panel
    from rich.rule import Rule
    from rich.text import Text
    RICH = True
except ImportError:
    RICH = False


console = Console() if RICH else None


def header(title: str, subtitle: str = ""):
    if RICH:
        console.print()
        console.print(Rule(style="white"))
        console.print(Panel(
            f"[bold white]{title}[/bold white]\n[dim]{subtitle}[/dim]" if subtitle else f"[bold white]{title}[/bold white]",
            border_style="white",
            expand=False,
        ))
    else:
        print(f"\n{'='*60}")
        print(f"  {title}")
        if subtitle:
            print(f"  {subtitle}")
        print('='*60)


def section(title: str):
    if RICH:
        console.print()
        console.print(Rule(f"[bold]{title}[/bold]", style="white"))
        console.print()
    else:
        print(f"\n--- {title} ---\n")


def check_api_key():
    if not os.environ.get("ANTHROPIC_API_KEY"):
        print("\nERROR: ANTHROPIC_API_KEY environment variable is not set.")
        print("Set it with: export ANTHROPIC_API_KEY=your_key_here\n")
        sys.exit(1)


def run_full():
    """Run all 5 agents and output the complete content system report."""
    from agents import competitor_analyst, viral_analyzer, psychology_engine, gap_finder, script_generator

    header(
        "MSJ COMMUNITY — AI CONTENT TEAM",
        "Full system analysis running all 5 internal agents"
    )

    section("SECTION 1 — COMPETITOR INTELLIGENCE")
    competitor_analyst.run()

    section("SECTION 2 — VIRAL PATTERN SYSTEM")
    viral_analyzer.run()

    section("SECTION 3 — PSYCHOLOGY ENGINE")
    psychology_engine.run()

    section("SECTION 4 — STRATEGIC GAPS")
    gap_finder.run()

    section("SECTION 5 — SCRIPTS (7 TOTAL)")
    script_generator.run()

    if RICH:
        console.print()
        console.print(Rule(style="white"))
        console.print("[bold white]  Full system report complete.[/bold white]")
        console.print(Rule(style="white"))
    else:
        print("\n" + "="*60)
        print("  Full system report complete.")
        print("="*60)


def run_hooks():
    from modes import hook_mode
    header("HOOK MODE — 20 Hooks for @msj_community")
    hook_mode.run()


def run_rewrite(script_text: str):
    from modes import rewrite_mode
    header("REWRITE MODE — Script Improvement")
    rewrite_mode.run(script_text)


def run_trends(script_text: str = ""):
    from modes import trend_mode
    header("TREND MODE — Current Short-Form Adaptation")
    trend_mode.run(script_text)


def run_calendar():
    from modes import calendar_mode
    header("CONTENT CALENDAR — 7-Day Posting Plan")
    calendar_mode.run()


def run_single_agent(agent_name: str):
    agents = {
        "competitors": ("agents.competitor_analyst", "COMPETITOR ANALYST"),
        "viral":       ("agents.viral_analyzer",    "VIRAL PATTERN ANALYZER"),
        "psychology":  ("agents.psychology_engine",  "PSYCHOLOGY ENGINE"),
        "gaps":        ("agents.gap_finder",         "GAP FINDER"),
        "scripts":     ("agents.script_generator",   "SCRIPT GENERATOR"),
    }
    if agent_name not in agents:
        print(f"Unknown agent '{agent_name}'. Choose: {', '.join(agents.keys())}")
        sys.exit(1)

    module_path, title = agents[agent_name]
    header(title)

    import importlib
    mod = importlib.import_module(module_path)
    mod.run()


def main():
    parser = argparse.ArgumentParser(
        prog="msj",
        description="MSJ Community — AI-Powered Content Team for @msj_community",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
COMMANDS:
  full          Run all 5 agents — complete system report
  hooks         Generate 20 high-performance hooks
  calendar      Build 7-day content calendar
  trends        Generate 5 trend-native content concepts
  agent NAME    Run a single agent (competitors, viral, psychology, gaps, scripts)

  rewrite       Improve a script (paste script when prompted)
  trends        Adapt a script to current trends (paste script when prompted, or leave empty)

EXAMPLES:
  python main.py full
  python main.py hooks
  python main.py calendar
  python main.py trends
  python main.py agent scripts
  python main.py rewrite
        """,
    )

    parser.add_argument(
        "command",
        choices=["full", "hooks", "rewrite", "trends", "calendar", "agent"],
        help="Command to run",
    )
    parser.add_argument(
        "agent_name",
        nargs="?",
        help="Agent name (for 'agent' command): competitors, viral, psychology, gaps, scripts",
    )
    parser.add_argument(
        "--script",
        "-s",
        type=str,
        default="",
        help="Script text for rewrite/trends mode (or use stdin)",
    )

    args = parser.parse_args()
    check_api_key()

    if args.command == "full":
        run_full()

    elif args.command == "hooks":
        run_hooks()

    elif args.command == "calendar":
        run_calendar()

    elif args.command == "trends":
        script = args.script
        if not script and not sys.stdin.isatty():
            script = sys.stdin.read().strip()
        elif not script:
            print("\nPaste your script (press Ctrl+D when done, or leave empty for 5 trend concepts):")
            try:
                lines = []
                while True:
                    line = input()
                    lines.append(line)
            except EOFError:
                script = "\n".join(lines).strip()
        run_trends(script)

    elif args.command == "rewrite":
        script = args.script
        if not script and not sys.stdin.isatty():
            script = sys.stdin.read().strip()
        elif not script:
            print("\nPaste the script to rewrite (press Ctrl+D when done):")
            try:
                lines = []
                while True:
                    line = input()
                    lines.append(line)
            except EOFError:
                script = "\n".join(lines).strip()
        if not script:
            print("No script provided. Use --script 'your script here' or pipe via stdin.")
            sys.exit(1)
        run_rewrite(script)

    elif args.command == "agent":
        if not args.agent_name:
            print("Specify an agent: competitors, viral, psychology, gaps, scripts")
            sys.exit(1)
        run_single_agent(args.agent_name)


if __name__ == "__main__":
    main()

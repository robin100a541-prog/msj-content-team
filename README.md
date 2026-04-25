# MSJ Community — AI Content Team

AI-powered content system for **@msj_community** — football development, flow state, elite mindset.

## Setup

```bash
cd msj_content_team
pip install -r requirements.txt
export ANTHROPIC_API_KEY=your_key_here
```

## Commands

| Command | What it does |
|---|---|
| `python main.py full` | Run all 5 agents — complete system report |
| `python main.py hooks` | Generate 20 scroll-stopping hooks |
| `python main.py calendar` | Build 7-day posting plan |
| `python main.py trends` | 5 trend-native concepts (or adapt a script) |
| `python main.py rewrite` | Rewrite and improve any script |
| `python main.py agent scripts` | Run just the script generator (7 scripts) |
| `python main.py agent competitors` | Run just competitor analysis |
| `python main.py agent viral` | Run just viral pattern analysis |
| `python main.py agent psychology` | Run just the psychology engine |
| `python main.py agent gaps` | Run just the gap finder |

## Rewrite / Trends with a script

```bash
# Paste interactively
python main.py rewrite

# Pass via flag
python main.py rewrite --script "Your script text here"

# Pipe from file
cat my_script.txt | python main.py rewrite

# Adapt a script to current trends
python main.py trends --script "Your script text here"
```

## Internal Agents

1. **Competitor Analyst** — identifies 5 top rivals, extracts what's working
2. **Viral Pattern Analyzer** — hook types, video structures, retention techniques
3. **Psychology Engine** — maps 8 emotional drivers, explains how to activate them
4. **Gap Finder** — uncovers angles nobody else is using
5. **Script Generator** — 7 ready-to-shoot scripts across different psychological angles

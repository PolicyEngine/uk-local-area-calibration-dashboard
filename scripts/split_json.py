"""Split the monolithic calibration_diagnostics.json into per-level files.

Usage:
    python scripts/split_json.py path/to/calibration_diagnostics.json
"""

import json
import sys
from pathlib import Path

OUTPUT_DIR = Path(__file__).resolve().parent.parent / "public" / "data"


def split(src: Path) -> None:
    with open(src) as f:
        data = json.load(f)

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    # Metadata: everything except sample_sizes and errors
    metadata = {
        k: v for k, v in data.items() if k not in ("sample_sizes", "errors")
    }
    _write("metadata.json", metadata)

    # Per-level: sample_sizes + errors
    for level in ("constituency", "local_authority", "country"):
        level_data = {
            "sample_sizes": [r for r in data.get("sample_sizes", []) if r["level"] == level],
            "errors": [r for r in data.get("errors", []) if r["level"] == level],
        }
        _write(f"{level}.json", level_data)


def _write(name: str, obj: dict) -> None:
    path = OUTPUT_DIR / name
    path.write_text(json.dumps(obj))
    size_kb = path.stat().st_size / 1024
    print(f"  {name}: {size_kb:.0f} KB")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python scripts/split_json.py <calibration_diagnostics.json>")
        sys.exit(1)
    split(Path(sys.argv[1]))

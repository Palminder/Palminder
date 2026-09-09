"""Render one scene: python scripts/renders/render.py <scene> [--samples N] [--scale PCT] [--out DIR]"""
import argparse
import importlib
import os
import sys
import time

sys.path.insert(0, os.path.dirname(__file__))
parser = argparse.ArgumentParser()
parser.add_argument("scene")
parser.add_argument("--samples", type=int, default=128)
parser.add_argument("--scale", type=int, default=100)
parser.add_argument("--out", default="public/photos")
args = parser.parse_args()

import lib  # noqa: E402

lib.reset()
mod = importlib.import_module(f"scenes.{args.scene.replace('-', '_')}")
spec = mod.build()  # returns dict(width, height, exposure?)
os.makedirs(args.out, exist_ok=True)
path = os.path.abspath(os.path.join(args.out, f"{args.scene}.jpg"))
t = time.time()
lib.render(path, spec["width"], spec["height"], samples=args.samples, scale=args.scale, exposure=spec.get("exposure", 0.0))
print(f"rendered {path} in {time.time() - t:.0f}s")

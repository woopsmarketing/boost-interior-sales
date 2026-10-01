# master-sales.mp4 — BoostInterior cut (2026-10-01)

`../master-sales.mp4` (= `public/video/master-sales.mp4`) is the 86.6s sales walkthrough re-rendered from
the original capture frames with two changes. Everything else is the original edit, frame for frame
(0:00–1:08.1 differs from the previous file only by encoder noise).

| | before | after |
| --- | --- | --- |
| End card (1:21.1–1:26.6) | **BoostChat** · boostchat.co.kr | **BoostInterior** · by BoostWorks |
| Business-owner screen (1:08.1–1:21.1) | sidebar starts with the platform label "BoostChat" above the tenant name | window framed from the tenant name down (the top 31 CSS px are out of frame) |

The "Powered by boostchat" line under the chat input is part of the real widget and stays (owner decision).

No product pixel is painted over or redrawn: the admin window is cropped, and the end card is the same
composed card with a different brand line.

## Files

- `edl-main-sales.json` — the edit decision list this cut was rendered from. It is the original
  `edl3/edl-main-sales.json` of the capture studio plus `view` on segment "8 business owner: inquiry"
  and a new `image` on segment "9 end card". Paths are the absolute scratchpad paths used at render time.
- `render-endcard.mjs` — renders the end card (`node render-endcard.mjs endcard.png`; needs Playwright and
  `PretendardVariable.woff2` next to it).
- `render_edit.patch` — the change to the capture studio's `render_edit.py`
  (`boost-chat/docs/work/sales-capture-studio-v1/scripts/`). A segment-local `view` used to move the
  screen but not the enlarged insets; they now follow whatever part of the screen the camera shows.

## Re-render

```
python render_edit.py edl-main-sales.json master-sales.mp4
```

The capture frames (`takes/typed-212405`, `admin/take-215209`) live in the capture studio's scratchpad,
not in this repository. Without them the cut cannot be rendered again; a new capture would be needed.

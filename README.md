# Bohra Hijri Calendar - Full Web App

Server-rendered Flask app (not just an API anymore): calendar month view,
prayer times page, qibla page, event management, and location settings,
all with a nav menu.

## Run it

```bash
pip install -r requirements.txt
python run.py
```

Then open **http://127.0.0.1:8000/** in a browser (not `/login` — there is
no login page, this app has no auth/accounts).

## Pages

- `/calendar` — month grid (matches your reference screenshot layout: Hijri
  numerals + Gregorian day, prayer time strip, location line). Click a day
  to see its events below the grid. `?y=&m=` to navigate specific months.
- `/prayer-times-view` — today's times as a plain list
- `/qibla-view` — bearing to Mecca + a static compass diagram (does not
  read your device's live compass sensor — that needs JS/native code, see
  note below)
- `/events-view` — list + add-event form
- `/settings` — set your location (name, lat/lng, UTC offset). Stored in
  the browser session (cookie-based) — not a real per-user account system.
  Refreshing in a different browser resets it to the Mumbai default.

The JSON API from before still exists, moved to `/api/...` (e.g.
`/api/calendar/today`, `/api/prayer-times`) in case you want to hit it
from a future mobile app without scraping HTML.

## Known limitations, stated plainly

- **No authentication.** Anyone who reaches `/events-view` can add events.
  Fine for local/personal use; not fine if you deploy this publicly.
- **Session-only location**, not saved per real user account. Good enough
  for a single-person local app; not good enough for multiple people
  sharing one deployment.
- **Qibla compass is static**, not live. A phone browser can read device
  orientation via the `DeviceOrientationEvent` API, but that requires
  HTTPS and an explicit permission prompt on iOS — not wired up here.
- Same calibration caveats as before: `LEAP_YEARS` in `hijri_calendar.py`
  and `ZUHR_WINDOW_MINUTES` in `prayer_times.py` are still best-effort,
  verify against your official calendar over a few more months.

## Still true from before

This is a Flask **web** app. It does not become an Android/iOS app by
itself. If you want this exact UI wrapped as a phone app, that's either:
- a WebView wrapper pointing at a deployed version of this (fast, but
  limited — no real local notifications, no live compass)
- a proper Flutter or native rebuild reusing the same `/api/...` endpoints,
  with real on-device azaan alarm scheduling and live compass

Say which one when you're ready and I'll build it.

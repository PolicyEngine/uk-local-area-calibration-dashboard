# UK local area calibration dashboard

Interactive dashboard for inspecting the calibration quality of PolicyEngine's UK local area microsimulation weights.

**Live:** https://uk-local-area-calibration-dashboard.vercel.app

## What it shows

- **Sample size tab** — effective sample size (ESS) per area and variable, donor pool counts, and weighted totals
- **Target error tab** — calibration target vs weighted estimate, with percentage error badges
- Filters by geographic level (constituency, local authority, country), category, area, and variable

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to out/
```

## Regenerating data

1. In [`policyengine-uk-data`](https://github.com/PolicyEngine/policyengine-uk-data), run:
   ```bash
   python policyengine_uk_data/datasets/local_areas/calibration_diagnostics.py
   ```
2. Split the JSON for the dashboard:
   ```bash
   python scripts/split_json.py path/to/calibration_diagnostics.json
   ```
3. Commit the updated files in `public/data/` — Vercel auto-deploys on push to `main`.

## License

Code in this repository is released under the [MIT License](LICENSE). Original text and figures are released under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) with attribution to PolicyEngine. Third-party data and materials keep their own terms.

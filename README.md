# Ionic Exclusives — solution mock

The main screen in this repository is the proposed Android-sized Exclusives experience: company search, stock filters, product data upfront, comparison, and mutual fund, managed US portfolio, and stock basket discovery.

## Open the solution

From this directory, run:

```sh
python -m http.server 8767 --bind 127.0.0.1
```

Open **<http://127.0.0.1:8767/>**.

- `index.html` — solution screen layout.
- `screener.css` — mobile styling.
- `screener.js` — captured product data, filters, comparison and interactions.
- `app.html`, `app.js`, `replica-extension.js`, `app-bridge.js` and their styles — supporting portfolio and product screens, including PMS, AIF and SIF. Returning to Exclusives opens the solution screen. The former replica landing URL also redirects to the solution.
- `assets/` — images and icons used by the prototype.

The earlier standalone mock files have been removed. The original local replica remains preserved outside this repository.

## Prototype scope

Product prices, returns, fees and minimums are dated captures. This prototype has no live market feed, brokerage connection, payments or order backend. Some AIF and SIF details were not visible in the captures and remain limited; this is not a verified complete copy of Ionic. Personal contact details have been replaced with demo values.

The three-slide hypothesis deck is [included as a PDF](ionic-exclusives-conversion-hypothesis.pdf).

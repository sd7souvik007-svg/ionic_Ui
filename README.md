## Latest product proposal — 18 October
Open http://127.0.0.1:8767/?v=9 for the locally served mock. The first three slides are product-focused; the fourth is a research appendix with Android-specific evidence and linked sources.

- [PowerPoint](deliverables/Ionic-Exclusives-Final.pptx)
- [PDF](deliverables/Ionic-Exclusives-Final.pdf)
- Upfront US stocks, Funds & baskets, and Private Wealth routes.
- PMS, AIF and SIF remain accessible through their category screens.
- Discovery motion slowed to 4 pixels/second, with pause and reduced motion support.

# Ionic Exclusives — proposed solution

Run the Android-sized mock locally:

~~~sh
python -m http.server 8767 --bind 127.0.0.1
~~~

Open **http://127.0.0.1:8767/?v=9**.

The main screen keeps Ionic's hero, then presents compact stock cards with captured prices and exposure. Two rows move slowly in opposite directions. Pause, search, filters and two-stock comparison work. Product details explain ownership, risk and the steps before a purchase. Mutual funds, managed US portfolios and the stock basket remain available alongside PMS/AIF/SIF catalogues.

## Files
- index.html, screener.css, screener.js: main shell and shared fixtures.
- solution.css, solution.js: refined cards, motion controls and detail flows.
- app.html and supporting replica files: captured portfolio and deeper product screens. Returning to Exclusives opens the proposed solution.
- [Research](RESEARCH.md): sources, limitations and experiment design.
- [Editable final proposal](deliverables/Ionic-Exclusives-Final.pptx): three product slides plus a linked research appendix.
- [PDF sharing copy](deliverables/Ionic-Exclusives-Final.pdf).

Figures are historical captures. No live quote, KYC, payment or investment backend is connected. Some deeper captured screens remain incomplete. This is an interactive product proposal, not a complete production app. The original local replica is preserved outside this repository.

The mock and captured detail screens share an Android device frame. Simulated clock and network banners are removed. Navigation SVGs are reused from the captured clone.

## Final unified Android mock
- Shared 392px device frame across Portfolio, Exclusives and product details; simulated status banners removed.
- Category heroes synchronise with the three tabs and horizontal swipes.
- Private Wealth carries a subtle Flagship badge above its label.
- The Private Wealth catalogue contains all 9 PMS, 3 AIF and 6 SIF offerings in a continuous scroll, with section shortcuts.
- Company marks are stored locally, including Broadcom and Bank of America.
- All 18 specialist product links and Portfolio/Exclusives dimension parity were checked in the browser.

Company marks: Broadcom, Bank of America and Chase SVGs from https://cdn.simpleicons.org/; remaining missing company icons retrieved using Google's favicon service for microsoft.com, tsmc.com, chevron.com and exxon.com. Used solely to identify the companies in the mock.

The Flagship badge sits outside and above Private Wealth. All three category tabs share equal widths, heights and label alignment.

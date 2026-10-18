# Ionic Exclusives — proposed solution

Run the Android-sized mock locally:

~~~sh
python -m http.server 8767 --bind 127.0.0.1
~~~

Open **http://127.0.0.1:8767/**.

The main screen keeps Ionic's hero, then presents compact stock cards with captured prices and exposure. Two rows move slowly in opposite directions. Pause, search, filters and two-stock comparison work. Product details explain ownership, risk and the steps before a purchase. Mutual funds, managed US portfolios and the stock basket remain available alongside PMS/AIF/SIF catalogues.

## Files
- index.html, screener.css, screener.js: main shell and shared fixtures.
- solution.css, solution.js: refined cards, motion controls and detail flows.
- app.html and supporting replica files: captured portfolio and deeper product screens. Returning to Exclusives opens the proposed solution.
- [Research](RESEARCH.md): sources, limitations and experiment design.
- [Editable three-slide proposal](deliverables/Ionic-Exclusives-18-Oct-2026.pptx): linked references and speaker notes.
- [PDF sharing copy](deliverables/Ionic-Exclusives-18-Oct-2026.pdf).

Figures are historical captures. No live quote, KYC, payment or investment backend is connected. Some deeper captured screens remain incomplete. This is an interactive product proposal, not a complete production app. The original local replica is preserved outside this repository.

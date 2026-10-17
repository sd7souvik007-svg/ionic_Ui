# Ionic Wealth UI prototype

This repository contains the static Android-sized prototype currently used for the Ionic Exclusives conversion study. It has two entry points:

- `/` — the proposed Exclusives discovery and stock screener screen.
- `/app.html` — the captured Ionic app replica. Direct category links include `/app.html?section=pms`, `/app.html?section=aif`, and `/app.html?section=sif`.

The replica includes Portfolio, Exclusives, global stocks, mutual funds, stock baskets, and the captured PMS, AIF, and SIF catalogues. Product cards open detail screens where information was captured. The AIF details and several SIF destinations are limited by what was visible in the supplied screenshots and read-only walkthrough. They are not a verified, complete copy of the live app.

## Run locally

This is a static site. From this directory:

```sh
python -m http.server 8766
```

Then open <http://127.0.0.1:8766/> or <http://127.0.0.1:8766/app.html?section=exclusives>.

## Scope and data

All prices, returns, fees, minimums, and portfolio examples are dated capture data, not a live feed. This prototype does not connect to Ionic, Vested, a brokerage account, payments, KYC, or an investment order service. It cannot place an order. Personal contact details in the captured account menu have been replaced with demo values.

The three-slide hypothesis deck is [included as a PDF](ionic-exclusives-conversion-hypothesis.pdf).

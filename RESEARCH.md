# Research behind the first-investment proposal

## Working hypothesis
Among eligible users who imported a portfolio and have not yet transacted, showing a manageable set of comparable products with entry cost, risks and the next required step should increase first unassisted funded investments within seven days.

This is a prediction to test. The product team's reported conversion problem and supplied app screens are the Ionic-specific evidence. No Ionic NPS, scroll-depth distribution, conversion baseline, or causal user study was supplied.

## Evidence and its limits

1. **Attention decreases down a page.** Nielsen Norman Group, *Scrolling and Attention*, 15 April 2018. The study analysed over 130,000 eye fixations from 120 participants on 1920×1080 desktop screens. 74% of viewing time was in the first two screenfuls. This is not a mobile scroll-through rate and not an HNI sample. It supports testing earlier visibility; it does not prove that users stop scrolling after two screens.
   https://www.nngroup.com/articles/scrolling-and-attention/

2. **Larger choice sets can encourage simpler choices.** Sheena Iyengar and Emir Kamenica, *Choice Proliferation, Simplicity Seeking, and Asset Allocation*, Journal of Public Economics 94 (2010), 530–539. Laboratory experiments and records of more than 500,000 employees at 638 institutions linked larger sets to simplicity seeking. The field setting was US retirement plans. This supports a possible mechanism, not an Ionic conversion forecast or a universal rule that fewer products are always better.
   https://business.columbia.edu/sites/default/files-efs/pubfiles/4519/simplicitySeeking.pdf
   DOI: 10.1016/j.jpubeco.2010.03.006

3. **Fee transparency matters to investor trust.** CFA Institute, *The Next Generation of Trust*, 2018. Among 3,127 retail investors across 12 markets, full fee disclosure had 84% importance and 48% satisfaction. This is investor survey evidence about advisers, not a randomized app-design result.
   https://www.cfainstitute.org/about/press-room/2018/cfa-institute-calls-for-universal-disclosure-fee-performance-across-investment-industry

We do not claim that wealthy people will not read, that Ionic has low NPS, or that animation improves conversion. The UI should reduce the work needed to understand an investment while keeping decision-relevant details available.

## Test plan
- Randomize eligible portfolio importers without previous transactions at first Exclusives exposure.
- Compare the current shelves with compact **static** cards. Keep products, availability, eligibility and campaign exposure consistent.
- Primary outcome: first successfully funded investment within seven days, without recorded RM/call/chat assistance. Denominator: all eligible assigned users. Report assisted conversion separately.
- Record category impressions by viewport depth, product opens, comparison, account setup, funding and successful orders. Segment by account readiness and product family.
- Check risk/fee comprehension in usability tasks. Monitor errors, cancellations, support and complaints.
- Establish baseline and minimum detectable effect before setting sample size or duration. Report uncertainty; no uplift is claimed in advance.
- Test opposing card motion against the static version separately. More taps alone are insufficient.

## Prototype
The main experience uses ten historical US-stock fixtures already present in the captured prototype. It exposes historical dates, full-share USD prices and separate fractional-order minimums. There is no live feed or order submission.
Motion runs at 9 CSS pixels per second in opposite directions, with a pause control, pause on interaction, hover/focus pause, and reduced-motion support. Search and filtered results are stationary.


## Revision: Android evidence and upfront flagship access
The current mock uses three routes directly below the hero: US stocks, Funds & baskets, and Flagship (PMS/AIF/SIF). Each switches the visible catalogue. The two stock rows move at 4 CSS px/second, previously 9, with pause and reduced-motion support.

### Primary Android study
Haverkamp et al., published online 2022, Reading and Writing 36 (2023), 1589–1608: https://doi.org/10.1007/s11145-022-10328-9
145 Norwegian students read informational text on Samsung Galaxy A02s phones or Lenovo tablets, both Android 10. Paging led to more strategic backtracking than scrolling; better integrated understanding was a tendency. This supports investigating the effort of revisiting information, not a proven conversion effect or an abandonment percentage. No iOS-specific scroll-depth threshold was established. The earlier desktop 74% figure is not used as mobile evidence in the revised deck.

The main three slides now cover the product problem, the three upfront routes, and the decision flow. Slide four holds the hypothesis, research links and limitations. The claim that wealthy users do not read, and low Ionic NPS, remain unsupported. Measure the proposed funnel by OS and account readiness before claiming improvement.

Current deliverables: deliverables/Ionic-Exclusives-Final.pptx and deliverables/Ionic-Exclusives-Final.pdf.


## AI deep dive concept
Added a source-linked explanation for each of the ten displayed stocks and three mutual funds. Company explanations cover the business, potential strengths, risks and stated direction. Fund explanations cover the mandate, exposure, risks and costs to verify. Official company filings and AMC documents are linked inside the preview; full source URLs are stored in ai-research-data.js.

This mock uses prepared examples, identified in the source panel and PDF. It does not call a live model, predict returns or assess personal suitability. Its conversion impact is an additional hypothesis. A live service would need approved-source retrieval, timestamps, answer evaluation and clear handling of missing facts. Test comprehension and first unassisted investments separately from the layout and motion changes.

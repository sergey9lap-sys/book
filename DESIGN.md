---
name: Читаем со вкусом
description: Книжные путешествия, бумага и настоящий общий стол
colors:
  forest: "#363e2e"
  ink: "#232f20"
  paper: "#f6f0e2"
  gold: "#e2b960"
  action: "#852844"
rounded:
  action: "10px"
components:
  button-primary:
    backgroundColor: "{colors.action}"
    textColor: "{colors.paper}"
    rounded: "{rounded.action}"
    width: "288px"
    height: "56px"
---

## Overview

19.10.2026: photo viewer extends the existing photos without replacing assets,
copy, layout, form or payment links. Applies to main-page live photos, passport,
France illustration and Italy archive; excludes logos, decorative album covers,
hero art and video posters. The native modal dialog uses a dark forest scrim
rgb(18 24 15 / .96), backdrop .8, 8px image radius, 48px close control. Originals
are displayed uncropped; larger 1200 variants load only on request. Entry uses
280ms scale(.96) and opacity with existing --ease; exit 180ms. Keyboard is instant,
reduced motion uses opacity only. Escape, background click, focus restoration and
scroll lock are implemented. Main page checked at desktop and 390px; 17 tests pass.
The image without src lives only in a closed dialog and receives src before opening.
Aeza deployment is a separate manual update after pushing the repository.

Existing visual authority is public/styles.css and the approved book landing.
The thank-you page extends this world, not a new brand. A paper invitation sits
on the forest background with the original gold mark and existing France illustration.

## Colors

Forest surrounds paper; ink carries reading. Gold belongs to the original brand.
Raspberry is reserved for the next action; utility links remain understated.

## Typography

Prata for titles and short editorial phrases; Manrope for copy and controls.
Self-hosted assets are inherited from the landing. Bind short Russian prepositions
without creating oversized nonbreaking groups on a narrow screen.

17.10.2026: the hero invitation “Путешествуем по странам…” uses Prata 400,
matching the ingredients above it, with explicit black text. Its wording and the
original book image are unchanged. On the same date the user rejected the Google
Forms embed: #join now keeps a compact paper invitation, short explanation and one
shared raspberry CTA, “Заполнить анкету участника”. It opens the supplied form in a
new tab with noopener/noreferrer. No iframe, fixed-height form area or Google
assets are loaded inside the landing. Google may still require sign-in on its own
page; do not claim anonymous submission. Exact black for the hero phrase remains
user-requested.
Source mapping: all nine existing sections, original media, two payment forms and
offer links remain; only #join's registration UI is replaced. Local automated
tests: 15 passed. Mobile 320/390 and desktop 1440 checked; no horizontal overflow.
No registration was submitted and no Google settings changed. Version b1b9f25 was
published and checked live before this follow-up; button-only deployment is pending.

## Layout

17.10.2026 follow-up: at <=700px, #join reads introduction, participant form card,
then club subscription information. At desktop the club text stays below the intro
in the left column and the form stays on the right. At 701–900px the previous
single-column intro/club/form order is retained. No copy or form URL changed.

The thank-you route has an 1120px maximum paper spread, message left and image
right. At 700px and below it becomes a single column, action before image.
No fixed-height clipping; meeting information and footer remain reachable by scroll.

## Elevation & Depth

Existing raster paper texture and a soft downward shadow create material depth.
The illustration rests inside a slightly turned paper photo mount.

## Shapes

CTA retains the shared geometry. The spread and photo edges have modest,
consistent curves; do not approximate the original logo.

## Components

One primary Telegram invitation, ordinary current-window link without payment
parameters. Copy invitation is a secondary utility, progressive enhancement only.
No automatic redirect or fake verified-payment state. Keyboard focus is visible.

## Do's and Don'ts

- Preserve existing approved landing content, assets and invoice amounts.
- Do not treat a public thank-you URL as authorization or payment confirmation.
- Do not automatically send users into Telegram while they are reading.
- Keep the copy fallback and no-referrer policy.

Reviewed 16.10.2026: fresh review disposition ship at the new-page scope;
desktop and overlapping 320px mobile captures validated. Physical iPhone checkout
remains for the user's end-to-end test; no payment was conducted by the agent.

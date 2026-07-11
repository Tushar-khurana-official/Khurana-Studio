---
name: Khurana Studio polish spec
description: 24-item luxury polish pass applied to Khurana Studio photography site — key decisions and constraints
---

## Rule
Do NOT redesign. Only improve polish, spacing, animations, typography, responsiveness, and premium feel.

## What was implemented
- **Navbar**: Always-dark glass (`rgba(18,18,18,.20)`, `backdrop-blur(18px)`). Darkens on scroll to `rgba(12,12,12,.72)`. Active page has Framer Motion `layoutId` underline. Mobile menu is full-screen dark overlay with staggered link entrance.
- **Hero**: `clamp(56px,8vw,110px)` font-size, `line-height:0.92`, `letter-spacing:-2px`. Overlay `linear-gradient(rgba(0,0,0,.35),rgba(0,0,0,.55))`. Extra eyebrow + more breathing room between elements.
- **Custom cursor**: Dual circle (tight inner dot + loose outer ring) using `useMotionValue` + `useSpring`. Scales on hover over interactive elements. Hidden on touch devices via `useIsMobile`. `cursor: none !important` applied via `@media (pointer: fine)` in CSS.
- **Loading screen**: Added "KHURANA STUDIO" subtitle + animated progress bar below "KS".
- **Testimonials**: Glass card (`rgba(255,255,255,0.62)` + `backdrop-blur(12px)`), large `"` quotation mark top-right, stars before review text, divider before avatar, pill pagination dots.
- **Footer**: Back-to-top button, animated link hover with expanding line, newsletter subscribe state, contact snippet in footer.
- **About**: Stats updated to Years Experience / Projects Completed / Happy Clients / Awards Received (24). Improved spacing and image hover zoom.
- **Services section**: Category tag on image hover, `fallbackSrc` for service images.
- **Portfolio preview**: Keyboard nav (←→ Esc) in lightbox, caption moved to bottom-right of cards, keyboard hint shown in lightbox.
- **FAQ**: Numbered questions, simplified heading, better spacing.
- **Instagram**: Follow button CTA, icon-circle around Instagram icon, "View Post" hover text.
- **CSS**: `cursor:none` on `pointer:fine` devices, `.hide-scrollbar`, `.glass-card` utility, selection style, Swiper pagination fix.

## Why cursor is always-dark glass navbar
Photography luxury sites (Leica, Sony Alpha) use persistent dark glass so the nav doesn't fight with editorial images. Text color is always white. Works because all hero images are dark enough.

## Image fallback pattern (locked in)
Every `ImageWithFallback` call on a list page must pass both `src={getXImage(dbUrl, idx)}` AND `fallbackSrc={getXImage(undefined, idx)}` to get distinct per-item fallbacks. Without `fallbackSrc`, all 404s collapse to `GENERIC_FALLBACK`.

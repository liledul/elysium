# Elysium Wealth Management - Styling Guide

This guide outlines the core styling principles and component styles for the Elysium Wealth Management website to ensure consistency, unity, and simplicity across the design.

## I. Core Principles

### 1. Color Palette

_(To be reviewed and finalized based on `styles.css`)_

- **Primary:** `var(--primary)` (#8b381e)
- **Primary Light:** `var(--primary-light)` (#b25942)
- **Primary Dark:** `var(--primary-dark)` (#6a2a17)
- **Background:** `var(--background)` (#fffcf7)
- **Text:** `var(--text)` (#262626)
- **Text Light:** `var(--text-light)` (#666666)
- **Off-White:** `var(--off-white)` (#f7f2eb)
- **White:** `var(--white)` (#ffffff)
- **Gold:** `var(--gold)` (#d4b982)
- **Gold Light:** `var(--gold-light)` (#e5d4aa)
- **Gold Dark:** `var(--gold-dark)` (#bfa05e)
- **Subtle Background:** `var(--subtle-bg)` (#f9f5ef)
- **Dark Background:** `var(--dark-bg)` (#1a1a1a)
- **Gold Gradient:** `var(--gold-gradient)`

### 2. Typography

_(To be reviewed and finalized based on `styles.css`)_

- **Serif Font:** `var(--font-serif)` ('EB Garamond', serif) - Used for headings, special text.
- **Sans-serif Font:** `var(--font-sans)` ('Montserrat', sans-serif) - Used for body text, UI elements.

#### Global Styles:

- **Body:** `font-family: var(--font-sans); color: var(--text); line-height: 1.7; font-weight: 300;`
- **Paragraphs (`p`):**
  - Desktop: `font-size: 1.1rem; margin-bottom: var(--spacing-md);` (Current)
- **Headings (`h1`-`h6`):**
  - `font-family: var(--font-serif); font-weight: 400; line-height: 1.2;` (Current)
  - `h1`: Desktop `5.5rem`, Mobile `@media (max-width: 768px)`: `2.7rem` (Current)
  - `h2`: Desktop `3.5rem`, Mobile `@media (max-width: 768px)`: `2.2rem` (Current)
  - `h3`: Desktop `2rem` (Current)
  - ... (others to be documented)

### 3. Spacing

_(To be reviewed and finalized based on `styles.css`)_

- `--spacing-xs: 0.5rem;`
- `--spacing-sm: 0.85rem;`
- `--spacing-md: 1.75rem;`
- `--spacing-lg: 3.5rem;` (Desktop), `3rem` (`@media (max-width: 992px)`)
- `--spacing-xl: 7rem;` (Desktop), `5rem` (`@media (max-width: 992px)`)
- `--spacing-xxl: 10rem;`

### 4. Borders & Shadows

- **Default Border Radius:** `var(--border-radius)` (0px)
  - _Proposal for cards/elements: Consider a consistent small radius, e.g., `2px` or `4px`, or keep `0` for sharp edges. For maximum simplicity, `0` is fine if used everywhere._
- **Default Box Shadow:** `var(--box-shadow)` (`0 20px 60px rgba(0, 0, 0, 0.04)`)
  - _Proposal for cards: Use this consistently for all cards._

## II. Component Styles

### 1. Cards (`.service-card`, `.principle`, `.distinction`)

This section aims to unify the styling for all card components.

#### A. General Card Container (Desktop)

| Property      | Current `.service-card`           | Current `.principle`                            | Current `.distinction`           | Proposed Unified Style                      | Notes                                                                                                 |
| ------------- | --------------------------------- | ----------------------------------------------- | -------------------------------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Padding       | `var(--spacing-lg)` (3.5rem)      | `48px` (3rem)                                   | `var(--spacing-lg)` (3.5rem)     | `var(--spacing-lg)` (3.5rem)                | Use consistent spacing variable.                                                                      |
| Background    | `var(--white)`                    | `var(--white)`                                  | `var(--white)`                   | `var(--white)`                              | Consistent.                                                                                           |
| Box Shadow    | `var(--box-shadow)`               | `0 20px 40px rgba(0,0,0,0.03)`                  | `var(--box-shadow)`              | `var(--box-shadow)`                         | Unify to the standard variable.                                                                       |
| Border        | `1px solid rgba(212,185,130,0.1)` | `border-top: 3px solid transparent` (for hover) | `1px solid rgba(139,56,30,0.05)` | `1px solid rgba(212,185,130,0.1)` (example) | Unify border color & style (e.g., a subtle gold-tinted border). Or no border if shadow is sufficient. |
| Border Radius | `var(--border-radius)` (0)        | `2px`                                           | `var(--border-radius)` (0)       | `var(--border-radius)` (0)                  | Let's use `0` for now for simplicity, matching root.                                                  |

#### B. Card Load Animation (Desktop - via `.visible .card-type`)

| Property      | Current `.service-card`                               | Current `.principle` (effective)            | Current `.distinction`                                | Proposed Unified Style                                                               | Notes                                              |
| ------------- | ----------------------------------------------------- | ------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------ | -------------------------------------------------- |
| Initial State | `opacity: 0; transform: translateY(30px);`            | `opacity: 0; transform: translateY(30px);`  | `opacity: 0; transform: translateY(30px);`            | `opacity: 0; transform: translateY(30px);`                                           | Consistent.                                        |
| Transition    | `opacity 0.8s ease, transform 0.8s cubic-bezier(...)` | Needs clarification, may use general `0.3s` | `opacity 0.6s ease, transform 0.8s cubic-bezier(...)` | `opacity 0.8s ease, transform 0.8s cubic-bezier(0.19, 1, 0.22, 1); Staggered delays` | Unify timing, easing. Use `nth-child` for stagger. |

#### C. Card Hover Animation (Desktop)

| Property       | Current `.service-card`                                                          | Current `.principle`                                                    | Current `.distinction`              | Proposed Unified Style                                                          | Notes                                                           |
| -------------- | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| Transform      | `translateY(-5px)`                                                               | `translateY(-8px)`                                                      | `translateY(-8px)`                  | `translateY(-5px)`                                                              | Unify lift amount for subtlety.                                 |
| Box Shadow     | `0 25px 70px rgba(0,0,0,0.07)`                                                   | `0 30px 60px rgba(0,0,0,0.07)`                                          | `0 25px 70px rgba(0,0,0,0.07)`      | `0 25px 70px rgba(0,0,0,0.07)`                                                  | Unify shadow.                                                   |
| Unique Effects | `::before` gold line animates up left side                                       | `border-top-color: var(--gold)`                                         | None                                | `::before` element, gold line animates up left side (height 0 to 100%)          | Unified hover accent. Requires consistent pseudo-element setup. |
| Transition     | `var(--transition)` (all 0.3s ease) for base. `height 0.4s ease` for `::before`. | `transform 0.3s ease, box-shadow 0.3s ease, border-top-color 0.3s ease` | `var(--transition)` (all 0.3s ease) | `all 0.3s ease` (for base properties); `height 0.4s ease` (for `::before` line) | Consistent transition timing.                                   |

#### D. Card Typography (Desktop)

**Card Headings (`h3`)**
| Property | Current `.service-card h3` | Current `.principle h3` | Current `.distinction h3` | Proposed Unified Style | Notes |
|-----------------|-----------------------------------------|---------------------------------------------|------------------------------------|---------------------------------------|-------|
| Font Size | `2rem` (global) | `2rem` (global) | `2rem` (global) | `2rem` | Consistent. |
| Color | `var(--primary)` | `var(--primary)` | `var(--primary)` | `var(--primary)` | Consistent. |
| Margin Bottom | `var(--spacing-sm)` | `var(--spacing-md)` | `var(--spacing-sm)` | `var(--spacing-sm)` | Unify. |
| Padding Bottom | `var(--spacing-xs)` | `var(--spacing-sm)` (plus `::after` padding) | `var(--spacing-sm)` | `var(--spacing-xs)` | Unify. |
| Decoration | None | `::after` gold line below text | None | Remove unique decorations. OR a very subtle, consistent one if needed. | For simplicity, remove. |

**Card Paragraphs (`p`)**
| Property | Current `.service-card p` | Current `.principle p` | Current `.distinction p` | Proposed Unified Style | Notes |
|-----------------|--------------------------------------|-----------------------------------|-------------------------------------|-----------------------------------|-------|
| Font Size | `1.1rem` | `1.05rem` | `1.1rem` (line-height from body) | `1.05rem` | Unify for refined look. |
| Line Height | `1.6` | `1.7` | `1.7` (body default) | `1.6` | Unify for consistency. |
| Color | `var(--text-light)` | `var(--text-light)` | `var(--text-light)` | `var(--text-light)` | Consistent. |
| Margin Bottom | `0` | `0` | `0` | `0` | Consistent. |

#### E. Card Styles (Mobile - `@media (max-width: 768px)`)

_These are largely unified from previous steps and are now in `styles.css`._

- **Padding:** `1.5rem` for all.
- **Width/Max-width:** `width: 100%; max-width: 450px; margin-left: auto; margin-right: auto;` for all.
- **h3 Font Size:** `1.35rem` for all.
- **p Font Size:** `0.9rem`, `line-height: 1.5` for all.

#### F. Specific Card Type Unification Notes

**`.distinction` Card Internal Layout**
| Property | Current `.distinction` | Proposed Unified Style | Notes |
|-------------------|----------------------------------------------------------|-----------------------------------------------------------|-----------------------------------------------------------------------------|
| Flex Align Items | `align-items: center` | `align-items: flex-start` | To align content (icon, h3, p) to the start (left). |
| Text Align | `text-align: center` | `text-align: left` (or allow natural default block behavior) | To left-align text within `h3` and `p`. |
| Icon Margin | `.distinction-icon`: `margin: 0 auto var(--spacing-md)` | `.distinction-icon`: `margin-bottom: var(--spacing-md)` | To position icon at the top-left, similar to `.service-icon`. |

---

_(This guide will be expanded to cover other sections like General Section Styling, Buttons, Forms, Navigation, Footer, etc.)_

## III. General Section & Page Element Styles

### 1. Section Styling (`<section>`, `.section-header`, etc.)

**A. Main `<section>` Tag**
| Property | Current Desktop | Current Mobile (`@media (max-width: 992px)`) | Proposed Unified Style (Desktop) | Proposed Unified Style (Mobile) | Notes |
|------------------|-----------------------------------------------------|-----------------------------------------------|----------------------------------------------|----------------------------------------------|------------------------------------------------------------------------------------------------------|
| Padding | `var(--spacing-xl) 0` (7rem 0) | `var(--spacing-lg) 0` (3rem 0) | `var(--spacing-xl) 0` | `var(--spacing-lg) 0` | Seems consistent. `var(--spacing-xl)` changes at 992px. |
| Min Height | `90vh` (general), `100vh` (`.full-height`) | `auto` (general), `90vh` (`.full-height`) | `90vh` (general), `100vh` (`.full-height`) | `auto` (general), `90vh` (`.full-height`) | Current logic is reasonable. |
| Load Animation | `opacity: 0; transform: translateY(30px);` visible: `opacity 1s ease, transform 1s cubic-bezier(...)` | Same | `opacity: 0; transform: translateY(30px);` | `opacity: 0; transform: translateY(30px);` | Transition: `opacity 1s ease, transform 1s cubic-bezier(0.19, 1, 0.22, 1)` for `.visible` sections. Consistent. |

**B. Section Container (`section .container`)**
| Property | Current Desktop | Current Mobile (`@media (max-width: 992px)`) | Proposed Unified Style (Desktop) | Proposed Unified Style (Mobile) | Notes |
|------------------|---------------------------------------------------|----------------------------------------------|--------------------------------------------|--------------------------------------------|----------------------------------------------|
| Padding | `var(--spacing-lg) var(--spacing-md)` (3.5rem 1.75rem) | `var(--spacing-md) var(--spacing-sm)` (1.75rem 0.85rem) | `var(--spacing-lg) var(--spacing-md)` | `var(--spacing-md) var(--spacing-sm)` | Spacing variables change, seems fine. |
| Min Height | `calc(90vh - var(--spacing-xl) * 2)` | `auto` | `calc(90vh - var(--spacing-xl) * 2)` | `auto` | Consistent with section height logic. |

**C. Section Header (`.section-header`)**
| Property | Current Desktop | Current Mobile | Proposed Unified Style (Desktop) | Proposed Unified Style (Mobile) | Notes |
|------------------|---------------------------------|----------------|----------------------------------|---------------------------------|-----------------------------------------------------------------------|
| Text Align | `center` | `center` | `center` | `center` | Consistent. |
| Margin Bottom | `var(--spacing-xl)` (7rem) | `var(--spacing-xl)` (5rem at 992px) | `var(--spacing-xl)` | `var(--spacing-xl)` | Spacing variable changes, seems fine. |

**D. Section Subtitle (`.section-subtitle`)**
| Property | Current Desktop | Current Mobile | Proposed Unified Style (Desktop) | Proposed Unified Style (Mobile) | Notes |
|------------------|-------------------------------------------------|----------------|----------------------------------|---------------------------------|-------------------------------------|
| Font Family | `var(--font-sans)` | `var(--font-sans)` | `var(--font-sans)` | `var(--font-sans)` | Consistent. |
| Font Size | `0.9rem` | `0.9rem` | `0.9rem` | `0.9rem` | Consistent. |
| Text Transform | `uppercase` | `uppercase` | `uppercase` | `uppercase` | Consistent. |
| Letter Spacing | `0.2em` | `0.2em` | `0.2em` | `0.2em` | Consistent. |
| Color | `var(--gold)` | `var(--gold)` | `var(--gold)` | `var(--gold)` | Consistent. |
| Margin Bottom | `var(--spacing-sm)` | `var(--spacing-sm)` | `var(--spacing-sm)` | `var(--spacing-sm)` | Consistent. |

**E. Section Decoration (`.section-decoration`)**
| Property | Current Desktop | Current Mobile | Proposed Unified Style (Desktop) | Proposed Unified Style (Mobile) | Notes |
|------------------|---------------------------------|----------------|----------------------------------|---------------------------------|--------------------------------------------------------------------------------------------------------|
| Width / Height | `80px` / `1px` | `80px` / `1px` | `80px` / `1px` | `80px` / `1px` | Consistent. |
| Background | `var(--gold-gradient)` | `var(--gold-gradient)` | `var(--gold-gradient)` | `var(--gold-gradient)` | Consistent. |
| Margin | `var(--spacing-md) auto 0` | `var(--spacing-md) auto 0` | `var(--spacing-md) auto 0` | `var(--spacing-md) auto 0` | Consistent. |
| `::before` Dot | `8px` diameter, `var(--gold)` bg | Same | Same | Same | Consistent. Appears to be well-standardized. |

**F. Section Introduction (`.section-intro`)**
| Property | Current Desktop | Current Mobile (`@media (max-width: 480px)`) | Proposed Unified Style (Desktop) | Proposed Unified Style (Mobile `480px`) | Notes |
|------------------|-----------------------------------------------|----------------------------------------------|------------------------------------|-----------------------------------------|----------------------------------------------------------------------------------|
| Font Size | `1.5rem` | `1.1rem` | `1.5rem` | `1.1rem` | Consistent reduction for small screens. |
| Max Width | `900px` | `900px` (inherited) | `900px` | `900px` | Consistent. |
| Margin | `0 auto var(--spacing-xl)` | `0 auto var(--spacing-xl)` (effectively 5rem at 992px) | `0 auto var(--spacing-xl)` | `0 auto var(--spacing-xl)` | Consistent. Spacing var changes. |
| Line Height | `1.6` | `1.6` (inherited) | `1.6` | `1.6` | Consistent. |
| Font Family | `var(--font-serif)` | `var(--font-serif)` | `var(--font-serif)` | `var(--font-serif)` | Consistent. |
| Load Animation | `opacity:0; transform:translateY(20px);` visible: `var(--transition-slow)` | Same | Same | Same | Consistent. `transition-delay: 0.2s` for `.visible .section-intro` is also good. |

_Overall, general section styling seems quite consistent already. No major unification actions proposed here other than ongoing vigilance._

### 2. Buttons (`.btn-primary`, `.nav-cta`)

**A. Primary Button (`.btn-primary`)**
| Property | Current Desktop | Current Mobile (`@media (max-width: 768px)` for `.nav-links .nav-cta`) | Proposed Unified Style (Desktop) | Proposed Unified Style (Mobile) | Notes |
|-----------------|------------------------------------------------------|--------------------------------------------------------------------|---------------------------------------------|------------------------------------------|------------------------------------------------------------------------------------------------------|
| Display | `inline-block` | `block` (implicitly via width 80% in nav) | `inline-block` | `inline-block` (default) | Nav CTA on mobile is full width, which is fine. Standard buttons should remain inline-block. |
| Padding | `1.2rem 2.5rem` | Nav CTA: `0.8rem 1.5rem` | `1.2rem 2.5rem` | `1rem 2rem` (proposal for general mobile button) | Standardize mobile button padding, Nav CTA can be specific. |
| Font Size | `0.9rem` | `0.9rem` (Nav CTA likely inherits or is similar) | `0.9rem` | `0.9rem` | Consistent. |
| Font Weight | `500` | `500` | `500` | `500` | Consistent. |
| Letter Spacing | `0.05em` | `0.05em` | `0.05em` | `0.05em` | Consistent. |
| Text Transform | `uppercase` | `uppercase` | `uppercase` | `uppercase` | Consistent. |
| BG Color | `var(--primary)` | `var(--primary)` | `var(--primary)` | `var(--primary)` | Consistent. |
| Text Color | `var(--white)` | `var(--white)` | `var(--white)` | `var(--white)` | Consistent. |
| Border Radius | `var(--border-radius)` (0px) | `var(--border-radius)` (0px) | `var(--border-radius)` (0px) | `var(--border-radius)` (0px) | Consistent. |
| Box Shadow | `0 5px 15px rgba(139,56,30,0.15)` | `0 5px 15px rgba(139,56,30,0.15)` (Nav CTA similar) | `0 5px 15px rgba(139,56,30,0.15)` | `0 5px 15px rgba(139,56,30,0.15)` | Consistent. |
| Transition | `all 0.3s ease` | `all 0.3s ease` | `all 0.3s ease` | `all 0.3s ease` | Consistent. |
| **Hover State** | | | | | |
| BG Color | `var(--primary-dark)` | `var(--primary-dark)` | `var(--primary-dark)` | `var(--primary-dark)` | Consistent. |
| Transform | `translateY(-2px)` | `translateY(-2px)` | `translateY(-2px)` | `translateY(-2px)` | Consistent. |
| Box Shadow | `0 8px 25px rgba(139,56,30,0.2)` | `0 8px 25px rgba(139,56,30,0.2)` | `0 8px 25px rgba(139,56,30,0.2)` | `0 8px 25px rgba(139,56,30,0.2)` | Consistent. |
| **Active State**| | | | | |
| Transform | `translateY(0)` | `translateY(0)` | `translateY(0)` | `translateY(0)` | Consistent. |
| Box Shadow | `0 4px 12px rgba(139,56,30,0.1)` | `0 4px 12px rgba(139,56,30,0.1)` | `0 4px 12px rgba(139,56,30,0.1)` | `0 4px 12px rgba(139,56,30,0.1)` | Consistent. |

**B. Navigation CTA (`.nav-cta`) - Inherits from `.btn-primary` for some aspects**
| Property | Current Desktop | Current Mobile (`@media (max-width: 768px)`) | Proposed Unified Style (Desktop) | Proposed Unified Style (Mobile) | Notes |
|-----------------|-------------------------------|----------------------------------------------|----------------------------------|---------------------------------|-------------------------------------------------------------------------------------------|
| Padding | `0.6rem 1.5rem` | `0.8rem 1.5rem` | `0.6rem 1.5rem` | `0.8rem 1.5rem` | Specific padding values are fine as it's a unique button placement. Consistent otherwise. |
| Box Shadow | `0 4px 15px rgba(139,56,30,0.15)` | `0 4px 15px rgba(139,56,30,0.15)` | `0 4px 15px rgba(139,56,30,0.15)` | `0 4px 15px rgba(139,56,30,0.15)` | Slightly different from `.btn-primary` initial shadow. Proposal: Unify with `.btn-primary`. |
| Hover Shadow | `0 6px 20px rgba(139,56,30,0.2)` | `0 6px 20px rgba(139,56,30,0.2)` | `0 6px 20px rgba(139,56,30,0.2)` | `0 6px 20px rgba(139,56,30,0.2)` | Slightly different from `.btn-primary` hover shadow. Proposal: Unify with `.btn-primary`. |

_Proposal for Buttons:_

1.  Ensure `.btn-primary` styles are the single source of truth for primary actions.
2.  Unify the `box-shadow` (initial and hover) of `.nav-cta` to match `.btn-primary` for perfect consistency in appearance, if desired. The current difference is subtle.
3.  Consider a standard mobile padding for generic `.btn-primary` if used outside of full-width contexts like the mobile nav menu (e.g., `1rem 2rem`).

---

_(Next: Forms, Navigation, Footer, etc.)_

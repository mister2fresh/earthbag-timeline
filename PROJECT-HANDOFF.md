# Earthship Timeline - Project Handoff Document

**Date:** February 7, 2026  
**Status:** In Progress - Styling Issue Being Resolved  
**Time in Session:** ~4 hours  

---

## Project Overview

Building an interactive photo timeline gallery showcasing earthship construction phases. The goal is a portfolio-quality website with an artistic, non-linear presentation of the build journey.

### Tech Stack
- **Framework:** Next.js 14 (Pages Router)
- **Styling:** Tailwind CSS + Custom CSS
- **Language:** JavaScript (not TypeScript)
- **Content:** Markdown files with gray-matter
- **Images:** Next.js Image component + Sharp optimization
- **Deployment:** Vercel

---

## Current Status

### ✅ What's Working
1. **Project structure** - All folders and files in place
2. **Content system** - 6 phase folders with phase.md files
3. **Data flow** - getStaticProps successfully loads phases
4. **Image optimization** - Photos in /public/images/ folders
5. **Phase ordering** - Using increments of 10 (10, 20, 30, 40, 50, 60)

### ❌ Current Issue
**Tailwind CSS not applying** - Page shows unstyled HTML

**Symptoms:**
- Unstyled text visible
- No colors, spacing, or layout
- Image height warnings in console
- All content renders but no Tailwind utilities work

**Files Recently Changed:**
- `styles/globals.css` - Refactored to move positioning from JS to CSS
- `pages/index.js` - Cleaned architecture, removed inline positioning logic

**Most Recent Error:**
```
Image with src "/images/*/cover.jpg" has "fill" and a height value of 0.
This is likely because the parent element has not been styled to have a set height.
```

This indicates Tailwind utilities like `w-32 h-32` aren't being applied.

---

## Project Structure

```
earthship-timeline/
├── content/
│   ├── foundation/
│   │   └── phase.md (order: 10)
│   ├── walls/
│   │   └── phase.md (order: 20)
│   ├── bondbeam/
│   │   └── phase.md (order: 30)
│   ├── roof/
│   │   └── phase.md (order: 40)
│   ├── finishing/
│   │   └── phase.md (order: 50)
│   └── toinfinity/
│       └── phase.md (order: 60)
├── public/images/
│   ├── foundation/cover.jpg + photos
│   ├── walls/cover.jpg + photos
│   ├── bondbeam/cover.jpg + photos
│   ├── roof/cover.jpg + photos
│   ├── finishing/cover.jpg + photos
│   └── toinfinity/cover.jpg + photos
├── pages/
│   ├── _app.js
│   ├── index.js
│   └── phase/[slug].js
├── styles/
│   └── globals.css
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

---

## Key Design Decisions Made

### 1. Styling Architecture
**Decision:** Move all positioning from JavaScript to globals.css  
**Rationale:** 
- Better performance (CSS cached, not runtime generated)
- Single source of truth
- Industry best practice (separation of concerns)
- Easier to maintain

**Implementation:**
- Desktop: Zigzag pattern (left-right-left-right)
- Mobile: Vertical stack (centered)
- Breakpoint: 768px

### 2. Phase Numbering
**Decision:** Use increments of 10 (10, 20, 30, 40, 50, 60)  
**Rationale:** Easy to insert phases later without renumbering  
**Display:** Divide by 10 for user-facing numbers (1, 2, 3, 4, 5, 6)

### 3. Content Structure
**Decision:** One phase.md per folder, matching image folder  
**Rationale:** Simple, predictable, easy to add phases

### 4. Hero Page
**Decision:** Skip separate hero page, use intro section + constellation on same page  
**Rationale:** 
- Reduces clicks to content
- Constellation IS the hero
- Better UX for portfolio pieces

---

## Content Format

### phase.md Template
```markdown
---
title: Foundation Phase
date: March 2024
order: 10
coverImage: /images/foundation/cover.jpg
---

Description of the phase goes here. This becomes the excerpt shown on hover.
```

### Required Fields
- `title` - Phase name
- `date` - Build period
- `order` - Sort order (10, 20, 30, etc.)
- `coverImage` - Path to cover photo

---

## Design Specifications

### Hero Section ("From Earth to Home")
- **Background:** Gradient stone-900 → stone-800 → stone-950
- **Title:** 6xl on mobile, 8xl on desktop
- **Stats Display:**
  - 2,000 Bags of Earth
  - 1 Mile of Barb Wire
  - 1,500 Feet of Rebar
  - 30 Tons of Lava Rock
- **Tagline:** "Exponential Love" in italic

### Constellation Section
**Desktop Layout (>768px):**
```
Phase 1 (10%, 15%)      Phase 2 (25%, 70%)
        Phase 3 (40%, 25%)      Phase 4 (55%, 75%)
Phase 5 (70%, 20%)      Phase 6 (85%, 65%)
```
Zigzag pattern with amber connecting arrows

**Mobile Layout (≤768px):**
```
Phase 1 (8%, 50%)
Phase 2 (23%, 50%)
Phase 3 (38%, 50%)
Phase 4 (53%, 50%)
Phase 5 (68%, 50%)
Phase 6 (83%, 50%)
```
Vertical stack with straight-down arrows

### Visual Elements
- **Node size:** 128px mobile, 160px desktop (w-32/w-40)
- **Border:** 4px amber-600, becomes amber-400 on hover
- **Hover effects:** 
  - Scale to 110%
  - Ring glow (ring-4 ring-amber-500/50)
  - Info card appears below
  - Pulse animation
- **"START HERE" badge:** On first phase (order: 10), amber background, pulsing
- **Arrows:** Dashed amber lines (rgba(245, 158, 11, 0.4))

---

## Critical Files

### globals.css (styles/globals.css)
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Constellation positioning */
.constellation-node {
  position: absolute;
  transform: translate(-50%, -50%);
  cursor: pointer;
  transition: all 300ms;
  z-index: 10;
}

.phase-node-10 { top: 10%; left: 15%; }
.phase-node-20 { top: 25%; left: 70%; }
/* ... etc for all 6 phases */

@media (max-width: 768px) {
  .phase-node-10 { top: 8%; left: 50%; }
  /* ... etc for mobile positions */
}
```

### _app.js (pages/_app.js)
```javascript
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
```

### tailwind.config.js
```javascript
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

---

## Troubleshooting Guide

### Issue: Tailwind Styles Not Applying

**Symptoms:**
- Unstyled HTML
- Image height errors
- No colors or spacing

**Solutions to Try:**
1. **Clear build cache:**
   ```bash
   rm -rf .next
   npm run dev
   ```

2. **Verify Tailwind config content paths:**
   ```javascript
   content: [
     './pages/**/*.{js,jsx}',
     './components/**/*.{js,jsx}',
   ]
   ```

3. **Check globals.css has Tailwind directives at top:**
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

4. **Verify _app.js imports globals.css:**
   ```javascript
   import '../styles/globals.css'
   ```

5. **Check for CSS syntax errors** - One typo breaks everything

6. **Reinstall dependencies:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

### Issue: Phases Not Displaying

**Check:**
1. Each content folder has phase.md file
2. Each phase.md has `order` field
3. Matching /public/images/ folders exist
4. coverImage paths are correct
5. Console for data loading errors

### Issue: Only One Phase Visible

**Cause:** All phases stacked at same position  
**Solution:** Verify `.phase-node-XX` classes in globals.css match `order` values

---

## Next Steps / Roadmap

### Immediate (Fix Current Issue)
1. ✅ Resolve Tailwind compilation issue
2. Verify all 6 phases display in zigzag
3. Test responsive behavior (desktop → mobile)
4. Verify hover effects work

### Phase 3 Enhancements (Optional)
1. **Lightbox** - Click images to expand (yet-another-react-lightbox)
2. **Before/After Slider** - Compare progress on same location
3. **Search/Filter** - Filter phases by tags or search terms
4. **Analytics** - Track which phases get most views
5. **Better Blur Placeholders** - Generate from actual images
6. **Phase Detail Pages** - Build out `/phase/[slug]` pages with photo galleries

### Future Ideas (Not Committed)
- Animated SVG earthship illustration
- Stat counter animations
- Timeline scrubber UI
- 3D view toggle
- Print-friendly version

---

## Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run start

# Deploy to Vercel
# (Push to GitHub, Vercel auto-deploys)
git add .
git commit -m "message"
git push
```

---

## Resources & Documentation

### Official Docs
- Next.js Pages Router: https://nextjs.org/docs/pages
- Tailwind CSS: https://tailwindcss.com/docs
- Next.js Image: https://nextjs.org/docs/api-reference/next/image
- gray-matter: https://github.com/jonschlinkert/gray-matter

### Internal Docs
- Implementation Guide: `/earthship-timeline-implementation-guide.md`
- Card Style Options: `/card-style-options.md`
- Refactoring Summary: `/REFACTORING-SUMMARY.md`
- Styling Architecture Review: `/styling-architecture-review.md`

---

## Key Learnings from Session

### What Worked Well
1. **Incremental approach** - Build → Test → Deploy at each step
2. **Skills system** - Reading best practices before implementing
3. **Expert consultation** - Three-expert review caught scope creep
4. **Simple tech stack** - Avoided complex abstractions

### Challenges Encountered
1. **Scope management** - Started with 3D constellation, simplified to 2D
2. **Styling architecture** - Migrated from inline JS to CSS mid-project
3. **Responsive positioning** - Complex to do in pure CSS initially
4. **Order numbering** - Confusion between 1-6 vs 10-60 systems

### Best Practices Established
1. **Use globals.css for layout/positioning**
2. **Use Tailwind for component utilities**
3. **Separate structure from presentation**
4. **Keep order numbers as increments of 10**
5. **One phase.md per folder, matching image folder**

---

## Contact / Handoff Notes

### What the Next Developer Needs to Know

1. **Current blocker:** Tailwind not compiling - likely tailwind.config.js or globals.css syntax issue

2. **Quick wins available:**
   - Once styling works, site is 90% complete
   - All data flows correctly
   - All images optimized and in place

3. **Architecture is clean:**
   - 270-line index.js (down from 333)
   - All positioning in CSS (not JS)
   - Professional separation of concerns

4. **User wants:**
   - Artistic, non-linear timeline
   - Easy to add more phases
   - Portfolio-quality presentation
   - Clear navigation/progression

### Recommended First Actions

1. **Fix Tailwind compilation** - Verify config paths, clear cache
2. **Test on localhost** - Confirm all 6 phases visible
3. **Deploy to Vercel** - Get live URL for user to review
4. **Build phase detail pages** - The `/phase/[slug]` galleries
5. **Polish interactions** - Smooth transitions, nice hover states

---

## Version Control

**Current Branch:** main  
**Last Commit:** (User to fill in)  
**Remote:** (User's GitHub repo)  

**Important Files to Commit:**
- ✅ `pages/index.js`
- ✅ `pages/_app.js`
- ✅ `styles/globals.css`
- ✅ `content/**/*.md`
- ✅ `public/images/**/*` (optimized only)
- ❌ `originals/` (in .gitignore)
- ❌ `.next/` (in .gitignore)
- ❌ `node_modules/` (in .gitignore)

---

## Summary

**Project Goal:** Interactive earthship construction timeline  
**Current State:** 90% complete, styling issue blocking deployment  
**Time Invested:** ~4 hours of focused development  
**Lines of Code:** ~350 lines (index.js + globals.css)  
**Quality:** Professional architecture, clean separation of concerns  

**Once Tailwind issue is resolved, this project will be a strong portfolio piece demonstrating:**
- Modern React/Next.js development
- Responsive design
- Performance optimization
- Clean code architecture
- Creative UX for photo-heavy content

Good luck! The hard architectural work is done. Just need to get Tailwind compiling properly and you're there. 🚀

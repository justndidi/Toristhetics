Fonts

Fraunces (serif) — headings, logo, section titles
Poppins (sans-serif) — body text, labels, inputs, buttons
Colors

#f472b6 / #db2777 — pink (primary brand, CTAs, prices)
#a855f7 / #7e22ce — purple (accents, labels, qty buttons)
#facc15 — yellow (badges, "starting from" callout)
#fce7f3 — light pink (borders, backgrounds, image placeholders)
#e9d5ff — light purple (card borders, input borders)
#fdf4ff / #faf5ff — very light purple (card backgrounds)
#fef9c3 — light yellow (payment info highlight box)
#fff9fb — off-white pink (page background)
#1a0a10 — near-black with a warm tint (primary text)
#2d0a2e — very dark purple (footer background)
Gradients

linear-gradient(135deg, #f472b6, #a855f7) — pink-to-purple (buttons, logo dot, footer overlay, hero image overlay)
linear-gradient(135deg, #fdf2f8, #faf5ff, #fefce8) — soft pink/purple/yellow (hero background)
linear-gradient(135deg, #fdf2f8, #faf5ff) — soft pink/purple (Why Us section background)
linear-gradient(135deg, #1a0a10, #2d0a2e) — dark warm-black to deep purple (footer)
Layout

CSS Grid — product grid (1 / 2 / 3 columns responsive), checkout 2-column split, contact 2-column split
Flexbox — navbar, cart items, hero split, feature cards, footer
sticky nav with backdrop-filter: blur(12px) frosted glass effect
Borders & Radius

border-radius ranges from rounded-full (pills) to rounded-3xl (cards, 24px) to rounded-[40px] (hero image)
Hairline borders at 1.5px–2px in light pink/purple
Dashed borders on payment detail rows
Shadows

box-shadow: 0 4px 24px rgba(244,114,182,0.08) — soft pink shadow on product cards
shadow-2xl — hero image and cart sidebar
Transitions & Interactions

hover:-translate-y-1 — product cards lift on hover
hover:scale-105 — buttons scale up on hover
group-hover:scale-105 — product images zoom inside cards
transition-colors — nav links, remove buttons
scroll-behavior: smooth — smooth anchor scrolling
Input focus: border color switches from light purple to #a855f7
animate-bounce — toast notification
transition-transform duration-500 — image zoom
Scrollbar

Custom styled via ::-webkit-scrollbar — 6px wide, pink thumb on page; 4px, light purple thumb inside cart
Decorative Shapes

Absolutely positioned circles and a rotated square in the hero, using brand colors at low opacity (opacity-15 to opacity-25) as Memphis-style background accents



# CareLynx — Brand SEO deployment checklist

## Official identifiers
- Brand / site name: **CareLynx**
- Legal company name: **CareLynx Pvt Ltd**
- Canonical production site: **https://carelynxpvtltd.vercel.app/**
- Instagram: https://www.instagram.com/carelynxpvtltd/
- LinkedIn: https://www.linkedin.com/company/carelynx-pvt-ltd/

## Included updates
- Canonical, Open Graph, Twitter, Organization, WebSite, and Developers structured-data URLs now use the verified production site.
- Social profile links are consistent across the home, partnership, and developers pages, and in Organization `sameAs`.
- `sitemap.xml` and `robots.txt` now point to the production URL.
- Existing visual design, 3D assets, JavaScript and email backend are retained.

## Deployment
1. Back up your current GitHub repo. Upload the contents of this ZIP to the repository root (where `index.html` lives), not into an extra folder. Preserve the **existing** Google Search Console HTML verification file in the root. It was not present in the provided ZIP, so it is **not** included here.
2. Deploy through Vercel and confirm these pages return HTTP 200:
   - https://carelynxpvtltd.vercel.app/
   - https://carelynxpvtltd.vercel.app/partnership.html
   - https://carelynxpvtltd.vercel.app/developers.html
   - https://carelynxpvtltd.vercel.app/sitemap.xml
   - https://carelynxpvtltd.vercel.app/robots.txt
   - https://carelynxpvtltd.vercel.app/assets/images/carelynx-seo-logo-512.png
3. Open Search Console property `https://carelynxpvtltd.vercel.app/` → Sitemaps → submit `sitemap.xml`.
4. Use URL Inspection to check the homepage and other key pages. Request indexing only if needed and quota permits. Google chooses whether/when to index.
5. In Performance → Search results → Queries, monitor branded terms such as CareLynx and CareLynx Pvt Ltd once impressions accumulate.
6. Check that Instagram and LinkedIn bios point back to this official website, and keep company name/logo consistent on all profiles.
7. Test the site and both enquiry forms on desktop and mobile after deployment.

## Important cautions
- Google controls search rankings, sitelinks, site name, and whether social profiles appear. Structured data is a signal, not a guarantee.
- If `carelynxfinal.vercel.app` still serves duplicate content, set a permanent redirect to the new canonical URL where you control the deployment. Do not redirect unrelated domains.
- Do not remove the Google verification HTML file after successful verification.
- `pages/` contains draft legal placeholders marked noindex. Do not publish them as finalized policies without review.

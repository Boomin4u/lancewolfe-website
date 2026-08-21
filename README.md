# Lance Wolfe Website

Personal website for Lance Wolfe, built as a static site with a home page, career hub, chronicles, and about page.

## Local Development

```bash
npm install
npm run dev
```

The site runs locally at `http://localhost:3000/`.

## Deployment

This repo is connected to Porkbun static hosting through GitHub Connect.

Update flow:
1. Make changes locally.
2. Run the site and check the pages you touched.
3. Commit and push to `main`.
4. GitHub Actions builds the static export and publishes it to the `deploy` branch.
5. Porkbun should be connected to the `deploy` branch so it serves the generated static files.

If Porkbun is still connected to `main`, switch it to `deploy` in GitHub Connect.

## Content Updates

- **Home / About / Career**: edit the relevant files under `app/`.
- **Chronicles**: add or update entries in `app/chronicles/entries/`.
- **Career timeline data**: update `app/career/event-history-data.ts`.

## Key Pages

- `/`
- `/career/`
- `/career/timeline/`
- `/chronicles/`
- `/about/`

## Notes

- The site is intended to be static.
- Social preview assets live in `public/`.
- Favicon is `public/favicon.svg`.

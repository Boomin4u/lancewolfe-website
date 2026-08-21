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
4. Porkbun publishes the updated site automatically.

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

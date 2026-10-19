# Deployment

This site is set up as a static build that is published to a separate `deploy` branch.

## Branch Flow

- `main` is the source branch.
- GitHub Actions builds the site from `main`.
- The generated static export is published to `deploy`.
- Porkbun should be connected to `deploy`, not `main`.

## Update Process

1. Make changes on a feature branch.
2. Run the app locally and verify the pages you changed.
3. Open a pull request into `main` and confirm the quality workflow passes.
4. Merge the pull request.
5. GitHub Actions builds, tests, and prerenders the static site from `main`.
6. The workflow publishes the generated `dist/client` output to `deploy`.
7. Porkbun serves the updated files from `deploy`.

## What Gets Published

The live site should be the generated export in `dist/client`, including:

- `index.html`
- `404.html`
- prerendered route folders such as:
  - `/about/`
  - `/career/`
  - `/career/timeline/`
  - `/chronicles/`

## If the Live Site Looks Stale

Check these in order:

1. The latest changes are actually pushed to `main`.
2. The GitHub Actions workflow completed successfully.
3. The `deploy` branch updated after the workflow ran.
4. Porkbun is still connected to `deploy`.
5. DNS has finished propagating if the domain was recently changed.

## Notes

- The site is intended to stay static.
- Internal navigation should work from the exported files in `deploy`.
- If you add new routes, make sure they are included in prerendering so they appear in the static export.

# Chronicles updates

To add or update a Chronicle:

1. Open `app/chronicles/entries/`.
2. Copy one existing entry file.
3. Rename the file and update the exported `slug`, `title`, `date`, `sortDate`, `storyYear`, `tag`, `readTime`, `excerpt`, `featuredSummary`, and `sections`.
4. Add the matching article route, prerender route, and sitemap URL.
5. Save the files.

Notes:

- New entries are auto-discovered from `app/chronicles/entries/*.ts`.
- The archive sorts by `storyYear` from earliest to latest, then by publication date within the same year.
- Keep `sortDate` as the publication date in `YYYY-MM-DD` format. Set `storyYear` to the year the events happened.
- Lance does not use em dashes in his writing. Do not use them in entry text, excerpts, or featured summaries.

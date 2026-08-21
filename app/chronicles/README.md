# Chronicles updates

To add or update a Chronicle:

1. Open `app/chronicles/entries/`.
2. Copy one existing entry file.
3. Rename the file and update the exported `slug`, `title`, `date`, `sortDate`, `tag`, `readTime`, `excerpt`, `featuredSummary`, and `sections`.
4. Save the file.

Notes:

- New entries are auto-discovered from `app/chronicles/entries/*.ts`.
- The archive sorts newest-first automatically.
- Keep `sortDate` in `YYYY-MM-DD` format so ordering stays correct.

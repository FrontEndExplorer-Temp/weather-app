# Weather App

## Production Build & Deployment

1. **Build for production:**
   ```sh
   npm run build
   ```
   The optimized output will be in the `dist/` folder.

2. **Analyze bundle:**
   ```sh
   npm run analyze
   ```
   Generates a static report of bundle size in `dist/`.

3. **Deploy:**
   - Upload the `dist/` folder to your static hosting (Netlify, Vercel, GitHub Pages, etc.)
   - Ensure your server serves `index.html` for all routes (SPA fallback)

## Code Quality
- Lint: `npm run lint`
- Format: `npm run format`
- All code is modular, ES6+, and follows best practices for accessibility, performance, and maintainability.

## Best Practices
- Use environment variables for API keys in production.
- Review bundle size and optimize dependencies.
- Test accessibility and responsiveness on all devices.
- Keep dependencies up to date.


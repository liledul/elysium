# Elysium Family Office - Developer Guide

## Commands
No build/lint/test commands are needed for this static website. 

The site can be previewed by:
- Opening index.html in a browser
- Using a local server: `python -m http.server` or `npx serve`

## Code Style Guidelines

### HTML
- Use semantic HTML5 elements (header, nav, main, section, footer)
- Add descriptive alt text for images
- Indent with 2 spaces

### CSS
- Follow BEM naming convention for class names
- Use CSS variables for colors, spacing, and typography
- Keep selectors simple and avoid deep nesting

### JavaScript
- Use ES6+ features (arrow functions, template literals, etc.)
- Add event listeners in DOMContentLoaded
- Check for element existence before manipulating DOM
- Follow defensive coding practices
- Prefer const/let over var

### General Practices
- Keep code organized into related sections
- Ensure all interactive elements are accessible
- Test across multiple screen sizes
- Maintain clean and consistent formatting
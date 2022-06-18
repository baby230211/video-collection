### Install Tailwind CSS

Install `tailwindcss` and its peer dependencies via npm, and then run the init command to generate both `tailwind.config.js` and `postcss.config.js`.

```
pnpm add -D tailwindcss postcss autoprefixer
pnpm dlx tailwind init -p
```

### Configure your template paths

Add the paths to all of your template files in your `tailwind.config.js` file.

```tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Add the Tailwind directives to your CSS

Create a `./src/index.css` file and add the `@tailwind` directives for each of Tailwind's layers.

```index.CSS
@tailwind base;
@tailwind components;
@tailwind utilities;
```

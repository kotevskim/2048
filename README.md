## Project initialization

1. Create app

```bacs
npx create-next-app@latest
```

- Would you like to use TypeScript? - Yes
- Would you like to use ESLint? - Yes
- Would you like to use Tailwind CSS? - No
- Would you like to use `/src` directory? - No
- Would you like to use App Router? - No
- Would you customize the default import alias? - No

2. Add a code formatter

- We will use [Prettier](https://prettier.io/), add it as a dev dependency:

```bash
npm install --save-dev prettier
```

- Add `.prettierrc` file at the root of the project:

```json
{
  "tabWidth": 2
}
```

- Declare a format command in `package.json`, as part of the scripts object:

```json
{
  "scripts": {
    "format": "prettier --write ."
  }
}
```
- Execute `npm run format` to format the project files

3. Add `.editorconfig` file:
```
root = true

[*]                                 # all files in this project
charset = utf-8
end_of_line = lf                    # for Linux/MacOS (crlf for Windows)
insert_final_newline = true         # can sometimes cause issues with version control
trim_trailing_whitespace = true

[*.{js,json,ts,tsx,html,svg}]
indent_size = 2
indent_style = space
max_line_length = 120
```
Also install the "Editor Config for VS Code" extension in order for this to work in VS Code.

4. Run the development server:

```bash
npm run dev
```

Open http://localhost:3000

---
Project structure explained:
- `_app.tsx` (file) - Acts as a wrapper for all pages in the application. It allows us to define a custom component that wraps around every page, providing consistent layout, styling and behaviour across entire application.
The most common use cases are setting global styles, state management providers, or navigation components.
- `_document.tsx` (file) - Used to customize the base HTML document, that Next.js is going to render on the server side during the initial page load.
- `public` (directory) - Used for static assests that need to be publicly accessible: images, custom fonts...
- `styles` (directory) - Used to store the styles of the application: global styles, component styles, the page size, ...
- `.eslintrc.json` (file) - Used to configure ESLint. It contains the definition of how our code is suppose to be written.
- `package.json` (file) - Contains all the metadata of the project which includes information, dependencies, scripts and so on.
- `tsconfig.json` (file) - Typescript configuration file
---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

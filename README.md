This is a [Next.js v14](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

After cloning the projest, run:

```bash
npm install
```

Duplicate the .env.template file in your own .env file and assign http://localhost:3000 to NEXT_PUBLIC_BASE_URL.


Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## TLDR

- [x] Virtualized List Component
- [x] It uses plain CSS
- [x] Supports 100,000
- [x] It does have 3 columns
- [x] Server side data fetching using Next.js apis
- [x] React Unit tests using Jest and @testing-library/react with full coverage
- [x] Using GitHub versioning control
- [x] Husky to check code lint/prettier/test fully running
- [x] GitHub action runs the tests before deployment for CD/CI
- [x] GitHub action deploys to a free (very slow) Vercel account to [https://virtualized-list-kappa.vercel.app/](https://virtualized-list-kappa.vercel.app/)
- [x] Smooth scroll to the top button
- [x] Ability to add a new row to the bottom of the list with smooth scroll
- [x] Use of Next.js 14 highlighting some new core functionalities

TODO:

- [ ] e2e tests
- [ ] better documenting commits and commit messages
- [ ] example of usage of the virtualized list in a traditional client component
- [ ] examples of different uses of virtualized list with Storyboard
- [ ] improved user experience

N.B.
I intentionally omitted infinite scrolling and pagination, viewing the test as an opportunity to showcase proficiency in
optimizing React component performance.

The live url needs a second refresh as Next.js 14 has some known issues with Vercel functions.

## The virtualized list

The virtualized-list component built in this thread is a custom React component designed to efficiently render large
datasets by dynamically rendering only the visible portion of the data.

- Efficient Rendering: The virtualized-list component optimizes rendering performance by only rendering the subset of
  items that are currently visible within the viewport. This approach ensures that the UI remains responsive and smooth,
  even when dealing with large datasets containing thousands or millions of items.

- Dynamic Item Rendering: As the user scrolls through the list, the virtualized-list component dynamically updates the
  rendered items to reflect the new portion of the dataset that has become visible. This dynamic rendering strategy
  minimizes memory usage and ensures fast scrolling performance.

- Customizable Item Height: Developers have the flexibility to specify the height of each item in the list, allowing for
  greater control over the layout and appearance of the virtualized list. This customization option ensures that the
  component can adapt to different design requirements and use cases.

- Optional Integration with Context API: The virtualized-list component integrates with React's Context API to manage and share
  state or functionality with other components in the application. This integration enables seamless communication and
  coordination between different parts of the UI, enhancing code modularity and maintainability.

- Support for Adding New Items: The component includes support for dynamically adding new items to the list. When new
  items are added to the dataset, the component automatically scrolls to the bottom of the list to ensure that the new
  items are visible to the user.

- Testing: The virtualized-list component is accompanied by a suite of tests to ensure its reliability and stability.
  These tests cover various aspects of the component's functionality, including rendering, scrolling behavior, and
  integration with other components.

## Folder Structure

- App: The app folder in a Next.js 14 app houses components, pages, and utilities specific to the application's logic.
  It's where you'll find components connected to the app's models, like products or users. This folder holds essential
  functionality for the app's behavior and organization.

          |__ Actions/Products

              The actions/product.ts file contains asynchronous functions to handle interactions with the server related to products.

          |__ Api/Products

              The api/products.ts file serves as the backend API for handling product-related operations.
              The file provides endpoints for fetching existing products and adding new products to the product list.

          |__ Components

              The components within the app folder are designed to serve as connected components within the application architecture. These components exhibit a higher level of awareness regarding the application's data models, particularly those pertaining to products.

- Components: The components folder outside the app directory serves as a repository for atomic components, which are small, reusable
  UI elements that can be composed together to build more complex user interfaces.

          |__ virtualised-list

              The virtualized-list component object of this test.

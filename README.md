This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

This project displays a list of crypto coins and other details about them like price, symbol, total supply in a table. This project uses NextJS 15 and creates a file structure that allows the project to grow as needed. 
I created a use-coins hook that handles the fecthing of the coins data. This allows for separation from page rendering files in the App folder. 
I also created a components folder that holds the table component, this folder can also hold other UI components.
Finally, I used libraries like ShadCN and Lucide because they have great out of box components that save a lot of development time.

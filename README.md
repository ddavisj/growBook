# About

growBook lets users create a personal portfolio of all their plants. It's built with Vue, Nuxt, Supabase, Prisma and Tailwind CSS.

Supabase is a Backend-as-a-Service app development platform that provides hosted services including a Postgres database, user authentication and file storage.

growBook makes use of Supabase's Postgres database, we also uses its authentication capabilities to enable login via Google OAuth as well as signup via email and password. Plant-image storage is also provided via Supabase's integration with AWS. The growBook app connects to Supabase's Postgres database via Prisma ORM. growBook also makes use of Vue's official state library, Pinia, to store user and other relevant data in a global store.

The site is hosted on Vercel and uses Vercel's Edge Network to cache and speedily serve content to users.

Feel free to create an account via Google or email and add your plants to our collection.

## Key skills

-  Vue JS, Nuxt, SSR (server side rendering)
-  Prisma ORM
-  Tailwind CSS
-  Supabase Postgres database, user authentication and file storage
-  Pinia for global state management
-  Hosting via Vercel

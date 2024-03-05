# Serverless API using Cloudflare, Drizzle ORM and Neon

This is a simple API of a serverless API using Cloudflare Workers, Drizzle ORM and Neon. It returns a list of products from a Neon database. If you would like to learn how to build this project from scratch, check out the tutorial: https://neon.tech/blog/api-cf-drizzle-neon

## Set up locally

You will need the following:
- A [Cloudflare account](https://dash.cloudflare.com) and the wrangler CLI installed
- A [Neon account](https://console.neon.tech) and a project

1. Clone the repository

```
git clone https://github.com/neondatabase/cloudflare-drizzle-neon.git
cd neon-cloudflare-drizzle
npm install
```
2. Copy the `.dev.vars` file by running the following command:

```bash
cp .dev.vars.example .dev.vars
```

3. Update the `.dev.vars` file with your Neon connection string.

4. Run the following command to apply the existing database migrations located in the `/drizzle` directory:

```bash
npm run migrate
```
5. In the Neon console, run the following query in the Neon's SQL editor:

```sql
INSERT INTO products (name, price, description) VALUES
  ('Product A', 10.99, 'This is the description for Product A.'),
  ('Product B', 5.99, 'This is the description for Product B.'),
  ('Product C', 15.99, 'This is the description for Product C.'),
  ('Product D', 8.99, 'This is the description for Product D.'),
  ('Product E', 20.99, 'This is the description for Product E.');
```

6. Run the following command to start the server:

```bash
npm run dev
```

7. Open the browser at `http://localhost:8787` to see the list of products.
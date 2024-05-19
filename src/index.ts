import { NeonHttpDatabase, drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './db/schema';
import { products } from './db/schema';
import { Hono } from 'hono';
import { createMiddleware } from 'hono/factory';

export type Env = {
  DATABASE_URL: string;
};

const app = new Hono<{ Bindings: Env }>();

declare module 'hono' {
  interface HonoRequest {
    db: NeonHttpDatabase<typeof schema>;
  }
}

const injectDB = createMiddleware(async (c, next) => {
  const sql = neon(c.env.DATABASE_URL);
  c.req.db = drizzle(sql);
  await next();
});

app.get('/', injectDB, async (c) => {
  try {
    const result = await c.req.db.select().from(products);

    return c.json({
      result,
    });
  } catch (error) {
    console.log(error);
    return c.json(
      {
        error,
      },
      400
    );
  }
});

export default app;

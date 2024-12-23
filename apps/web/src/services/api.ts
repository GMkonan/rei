import { treaty } from "@elysiajs/eden";
import type { App } from "@rei/backend";

export const client = treaty<App>("localhost:3000");
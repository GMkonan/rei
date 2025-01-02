import { treaty } from "@elysiajs/eden";
import { app } from "@rei/backend";

export const api = treaty<app>("http://localhost:3000/");

import { z } from 'zod';

export const settingsSchema = z.object({}).catch({}).default({});

export type Settings = z.infer<typeof settingsSchema>;

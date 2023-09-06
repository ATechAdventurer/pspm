import { z } from 'zod';

export const pspmSchema = z.object({
  name: z.string(),
  version: z.string(),
  description: z.string().optional(),
  authors: z.array(z.string()).or(z.string()).optional(),
  url: z.string().optional(),
});

export const pspmRecordSchema = pspmSchema.extend({
  ownedFiles: z.array(z.string()),
});

export const pspmConfigSchema = z.object({
  installed: z.array(pspmRecordSchema),
});

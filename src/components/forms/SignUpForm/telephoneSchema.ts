import { z } from 'zod';

export const telephoneSchema = z.object({
  areaCode: z.coerce
    .string()
    .length(2, 'O CÓDIGO DE AREA DEVE TER 2 DÍGITOS')
    .regex(/^\d+$/, 'O CÓDIGO DE AREA DEVE CONTER APENAS NÚMEROS'),
  phoneNumber: z.coerce
    .string()
    .min(8, 'O NÚMERO DEVE TER NO MÍNIMO 8 DÍGITOS')
    .max(9, 'O NÚMERO DEVE TER NO MÁXIMO 9 DÍGITOS')
    .regex(/^\d+$/, 'O NÚMERO DEVE CONTER APENAS DÍGITOS'),
});

export type telephoneSchemaType = z.infer<typeof telephoneSchema>;

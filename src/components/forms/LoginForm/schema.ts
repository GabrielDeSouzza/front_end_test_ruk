import { z } from 'zod';
export const loginFormSchema = z.object({
  email: z
    .string()
    .email('DIGITE UM EMAIL VALIDO')
    .min(5, 'DIGITE AO MENOS 5 CARACTERES')
    .nonempty('Não pode ser Vazio'),
  password: z.string().nonempty('Não pode ser Vazio'),
});

export type loginFormSchemaType = z.infer<typeof loginFormSchema>;

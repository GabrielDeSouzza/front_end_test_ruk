import { z } from 'zod';
import { telephoneSchema } from './telephoneSchema';

export const signUpSchema = z.object({
  name: z
    .string({ message: 'O NOME É OBRIGATORIO' })
    .min(2, 'O NOME DEVE TER AO MENOS DOIS CARACTERES'),
  email: z
    .string({ message: 'O EMAIL É OBRIGADORIO' })
    .email('DIGITE UM EMAIL VALIDO')
    .min(5, 'O EMAIL DEVE TER AO MENOS 5 CARACTERES'),
  password: z
    .string({ message: 'DIGITE A SENHA' })
    .min(3, 'A SENHA DEVE TER PELO MENOS 3 DIGITOS'),
  telephones: z.array(telephoneSchema),
});

export type signUpSchemaType = z.infer<typeof signUpSchema>;

import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z
    .string()
    .email({ message: 'O e-mail está inválido' })
    .trim()
    .min(1, { message: 'O email é obrigatório' }),
  password: z
    .string()
    .trim()
    .min(6, { message: 'A senha deve possuir no minímo 6 caracteres' }),
});

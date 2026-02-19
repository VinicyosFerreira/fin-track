import { z } from 'zod';

export const signupFormSchema = z
  .object({
    firstName: z.string().trim().min(1, { message: 'O nome é obrigatório' }),
    lastName: z
      .string()
      .trim()
      .min(1, { message: 'O sobrenome é obrigatório' }),
    email: z
      .string()
      .email({ message: 'O email é inválido' })
      .trim()
      .min(1, { message: 'O email é obrigatório' }),
    password: z
      .string()
      .trim()
      .min(6, { message: 'A senha deve ter no minímo 6 caracteres' }),
    confirmPassword: z
      .string()
      .trim()
      .min(6, { message: 'A confirmação de senha é obrigatória' }),
    terms: z.boolean().refine((value) => value === true, {
      message: 'Voce precisa aceitar os termos de uso e privacidade',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não se coincidem',
    path: ['confirmPassword'],
  });

import { z } from 'zod';
export const transactionFormSchema = z.object({
  name: z
    .string({
      message: 'O titulo da transação é obrigatório',
    })
    .trim()
    .min(1, { message: 'O titulo da transação é obrigatório' }),
  amount: z
    .number({
      message: 'O valor da transação é obrigatório',
    })
    .min(1, { message: 'O valor da transação é obrigatório' }),
  date: z.date({ message: 'A data da transação é obrigatória' }),
  type: z.enum(['EARNING', 'EXPENSE', 'INVESTMENT'], {
    required_error: 'O tipo da transação é obrigatório',
  }),
});

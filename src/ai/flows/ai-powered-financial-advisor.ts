'use server';
/**
 * @fileOverview AI-powered financial advisor flow.
 *
 * - getFinancialAdvice - A function that returns personalized financial advice based on user data.
 * - FinancialAdviceInput - The input type for the getFinancialAdvice function.
 * - FinancialAdviceOutput - The return type for the getFinancialAdvice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FinancialAdviceInputSchema = z.object({
  spendingPatterns: z
    .string()
    .describe("Description of user's spending patterns."),
  financialGoals: z.string().describe('Description of user financial goals.'),
});
export type FinancialAdviceInput = z.infer<typeof FinancialAdviceInputSchema>;

const FinancialAdviceOutputSchema = z.object({
  advice: z.string().describe('Personalized financial advice.'),
});
export type FinancialAdviceOutput = z.infer<typeof FinancialAdviceOutputSchema>;

export async function getFinancialAdvice(input: FinancialAdviceInput): Promise<FinancialAdviceOutput> {
  return getFinancialAdviceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'financialAdvicePrompt',
  input: {schema: FinancialAdviceInputSchema},
  output: {schema: FinancialAdviceOutputSchema},
  prompt: `You are an AI-powered financial advisor. Provide personalized financial advice based on the user's spending patterns and financial goals.

Spending Patterns: {{{spendingPatterns}}}
Financial Goals: {{{financialGoals}}}

Advice:`,
});

const getFinancialAdviceFlow = ai.defineFlow(
  {
    name: 'getFinancialAdviceFlow',
    inputSchema: FinancialAdviceInputSchema,
    outputSchema: FinancialAdviceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

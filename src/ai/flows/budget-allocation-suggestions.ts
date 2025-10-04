'use server';

/**
 * @fileOverview A flow for providing AI-suggested budget allocation across expense categories.
 *
 * - budgetAllocationSuggestions - A function that provides budget allocation suggestions.
 * - BudgetAllocationInput - The input type for the budgetAllocationSuggestions function.
 * - BudgetAllocationOutput - The return type for the budgetAllocationSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BudgetAllocationInputSchema = z.object({
  income: z.number().describe('The user\u0027s monthly income.'),
  expenses: z.record(z.number()).describe('A map of expense categories to their amounts.'),
  financialGoals: z.string().describe('The user\u0027s financial goals.'),
});
export type BudgetAllocationInput = z.infer<typeof BudgetAllocationInputSchema>;

const BudgetAllocationOutputSchema = z.record(z.number()).describe('A map of expense categories to their suggested budget allocation amounts.');
export type BudgetAllocationOutput = z.infer<typeof BudgetAllocationOutputSchema>;

export async function budgetAllocationSuggestions(input: BudgetAllocationInput): Promise<BudgetAllocationOutput> {
  return budgetAllocationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'budgetAllocationPrompt',
  input: {schema: BudgetAllocationInputSchema},
  output: {schema: BudgetAllocationOutputSchema},
  prompt: `You are a personal finance advisor. Given the user\u0027s income, expenses, and financial goals, suggest a budget allocation across different expense categories.

Income: {{{income}}}
Expenses: {{stringify expenses}}
Financial Goals: {{{financialGoals}}}

Suggest a budget allocation (in dollars) for each expense category. The total of the budget allocation should not exceed the user's income. Respond in JSON format. Make the categories in the output match the input.

{
  \"category1\": 100,
  \"category2\": 200,
  ...
}
`,
});

const budgetAllocationFlow = ai.defineFlow(
  {
    name: 'budgetAllocationFlow',
    inputSchema: BudgetAllocationInputSchema,
    outputSchema: BudgetAllocationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

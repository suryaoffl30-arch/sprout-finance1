'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Currency = {
  code: string;
  name: string;
  symbol: string;
};

type CurrencyContextType = {
  currency: Currency;
  setCurrency: (currencyCode: string) => void;
  currencies: Currency[];
};

const currencies: Currency[] = [
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'USD', name: 'United States Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'GBP', name: 'British Pound Sterling', symbol: '£' },
];

const defaultCurrency = currencies.find(c => c.code === 'INR')!;

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrentCurrency] = useState<Currency>(defaultCurrency);

  const setCurrency = (currencyCode: string) => {
    const newCurrency = currencies.find(c => c.code === currencyCode);
    if (newCurrency) {
      setCurrentCurrency(newCurrency);
    }
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, currencies }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

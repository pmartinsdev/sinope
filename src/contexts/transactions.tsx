import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { sinopeApi } from "../sinope-api";

interface Transaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}

interface TransactionContextType {
  transactions: Transaction[];
}

interface TransactionsProviverProps {
  children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProviver({ children }: TransactionsProviverProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const contextValue = useMemo<TransactionContextType>(
    () => ({
      transactions,
    }),
    [transactions]
  );

  async function loadTransactions() {
    const response = await sinopeApi.get("transactions");

    setTransactions(response.data);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <TransactionsContext.Provider value={contextValue}>
      {children}
    </TransactionsContext.Provider>
  );
}

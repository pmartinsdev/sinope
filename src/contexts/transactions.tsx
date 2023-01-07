import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { sinopeApi } from "../sinope-api";

interface Transaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}

export interface TransactionContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
}

interface TransactionsProviverProps {
  children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProviver({ children }: TransactionsProviverProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = useCallback<
    TransactionContextType["fetchTransactions"]
  >(async (query) => {
    const response = await sinopeApi.get("transactions", {
      params: {
        q: query,
      },
    });

    setTransactions(response.data);
  }, []);

  const contextValue = useMemo<TransactionContextType>(
    () => ({
      transactions,
      fetchTransactions,
    }),
    [transactions, fetchTransactions]
  );

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider value={contextValue}>
      {children}
    </TransactionsContext.Provider>
  );
}

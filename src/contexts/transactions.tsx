import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { sinopeApi } from "../lib/sinope-api";

interface Transaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}

interface CreateTransaction {
  description: string;
  price: number;
  category: string;
  type: "income" | "outcome";
}

export interface TransactionContextType {
  transactions: Transaction[];
  createTransaction: (payload: CreateTransaction) => Promise<void>;
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
        _order: "desc",
        _sort: "createdAt",
      },
    });

    setTransactions(response.data);
  }, []);

  const createNewTransaction = useCallback<
    TransactionContextType["createTransaction"]
  >(async (data) => {
    const { type, price, category, description } = data;

    const response = await sinopeApi.post("transactions", {
      type,
      price,
      category,
      description,
      // Remove this field if we already have a real backend server
      createdAt: new Date(),
    });

    setTransactions((state) => [...state, response.data]);
  }, []);

  const contextValue = useMemo<TransactionContextType>(
    () => ({
      transactions,
      fetchTransactions,
      createTransaction: createNewTransaction,
    }),
    [transactions, fetchTransactions, createNewTransaction]
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

import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { createContext } from 'use-context-selector'

import { sinopeApi } from '../lib/sinope-api'

interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

interface CreateTransaction {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

export interface TransactionContextData {
  transactions: Transaction[]
  createTransaction: (payload: CreateTransaction) => Promise<void>
  fetchTransactions: (query?: string) => Promise<void>
}

interface TransactionsProviverProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionContextData)

export function TransactionsProviver({ children }: TransactionsProviverProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const fetchTransactions = useCallback<
    TransactionContextData['fetchTransactions']
  >(async (query) => {
    const response = await sinopeApi.get('transactions', {
      params: {
        q: query,
        _order: 'desc',
        _sort: 'createdAt',
      },
    })

    setTransactions(response.data)
  }, [])

  const createNewTransaction = useCallback<
    TransactionContextData['createTransaction']
  >(async (data) => {
    const { type, price, category, description } = data

    const response = await sinopeApi.post('transactions', {
      type,
      price,
      category,
      description,
      // Remove this field if we already have a real backend server
      createdAt: new Date(),
    })

    setTransactions((state) => [...state, response.data])
  }, [])

  const contextValue = useMemo<TransactionContextData>(
    () => ({
      transactions,
      fetchTransactions,
      createTransaction: createNewTransaction,
    }),
    [transactions, fetchTransactions, createNewTransaction],
  )

  useEffect(() => {
    fetchTransactions()
    // eslint-disable-next-line
  }, [])

  return (
    <TransactionsContext.Provider value={contextValue}>
      {children}
    </TransactionsContext.Provider>
  )
}

import { useContext } from 'react'

import {
  TransactionContextType,
  TransactionsContext,
} from '../contexts/transactions'

export function useTransactions(): TransactionContextType {
  const context = useContext(TransactionsContext)

  if (!context)
    throw new Error('Cannot use transactions context without him provider')

  return context
}

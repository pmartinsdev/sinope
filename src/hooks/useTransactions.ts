import { useContextSelector } from 'use-context-selector'
import {
  TransactionContextData,
  TransactionsContext,
} from '../contexts/transactions'

export function useTransactions<T extends keyof TransactionContextData>(
  value: T,
): TransactionContextData[T] {
  const context = useContextSelector(
    TransactionsContext,
    (context) => context[value],
  )

  if (!context)
    throw new Error('Unable to use transaction context without provider')

  return context
}

import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "phosphor-react";

import { useTransactions } from "../../contexts/transactions";

import { SummaryContainer, SummaryCard } from "./styles";

export function Summary() {
  const { transactions } = useTransactions();

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Incomes</span>

          <ArrowCircleUp size={32} color="#00b37e" />
        </header>

        <strong>R$ 17.400,00</strong>
      </SummaryCard>

      <SummaryCard>
        <header>
          <span>Expenses</span>

          <ArrowCircleDown size={32} color="#f75a68" />
        </header>

        <strong>R$ 17.400,00</strong>
      </SummaryCard>

      <SummaryCard variant="green">
        <header>
          <span>Total</span>

          <CurrencyDollar size={32} color="#fff" />
        </header>

        <strong>R$ 17.400,00</strong>
      </SummaryCard>
    </SummaryContainer>
  );
}

import { Header } from "../../components/header";
import { Summary } from "../../components/summary";
import {
  PriceHightlight,
  TransactionsContainer,
  TransactionsTable,
} from "./styles";

export function Transactions() {
  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <TransactionsTable>
          <tbody>
            <tr>
              <td width="50%">Development website</td>
              <td>
                <PriceHightlight variant="income">R$ 12.000,00</PriceHightlight>
              </td>
              <td>Sell</td>
              <td>04/13/2022</td>
            </tr>

            <tr>
              <td width="50%">Hamburguer</td>
              <td>
                <PriceHightlight variant="outcome"> - R$ 59,00</PriceHightlight>{" "}
              </td>
              <td>Food</td>
              <td>04/13/2022</td>
            </tr>
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  );
}

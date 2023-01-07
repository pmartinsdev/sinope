import * as Dialog from "@radix-ui/react-dialog";
import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";

import logoImg from "../../assets/logo.svg";
import { NewTransactionModal } from "../new-transaction-modal";

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} />

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTransactionButton>New Transaction</NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  );
}

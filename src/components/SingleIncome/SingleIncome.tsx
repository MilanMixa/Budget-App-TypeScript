import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useContext,
} from "react";
import { GlobalContext } from "../../context/GlobalState";

// styles
import "./SingleIncome.css";

export const SingleIncome = () => {
  const { deleteTransaction, incomeTransactions } = useContext(GlobalContext);

  return (
    <div>
      {incomeTransactions.map(
        (transaction: {
          id: Key | null | undefined;
          text:
            | string
            | number
            | boolean
            | ReactElement<any, string | JSXElementConstructor<any>>
            | ReactFragment
            | ReactPortal
            | null
            | undefined;
          amount: number;
        }) => (
          <li className="single-income-item" key={transaction.id}>
            <span>{transaction.text}</span>

            <div>
              <span>+{transaction.amount.toFixed(2)}</span>
              <button
                className="delete-btn"
                onClick={() => deleteTransaction(transaction.id)}
              >
                x
              </button>
            </div>
          </li>
        )
      )}
    </div>
  );
};

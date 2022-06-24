import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useContext,
} from "react";
import { GlobalContext } from "../../context/GlobalState";

//styles
import "./SingleExpense.css";

export const SingleExpense = () => {
  const { deleteTransaction, expenseTransactions, incomeTransactions } =
    useContext(GlobalContext);

  const income = incomeTransactions.map(
    (incomeTransaction: { amount: any }) => incomeTransaction.amount
  );

  // calculating total sum of income
  const totalIncome = income
    .reduce((acc: any, item: any) => (acc += item), 0)
    .toFixed(2);

  return (
    <div>
      {expenseTransactions.map(
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
          <li className="single-expense-item" key={transaction.id}>
            <span>{transaction.text}</span>
            <div>
              <span> -{transaction.amount.toFixed(2)}</span>
              <span className="percentage">
                {Number(
                  ((transaction.amount * 100) / totalIncome).toFixed(2)
                ) === Infinity ||
                Number(((transaction.amount * 100) / totalIncome).toFixed(2)) <
                  0
                  ? 0
                  : ((transaction.amount * 100) / totalIncome).toFixed(2)}
                %
              </span>
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

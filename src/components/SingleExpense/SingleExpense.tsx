import { FC, useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";

//styles
import "./SingleExpense.css";

export const SingleExpense: FC = () => {
  const { deleteTransaction, expenseTransactions, incomeTransactions } =
    useContext(GlobalContext);

  const income = incomeTransactions.map(
    (incomeTransaction: { amount: number }) => incomeTransaction.amount
  );

  // calculating total sum of income
  const totalIncome = Number(
    income.reduce((acc: number, item: number) => (acc += item), 0).toFixed(2)
  );

  return (
    <div>
      {expenseTransactions.map((transaction) => (
        <li className="single-expense-item" key={transaction.id}>
          <span>{transaction.text}</span>
          <div>
            <span> -{transaction.amount.toFixed(2)}</span>
            <span className="percentage">
              {Number(((transaction.amount * 100) / totalIncome).toFixed(2)) ===
                Infinity ||
              Number(((transaction.amount * 100) / totalIncome).toFixed(2)) < 0
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
      ))}
    </div>
  );
};

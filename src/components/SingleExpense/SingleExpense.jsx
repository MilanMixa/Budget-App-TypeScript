import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";

//styles
import "./SingleExpense.css";

export const SingleExpense = () => {
  const { deleteTransaction, expenseTransactions, incomeTransactions } =
    useContext(GlobalContext);

  const income = incomeTransactions.map(
    (incomeTransaction) => incomeTransaction.amount
  );

  // calculating total sum of income
  const totalIncome = income.reduce((acc, item) => (acc += item), 0).toFixed(2);

  return (
    <div>
      {expenseTransactions.map((transaction) => (
        <li className="single-expense-item" key={transaction.id}>
          <span>{transaction.text}</span>
          <div>
            <span> -{transaction.amount.toFixed(2)}</span>
            <span className="percentage">
              {((transaction.amount * 100) / totalIncome).toFixed(2) * 1 ===
                Infinity ||
              ((transaction.amount * 100) / totalIncome).toFixed(2) * 1 < 0
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

import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";

// styles
import "./SingleIncome.css";

export const SingleIncome = () => {
  const { deleteTransaction, incomeTransactions } = useContext(GlobalContext);

  return (
    <div>
      {incomeTransactions.map((transaction) => (
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
      ))}
    </div>
  );
};

import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";

// style
import "./IncomeAndExpenses.css";

export const IncomeAndExpenses = () => {
  const { incomeTransactions, expenseTransactions } = useContext(GlobalContext);

  const income = incomeTransactions.map(
    (incomeTransaction: { amount: number }) => incomeTransaction.amount
  );

  const expense = expenseTransactions.map(
    (expenseTransaction: { amount: number }) => expenseTransaction.amount
  );

  // calculating total sum of income
  const totalIncome = Number(
    income.reduce((acc: number, item: number) => (acc += item), 0).toFixed(2)
  );

  // calculating total sum of expenses
  const totalExpense = Number(
    expense.reduce((acc: number, item: number) => (acc += item), 0).toFixed(2)
  );

  // calculating percentage
  const result = (income: number, expense: number) => {
    let percentage = Number(((expense * 100) / income).toFixed(2));

    if (!isFinite(percentage)) {
      percentage = 0;
    }
    return percentage;
  };
  const percent = result(totalIncome, totalExpense);

  // calculating the difference between income and expenses
  const finalSum = Number((totalIncome - totalExpense).toFixed(2));

  // logic for + or - sign for balance
  const sign = finalSum <= 0 ? "" : "+";

  return (
    <div className="main">
      <div>
        <h1 className="balance">
          {sign} {finalSum}
        </h1>
      </div>
      <div className="income">
        <h4>INCOME</h4>
        <p>
          +{totalIncome}
          <span className="hidden">{percent + "%"}</span>
        </p>
      </div>

      <div className="expenses">
        <h4>EXPENSES</h4>
        <p>
          -{totalExpense}
          <span className="percentage">{percent + "%"}</span>
        </p>
      </div>
    </div>
  );
};

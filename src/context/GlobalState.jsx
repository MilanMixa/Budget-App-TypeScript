import { createContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  incomeTransactions: JSON.parse(localStorage.getItem("listOfIncome")) || [],
  expenseTransactions: JSON.parse(localStorage.getItem("listOfExpenses")) || [],
};

export const GlobalContext = createContext(initialState);

export const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // storing income and expenses in local storage
  useEffect(() => {
    localStorage.setItem(
      "listOfIncome",
      JSON.stringify(state.incomeTransactions)
    );
    localStorage.setItem(
      "listOfExpenses",
      JSON.stringify(state.expenseTransactions)
    );
  }, [state.incomeTransactions, state.expenseTransactions]);

  const addExpense = (expenseTransaction) => {
    dispatch({
      type: "ADD_EXPENSE",
      payload: expenseTransaction,
    });
  };

  const addIncome = (incomeTransaction) => {
    dispatch({
      type: "ADD_INCOME",
      payload: incomeTransaction,
    });
  };

  const deleteTransaction = (id) => {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        incomeTransactions: state.incomeTransactions,
        expenseTransactions: state.expenseTransactions,
        addIncome,
        addExpense,
        deleteTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

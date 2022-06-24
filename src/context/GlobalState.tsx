import { createContext, useReducer, useEffect, ReactNode } from "react";
import AppReducer from "./AppReducer";

type GlobalContextProviderProps = {
  children: ReactNode;
};

interface IinitialState {
  addExpense: (expenseTransaction: any) => void;
  addIncome: (incomeTransaction: any) => void;
  deleteTransaction: (id: any) => void;
  incomeTransactions: any;
  expenseTransactions: any;
}

const listOfIncome = localStorage.getItem("listOfIncome");
const listOfExpenses = localStorage.getItem("listOfExpenses");

const initialState: IinitialState = {
  incomeTransactions: listOfIncome !== null ? JSON.parse(listOfIncome) : [],
  expenseTransactions:
    listOfExpenses !== null ? JSON.parse(listOfExpenses) : [],
  addExpense: function (expenseTransaction: any): void {
    throw new Error("Function not implemented.");
  },
  addIncome: function (incomeTransaction: any): void {
    throw new Error("Function not implemented.");
  },
  deleteTransaction: function (id: any): void {
    throw new Error("Function not implemented.");
  },
};

export const GlobalContext = createContext(initialState);

export const GlobalContextProvider = ({
  children,
}: GlobalContextProviderProps) => {
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

  const addExpense = (expenseTransaction: any) => {
    dispatch({
      type: "ADD_EXPENSE",
      payload: expenseTransaction,
    });
  };

  const addIncome = (incomeTransaction: any) => {
    dispatch({
      type: "ADD_INCOME",
      payload: incomeTransaction,
    });
  };

  const deleteTransaction = (id: any) => {
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

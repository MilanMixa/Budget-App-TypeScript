import { createContext, useReducer, useEffect, ReactNode } from "react";
import { IncomeAndExpense } from "../types";
import AppReducer from "./AppReducer";

type GlobalContextProviderProps = {
  children: ReactNode;
};

const noop = () => null;

interface IinitialState {
  addExpense: (expenseTransaction: IncomeAndExpense) => void;
  addIncome: (incomeTransaction: IncomeAndExpense) => void;
  deleteTransaction: (id: number) => void;
  incomeTransactions: IncomeAndExpense[];
  expenseTransactions: IncomeAndExpense[];
}

const listOfIncome = localStorage.getItem("listOfIncome");
const listOfExpenses = localStorage.getItem("listOfExpenses");

const initialState: IinitialState = {
  incomeTransactions: listOfIncome !== null ? JSON.parse(listOfIncome) : [],
  expenseTransactions:
    listOfExpenses !== null ? JSON.parse(listOfExpenses) : [],
  addExpense: noop,
  addIncome: noop,
  deleteTransaction: noop,
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

  const addExpense = (expenseTransaction: IncomeAndExpense) => {
    dispatch({
      type: "ADD_EXPENSE",
      payload: expenseTransaction,
    });
  };

  const addIncome = (incomeTransaction: IncomeAndExpense) => {
    dispatch({
      type: "ADD_INCOME",
      payload: incomeTransaction,
    });
  };

  const deleteTransaction = (id: number) => {
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

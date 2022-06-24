type CounterState = {
  incomeTransactions: any[];
  expenseTransactions: any[];
};

type CounterAction = {
  type: string;
  payload: any;
};

export default (state: CounterState, action: CounterAction) => {
  switch (action.type) {
    case "ADD_INCOME":
      return {
        ...state,
        incomeTransactions: [action.payload, ...state.incomeTransactions],
      };
    case "ADD_EXPENSE":
      return {
        ...state,
        expenseTransactions: [action.payload, ...state.expenseTransactions],
      };
    case "DELETE_TRANSACTION":
      return {
        ...state,
        incomeTransactions: state.incomeTransactions.filter(
          (incomeTransaction) => incomeTransaction.id !== action.payload
        ),
        expenseTransactions: state.expenseTransactions.filter(
          (expenseTransaction) => expenseTransaction.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

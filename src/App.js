import "./App.css";

//components

import Header from "./components/Header/Header";
import { ExpensesList } from "./components/ExpenseList/ExpensesList";
import { IncomeAndExpenses } from "./components/IncomeAndExpenses/IncomeAndExpenses";
import { IncomeList } from "./components/IncomeList/IncomeList";
import { InputFields } from "./components/InputFields/InputFields";

function App() {
  return (
    <div className="App">
      <Header />
      <IncomeAndExpenses />
      <InputFields />
      <div className="IncomeExpenseList">
        <IncomeList />
        <ExpensesList />
      </div>
    </div>
  );
}

export default App;

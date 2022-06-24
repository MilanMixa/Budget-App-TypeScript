import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";

//styles
import "./InputFields.css";

export const InputFields = () => {
  const { addIncome, addExpense } = useContext(GlobalContext);

  // state for input fields
  const [addDescription, setAddDescription] = useState("");
  const [amount, setAmount] = useState(0);

  // state for select
  const [selected, setSelected] = useState("-");

  //handler for select
  const handleChange = (e) => {
    setSelected(e.target.value);
  };

  // handle for submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // if the selected value is -, updating expenses and reseting input fields
    if (selected === "-") {
      const newExpense = {
        text: addDescription,
        amount: amount * 1,
        id: Math.floor(Math.random() * 100000000),
      };
      addExpense(newExpense);
      setAddDescription("");
      setAmount(0);
    }
    // if the selected value is +, updating expenses and reseting input fields
    if (selected === "+") {
      const newIncome = {
        text: addDescription,
        amount: amount * 1,
        id: Math.floor(Math.random() * 100000000),
      };
      addIncome(newIncome);
      setAddDescription("");
      setAmount(0);
    }
  };

  return (
    <div className="main-input">
      <form className="main-form" onSubmit={handleSubmit}>
        <select name="selected" onChange={handleChange}>
          <option value="-">-</option>
          <option value="+">+</option>
        </select>

        <input
          className="description-input"
          type="text"
          placeholder="Add description"
          maxLength={50}
          required
          onChange={(e) => {
            setAddDescription(e.target.value);
          }}
          value={addDescription || ""}
        />

        <input
          className="number-input"
          type="number"
          required
          min={1}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          value={amount || ""}
        />

        <button className={`btn ${selected === "-" ? "red" : "blue"}`}>
          Submit
        </button>
      </form>
    </div>
  );
};

import { useState } from "react";

import axios from "axios";

import { PlusCircle } from "lucide-react";

export default function ExpenseForm({ onAdd }) {

  const [title, setTitle] = useState("");

  const [amount, setAmount] = useState("");

  const [category, setCategory] = useState("");

  const [date, setDate] = useState(

    new Date()

      .toISOString()

      .substring(0, 10)

  );

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (

      !title ||

      !amount ||

      !category ||

      !date

    ) {

      return;

    }

    try {

      const token =

        localStorage.getItem(

          "token"

        );

      await axios.post(

        "http://localhost:5000/api/expenses",

        {

          title,

          amount,

          category,

          date,

        },

        {

          headers: {

            Authorization:

              `Bearer ${token}`,

          },

        }

      );

      setTitle("");

      setAmount("");

      setCategory("");

      setDate(

        new Date()

          .toISOString()

          .substring(0, 10)

      );

      if (onAdd) {

        await onAdd();

      }

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="section-card">

      <h2>

        <PlusCircle size={24} />

        Add Expense

      </h2>

      <form

        className="expense-form-grid"

        onSubmit={handleSubmit}

      >

        <input

          type="text"

          placeholder="Expense Title"

          value={title}

          onChange={(e) =>

            setTitle(

              e.target.value

            )

          }

        />

        <input

          type="number"

          placeholder="Amount"

          value={amount}

          onChange={(e) =>

            setAmount(

              e.target.value

            )

          }

        />

        <select

          value={category}

          onChange={(e) =>

            setCategory(

              e.target.value

            )

          }

        >

          <option value="">

            Category

          </option>

          <option value="Food">

            Food

          </option>

          <option value="Bills">

            Bills

          </option>

          <option value="Shopping">

            Shopping

          </option>

          <option value="Travel">

            Travel

          </option>

        </select>

        <input

          type="date"

          value={date}

          onChange={(e) =>

            setDate(

              e.target.value

            )

          }

        />

        <button

          className="main-btn"

          type="submit"

        >

          Add Expense

        </button>

      </form>

    </div>

  );

}
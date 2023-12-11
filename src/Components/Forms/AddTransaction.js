import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { transactionContext } from "../Context/TransactionContext/TransactionsContext";
import { useSearchParams } from 'react-router-dom';
import moment from 'moment';
export default function AddTransaction() {

  const { id } = useParams();
  const [searchParams] = useSearchParams();


  const { createTransactionAction, getTransactionById, editTransaction, transaction, error } = useContext(transactionContext);

  const [editPage] = useState(window.location.pathname.includes('edit'))
  const [transactionID] = useState(searchParams.get('transactionID'))
  const [formData, setFormData] = useState({
    name: "",
    transactionType: "Income",
    amount: "",
    category: "Food",
    notes: "",
    color: "",
    date: moment(new Date()).format('YYYY-MM-DD'),
  });
  //handle form change
  useEffect(() => {
    if (editPage) {
      getTransactionById(transactionID).then(res => {
        if (res.status == 'success') {
          let tr = res.data

          setFormData({
            ...formData,
            name: tr.name,
            transactionType: tr.transactionType,
            amount: tr.amount,
            category: tr.category,
            notes: tr.notes,

            date: tr.date,
          })

        }
      })

    }


  }, [id])

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //handle form submit
  const handleSubmit = e => {
    e.preventDefault();
    if (editPage) {
      const data = {
        accId: id,
        formData,
        trId: transactionID
      }
      editTransaction(data);
    } else {
      createTransactionAction({ account: id, ...formData });

    }
  };

  return (
    <>
      {
        error && (
          <>
            < div
              className="bg-red-100 border text-center border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline "> {error}</span>
            </div >
          </>)
      }
      <div className="flex  h-full flex-col  py-2 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-indigo-600">
            {editPage ? 'Edit' : "Add"} Transaction
          </h2>
        </div>

        <div className="main-container mt-4 sm:mx-auto sm:w-full sm:max-w-4xl">
          <div className="sub-container bg-white py-4 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="feild-container flex w-full">
                <div className="w-full mr-6" >
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <div className="mt-1">
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      type="text"
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Transaction Type
                  </label>
                  <select
                    defaultValue={"Expenses"}
                    name="transactionType"
                    value={formData.transactionType}
                    onChange={handleChange}
                    className="mt-1 block w-full border-2 rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="Income">Income (+)</option>
                    <option value="Expenses" >Expense (-)</option>
                  </select>
                </div>
              </div>
              <div className="feild-container flex w-full">
                <div className="w-full mr-6" >
                  <label className="block text-sm font-medium text-gray-700">
                    Amount ($)
                  </label>
                  <div className="mt-1">
                    <input
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      type="number"
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Transaction Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="mt-1 block w-full border-2 rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="Food">Food</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Healt">Health</option>
                    <option value="Travel">Travel</option>
                    <option value="Education">Education</option>
                    <option value="Personal">Personal</option>
                    <option value="Groceries">Groceries</option>
                    <option value="Bills">Bills</option>
                    <option value="Uncategorized">Others</option>
                  </select>
                </div>
              </div>


              <div className="feild-container flex w-full">
                <div className="w-full mr-6 ">
                  <label className="block text-sm font-medium text-gray-700">
                    Date
                  </label>
                  <div className="mt-1">
                    <input
                      name="date"
                      value={moment(formData.date).format('YYYY-MM-DD')}
                      onChange={handleChange}
                      type="date"
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="w-full ">

                  <label className="block text-sm font-medium text-gray-700">
                    Add Note
                  </label>
                  <div className="mt-1">
                    <input

                      name="notes"
                      type="text"
                      value={formData.notes}
                      onChange={handleChange}
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

              </div>

              <div className="feild-container flex justify-center ">
                <button
                  type="submit"
                  className="w-1/2  justify-center item-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add New Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </>
  );
}

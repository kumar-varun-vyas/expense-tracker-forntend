import { useContext, useEffect, useState } from "react";
import { accountContext } from "../Context/AccountContext/AccountContext";
import { useParams } from "react-router-dom";

export default function AddAccount() {
  const { id } = useParams();
  const { createAccount, error, getAccountDetails, updateAccount } = useContext(accountContext);
  const [isEditPage, setEditPage] = useState(window.location.pathname.indexOf("edit-account") !== -1)
  const [account, setAccount] = useState('')
  const [formData, setFormData] = useState({
    name: "",
    accountType: "",
    initialBalance: "",
    notes: "",
  });

  useEffect(() => {
    // console.log("edit-account", window.location.pathname);
    if (window.location.pathname.indexOf("edit-account") !== -1)
      setEditPage(true)
  }, [])

  useEffect(() => {
    if (window.location.pathname.indexOf("edit-account") !== -1) {

      getAccountDetails(id).then((res) => {
        if (res.status == 'success') {
          let acc = res.data
          console.log("acc-----------", acc);
          setFormData({
            ...formData,
            name: acc.name,
            accountType: acc.accountType,
            initialBalance: acc.initialBalance,
            notes: acc.notes,

          })

        }
      })

    }


  }, [id])
  // console.log(error, isEditPage)

  //handle form change
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //handle form submit
  const handleSubmit = e => {
    e.preventDefault();
    if (isEditPage) {
      const data = {
        accId: id,
        formData,
      }
      updateAccount(data);
    };
    createAccount(formData);

  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-6 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-1 text-center text-3xl font-bold tracking-tight text-indigo-600">
            {isEditPage ? "Edit" : "Add"} Account
          </h2>
        </div>
        <span className="text-center text-red-600">{error}</span>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <div className="mt-1">
                  <input
                    value={formData.name}
                    onChange={handleChange}
                    name="name"
                    type="text"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Initial Deposit ($)
                </label>
                <div className="mt-1">
                  <input
                    value={formData.initialBalance}
                    onChange={handleChange}
                    name="initialBalance"
                    type="number"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Account Type
                </label>
                <select
                  name="accountType"
                  value={formData.accountType}
                  onChange={handleChange}
                  className="mt-1 block w-full border-2 rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="">- select -</option>
                  <option value="Saving">Savings</option>
                  <option value="Investment">Investment</option>
                  <option value="Checking">Checking</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Builing">Builing</option>
                  <option value="Travel">Travel</option>
                  <option value="Education">Education</option>
                  <option value="Personal">Personal</option>
                  <option value="Groceries">Groceries</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Project">Project</option>
                  <option value="Uncategorized">Uncategorized</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Add Note
                </label>
                <div className="mt-1">
                  <textarea
                    rows={4}
                    name="notes"
                    type="text"
                    value={formData.notes}
                    onChange={handleChange}
                    className="block w-full border-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full  justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {isEditPage ? "Edit" : "Add"} Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

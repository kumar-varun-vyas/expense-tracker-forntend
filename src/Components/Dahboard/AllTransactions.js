import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from 'moment';
import { transactionContext } from "../Context/TransactionContext/TransactionsContext";
import Pagination from "../Pagination/Pagination";
import { useNavigate } from 'react-router-dom';
const AllTransactions = ({ transactions, handleNextBtn, handlePrevBtn, page, pageCount, setPage, totalData, accountId }) => {

  const { getAllTransactionByAc, deleteTransaction, loading, error } = useContext(transactionContext)
  const navigate = useNavigate();
  const onDeleteHandler = (id) => {
    deleteTransaction(id)
    window.href.reload()
  }
  const onEditHandler = (id) => {


    window.location = `/edit-transaction/${accountId}?type=edit&transactionID=${id}`;
  }





  return (
    <>

      {error &&
        <>
          < div
            className="bg-red-100 border text-center border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline "> {error}</span>
          </div >
        </>}
      {loading ? <div
        className="bg-red-100 border text-center text-indigo-700 px-4 py-3 rounded relative"
        role="alert"
      > Loading.... </div>
        :

        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">
                All Transactions
              </h1>
              <p className="mt-2 text-sm text-gray-700">
                All transactions including expenses and income for this account
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <Link
                to={`/add-transaction/${transactions?.[0]?.account}`}
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              >
                Add New Transaction
              </Link>
            </div>
          </div>
          <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-10"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Type
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Amount
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Note
                        </th>
                        <th
                          scope="col"
                          className="relative py-3.5 pl-1 pr-2 sm:pr-6"
                        >
                          <span className="sr-only">Edit</span>
                        </th>
                        <th
                          scope="col"
                          className="relative py-3.5 pl-1 pr-2 sm:pr-6"
                        >
                          <span className="sr-only">Delete</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {/* loop */}
                      {transactions?.map((transaction) => (
                        <tr key={transaction?.email} className={transactions?.color}>
                          <td className="whitespace-nowrap py-3 pl-3  text-sm sm:pl-6">
                            <div className="flex items-center">

                              <div className="font-medium text-gray-900">
                                {moment(transaction?.createdAt).format('ll')}
                              </div>
                              {/* <div className="text-gray-500">Emma</div> */}

                            </div>
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                            <div className="flex items-center">
                              <div className="font-medium text-gray-900">
                                {transaction?.name}
                              </div>
                              {/* <div className="text-gray-500">Emma</div> */}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <div className="text-gray-900">
                              {transaction?.transactionType}
                            </div>
                            {/* <div className="text-gray-500">
                            {account?.department}nn
                          </div> */}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <span className={`inline-flex rounded-full  ${transaction?.transactionType == 'Income' ? "bg-green-700" : "bg-red-700"} px-2 text-xs font-semibold leading-5 text-white`}>
                              $ {transaction?.amount}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {transaction?.notes}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
                            onClick={() => onEditHandler(transaction?._id)}
                          >
                            <div
                              className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                            >
                              Edit
                              <span className="sr-only">, {transaction?.name}</span>
                            </div>
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
                            onClick={() => onDeleteHandler(transaction?._id)}>
                            <a
                              href="#"
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete

                            </a>
                          </td>
                        </tr>
                      ))}

                      {/* end */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      <Pagination handleNextBtn={handleNextBtn} handlePrevBtn={handlePrevBtn} page={page} pageCount={pageCount} setPage={setPage} totalData={totalData} />


    </>
  );
};

export default AllTransactions;

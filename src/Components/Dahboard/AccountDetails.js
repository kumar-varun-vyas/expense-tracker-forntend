import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import AllTransactions from "./AllTransactions";
import { useContext, useEffect } from "react";
import { accountContext } from "../Context/AccountContext/AccountContext";
import { transactionContext } from "../Context/TransactionContext/TransactionsContext";
import { PlusIcon } from "@heroicons/react/20/solid";


export default function AccountDetails() {
  const { accountId } = useParams("id")
  const { getAccountDetails } = useContext(accountContext)
  const { getAllTransactionByAc, transactions, deleteTransaction, loading, error } = useContext(transactionContext)


  const [page, setPage] = useState(1);
  const [account, setAccount] = useState('')
  const [pageCount, setPageCount] = useState(4)
  const [totalData, setTotalData] = useState(0)
  const [transaction, setTransaction] = useState(transactions.data)

  useEffect(() => {
    getAccountDetails(accountId).then((res) => {
      setAccount(res)
    })
    getAllTransactionByAc(accountId, page)

  }, [accountId, page])

  useEffect(() => {
    setTransaction(transactions.data)
    setPageCount(transactions?.pagination?.pagecount)
    setTotalData(transactions?.pagination?.count)

  }, [transactions])

  console.log("ac----", account)
  // pagination 
  //prev btn
  const handlePrevBtn = () => {

    setPage(() => {
      if (page === 1) return page;
      else {
        return page - 1
      }
    })

  }
  //next btn
  const handleNextBtn = () => {
    setPage((page) => {
      if (page === pageCount) return page;
      else {
        return page + 1
      }
    })

  }
  const totalExpenses = transaction?.reduce((acc, transaction) => {
    if (transaction?.transactionType === "Expenses") {
      return acc + transaction?.amount
    } else {
      return acc
    }
  }, 0)


  const totalIncome = transaction?.reduce((acc, transaction) => {
    if (transaction?.transactionType === "Income") {
      return acc + transaction?.amount
    } else {
      return acc
    }
  }, 0)

  return (
    <>

      {transaction?.length <= 0 ?
        <>
          <h2 className="text-center text-red-500 m-10">This Account have no transactions</h2>

          <div className="text-center">
            <Link to={`/add-transaction/${accountId}`}
              className="relative inline-flex items-center rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <PlusIcon
                className="-ml-1 mr-2 h-5 w-5"
                aria-hidden="true"
              />
              <span>New Transaction</span>
            </Link>
          </div>
        </> :
        <>    <div className="bg-gray-50 ">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-lg  font-bold text-gray-900 sm:text-4xl">
                {account?.name}
              </h2>
              <p className="mt-2 text text-gray-500 sm:mt-2">
                {account?.notes}
              </p>
            </div>
          </div>
          <div className="div-1 mt-5 bg-white pb-6 sm:pb-8">
            <div className="div-2 relative">
              <div className="div-3 absolute inset-0 h-1/2 bg-gray-50" />
              <div className="div-4 relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="div-5 mx-auto max-w-4xl">
                  <dl className=" div-6 rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
                    <div className="flex flex-col border-t border-b border-gray-100 pb-1 text-center sm:border-0  sm:border-r">
                      <dt className=" mt-2 text-lg font-medium leading-6 text-gray-500">
                        Total Balance
                      </dt>
                      <dd className=" text-4xl font-bold tracking-tight text-indigo-600">
                        ${account?.totalBalance}
                        {/* $ {totalIncome + account?.initialBalance - totalExpenses} */}
                      </dd>

                    </div>

                    <div className="flex flex-col border-t border-b border-gray-100 pb-1 text-center sm:border-0 sm:border-l sm:border-r">
                      <dt className=" mt-2 text-lg font-medium leading-6 text-gray-500">
                        Total Expense
                      </dt>
                      <dd className=" text-4xl font-bold tracking-tight text-red-600">
                        $ {account?.totalExpense}
                      </dd>
                      {/* <Link
                        // to={`/expenses-list/${accountID}`}
                        className="  font-bold tracking-tight text-green-600"
                      >
                        View History
                      </Link> */}
                    </div>
                    <div className="flex flex-col border-t border-gray-100 pb-1 text-center sm:border-0 sm:border-l">
                      <dt className=" mt-2 text-lg font-medium leading-6 text-gray-500">
                        Total Income
                      </dt>
                      <dd className=" text-4xl font-bold tracking-tight text-green-600">
                        $ {account?.totalIncome}
                      </dd>
                      {/* <Link
                        // to={`/income-list/${accountID}`}
                        className="  font-bold tracking-tight text-green-600"
                      >
                        View History
                      </Link> */}
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
          <AllTransactions transactions={transaction} handleNextBtn={handleNextBtn} handlePrevBtn={handlePrevBtn} page={page} pageCount={pageCount} setPage={setPage} totalData={totalData} accountId={accountId} />
        </>
      }

    </>
  );
}

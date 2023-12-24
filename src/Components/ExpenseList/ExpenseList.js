import React from 'react'
import { authContext } from "../Context/AuthContext/AuthContext";
import { useContext, useEffect } from "react";
import moment from 'moment';
import MainPage from "../MainPage/MainPage";
const ExpenseList = () => {
    const { fetchProfileAction, expenseList, error } = useContext(authContext)

    useEffect(() => {
        localStorage.setItem("active", 4)
        fetchProfileAction()
    }, [])
    return (
        <>
            {error ? (
                <>
                    < div
                        className="bg-red-100 border text-center border-red-400 text-red-700 px-4 py-3 rounded relative"
                        role="alert"
                    >
                        <strong className="font-bold">Error!</strong>
                        <span className="block sm:inline "> {error}</span>
                    </div >
                </>) :

                <MainPage>
                    <div className="px-10 ">

                        {expenseList?.length <= 0
                            ?
                            <>
                                <p className="mb-4 text-xl font-medium  text-coolGray-500">
                                    No Transction Found
                                </p>
                                <p className="mb-4 text-lg text-coolGray-500 ">
                                    You have not created any Transaction yet.
                                </p>

                            </>
                            :
                            <>
                                <div className="sm:flex sm:items-center">
                                    {expenseList?.length >= 0 &&
                                        <div>
                                            <h3 className="mb-4 mt-2 text-3xl  leading-tight text-indigo-600 font-bold ">
                                                View All Expense Transactions
                                            </h3>
                                            <p className="text-sm  text-coolGray-500 font-normal">
                                                All transactions expense for this account
                                            </p>
                                        </div>

                                    }
                                </div>
                                <div className="expense-list-container mt-8 flex flex-col  h-3/4">
                                    <div className="-my-2 -mx-4  sm:-mx-6 lg:-mx-8">
                                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8 h-[80vh] overflow-auto ">
                                            <div className=" table-container overflow-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg h-[60vh]">
                                                <table className="table-lists table-fixed w-full divide-y divide-gray-300  " >
                                                    <thead className="bg-gray-50 ">
                                                        <tr>
                                                            <th class="px-4 py-2 text-sm  font-semibold text-gray-900  "> Date</th>
                                                            <th class="px-4 py-2 text-sm  font-semibold text-gray-900 ">name</th>
                                                            <th class="px-4 py-2 text-sm  font-semibold text-gray-900 ">type</th>
                                                            <th class="px-4 py-2 text-sm  font-semibold text-gray-900 ">amount</th>
                                                            <th class="px-4 py-2 text-sm  font-semibold text-gray-900 ">Note</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200 bg-white overflow-auto ">
                                                        {/* loop */}
                                                        {expenseList?.map((transaction) => (
                                                            <tr key={transaction?.email}  >
                                                                <td class=" px-4 py-2 text-center" > {moment(transaction?.createdAt).format('ll')}</td>
                                                                <td class=" px-4 py-2 text-center">{transaction?.name}</td>
                                                                <td class=" px-4 py-2 text-center">{transaction?.transactionType}</td>
                                                                <td class=" px-4 py-2 text-center">{transaction?.amount}</td>
                                                                <td class=" px-4 py-2 text-center">{transaction?.notes}</td>
                                                            </tr>

                                                        ))}

                                                    </tbody>
                                                </table>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                </MainPage>
            }
        </>
    );
};




export default ExpenseList
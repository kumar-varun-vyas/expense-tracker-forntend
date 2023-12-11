import React, { useEffect, useContext } from "react";
import { transactionContext } from "../Context/TransactionContext/TransactionsContext";
import { Link } from "react-router-dom";
import moment from 'moment';
const AccountSummary = ({ profileData, incomeList, expenseList }) => {
  console.log("profileData", profileData)
  const accounts = []

  useEffect(() => {

  }, [profileData])
  return (
    <>
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <h3 className="mb-4 text-xl md:text-4xl leading-tight text-indigo-600 font-bold tracking-tighter mt-4">
          Total Income/Expenses of All Accounts
        </h3>
        {/* <p className="text-lg md:text-xl text-coolGray-500 font-medium">
          A list of your company's accounts, either separated by category or in
          chronological order.
        </p> */}
      </div>
      <section className="bg-coolGray-50 py-4">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap -m-3">
            <div className="w-full md:w-1/3 p-3">
              <div className="p-8 bg-white border border-coolGray-100 rounded-md shadow-dashboard">
                <div className="flex flex-wrap items-end justify-between -m-2 mb-2">
                  <div className="w-auto p-2">
                    <h3 className="text-xl  font-medium text-gray-500">
                      Total Income
                    </h3>
                  </div>
                  <div className="w-auto p-2 bg-slate-200 rounded-3xl">
                    <a href="/all-income-transactions">
                      <svg
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 6.66666C7.73629 6.66666 7.47851 6.74486 7.25924 6.89137C7.03998 7.03788 6.86908 7.24612 6.76816 7.48975C6.66724 7.73339 6.64084 8.00148 6.69229 8.26012C6.74373 8.51876 6.87072 8.75634 7.05719 8.94281C7.24366 9.12928 7.48124 9.25626 7.73988 9.30771C7.99852 9.35916 8.26661 9.33275 8.51025 9.23184C8.75388 9.13092 8.96212 8.96002 9.10863 8.74076C9.25514 8.52149 9.33333 8.26371 9.33333 8C9.33333 7.64638 9.19286 7.30724 8.94281 7.05719C8.69276 6.80714 8.35362 6.66666 8 6.66666ZM3.33333 6.66666C3.06963 6.66666 2.81184 6.74486 2.59257 6.89137C2.37331 7.03788 2.20241 7.24612 2.10149 7.48975C2.00058 7.73339 1.97417 8.00148 2.02562 8.26012C2.07707 8.51876 2.20405 8.75634 2.39052 8.94281C2.57699 9.12928 2.81457 9.25626 3.07321 9.30771C3.33185 9.35916 3.59994 9.33275 3.84358 9.23184C4.08721 9.13092 4.29545 8.96002 4.44196 8.74076C4.58847 8.52149 4.66667 8.26371 4.66667 8C4.66667 7.64638 4.52619 7.30724 4.27614 7.05719C4.02609 6.80714 3.68696 6.66666 3.33333 6.66666ZM12.6667 6.66666C12.403 6.66666 12.1452 6.74486 11.9259 6.89137C11.7066 7.03788 11.5357 7.24612 11.4348 7.48975C11.3339 7.73339 11.3075 8.00148 11.359 8.26012C11.4104 8.51876 11.5374 8.75634 11.7239 8.94281C11.9103 9.12928 12.1479 9.25626 12.4065 9.30771C12.6652 9.35916 12.9333 9.33275 13.1769 9.23184C13.4205 9.13092 13.6288 8.96002 13.7753 8.74076C13.9218 8.52149 14 8.26371 14 8C14 7.64638 13.8595 7.30724 13.6095 7.05719C13.3594 6.80714 13.0203 6.66666 12.6667 6.66666Z"
                          fill="#D5DAE1"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between -m-1">
                  <div className="w-auto p-1">
                    <h2 className="font-medium text-3xl text-green-600 tracking-tighter">
                      $ {profileData?.totalIncome}
                    </h2>
                  </div>

                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-3">
              <div className="p-8 bg-white border border-coolGray-100 rounded-md shadow-dashboard">
                <div className="flex flex-wrap items-end justify-between -m-2 mb-2">
                  <div className="w-auto p-2">
                    <h3 className="text-xl text-gray-500 font-medium">
                      Total Expenses
                    </h3>
                  </div>
                  <div className="w-auto p-2  bg-slate-200 rounded-3xl">
                    <a href="/all-expense-transactions">
                      <svg
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 6.66666C7.73629 6.66666 7.47851 6.74486 7.25924 6.89137C7.03998 7.03788 6.86908 7.24612 6.76816 7.48975C6.66724 7.73339 6.64084 8.00148 6.69229 8.26012C6.74373 8.51876 6.87072 8.75634 7.05719 8.94281C7.24366 9.12928 7.48124 9.25626 7.73988 9.30771C7.99852 9.35916 8.26661 9.33275 8.51025 9.23184C8.75388 9.13092 8.96212 8.96002 9.10863 8.74076C9.25514 8.52149 9.33333 8.26371 9.33333 8C9.33333 7.64638 9.19286 7.30724 8.94281 7.05719C8.69276 6.80714 8.35362 6.66666 8 6.66666ZM3.33333 6.66666C3.06963 6.66666 2.81184 6.74486 2.59257 6.89137C2.37331 7.03788 2.20241 7.24612 2.10149 7.48975C2.00058 7.73339 1.97417 8.00148 2.02562 8.26012C2.07707 8.51876 2.20405 8.75634 2.39052 8.94281C2.57699 9.12928 2.81457 9.25626 3.07321 9.30771C3.33185 9.35916 3.59994 9.33275 3.84358 9.23184C4.08721 9.13092 4.29545 8.96002 4.44196 8.74076C4.58847 8.52149 4.66667 8.26371 4.66667 8C4.66667 7.64638 4.52619 7.30724 4.27614 7.05719C4.02609 6.80714 3.68696 6.66666 3.33333 6.66666ZM12.6667 6.66666C12.403 6.66666 12.1452 6.74486 11.9259 6.89137C11.7066 7.03788 11.5357 7.24612 11.4348 7.48975C11.3339 7.73339 11.3075 8.00148 11.359 8.26012C11.4104 8.51876 11.5374 8.75634 11.7239 8.94281C11.9103 9.12928 12.1479 9.25626 12.4065 9.30771C12.6652 9.35916 12.9333 9.33275 13.1769 9.23184C13.4205 9.13092 13.6288 8.96002 13.7753 8.74076C13.9218 8.52149 14 8.26371 14 8C14 7.64638 13.8595 7.30724 13.6095 7.05719C13.3594 6.80714 13.0203 6.66666 12.6667 6.66666Z"
                          fill="#D5DAE1"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between -m-1">
                  <div className="w-auto p-1">
                    <h2 className="font-medium text-3xl text-red-600 tracking-tighter">
                      $ {profileData?.totalExpense}
                    </h2>
                  </div>

                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-3">
              <div className="p-8 bg-white border border-coolGray-100 rounded-md shadow-dashboard">
                <div className="flex flex-wrap items-end justify-between -m-2 mb-2">
                  <div className="w-auto p-2">
                    <h3 className="text-xl text-gray-500 font-medium">
                      Total Balance
                    </h3>
                  </div>

                </div>
                <div className="flex flex-wrap items-center justify-between -m-1">
                  <div className="w-auto p-1">
                    <h2 className="font-medium text-3xl text-indigo-600 tracking-tighter">
                      $ {profileData?.totalBalance}
                    </h2>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="m-auto px-4 w-[95%] flex mt-4 "   >

        <div className="container py-2 overflow-auto  border border-coolGray-100 rounded-md p-2  m-2 min-h-[150px]">
          <div className="text-green-600 text-center font-bold">Recent Incomes </div>
          <div className=" mx-auto">
            {incomeList.length > 0 && incomeList?.map((item, i) => i < 3 &&
              listView(item)
            )}
            {incomeList.length <= 0 && <div className=" flex justify-center">No transaction has been created yet.</div>}

          </div>
        </div>
        <div className="container py-2 overflow-auto   border border-coolGray-100 rounded-md p-2 m-2 min-h-[150px]">
          <div className="text-red-600 text-center font-bold">Recent Expenses</div>
          <div className=" mx-auto">
            {expenseList.length > 0 && expenseList?.map((item, i) => i < 3 &&
              listView(item)
            )}
            {incomeList.length <= 0 && <div className=" flex justify-center">No transaction has been created yet.</div>}

          </div>
        </div>
      </section >
    </>
  );
};

export default AccountSummary;

const listView = (acc) => {

  return (<>
    <div className="group m-2" key={acc._id}>
      <div className="flex items-center justify-between flex-wrap px-1 hover:bg-coolGray-50 group-hover:bg-coolGray-100 rounded-md   transition duration-200 border">
        <div className="flex-1 ">
          <h3 className="text-[18px]  text-gray-600  ">
            {acc?.name}

          </h3>
        </div>
        <div className="flex-1 text-center   text-gray-600 ">
          {acc?.amount}
        </div>
        <div className="flex-1 text-right   text-gray-600 " >
          {moment(acc?.date).format('ll')}

        </div>


      </div>
    </div >

  </>)
}


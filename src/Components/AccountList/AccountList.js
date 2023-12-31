import { Link } from "react-router-dom";
import { authContext } from "../Context/AuthContext/AuthContext";
import { accountContext } from "../Context/AccountContext/AccountContext";
import { useContext, useEffect, useState } from "react";
import MainPage from "../MainPage/MainPage";

const AccountList = () => {
  const { fetchProfileAction, profile, error } = useContext(authContext)
  const { deleteAccount } = useContext(accountContext)

  const [accounts, setAccounts] = useState(profile?.accounts)
  console.log(accounts?.map((acc) => acc))

  useEffect(() => {
    fetchProfileAction()
  }, [])
  useEffect(() => {
    setAccounts(profile?.data?.accounts)
  }, [profile])

  const onDeleteHandler = (id) => {
    deleteAccount(id)

  }
  const onEditHandler = (id) => {
    window.location = `/edit-account/${id}`;
  }



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
          <section className=" bg-white h-[84vh]" >
            <div className="container bg-gray-50 py-2 overflow-auto  mx-auto h-[84vh]">
              {/* header */}
              {accounts?.length <= 0 ? '' :
                <div className="mx-10  mb-12 text-start">
                  <div className=" w-full container flex justify-between">
                    <div>
                      <h3 className="mb-4 text-3xl  leading-tight text-indigo-600 font-bold ">
                        Accounts
                      </h3>
                      <p className="text-sm  text-coolGray-500 font-normal">
                        A list of your company's accounts, either separated by category or
                        in chronological order.
                      </p>
                    </div>
                    <Link
                      to="/dashboard/accounts/create"
                      className="inline-flex my-8  items-center rounded-md border border-transparent bg-indigo-500 px-2 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-4 h-4 m-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Add New
                    </Link>
                  </div>
                </div>
              }
              {/* no acc */}

              <div className="max-w-5xl mx-auto">
                {accounts?.length <= 0
                  ?
                  <>
                    <p className="mb-4 text-xl font-medium text-center text-coolGray-500">
                      No Accounts Found
                    </p>
                    <p className="mb-4 text-lg text-coolGray-500">
                      You have not created any accounts yet. Click the button below to
                      create one.
                    </p>
                    <Link
                      to="/dashboard/accounts/create"
                      className="px-6 py-3 text-lg font-medium text-center text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                    >
                      Create Account
                    </Link>
                  </>
                  :

                  <>
                    {accounts?.map((acc, i) =>
                      <>
                        <div className="group mb-6 mx-4" key={i}>
                          <div className="flex items-center justify-between flex-wrap px-2 hover:bg-coolGray-50 group-hover:bg-coolGray-100 rounded-md   transition duration-200 border">
                            <div className="  flex-1">
                              <h3 className=" text-lg md:text-lg text-gray-600 group-hover:text-coolGray-900 font-semibold">
                                {acc?.name}

                              </h3>
                            </div>
                            <div className="flex-1 text-gray-600 p-1 rounded">
                              {acc?.accountType}
                            </div>
                            <div className={acc?.initialBalance > 0 ? 'grow font-medium text-green-500' : ' grow font-medium text-red-700'}>
                              {acc?.initialBalance}
                            </div>
                            <div className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
                              onClick={() => onEditHandler(acc?._id)}
                            >
                              <div
                                className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                              >
                                Edit

                              </div>
                            </div>
                            <div className=" grow-0 relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
                              onClick={() => onDeleteHandler(acc?._id)}>
                              <a
                                href="#"
                                className="text-red-600 hover:text-red-900"
                              >
                                Delete

                              </a>
                            </div>
                            <div>
                              <Link to={`/account-details/${acc.id}`}>
                                <div className="w-full md:w-1/2 md:text-right">
                                  <div className="inline-flex items-center leading-6 text-indigo-500 group-hover:text-indigo-600 font-medium transition duration-200">
                                    <span className="mr-2">View </span>
                                    <svg
                                      width={20}
                                      height={20}
                                      viewBox="0 0 20 20"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M13.71 10.71C13.801 10.6149 13.8724 10.5028 13.92 10.38C14.02 10.1365 14.02 9.86346 13.92 9.62C13.8724 9.49725 13.801 9.3851 13.71 9.29L10.71 6.29C10.5217 6.1017 10.2663 5.99591 10 5.99591C9.7337 5.99591 9.47831 6.1017 9.29 6.29C9.1017 6.4783 8.99591 6.7337 8.99591 7C8.99591 7.2663 9.1017 7.5217 9.29 7.71L10.59 9L7 9C6.73479 9 6.48043 9.10536 6.2929 9.29289C6.10536 9.48043 6 9.73478 6 10C6 10.2652 6.10536 10.5196 6.2929 10.7071C6.48043 10.8946 6.73479 11 7 11L10.59 11L9.29 12.29C9.19628 12.383 9.12188 12.4936 9.07111 12.6154C9.02034 12.7373 8.99421 12.868 8.99421 13C8.99421 13.132 9.02034 13.2627 9.07111 13.3846C9.12188 13.5064 9.19628 13.617 9.29 13.71C9.38297 13.8037 9.49357 13.8781 9.61543 13.9289C9.73729 13.9797 9.86799 14.0058 10 14.0058C10.132 14.0058 10.2627 13.9797 10.3846 13.9289C10.5064 13.8781 10.617 13.8037 10.71 13.71L13.71 10.71ZM20 10C20 8.02219 19.4135 6.08879 18.3147 4.4443C17.2159 2.79981 15.6541 1.51808 13.8268 0.761204C11.9996 0.00432792 9.98891 -0.193706 8.0491 0.192146C6.10929 0.577999 4.32746 1.53041 2.92894 2.92893C1.53041 4.32746 0.578004 6.10929 0.192152 8.0491C-0.1937 9.98891 0.00433294 11.9996 0.761209 13.8268C1.51809 15.6541 2.79981 17.2159 4.4443 18.3147C6.08879 19.4135 8.02219 20 10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C17.9997 16.1425 18.7363 15.0401 19.2388 13.8268C19.7413 12.6136 20 11.3132 20 10ZM2 10C2 8.41775 2.4692 6.87103 3.34825 5.55544C4.2273 4.23985 5.47673 3.21446 6.93854 2.60896C8.40035 2.00346 10.0089 1.84504 11.5607 2.15372C13.1126 2.4624 14.538 3.22433 15.6569 4.34315C16.7757 5.46197 17.5376 6.88743 17.8463 8.43928C18.155 9.99113 17.9965 11.5997 17.391 13.0615C16.7855 14.5233 15.7602 15.7727 14.4446 16.6518C13.129 17.5308 11.5823 18 10 18C7.87827 18 5.84344 17.1571 4.34315 15.6569C2.84286 14.1566 2 12.1217 2 10Z"
                                        fill="currentColor"
                                      />
                                    </svg>
                                  </div>
                                </div>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </>



                }

                {/* acc */}

              </div>
            </div>
          </section>
        </MainPage>
      }
    </>
  );
};

export default AccountList;

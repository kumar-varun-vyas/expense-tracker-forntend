import AccountList from "../AccountList/AccountList";
import AccountSummary from "./AccountSummary";
import { authContext } from "../Context/AuthContext/AuthContext";
import { useContext, useEffect } from "react";


const AccountDashboard = () => {
  const { fetchProfileAction, profile, error, incomeList, expenseList } = useContext(authContext)

  useEffect(() => {
    fetchProfileAction()
  }, [])



  return (
    <>
      {
        error ? (
          <>
            < div
              className="bg-red-100 border text-center border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline "> {error}</span>
            </div >
          </>)
          : (<>
            <AccountSummary profileData={profile} incomeList={incomeList} expenseList={expenseList} />
          </>)
      }
    </>

  );
};

export default AccountDashboard;

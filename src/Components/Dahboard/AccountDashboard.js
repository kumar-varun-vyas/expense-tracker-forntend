import AccountSummary from "./AccountSummary";
import { authContext } from "../Context/AuthContext/AuthContext";
import { useContext, useEffect } from "react";
import MainPage from "../MainPage/MainPage";

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
            <MainPage>
              <AccountSummary profileData={profile} incomeList={incomeList} expenseList={expenseList} />
            </MainPage>
          </>)
      }
    </>

  );
};

export default AccountDashboard;

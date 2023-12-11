import React, { useContext } from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../../Components/Forms/Login';
// import Home from '../../Components/HomePage/HomePage'
import Register from '../../Components/Forms/Register';
import Navbar from '../../Components/Navbar/Navbar';
import AddTransaction from '../../Components/Forms/AddTransaction';
import AccountDashboard from '../../Components/Dahboard/AccountDashboard';
import AccountDetails from '../../Components/Dahboard/AccountDetails';
import AddAccount from '../../Components/Forms/AddAccount';
import AccountList from '../../Components/AccountList/AccountList'
import SideBar from '../../Components/Sidebar/Sidebar.js'
import MainPage from '../../Components/MainPage/MainPage.js';
import IncomeList from '../IncomeList/IncomeList.js';
import ExpenseList from '../ExpenseList/ExpenseList.js';
import { authContext } from '../Context/AuthContext/AuthContext.js';
import NotFoundPage from "../NotFoundPage.js";
function NavPage() {
    const { logoutUser, token } = useContext(authContext)

    return (
        <div className="App border-2  h-[85vh]">
            {/* <BrowserRouter> */}

            {/* <MainPage /> */}
            <Routes>
                {!token ? <>
                    <Route path="/" element={<Login />} />
                </> :
                    <>
                        <Route exact path="/accounts" element={<AccountList />} />
                        <Route exact path="/dashboard" element={<AccountDashboard />} />
                        <Route exact path="/account-details/:accountId" element={<AccountDetails />} />
                        <Route exact path="/dashboard/accounts/create" element={<AddAccount />} />
                        <Route exact path="/edit-account/:id" element={<AddAccount />} />
                        <Route exact path="/add-transaction/:id" element={<AddTransaction />} />
                        <Route exact path="/edit-transaction/:id" element={<AddTransaction />} />
                        <Route exact path="/all-income-transactions" element={<IncomeList />} />
                        <Route exact path="/all-expense-transactions" element={<ExpenseList />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </>}


            </Routes>
            {/* </BrowserRouter> */}
        </div>
    );
}

export default NavPage;

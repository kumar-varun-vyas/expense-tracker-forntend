import { BrowserRouter, Routes, Route, redirect } from 'react-router-dom'
import Login from './Components/Forms/Login';
import Register from './Components/Forms/Register';
import Navbar from './Components/Navbar/Navbar';
import { authContext } from './Components/Context/AuthContext/AuthContext.js';
import { useContext, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import NotFoundPage from './Components/NotFoundPage.js';
import AddTransaction from './Components/Forms/AddTransaction';
import AccountDashboard from './Components/Dahboard/AccountDashboard';
import AccountDetails from './Components/Dahboard/AccountDetails';
import AddAccount from './Components/Forms/AddAccount';
import AccountList from './Components/AccountList/AccountList'
import IncomeList from './Components/IncomeList/IncomeList.js';
import ExpenseList from './Components/ExpenseList/ExpenseList.js';
import ProtectedRoute from './Components/protectedRoute/ProtectedRoute.js';

function App() {
  const { logoutUser, token } = useContext(authContext)
  useEffect(() => {
    if (token && window.location.pathname == '/') {
      logoutUser()
      return redirect('/')
    }
  }, [])


  return (
    <div className="App">
      < Navbar />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute isAuth={token} />}>
            <Route path="/accounts" element={<AccountList />} />
            <Route path="/dashboard" element={<AccountDashboard />} />
            <Route path="/account-details/:accountId" element={<AccountDetails />} />
            <Route path="/dashboard/accounts/create" element={<AddAccount />} />
            <Route path="/edit-account/:id" element={<AddAccount />} />
            <Route path="/add-transaction/:id" element={<AddTransaction />} />
            <Route path="/edit-transaction/:id" element={<AddTransaction />} />
            <Route path="/all-income-transactions" element={<IncomeList />} />
            <Route path="/all-expense-transactions" element={<ExpenseList />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>

      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;

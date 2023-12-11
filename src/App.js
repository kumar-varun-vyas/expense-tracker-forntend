import { BrowserRouter, Routes, Route, redirect } from 'react-router-dom'
import Login from './Components/Forms/Login';
import Register from './Components/Forms/Register';
import Navbar from './Components/Navbar/Navbar';
import MainPage from './Components/MainPage/MainPage.js';
import { authContext } from './Components/Context/AuthContext/AuthContext.js';
import { useContext, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import NotFoundPage from './Components/NotFoundPage.js';

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
      <BrowserRouter>



        {/*<SideBar /> */}
        < Navbar />
        {token ? <MainPage /> : (
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route path="*" element={<NotFoundPage />} />
            {/* <Route path="/" element={<Login />} /> */}

          </Routes>
        )

        }

      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;

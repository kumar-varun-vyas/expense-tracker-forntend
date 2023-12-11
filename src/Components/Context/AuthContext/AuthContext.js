import { createContext, useReducer } from "react";


import axios from 'axios';
import {
    FETCH_PROFILE_FAIL, FETCH_PROFILE_SUCCESS, LOGIN_FAILED, LOGIN_SUCCESS,
    LOGOUT, REGISTER_FAIL, REGISTER_SUCCESS, INCOMELIST_UPDATE, EXPENSELIST_UPDATE
} from "./AuthActionsType";
import { API_URL_USER, API_URL_LOGIN, USERS_URL } from "../../../utils/apiUrl";

//auth context
export const authContext = createContext()

const INITIAL_STATE = {
    userAuth: JSON.parse(localStorage.getItem("userAuth")),
    expenseList: '',
    incomeList: '',
    error: null,
    loading: false,
    profile: null
}

const reducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                userAuth: payload,
                error: null,
                loading: false
            }
        case REGISTER_FAIL:
            return {
                ...state,
                userAuth: null,
                error: payload,
                loading: false
            }
        case LOGIN_SUCCESS:
            localStorage.setItem("userAuth", JSON.stringify(payload))
            return {
                ...state,
                userAuth: payload,
                error: null,
                loading: false
            }
        case LOGIN_FAILED:
            return {
                ...state,
                userAuth: null,
                error: payload,
                loading: false
            }

        case FETCH_PROFILE_SUCCESS:
            return {
                ...state,
                profile: payload,
                error: null,
                loading: false
            }
        case FETCH_PROFILE_FAIL:
            return {
                ...state,
                profile: null,
                error: payload,
                loading: false
            }
        case INCOMELIST_UPDATE: {
            return {
                ...state,
                incomeList: payload,
            }
        }

        case EXPENSELIST_UPDATE: {
            return {
                ...state,
                expenseList: payload
            }

        }
        case LOGOUT: {

            return {
                userAuth: null,
                error: null,
                loading: null
            }
        }


        default:
            return state
    }

}

//provider
const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
    //login action
    const loginUserAction = async formData => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        try {
            const res = await axios.post(API_URL_LOGIN, formData, config)
            if (res?.data?.status === "success") {
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: res.data
                })
                window.location.href = "/dashboard"
            }

        } catch (err) {
            dispatch({
                type: "LOGIN_FAILED",
                payload: err?.response?.data?.message
            })
        }
    }
    const registerUserAction = async formData => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        try {
            const res = await axios.post(`${USERS_URL}/register`, formData, config)
            if (res?.data?.status === "success") {
                dispatch({
                    type: REGISTER_SUCCESS,
                    payload: res.data
                })
            }
            window.location.href = "/"
        } catch (err) {
            dispatch({
                type: REGISTER_FAIL,
                payload: err?.response?.data?.message
            })
        }
    }

    const fetchProfileAction = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${state?.userAuth?.token}`
            }
        }

        try {
            let AllIncomeList = []
            let AllExpenseList = []
            const res = await axios.get(API_URL_USER, config)
            if (res?.data) {
                dispatch({
                    type: FETCH_PROFILE_SUCCESS,
                    payload: res?.data
                })
                let resData = res.data.data
                resData?.accounts?.forEach((ac) => {

                    ac?.transactions?.forEach((tr) => {
                        if (tr.transactionType == 'Income') {
                            AllIncomeList.push(tr)
                        } else {
                            AllExpenseList.push(tr)
                        }

                    })
                })

                dispatch({
                    type: INCOMELIST_UPDATE,
                    payload: AllIncomeList ? AllIncomeList : []
                })
                dispatch({
                    type: EXPENSELIST_UPDATE,
                    payload: AllExpenseList ? AllExpenseList : []
                })

            }

        } catch (err) {
            dispatch({
                type: FETCH_PROFILE_FAIL,
                payload: err?.response?.data?.message
            })

        }
    }

    const logoutUser = () => {
        localStorage.clear()
        dispatch({
            type: LOGOUT,
            payload: null
        })
        window.location.href = '/'
    }




    return <authContext.Provider
        value={{
            userAuth: state.userAuth,
            isLogin: false,
            loginUserAction,
            token: state?.userAuth?.token,
            fetchProfileAction,
            profile: state?.profile,
            error: state?.error,
            logoutUser,
            registerUserAction,
            incomeList: state.incomeList,
            expenseList: state.expenseList
        }}>
        {children}
    </authContext.Provider>
}

export default AuthContextProvider
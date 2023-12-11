import { createContext, useReducer } from "react";
import { ACCOUNTS_URL } from "../../../utils/apiUrl";
import {
    ACCOUNT_CREATION_FAIL,
    ACCOUNT_CREATION_SUCCES,
    ACCOUNT_DETAILS_FAIL,
    ACCOUNT_DETAILS_SUCCESS,
    ACCOUNT_DELETE_SUCCESS,
    ACCOUNT_DELETE_FAIL
} from "./accountActionTypes"
import axios from "axios";

export const accountContext = createContext()

const INITIAL_STATE = {
    userAuth: JSON.parse(localStorage.getItem("userAuth")),
    account: null,
    accounts: [],
    error: null,
    loading: false,

}

const reducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
        case ACCOUNT_DETAILS_SUCCESS:
            return {
                ...state,
                account: payload,
                error: null,
                loading: false,
            }
        case ACCOUNT_DETAILS_FAIL:
            return {
                ...state,
                account: null,
                error: payload,
                loading: false,
            }
        case ACCOUNT_CREATION_SUCCES:
            return {
                ...state,
                account: payload,
                error: null,
                loading: false,
            }
        case ACCOUNT_CREATION_FAIL:
            return {
                ...state,
                account: null,
                error: payload,
                loading: false,
            }
        case ACCOUNT_DELETE_FAIL: {
            return {
                ...state,
                account: null,
                error: payload,
                loading: false,
            }
        }
        case ACCOUNT_DELETE_SUCCESS: {
            return {
                ...state,
                account: payload,
                error: null,
                loading: false,
            }
        }

        default:
            return state
    }

}
const AccountContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, INITIAL_STATE)


    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${state?.userAuth?.token}`
        }
    }
    //get details acc
    const getAccountDetails = async (id) => {
        try {
            const res = await axios.get(`${ACCOUNTS_URL}/${id}`, config)
            if (res?.data) {
                return res.data
            }
        } catch (err) {
            dispatch({
                type: ACCOUNT_DETAILS_FAIL,
                payload: err?.response?.data?.message
            })
        }
    }
    const createAccount = async formData => {
        try {
            const res = await axios.post(ACCOUNTS_URL, formData, config)
            if (res?.data) {
                dispatch({
                    type: ACCOUNT_CREATION_SUCCES,
                    payload: res.data.data
                })
                // window.location.href = '/accounts'
            }
        } catch (err) {
            dispatch({
                type: ACCOUNT_CREATION_FAIL,
                payload: err?.response?.data?.message
            })
        }
    }

    const updateAccount = async (formData) => {
        try {
            const res = await axios.put(`${ACCOUNTS_URL}/${formData.accId}`, formData.formData, config)
            if (res?.data) {
                dispatch({
                    type: ACCOUNT_CREATION_SUCCES,
                    payload: res.data.data
                })
                window.location.href = '/accounts'
            }
        } catch (err) {
            dispatch({
                type: ACCOUNT_CREATION_FAIL,
                payload: err?.response?.data?.message
            })
        }
    }

    const deleteAccount = async (id) => {

        try {
            const res = await axios.delete(`${ACCOUNTS_URL}/${id}`, config)
            if (res?.data) {
                dispatch({
                    type: ACCOUNT_DELETE_SUCCESS,
                    payload: ""
                })
                window.location.href = '/accounts'
            }
        } catch (err) {
            dispatch({
                type: ACCOUNT_DELETE_FAIL,
                payload: err?.response?.data?.message
            })
        }
    }

    return <accountContext.Provider
        value={{
            getAccountDetails,
            account: state.account,
            createAccount,
            error: state?.error,
            deleteAccount,
            updateAccount
        }}>
        {children}
    </accountContext.Provider>
}

export default AccountContextProvider
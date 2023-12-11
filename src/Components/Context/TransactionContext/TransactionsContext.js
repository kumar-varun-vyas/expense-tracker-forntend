import React, { createContext, useReducer } from "react";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';

import {
  TRANSACTION_CREATION_STARTED,
  TRANSACTION_CREATION_SUCCESS,
  TRANSACTION_CREATION_FAIL,
  TRANSACTION_DELETE_STARTED,
  TRANSACTION_DELETE_SUCCESS,
  TRANSACTION_DELETE_FAIL,
  TRANSACTION_FETCH_STARTED,
  TRANSACTION_FETCH_FAIL,
  TRANSACTION_FETCH_SUCCESS
} from "./transactionsActionTypes";
import { TRANSACTION_URL } from "../../../utils/apiUrl";

export const transactionContext = createContext();

const INITIAL_STATE = {
  transaction: null,
  transactions: [],
  loading: false,
  error: null,
  token: JSON.parse(localStorage.getItem("userAuth")),
};
const transactionReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case TRANSACTION_CREATION_SUCCESS:
      return {
        ...state,
        loading: false,
        transaction: payload,
      };
    case TRANSACTION_CREATION_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case TRANSACTION_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        transaction: payload,
      };
    case TRANSACTION_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case TRANSACTION_DELETE_STARTED:
      return {
        ...state,
        loading: payload,
      }
    case TRANSACTION_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        transactions: payload,
      };
    case TRANSACTION_FETCH_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case TRANSACTION_FETCH_STARTED:
      return {
        ...state,
        loading: payload,
      }

    case "TRANSACTION_SINGLE_FETCH_SUCCESS":
      return {
        ...state,
        transaction: payload,
      }
    case "TRANSACTION_SINGLE_FETCH_FAIL":
      return {
        ...state,
        loading: false,
        error: payload,
      }
    default:
      return state;
  }
};

export const TransactionContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(transactionReducer, INITIAL_STATE);

  //create transaction
  const createTransactionAction = async accountData => {
    try {
      //header
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.token?.token}`,
        },
      };
      //request
      const res = await axios.post(TRANSACTION_URL, accountData, config);
      console.log(res);
      if (res?.data?.status === "success") {
        dispatch({ type: TRANSACTION_CREATION_SUCCESS, payload: res?.data });
      }
      window.location.href = `/account-details/${accountData.account}`
    } catch (error) {
      dispatch({
        type: TRANSACTION_CREATION_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

  const deleteTransaction = async (id) => {
    try {
      dispatch({ type: TRANSACTION_DELETE_STARTED, payload: true });
      //header
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.token?.token}`,
        },
      };
      //request
      const res = await axios.delete(`${TRANSACTION_URL}/${id}`, config);
      console.log("DELETE-----", res);
      if (res?.data?.status === "success") {
        dispatch({ type: TRANSACTION_DELETE_SUCCESS, payload: "transaction deleted" });
        dispatch({ type: TRANSACTION_DELETE_STARTED, payload: false });
        toast.success("Transaction deleted successfully!")
      }
      // window.location.href = `/account-details/${accountData.account}`
    } catch (error) {
      console.log("delete----", error.message);

      dispatch({
        type: TRANSACTION_DELETE_FAIL,
        payload: error?.message
      });
      toast.error(error.message)
      dispatch({ type: TRANSACTION_DELETE_STARTED, payload: false });
    }
  }

  const getAllTransactionByAc = async (id, page) => {
    try {
      dispatch({ type: TRANSACTION_FETCH_STARTED, payload: true });
      //header
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.token?.token}`,
        },
      };
      //request
      const res = await axios.get(`${TRANSACTION_URL}/all-ac-transactions/${id}?page=${page}`, config);
      if (res?.data?.status === "success") {
        dispatch({ type: TRANSACTION_FETCH_SUCCESS, payload: res.data });
        dispatch({ type: TRANSACTION_FETCH_STARTED, payload: false });
      }
      // window.location.href = `/account-details/${accountData.account}`
    } catch (error) {
      console.log("delete----", error.message);

      dispatch({
        type: TRANSACTION_FETCH_FAIL,
        payload: error?.message
      });
      toast.error(error.message)
      dispatch({ type: TRANSACTION_FETCH_STARTED, payload: false });
    }

  }

  const editTransaction = async (formData) => {
    console.log(formData)

    try {
      //header
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.token?.token}`,
        },
      };
      //request
      const res = await axios.put(`${TRANSACTION_URL}/${formData.trId}`, formData.formData, config);
      console.log(res);
      if (res?.data?.status === "success") {

        // dispatch({ type: TRANSACTION_CREATION_SUCCESS, payload: res?.data });
        window.location.href = `/account-details/${formData.accId}`
      }
    } catch (error) {
      dispatch({
        type: TRANSACTION_CREATION_FAIL,
        payload: error?.response?.data?.message,
      });
    }

  }

  const getTransactionById = async (id) => {
    try {
      dispatch({ type: TRANSACTION_FETCH_STARTED, payload: true });
      //header
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.token?.token}`,
        },
      };
      //request
      const res = await axios.get(`${TRANSACTION_URL}/${id}`, config);
      if (res?.data?.status === "success") {
        // dispatch({ type: "TRANSACTION_SINGLE_FETCH_SUCCESS", payload: res.data });
        // dispatch({ type: TRANSACTION_FETCH_STARTED, payload: false });
        return res.data
      }

      // window.location.href = `/ account - details / ${ accountData.account }`
    } catch (error) {
      console.log("get tr by id----", error.message);

      dispatch({
        type: "TRANSACTION_SINGLE_FETCH_FAIL",
        payload: error?.message
      });
      toast.error(error.message)
      dispatch({ type: TRANSACTION_FETCH_STARTED, payload: false });
    }

  }
  return (
    <transactionContext.Provider
      value={{
        transaction: state.transaction,
        transactions: state.transactions,
        createTransactionAction,
        deleteTransaction,
        error: state.error,
        loading: state.loading,
        getAllTransactionByAc,
        getTransactionById,
        editTransaction
      }}
    >
      {children}
    </transactionContext.Provider>
  );
};

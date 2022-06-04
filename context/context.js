import React, {useReducer, createContext, useEffect, useCallback} from 'react';

import contextReducer from './contextReducer';
import {API_URL} from "../config";
import {toast} from "react-toastify";
import axios from "axios";

const initialState = []
export const ExpenseTrackerContext = createContext(initialState);

export const ExpenseProvider = ({children}) => {
    const [transactions, dispatch] = useReducer(contextReducer, initialState);

    const initializeTransactions = useCallback((data) => {
        dispatch({
            type: 'INITIALIZE_TRANSACTION',
            payload: data
        });
    }, [])

    const deleteTransactions = useCallback((id) => {
        dispatch({
            type: 'DELETE_TRANSACTION',
            payload: id
        });
    }, [])

    const addTransactions = useCallback((transaction) => {
        dispatch({
            type: 'ADD_TRANSACTION',
            payload: transaction
        })
    }, [])

    const editTransactions = useCallback((transaction) => {
        dispatch({
            type: 'EDIT_TRANSACTION',
            payload: transaction
        })
    }, [])

    const filterTransactions = useCallback((transactions) => {
        dispatch({
            type: 'FILTER_TRANSACTION',
            payload: transactions
        })
    }, [])

    const balance = transactions.reduce((acc, crrVlue) => crrVlue.type === 'Expense' ? acc - crrVlue.amount : acc + crrVlue.amount, 0)

    return (
        <ExpenseTrackerContext.Provider
            value={{
                editTransactions,
                initializeTransactions,
                deleteTransactions,
                addTransactions,
                filterTransactions,
                transactions,
                balance
            }}>
            {children}
        </ExpenseTrackerContext.Provider>
    );
}
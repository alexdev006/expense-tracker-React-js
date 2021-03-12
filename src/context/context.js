import React, { createContext, useReducer } from 'react'

import contextReducer from './contextReducer'

const initialState = JSON.parse(localStorage.getItem('transactions')) || [[{"amount":300,"category":"Lottery","type":"Income","date":"07-03-2021","id":"fdc99788-439a-4abf-913b-0c09baa9c70d"},{"amount":400,"category":"Shopping","type":"Expense","date":"07-03-2021","id":"104e7ec3-7350-4a04-a789-6232c078d131"},{"amount":500,"category":"Investments","type":"Income","date":"07-03-2021","id":"4da8f019-2619-479a-8948-60dc2dc46faa"}]]

export const ExpenseTrackerContext = createContext(initialState)

export const Provider = ({children}) => {
const [transactions, dispatch] = useReducer(contextReducer, initialState)
//action creators
const deleteTransaction = (id) => {
    dispatch({type: 'DELETE_TRANSACTION', payload: id})
}
const addTransaction = (transaction) => {
    dispatch({type : 'ADD_TRANSACTION', payload: transaction})
}
const balance = transactions.reduce((acc, currVal) => {
    return (currVal.type === 'Expense' ? acc - currVal.amount : acc + currVal.amount)
}, 0)

//const balance = transactions.reduce((acc, currVal)=> currVal.type === 'Expense' ? acc - currVal.amount : acc + currVal.amount , 0)

    return (
        <ExpenseTrackerContext.Provider value={{
            deleteTransaction,
            addTransaction,
            transactions,
            balance,
            }}>
            {children}
        </ExpenseTrackerContext.Provider>
    )
}
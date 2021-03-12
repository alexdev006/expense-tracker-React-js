//reducer est une fonction qui garde un ancien state et une action(comment on veut changer le state) et retourne un nouveau state

const contextReducer = (state, action) => {
    let transactions;
    switch (action.type) {
        case 'DELETE_TRANSACTION':
            transactions = state.filter((t) => t.id !== action.payload)
            localStorage.setItem('transactions', JSON.stringify(transactions))

            return transactions
        case 'ADD_TRANSACTION':
            transactions = [action.payload, ...state]
            localStorage.setItem('transactions', JSON.stringify(transactions))

            return transactions

        default:
            return state;
    }

}

export default contextReducer
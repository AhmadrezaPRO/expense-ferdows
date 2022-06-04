import moment from "moment";

const contextReducer = (state, action) => {

    let transactions;

    switch (action.type) {
        case 'INITIALIZE_TRANSACTION':
            const array = action.payload.data
            transactions = array.map(item => ({
                id: item.id,
                ...item.attributes,
            }))
            // console.log(transactions)
            return transactions;
        case 'DELETE_TRANSACTION':
            transactions = state.filter((v) => v.id !== action.payload);
            // localStorage.setItem('transactions', JSON.stringify(transactions));
            return transactions;
        case 'ADD_TRANSACTION':
            transactions = [action.payload, ...state];
            // localStorage.setItem('transactions', JSON.stringify(transactions));
            return transactions;
        case 'EDIT_TRANSACTION':
            // console.log(transactions)
            // console.log(action.payload)
            // transactions = state.filter((v) => v.id !== action.payload.id);
            // console.log(transactions)
            // console.log(action.payload)
            // localStorage.setItem('transactions', JSON.stringify(transactions));
            return [...transactions, action.payload];
        case 'FILTER_TRANSACTION':
            transactions = state.filter((v) => moment(v.date)._d.setHours(0,0,0,0)>= action.payload.fromDate && moment(v.date)._d.setHours(0,0,0,0) <= action.payload.thruDate)
                // const date = new Date(v.date)
                // console.log(new Date(v.date).setHours(0, 0, 0, 0))
                // console.log(action.payload.fromDate)
                // console.log(action.payload.thruDate)
            return transactions
        default:
            return state
    }
}

export default contextReducer;
import {createSlice} from "@reduxjs/toolkit";

const filterFormSlice = createSlice({
    name: 'filterForm',
    initialState: {
        form: null
    },
    reducers: {
        setFilterForm (state, action){
            if (!action.payload) state.filterForm = null
            else {
                state.filterForm = {
                    // id: action.payload?.id,
                    type: action.payload?.type,
                    categories: action.payload?.categories,
                    // amount: action.payload?.amount,
                    // description: action.payload?.description,
                    fromDate: action.payload?.fromDate,
                    thruDate: action.payload?.thruDate,
                }
            }
        }
    }
})

export const filterFormActions = filterFormSlice.actions
export const filterFormReducer = filterFormSlice.reducer
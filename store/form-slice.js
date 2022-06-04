import {createSlice} from "@reduxjs/toolkit";

const formSlice = createSlice({
    name: 'form',
    initialState: {
        form: null
    },
    reducers: {
        setForm (state, action){
            if (!action.payload) state.form = null
            else {
                state.form = {
                    id: action.payload?.id,
                    type: action.payload?.type,
                    category: action.payload?.category,
                    amount: action.payload?.amount,
                    description: action.payload?.description,
                    date: action.payload?.date,
                }
            }
        }
    }
})

export const formActions = formSlice.actions
export const formReducer = formSlice.reducer
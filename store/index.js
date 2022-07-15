import {formReducer} from "./form-slice";
import {filterFormReducer} from "store/filterForm-slice";

const {configureStore} = require("@reduxjs/toolkit");

const store = configureStore({
    reducer: {
        form: formReducer,
        filterForm: filterFormReducer
    }
})

export default store
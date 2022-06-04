import {formReducer} from "./form-slice";

const {configureStore} = require("@reduxjs/toolkit");

const store = configureStore({
    reducer: {form: formReducer}
})

export default store
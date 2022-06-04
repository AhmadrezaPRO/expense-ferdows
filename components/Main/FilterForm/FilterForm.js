import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import React, {useState, useContext, useEffect} from 'react';
import {toast} from "react-toastify";
import axios from 'axios';
import {
    Grid,
    TextField,
    FormControl,
    MenuItem,
    Typography,
    Button,
    Select,
    InputLabel,
    ThemeProvider, InputAdornment, FormHelperText
} from '@mui/material';
// import {v4 as uuidv4} from 'uuid';

import {ExpenseTrackerContext} from '../../../context/context';
// import formatDate from '../../../utils/formatDate';
import {incomeCategories, expenseCategories} from '../../../constants/categories';
import useStyles from './style';

// import AdapterJalali from '@date-io/date-fns-jalali';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
// import {DatePicker} from "@material-ui/pickers";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import moment from "moment";
import jMoment from "moment-jalaali";
import JalaliUtils from "@date-io/jalaali";
import CalendarTheme from './CalendarTheme';
// import PropTypes from "prop-types";
// import {thousandSeparator} from "../../../utils/formatNumbers";
import {API_URL, NEXT_URL} from "../../../config";
import {useDispatch, useSelector} from "react-redux";
import {formActions} from "../../../store/form-slice";
import {useCookies} from "react-cookie";

const NumberToPersianWord = require("number_to_persian_word");


jMoment.loadPersian({
    dialect: "persian-modern",
    usePersianDigits: true
});

const sx = {
    inputLabel: {
        backgroundColor: "white",
    }
}

const initialState = {
    type: '',
    category: '',
    // description: '',
    // amount: '',
    // date: new Date(),
    fromDate: moment(),
    thruDate: moment()
}

const persianRegex = /[\u0600-\u0605 ؐ-ؚ\u061Cـ ۖ-\u06DD ۟-ۤ ۧ ۨ ۪-ۭ ً-ٕ ٟ ٖ-ٞ ٰ ، ؍ ٫ ٬ ؛ ؞ ؟ ۔ ٭ ٪ ؉ ؊ ؈ ؎ ؏ ۞ ۩ ؆ ؇ ؋ ٠۰ ١۱ ٢۲ ٣۳ ٤۴ ٥۵ ٦۶ ٧۷ ٨۸ ٩۹ ءٴ۽ آ أ ٲ ٱ ؤ إ ٳ ئ ا ٵ ٮ ب ٻ پ ڀ ة-ث ٹ ٺ ټ ٽ ٿ ج ڃ ڄ چ ڿ ڇ ح خ ځ ڂ څ د ذ ڈ-ڐ ۮ ر ز ڑ-ڙ ۯ س ش ښ-ڜ ۺ ص ض ڝ ڞ ۻ ط ظ ڟ ع غ ڠ ۼ ف ڡ-ڦ ٯ ق ڧ ڨ ك ک-ڴ ػ ؼ ل ڵ-ڸ م۾ ن ں-ڽ ڹ ه ھ ہ-ۃ ۿ ەۀ وۥ ٶ ۄ-ۇ ٷ ۈ-ۋ ۏ ى يۦ ٸ ی-ێ ې ۑ ؽ-ؿ ؠ ے ۓ \u061D]/
// const persianAlphabets=/^[۰۱۲۳۴۵۶۷۸۹]+$/

const FilterForm = ({token}) => {
    console.log(token)
    const [cookies]=useCookies(['token'])
    const dispatch = useDispatch()
    const formEdit = useSelector(state => state.form.form)
    const [dateError, setDateError] = useState(false)
    const {classes} = useStyles();
    const [formData, setFormData] = useState(initialState);
    const {
        initializeTransactions,
        filterTransactions,
        transactions
    } = useContext(ExpenseTrackerContext);
    const amountHasError = !formData.amount || formData.amount > 1000000000000 || formData.amount <= 0 || isNaN(formData.amount)
    const myType = formData.type === 'Expense' ? 'هزینه' : 'درآمد'
    const deleteProperty = ({
                                [key]: _,
                                ...newObj
                            }, key) => newObj;

    const selectedCategory = formData.type === 'Income' ? incomeCategories : expenseCategories

    const resetHandler = async() =>{
        axios.get(`${NEXT_URL}/transactions`, {
            headers: {
                Authorization: token,
                id: ''
            }
        })
            .then(function (response) {
                initializeTransactions(response.data)
                toast.success('دریافت موفق اطلاعات 👌')
            })
            .catch(function (error) {
                // handle error
                toast.dismiss()
                toast.error('دریافت ناموفق اطلاعات 🤯')
                console.log(error);
            })
            .then(function () {
                // always executed
            })
    }

    const submitHandler = async () => {
        if (formData.fromDate <= formData.thruDate) {
            const fromDate = NumberToPersianWord.convertPeToEn(formData.fromDate.format('YYYY-MM-DD'))
            const thruDate = NumberToPersianWord.convertPeToEn(formData.thruDate.format('YYYY-MM-DD'))
            // console.log(fromDate)
            // console.log(thruDate)
            const addQuery = formData.type!=='All' && formData.type!=='' ? `&filters[type]=${formData.type}` : ''
            axios.get(`${NEXT_URL}/transactions`, {
                headers: {
                    Authorization: token,
                    id: `?filters[date][$gte]=${fromDate}&filters[date][$lte]=${thruDate}${addQuery}`
                }
            })
                .then(function (response) {
                    initializeTransactions(response.data)
                    toast.success('دریافت موفق اطلاعات 👌')
                })
                .catch(function (error) {
                    // handle error
                    toast.dismiss()
                    toast.error('دریافت ناموفق اطلاعات 🤯')
                    console.log(error);
                })
                .then(function () {
                    // always executed
                })
            // const fromDate = formData.fromDate._d.setHours(0,0,0,0)
            // const thruDate = formData.thruDate._d.setHours(0,0,0,0)
            // toast.info('جست و جو')
            // filterTransactions({
            //     fromDate,
            //     thruDate
            // })
        } else toast.error('فیلد تا تاریخ باید بزرگتر باشد')
    }

    return (
        <Grid
            container
            spacing={2}>
            {/*<Grid*/}
            {/*    item*/}
            {/*    xs={12}>*/}
            {/*    <Typography*/}
            {/*        align="center"*/}
            {/*        variant="subtitle2"*/}
            {/*        gutterBottom>*/}
            {/*        ...*/}
            {/*    </Typography>*/}
            {/*</Grid>*/}
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                direction="row"
                item
                xs={12}>
                <FormControl sx={{width: '50%'}}>
                    <InputLabel
                        dir={'rtl'}
                        sx={sx.inputLabel}>&nbsp;درآمد یا هزینه&nbsp;</InputLabel>
                    <Select
                        value={formData.type}
                        onChange={(e) => setFormData({
                            ...formData,
                            type: e.target.value,
                            category: '',
                        })}>
                        {/*<MenuItem value="Income">Income</MenuItem>*/}
                        <MenuItem value="All">همه</MenuItem>
                        <MenuItem value="Expense">هزینه</MenuItem>
                        <MenuItem value="Income">درآمد</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid
                item
                xs={6}>
                <ThemeProvider theme={CalendarTheme}>
                    <LocalizationProvider dateAdapter={JalaliUtils}>
                        {/*<TextField*/}
                        {/*    type="date"*/}
                        {/*    onChange={(e) => setFormData({*/}
                        {/*        ...formData,*/}
                        {/*        date: formatDate(e.target.value)*/}
                        {/*    })}*/}
                        {/*    label={undefined}*/}
                        {/*    fullWidth/>*/}

                        <DatePicker
                            label={'از تاریخ'}
                            onError={(e) => setDateError(true)}
                            onAccept={() => setDateError(false)}
                            components={{
                                LeftArrowIcon: ChevronRightIcon,
                                RightArrowIcon: ChevronLeftIcon,
                            }}
                            minDate={jMoment(new Date(2022, 2, 21))}
                            maxDate={jMoment(new Date())}
                            inputFormat="jYYYY/jMM/jDD"
                            value={formData.fromDate}
                            onChange={(newValue) => setFormData(prevState => {
                                return {
                                    ...prevState,
                                    fromDate: newValue
                                }
                            })}
                            renderInput={(params) =>
                                <TextField {...params}
                                           fullWidth/>}
                            classes={{
                                root: classes.calendar,
                                viewTransitionContainer: classes.calendarContainers
                            }}
                        />
                    </LocalizationProvider>
                </ThemeProvider>
            </Grid>
            <Grid
                item
                xs={6}>
                <ThemeProvider theme={CalendarTheme}>
                    <LocalizationProvider dateAdapter={JalaliUtils}>
                        {/*<TextField*/}
                        {/*    type="date"*/}
                        {/*    onChange={(e) => setFormData({*/}
                        {/*        ...formData,*/}
                        {/*        date: formatDate(e.target.value)*/}
                        {/*    })}*/}
                        {/*    label={undefined}*/}
                        {/*    fullWidth/>*/}

                        <DatePicker
                            label={'تا تاریخ'}
                            onError={(e) => setDateError(true)}
                            onAccept={() => setDateError(false)}
                            components={{
                                LeftArrowIcon: ChevronRightIcon,
                                RightArrowIcon: ChevronLeftIcon,
                            }}
                            minDate={jMoment(new Date(2022, 2, 21))}
                            maxDate={jMoment(new Date())}
                            inputFormat="jYYYY/jMM/jDD"
                            value={formData.thruDate}
                            onChange={(newValue) => setFormData(prevState => {
                                return {
                                    ...prevState,
                                    thruDate: newValue
                                }
                            })}
                            renderInput={(params) =>
                                <TextField {...params}
                                           fullWidth/>}
                            classes={{
                                root: classes.calendar,
                                viewTransitionContainer: classes.calendarContainers
                            }}
                        />
                    </LocalizationProvider>
                </ThemeProvider>
            </Grid>
            <Grid
                item
                xs={6}>
                <Button
                    variant="contained"
                    color="warning"
                    fullWidth
                    onClick={submitHandler}>
                    {`انتخاب فیلتر`}
                </Button>
            </Grid>
            <Grid
                item
                xs={6}>
                <Button
                    variant="contained"
                    color={"secondary"}
                    fullWidth
                    onClick={resetHandler}>
                    {`حذف فیلتر`}
                </Button>
            </Grid>
        </Grid>
    )
}

export default FilterForm;

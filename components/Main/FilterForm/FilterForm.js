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
    ThemeProvider, InputAdornment, FormHelperText, FormGroup, FormControlLabel, Checkbox, OutlinedInput, ListItemText
} from '@mui/material';
// import {v4 as uuidv4} from 'uuid';

import {ExpenseTrackerContext} from 'context/context';
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
import {API_URL, NEXT_URL} from "config";
import {useDispatch, useSelector} from "react-redux";
import {filterFormActions} from "../../../store/filterForm-slice";
import formatDate from "utils/formatDate";
// import {useCookies} from "react-cookie";

const NumberToPersianWord = require("number_to_persian_word");

const _ = require('lodash');

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
    categories: [],
    // description: '',
    // amount: '',
    // date: new Date(),
    fromDate: moment(),
    thruDate: moment()
}

// const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            // maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];


const persianRegex = /[\u0600-\u0605 ؐ-ؚ\u061Cـ ۖ-\u06DD ۟-ۤ ۧ ۨ ۪-ۭ ً-ٕ ٟ ٖ-ٞ ٰ ، ؍ ٫ ٬ ؛ ؞ ؟ ۔ ٭ ٪ ؉ ؊ ؈ ؎ ؏ ۞ ۩ ؆ ؇ ؋ ٠۰ ١۱ ٢۲ ٣۳ ٤۴ ٥۵ ٦۶ ٧۷ ٨۸ ٩۹ ءٴ۽ آ أ ٲ ٱ ؤ إ ٳ ئ ا ٵ ٮ ب ٻ پ ڀ ة-ث ٹ ٺ ټ ٽ ٿ ج ڃ ڄ چ ڿ ڇ ح خ ځ ڂ څ د ذ ڈ-ڐ ۮ ر ز ڑ-ڙ ۯ س ش ښ-ڜ ۺ ص ض ڝ ڞ ۻ ط ظ ڟ ع غ ڠ ۼ ف ڡ-ڦ ٯ ق ڧ ڨ ك ک-ڴ ػ ؼ ل ڵ-ڸ م۾ ن ں-ڽ ڹ ه ھ ہ-ۃ ۿ ەۀ وۥ ٶ ۄ-ۇ ٷ ۈ-ۋ ۏ ى يۦ ٸ ی-ێ ې ۑ ؽ-ؿ ؠ ے ۓ \u061D]/
// const persianAlphabets=/^[۰۱۲۳۴۵۶۷۸۹]+$/

const FilterForm = ({token}) => {
    console.log(token)
    // const [cookies] = useCookies(['token'])
    const dispatch = useDispatch()
    const filterEdit = useSelector(state => state.filterForm.filterForm)
    console.log(filterEdit)
    const [dateError, setDateError] = useState(false)
    const {classes} = useStyles();
    const [formData, setFormData] = useState(initialState);
    const {
        initializeTransactions,
        filterTransactions,
        transactions
    } = useContext(ExpenseTrackerContext);
    const amountHasError = !formData.amount || formData.amount > 1000000000000 || formData.amount <= 0 || isNaN(formData.amount)
    const myType = formData.type === 'Expense' ? 'هزینه' : formData.type === 'Income' && 'درآمد'
    const deleteProperty = ({
                                [key]: _,
                                ...newObj
                            }, key) => newObj;

    const selectedCategory = formData.type === 'Income' ? incomeCategories : expenseCategories

    const handleChangeMulti = (event) => {
        const {
            target: {value},
        } = event;
        console.log(event)
        setFormData({
            ...formData,
            categories: (typeof value === 'string' ? value.split(',') : value)
        })
    };

    const resetHandler = async () => {
        axios.get(`${NEXT_URL}/transactions`, {
            headers: {
                Authorization: token,
                id: ''
            }
        })
            .then(function (response) {
                initializeTransactions(response.data)
                setFormData(initialState)
                dispatch(filterFormActions.setFilterForm({
                    ...formData,
                    fromDate: checked && formatDate(formData.fromDate._d),
                    thruDate: checked && formatDate(formData.thruDate._d)
                }))
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
            console.log(checked)
            // const categories = formData.categories
            // const multiCategories = _.cloneDeep( formData.categories ).map((description)=>{
            //     return selectedCategory.find( item => item.description === description).type
            // })
            const categories = formData.categories.map((description) => {
                return selectedCategory.find(item => item.description === description).type
            })
            // console.log(multiCategories)
            // console.log(categories)
            const dateQuery = checked ? `?filters[date][$gte]=${fromDate}&filters[date][$lte]=${thruDate}` : '?'
            const typeQuery = formData.type !== 'All' && formData.type !== '' ? `&filters[type]=${formData.type}` : ''
            // const categoryQuery = formData.category !== 'All' && formData.category !== '' ? `&filters[category]=${formData.category}` : ''
            const categoriesQuery = formData.categories.length > 0 ? categories.map((category) => (`&filters[category]=${category}`)).join('') : ''
            console.log(categoriesQuery)
            axios.get(`${NEXT_URL}/transactions`, {
                headers: {
                    Authorization: token,
                    id: `${dateQuery}${typeQuery}${categoriesQuery}`
                }
            })
                .then(function (response) {
                    initializeTransactions(response.data)
                    toast.success('دریافت موفق اطلاعات 👌')
                    dispatch(filterFormActions.setFilterForm({
                        ...formData,
                        fromDate: checked && formatDate(formData.fromDate._d),
                        thruDate: checked && formatDate(formData.thruDate._d)
                    }))
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

    //checkbox
    const [checked, setChecked] = React.useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    console.log(formData.categories)

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
                xs={(myType ? 6 : 12)}>
                <FormControl sx={{width: (myType ? '100%' : '50%')}}>
                    <InputLabel
                        dir={'rtl'}
                        sx={sx.inputLabel}>&nbsp;درآمد یا هزینه&nbsp;</InputLabel>
                    <Select
                        value={formData.type}
                        onChange={(e) => setFormData({
                            ...formData,
                            type: e.target.value,
                            category: '',
                            categories: [],
                        })}>
                        {/*<MenuItem value="Income">Income</MenuItem>*/}
                        <MenuItem value="All">همه</MenuItem>
                        <MenuItem value="Expense">هزینه</MenuItem>
                        <MenuItem value="Income">درآمد</MenuItem>
                    </Select>
                    <FormHelperText error={true}>&nbsp;</FormHelperText>
                </FormControl>
            </Grid>
            {
                myType &&
                <Grid
                    item
                    xs={6}>
                    <FormControl fullWidth>
                        <InputLabel
                            sx={sx.inputLabel}
                            id="demo-multiple-checkbox-label">&nbsp;نوع {myType}</InputLabel>
                        <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={formData.categories}
                            onChange={handleChangeMulti}
                            input={<OutlinedInput label="Tag"/>}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                        >
                            {selectedCategory.map((item) => (
                                <MenuItem
                                    key={item.type}
                                    value={item.description}>
                                    <Checkbox checked={formData.categories.indexOf(item.description) > -1}/>
                                    <ListItemText primary={item.description}/>
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText error={true}>
                            {/*{!formData.category ? `نوع ${myType} انتخاب شود` : null}*/}
                        </FormHelperText>
                    </FormControl>
                </Grid>
                // <Grid
                //     item
                //     xs={6}>
                //     <FormControl
                //         // required={true}
                //         fullWidth
                //         focused
                //         error={!formData.category}>
                //         <InputLabel sx={sx.inputLabel}>&nbsp;نوع {myType}</InputLabel>
                //         <Select
                //             error={!formData.category}
                //             value={formData.category}
                //             onChange={(e) => setFormData({
                //                 ...formData,
                //                 category: e.target.value
                //             })}>
                //             {selectedCategory.map((c) => (
                //                 <MenuItem
                //                     key={c.type}
                //                     value={c.type}>{c.description}</MenuItem>
                //             ))}
                //         </Select>
                //         {/*<FormHelperText error={true}>{!formData.category ? `نوع ${myType} انتخاب شود` : null}</FormHelperText>*/}
                //     </FormControl>
                // </Grid>
            }
            <Grid
                item
                xs={12}>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox
                            checked={checked}
                            onChange={handleChange}
                            inputProps={{'aria-label': 'controlled'}}/>
                        }
                        label="ثبت تاریخ"/>
                </FormGroup>
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
                            disabled={!checked}
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
                            onChange={(newValue) => {
                                // console.log(newValue)
                                if (newValue._isValid)
                                    setFormData(prevState => {
                                        console.log(newValue)
                                        return {
                                            ...prevState,
                                            fromDate: newValue
                                        }
                                    })
                                else {

                                }
                            }}
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
                            disabled={!checked}
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

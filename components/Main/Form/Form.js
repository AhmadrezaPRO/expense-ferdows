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
import {thousandSeparator} from "../../../utils/formatNumbers";
import {API_URL, NEXT_URL} from "../../../config";
import {useDispatch, useSelector} from "react-redux";
import {formActions} from "../../../store/form-slice";
import {useCookies} from "react-cookie";
import {siLK} from "@mui/material/locale";

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
    type: 'Expense',
    category: '',
    description: '',
    amount: '',
    // date: new Date(),
    date: moment()
}

const persianRegex = /[\u0600-\u0605 ؐ-ؚ\u061Cـ ۖ-\u06DD ۟-ۤ ۧ ۨ ۪-ۭ ً-ٕ ٟ ٖ-ٞ ٰ ، ؍ ٫ ٬ ؛ ؞ ؟ ۔ ٭ ٪ ؉ ؊ ؈ ؎ ؏ ۞ ۩ ؆ ؇ ؋ ٠۰ ١۱ ٢۲ ٣۳ ٤۴ ٥۵ ٦۶ ٧۷ ٨۸ ٩۹ ءٴ۽ آ أ ٲ ٱ ؤ إ ٳ ئ ا ٵ ٮ ب ٻ پ ڀ ة-ث ٹ ٺ ټ ٽ ٿ ج ڃ ڄ چ ڿ ڇ ح خ ځ ڂ څ د ذ ڈ-ڐ ۮ ر ز ڑ-ڙ ۯ س ش ښ-ڜ ۺ ص ض ڝ ڞ ۻ ط ظ ڟ ع غ ڠ ۼ ف ڡ-ڦ ٯ ق ڧ ڨ ك ک-ڴ ػ ؼ ل ڵ-ڸ م۾ ن ں-ڽ ڹ ه ھ ہ-ۃ ۿ ەۀ وۥ ٶ ۄ-ۇ ٷ ۈ-ۋ ۏ ى يۦ ٸ ی-ێ ې ۑ ؽ-ؿ ؠ ے ۓ \u061D]/
// const persianAlphabets=/^[۰۱۲۳۴۵۶۷۸۹]+$/

const Form = ({token}) => {
    // const [cookies] = useCookies(['token'])
    // console.log(token)
    const dispatch = useDispatch()
    const formEdit = useSelector(state => state.form.form)
    const [dateError, setDateError] = useState(false)
    const {classes} = useStyles();
    const [formData, setFormData] = useState(initialState);
    const {
        addTransactions,
        editTransactions
    } = useContext(ExpenseTrackerContext);
    const amountHasError = !formData.amount || formData.amount > 1000000000000 || formData.amount <= 0 || isNaN(formData.amount)
    const myType = formData.type === 'Expense' ? 'هزینه' : 'درآمد'
    const deleteProperty = ({
                                [key]: _,
                                ...newObj
                            }, key) => newObj;

    const createTransactions = async () => {
        if (dateError) {
            toast.error('خطا در مقداردهی وجود دارد')
            return
        }
        const hasEmptyFields = Object.values({
            ...formData,
            description: 'k'
        }).some(
            (element) => element === ''
        )
        if (hasEmptyFields) {
            toast.error('لطفا تمام فیلدها را پر نمایید')
            return
        } else if (amountHasError) {
            toast.error('مقدار هزینه را صحیح وارد نمایید')
            return
        }
        const transaction = {
            ...formData,
            amount: formData.amount * 1000,
            // transactionId: uuidv4()
        }
        axios.post(`${NEXT_URL}/transactions`,
            {
                transaction
            }, {
                headers: {
                    Authorization: token,
                }
            })
            .then(res => {
                // console.log(res)
                addTransactions({
                    ...res.data.data.attributes,
                    id: res.data.data.id
                })
                toast.success(`افزودن موفق مورد جدید`)
            })
            .catch(function (error) {
                console.log(error)
                toast.error(`افزودن ناموفق مورد جدید`)
            })
        setFormData(prevState => (
            {
                ...prevState,
                // type: initialState.type,
                category: initialState.category,
                amount: initialState.amount,
                description: initialState.description,
            }
        ))
    }

    const updateTransactions = async () => {
        if (dateError) {
            toast.error('خطا در مقداردهی وجود دارد')
            return
        }
        const hasEmptyFields = Object.values({
            ...formData,
            description: 'k'
        }).some(
            (element) => element === ''
        )
        if (hasEmptyFields) {
            toast.error('لطفا تمام فیلدها را پر نمایید')
            return
        } else if (amountHasError) {
            toast.error('مقدار هزینه را صحیح وارد نمایید')
            return
        }
        console.log(formData)
        const transaction = {
            ...formData,
            amount: formData.amount * 1000,
            // transactionId: uuidv4()
        }
        axios.put(`${NEXT_URL}/transactions`,
            {
                transaction
            },
            {
                headers: {
                    Authorization: token
                }
            }
        ).then(res => {
            console.log(res)
            editTransactions({
                ...res.data.data.attributes,
                id: res.data.data.id
            })
            toast.success(`ویرایش موفق`)
        })
            .catch(function (error) {
                console.log(error)
                // console.log(updatedActor)
                toast.error(`ویرایش ناموفق`)
            })
        cancelEditTransactions()
        setFormData(prevState => (
            {
                ...prevState,
                // type: initialState.type,
                category: initialState.category,
                amount: initialState.amount,
                description: initialState.description,
            }
        ))
    }

    const cancelEditTransactions = () => {
        dispatch(formActions.setForm(
            null
        ))
    }

    const selectedCategory = formData.type === 'Income' ? incomeCategories : expenseCategories

    // const [value, setValue] = React.useState(new Date());

    // const [values, setValues] = React.useState({
    //     textMask: '(100) 000-0000',
    //     numberFormat: '1320',
    // });

    // const handleChange = (event) => {
    //     setValues({
    //         ...values,
    //         [event.target.name]: event.target.value,
    //     });
    // };

    useEffect(() => {
        if (formEdit)
            setFormData(prevState => ({
                ...prevState,
                id: formEdit.id,
                type: formEdit.type,
                category: formEdit.category,
                description: formEdit.description,
                amount: (formEdit.amount / 1000).toString(),
                date: formEdit.date
            }))
        else {
            setFormData(prevState => ({
                ...initialState,
                type: prevState.type
            }))
            // if (formData.id) {
            //     setFormData(prevState => {
            //             return (deleteProperty(prevState, "id"))
            //         }
            //     )
            // }
        }
    }, [formEdit])

    const editButtons =
        <>
            <Button
                className={classes.button}
                variant="contained"
                color="primary"
                fullWidth
                onClick={updateTransactions}>
                {`ویرایش ${myType} انتخابی`}
            </Button>
            <Button
                className={classes.button}
                variant="contained"
                color="secondary"
                fullWidth
                onClick={cancelEditTransactions}>
                {`لغو ویرایش ${myType}`}
            </Button>
        </>

    return (
        <Grid
            container
            spacing={2}>
            <Grid
                item
                xs={12}>
                <Typography
                    align="center"
                    variant="subtitle2"
                    gutterBottom>
                    ...
                </Typography>
            </Grid>
            <Grid
                item
                xs={6}>
                <FormControl fullWidth>
                    <InputLabel
                        dir={'rtl'}
                        sx={sx.inputLabel}>&nbsp;{myType}&nbsp;</InputLabel>
                    <Select
                        value={formData.type}
                        onChange={(e) => setFormData({
                            ...formData,
                            type: e.target.value,
                            category: '',
                        })}>
                        {/*<MenuItem value="Income">Income</MenuItem>*/}
                        <MenuItem value="Expense">هزینه</MenuItem>
                        <MenuItem value="Income">درآمد</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid
                item
                xs={6}>
                <FormControl
                    required={true}
                    fullWidth
                    focused
                    error={!formData.category}>
                    <InputLabel sx={sx.inputLabel}>&nbsp;نوع {myType}</InputLabel>
                    <Select
                        error={!formData.category}
                        value={formData.category}
                        onChange={(e) => setFormData({
                            ...formData,
                            category: e.target.value
                        })}>
                        {selectedCategory.map((c) => (
                            <MenuItem
                                key={c.type}
                                value={c.type}>{c.description}</MenuItem>
                        ))}
                    </Select>
                    <FormHelperText error={true}>{!formData.category ? `نوع ${myType} انتخاب شود` : null}</FormHelperText>
                </FormControl>
            </Grid>
            <Grid
                item
                xs={12}>
                <TextField
                    success={!formData.description}
                    focused
                    label="توضیحات"
                    value={formData.description}
                    helperText={"فقط حروف فارسی مجاز است"}
                    onChange={(e) => setFormData(prevState => {
                        const lastChar = e.target.value.slice(e.target.value.length - 1)
                        if (persianRegex.test(lastChar) || !isNaN(lastChar) || !e.target.value) {
                            return {
                                ...prevState,
                                description: e.target.value
                            }
                        } else return {...prevState}
                    })}
                    variant="outlined"
                    fullWidth
                />
            </Grid>
            <Grid
                item
                xs={6}>
                <TextField
                    required={true}
                    type={"tel"}
                    focused
                    error={amountHasError}
                    label="مبلغ "
                    value={thousandSeparator(formData.amount)}
                    onChange={(e) => setFormData(prevState => {
                        const valueNumber = e.target.value.replaceAll(',', '')
                        // console.log(valueNumber)
                        if (isNaN(valueNumber) || e.target.value === '0') return {...prevState};
                        return {
                            ...prevState,
                            amount: valueNumber
                        }
                    })}
                    helperText={!formData.amount ? 'مبلغ وارد شود' : (formData.amount < 1000000000000000 ? NumberToPersianWord.convert(formData.amount * 1000, {lang: 'fa'}) + ' تومان' : 'رقم غیرمجاز است')}
                    // name="numberformat"
                    // id="formatted-numberformat-input"
                    InputProps={{
                        // inputComponent: TextMaskCustom,
                        // inputComponent: NumberFormatCustom,
                        endAdornment: <InputAdornment
                            dir={'ltr'}
                            className={classes.selectAdornment}
                            position="end">تومان&nbsp;</InputAdornment>,
                        startAdornment: <InputAdornment
                            dir={'ltr'}
                            className={classes.selectAdornment}
                            position="end">,۰۰۰</InputAdornment>,

                    }}
                    variant="outlined"
                    fullWidth
                />
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
                            label={'تاریخ'}
                            onError={(e) => setDateError(true)}
                            onAccept={() => setDateError(false)}
                            components={{
                                LeftArrowIcon: ChevronRightIcon,
                                RightArrowIcon: ChevronLeftIcon,
                            }}
                            minDate={jMoment(new Date(2022, 2, 21))}
                            maxDate={jMoment(new Date())}
                            inputFormat="jYYYY/jMM/jDD"
                            value={formData.date}
                            onChange={(newValue) => setFormData(prevState => {
                                return {
                                    ...prevState,
                                    date: newValue
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
            {!formEdit ?
                <Button
                    className={classes.button}
                    variant="contained"
                    color={myType === 'درآمد' ? "success" : "error"}
                    fullWidth
                    onClick={createTransactions}>
                    {`ایجاد ${myType} جدید`}
                </Button> : editButtons}
        </Grid>
    )
}

export default Form;

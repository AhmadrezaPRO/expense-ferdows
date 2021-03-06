import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import axios from "axios";
import {API_URL, NEXT_URL} from "config";
import {useCookies} from "react-cookie";
import {CircularProgress, InputAdornment, LinearProgress, Modal} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useContext, useEffect, useState} from "react";
import IconButton from "@mui/material/IconButton";
import {toast} from "react-toastify";
import {Fragment} from "react";
import {useRouter} from "next/router";
import AuthContext from "../context/AuthContext";
import Head from "next/head";
import {parseCookies} from "utils/cookie";
import {filterFormActions} from "store/filterForm-slice";
import formatDate from "utils/formatDate";

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center" {...props}>
            {'Copyright © '}
            <Link
                color="inherit"
                href="https://ahmadyoozbashi.ir/">
                Ahmadreza Yoozbashizadeh
            </Link>{' '}
            {new Date().getFullYear()}
        </Typography>
    );
}

// const theme = createTheme();
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Index({token}) {
    const router = useRouter()
    // console.log(user)
    const {login} = useContext(AuthContext)
    // const [error, setError] = useState(false)
    const [cookies, setCookie] = useCookies(['token']);
    // console.log(cookies.token)
    const [showPassword, setShowPassword] = useState(false)
    const toggleShowPassword = () => {
        setShowPassword(prevState => !prevState)
    }
    // console.log(cookies.token)
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        login({
            identifier: data.get('email'),
            password: data.get('password')
        })
        // axios.post(`${API_URL}/auth/local`, {
        //     identifier: data.get('email'),
        //     password: data.get('password'),
        // }).then(response => {
        //     // console.log("User Profile", response.data.user)
        //     // console.log("JWT", response.data.jwt)
        //     toast.success('ورود موفق')
        //     // console.log(cookies.token)
        //     router.push('/ExpenseTracker')
        // }).catch(error => {
        //     toast.error('ورود ناموفق')
        //     console.log(error)
        // })
        // console.log({
        //     email: data.get('email'),
        //     password: data.get('password'),
        // });
    }

    // useEffect(() => {
    //     const init = async () => {
    //         // if (cookies.token === undefined) {
    //         //     setError(true)
    //         // } else {
    //
    //
    //         axios.get(`${API_URL}/users/me`, {
    //             headers: {
    //                 Authorization: cookies.token
    //             }
    //         })
    //             .then(function (response) {
    //                 setError(false)
    //                 router.replace('/ExpenseTracker')
    //             })
    //             .catch(function (error) {
    //                 setError(true)
    //                 // console.log(error);
    //             })
    //             .then(function () {
    //                 // always executed
    //             })
    //
    //
    //
    //         // }
    //     }
    //     init().then()
    // }, [])

    const [loading, setLoading] = useState(false);
    // useEffect(() => {
    //     const init = async () => await axios.get(`${NEXT_URL}/user`, {
    //         timeout: 5000,
    //         headers: {
    //             Authorization: token,
    //         }
    //     }).then(function (response) {
    //         router.push('/ExpenseTracker')
    //     })
    //         .catch(function (error) {
    //             setLoading(false)
    //         })
    //     // console.log(user)
    //     init();
    // }, [])

    const title = 'سامانه تنخواه آزمایشگاه فردوس'
    return (
        <Fragment>
            <Head>
                <title key={'title'}>{title}</title>
                <meta
                    key={'description'}
                    name='description'
                    content='لیست کلیه مطالب آموزشی مربوط به آزمایشگاه تشخیص طبی | آزمایشگاه تشخیص طبی و پاتوبیولوژی فردوس مشهد '
                />
                <meta
                    key="og:title"
                    property="og:title"
                    content={'آزمایشگاه فردوس مشهد' + '|' + title}/>
                <link
                    rel="canonical"
                    key="canonical"
                    href="https://expense.ferdowslab.ir"
                />
            </Head>
            {loading ? <>
                    <Box sx={{width: '100%'}}>
                        <LinearProgress/>
                    </Box>
                    <Modal
                        open={true}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography
                                id="modal-modal-title"
                                variant="h6"
                                component="h2">
                                در حال ورود ...
                            </Typography>
                        </Box>
                    </Modal>
                </>
                :
                <Container
                    sx={{
                        backgroundColor: 'white',
                        boxShadow: 2,
                        borderRadius: '5px'
                    }}
                    component="main"
                    maxWidth="xs">
                    <CssBaseline/>
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar
                            sx={{
                                m: 1,
                                bgcolor: 'secondary.main'
                            }}>
                            {/*<LockOutlinedIcon />*/}
                            <PointOfSaleIcon/>
                        </Avatar>
                        <Typography variant="h5">
                            محاسبه هزینه و درآمد
                        </Typography>
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            noValidate
                            sx={{mt: 1}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="نام کاربری"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="رمز عبور"
                                // type={"text"}
                                // sx={{fontFamily: 'sans-sarif'}}
                                type={showPassword ? "text" : "password"}
                                id="password"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={toggleShowPassword}
                                            onMouseDown={(e) => e.preventDefault()}
                                        >
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>,
                                }}
                                // autoComplete="current-password"
                                // inputProps={{
                                //     autocomplete: "current-password",
                                //     form: {
                                //         autocomplete: 'on',
                                //     },
                                // }}
                            />
                            {/*<FormControlLabel*/}
                            {/*    control={<Checkbox*/}
                            {/*        value="remember"*/}
                            {/*        color="primary"/>}*/}
                            {/*    label="مرا به خاطر بسپار"*/}
                            {/*/>*/}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt: 3,
                                    mb: 2
                                }}
                            >
                                ورود به حساب کاربری
                            </Button>
                        </Box>
                    </Box>
                    <Copyright
                        sx={{
                            mt: 2,
                            mb: 2
                        }}/>
                    <br/>
                </Container>}
        </Fragment>
    );
}

// export async function getServerSideProps(
//     {
//         req
//     }
// ) {
//     const {token} = parseCookies(req)
//     console.log(token)
//     let myToken=token;
//     if (token === undefined){
//         myToken = null
//     }
// //     let user = null
// //     const response = await axios.get(`${API_URL}/users/me`, {
// //         headers: {
// //             Authorization: `Bearer ${token}`,
// //         }
// //     })
// //         .then(response => {
// //             user = response.data
// //         })
// //         .catch(function (error) {
// //             // console.log(error)
// //         })
// //     // console.log(user)
//     return {
//         props: {
//             token: JSON.parse(JSON.stringify(myToken)),
//         },
//     }
// }

//copy from other page
// export async function getServerSideProps({req}) {
//     const {token} = parseCookies(req)
//
//     // let transactions = null
//     // const response = await axios.get(`${API_URL}/transactions?pagination[page]=1&pagination[pageSize]=100`, {
//     //     headers: {
//     //         Authorization: `Bearer ${token}`,
//     //     }
//     // })
//     //     .then(response => {
//     //         transactions = response.data
//     //     })
//     //     .catch(function (error) {
//     //         // console.log(error)
//     //     })
//     return {
//         props: {
//             // transactions,
//             token: token || "salam",
//         },
//     }
// }
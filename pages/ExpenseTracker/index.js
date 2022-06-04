import {Fab, Grid, Tooltip} from "@mui/material";
import Details from "../../components/Details/Details";
import Main from "../../components/Main/Main";
import useStyles from "../../src/style";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {API_URL} from "../../config";
import {toast} from "react-toastify";
import {ExpenseTrackerContext} from "../../context/context";
import {useCookies} from "react-cookie";
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
// import {Navigate, useNavigate} from "react-router-dom";
import {Fragment} from "react";
import {useRouter} from "next/router";
import {parseCookies} from "../../utils/cookie";
import logout from "../api/logout";
import AuthContext from "../../context/AuthContext";

const ExpenseTracker = ({
                            transactions,
                            token
                        }) => {
    const router = useRouter()
    const {
        logout,
        error
    } = useContext(AuthContext)
    const {classes} = useStyles();
    const {
        initializeTransactions,
    } = useContext(ExpenseTrackerContext);

    const logoutHandler = async () => {
        logout()
        await router.replace('/')
    }

    useEffect(() => {
        if (transactions)
            initializeTransactions(transactions)
    }, []);

    return (
        <Fragment>
            <Fragment>
                <Tooltip
                    title={<div
                        style={{
                            fontFamily: 'Vazirmatn FD, sans-serif',
                            fontSize: '1rem'
                        }}>خروج</div>}>
                    <Fab
                        onClick={logoutHandler}
                        sx={{
                            position: 'fixed',
                            bottom: 8,
                            left: 8
                        }}
                        color="pink"
                        aria-label="add">
                        <LogoutIcon/>
                    </Fab>
                </Tooltip>
                <Grid
                    className={classes.grid}
                    container
                    spacing={0}
                    // alignItems="center"
                    // alignItems={"flex-end"}
                    justifyContent='center'
                    style={{height: '100vh'}}>
                    <Grid
                        item
                        xs={12}
                        md={3}>
                        <Details title="درآمد"/>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={5}>
                        <Main token={`Bearer ${token}`}/>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={3}>
                        <Details title="هزینه"/>
                    </Grid>
                </Grid>
            </Fragment>
        </Fragment>
    )
}

export default ExpenseTracker

export async function getServerSideProps({req}) {
    const {token} = parseCookies(req)
    let transactions = null
    const response = await axios.get(`${API_URL}/transactions`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
        .then(response => {
            transactions = response.data
        })
        .catch(function (error) {
            // console.log(error)
        })
    return {
        props: {
            transactions,
            token,
        },
    }
}
import React, {useContext} from 'react';
import { Grid, Divider, Card, CardHeader, CardContent, Typography } from '@mui/material';

import { ExpenseTrackerContext } from '../../context/context';
import Form from './Form/Form';
// import List from './List/List';
import useStyle from './style';
import NumberFormat from "react-number-format";
import EnhancedTable from "./Table/EnhancedTable";
import MyEnhancedTable from "./Table/MyEnhancedTable";

const Main = ({token}) => {
    const {classes} = useStyle();
    const {balance} = useContext(ExpenseTrackerContext)
    return (
        <Card className={classes.root}>
            <CardHeader title="مدیریت هزینه و درآمد آزمایشگاه"/>
            <CardContent>
                <Typography align="center" variant="h5">
                    <NumberFormat
                        value={balance}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={' تومان'}
                    />
                </Typography>
                <Typography variant="subtitle1" style={{ lineHeight: '1.5em', marginTop: '20px' }}>
                    افزودن مورد جدید
                </Typography>
                <Divider />
                <Form token={token} />
            </CardContent>
            <CardContent className={classes.cardContent}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        {/*<List />*/}
                        {/*<EnhancedTable />*/}
                        <MyEnhancedTable token={token} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default Main;

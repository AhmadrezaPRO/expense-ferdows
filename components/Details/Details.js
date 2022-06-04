import React from 'react';
import { Card, CardHeader, CardContent, Typography } from '@mui/material';
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';

import useStyles from './style';
import useTransactions from '../../hooks/useTransactions';
import NumberFormat from "react-number-format";
// import List from "../Main/List/List";

const Details = ({title}) => {
    const {classes} = useStyles();
    const { total, chartData } = useTransactions(title);
    const options = {
        plugins: {
            legend: {
                labels: {
                    font: {
                        family: "Vazirmatn FD" // Add your font here to change the font of your legend label
                    }
                },
                tooltip: {
                    bodyFont: {
                        family: "Vazirmatn FD" // Add your font here to change the font of your tooltip body
                    },
                    titleFont: {
                        family: "Vazirmatn FD" // Add your font here to change the font of your tooltip title
                    }
                }
            }
        },
    }
    return (
        <Card className={title === 'هزینه' ? classes.expense : classes.income}>
            <CardHeader title={title} />
            <CardContent>
                <Typography variant="h5">
                    <NumberFormat
                        value={total}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={' تومان'}
                    />
                </Typography>
                <Chart type='doughnut' data={chartData} options={options}/>
            </CardContent>
            {/*<List type={title === 'هزینه' ? 'Expense' : 'Income'} />*/}
        </Card>
    )
}

export default Details

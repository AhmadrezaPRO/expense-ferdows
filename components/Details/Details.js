import React from 'react';
import {Card, CardHeader, CardContent, Typography, Box} from '@mui/material';
import 'chart.js/auto';
import {Chart} from 'react-chartjs-2';

import useStyles from './style';
import useTransactions from '../../hooks/useTransactions';
import NumberFormat from "react-number-format";
import {thousandSeparator} from "utils/formatNumbers";
// import List from "../Main/List/List";

const Details = ({title}) => {
    const {classes} = useStyles();
    const {
        total,
        chartData
    } = useTransactions(title);
    const labels = chartData.labels
    const amounts = chartData.datasets[0].data
    const colors = chartData.datasets[0].backgroundColor
    const mixed = labels.map(function (x, i) {
        // return [x, amounts[i], colors[i]]
        return {
            label: x,
            amount: amounts[i],
            color: colors[i]
        }
    });
    const legends = [...mixed].sort((a, b) => b.amount - a.amount);
    const bgColor = {
        id: 'bgColor',
        beforeDraw(chart, args, options) {
            const {ctx, width, height} = chart
            ctx.fillStyle = options.backgroundColor
            ctx.fillRect(0,0, width, height)
            ctx.restore()
        }
    }
    const options = {
        plugins: {
            bgColor:{
                backgroundColor: 'white'
            },
            legend: {
                display: false,
                rtl: true,
                position: 'bottom',
                labels: {
                    font: {
                        family: "Vazirmatn FD" // Add your font here to change the font of your legend label
                    }
                },
            },
            tooltip: {
                bodyFont: {
                    family: "Vazirmatn FD" // Add your font here to change the font of your tooltip body
                },
                titleFont: {
                    family: "Vazirmatn FD" // Add your font here to change the font of your tooltip title
                }
            }
        },
    }
    return (
        <Card id={title === 'هزینه' ? 'expenseCart' : 'incomeCart'} className={title === 'هزینه' ? classes.expense : classes.income}>
            <CardHeader title={title}/>
            <CardContent>
                <Typography variant="h5">
                    <NumberFormat
                        value={total}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={' تومان'}
                    />
                </Typography>
                <Chart
                    plugins={[bgColor]}
                    id={title === 'هزینه' ? 'expenseChart' : 'incomeChart'}
                    type='doughnut'
                    data={chartData}
                    options={options}/>
                {/*{labels.map(label => <div>{label}</div>)}*/}
                <Box id={title === 'هزینه' ? 'expenseLegends' : 'incomeLegends'} >
                    {legends.map(legend =>
                        <Box sx={{display: 'flex', alignItems: "center"}}>
                            <Box sx={{
                                height: '10px',
                                width: '40px',
                                backgroundColor: legend.color
                            }}/>
                            <Typography variant="h5" component="div" sx={{fontSize: '1.2rem'}}>
                                {`\xa0${legend.label} : ${thousandSeparator(legend.amount.toString())}`}
                            </Typography>
                        </Box>)}
                </Box>
            </CardContent>
            {/*<List type={title === 'هزینه' ? 'Expense' : 'Income'} />*/}
        </Card>
    )
}

export default Details

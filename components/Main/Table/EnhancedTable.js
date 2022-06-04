import * as React from 'react';
import PropTypes from 'prop-types';
import {alpha} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FilterListIcon from '@mui/icons-material/FilterList';
import {visuallyHidden} from '@mui/utils';
import {useContext} from "react";
import {ExpenseTrackerContext} from "../../../context/context";
import {expenseCategories, incomeCategories} from "../../../constants/categories";
import formatDate from "../../../utils/formatDate";
// import {makeStyles} from "@mui/material";
import {makeStyles} from 'tss-react/mui';
import NumberFormat from "react-number-format";

const useStyles = makeStyles()({
    tableCell: {
        width: '10px',
    }
});


function createData(name, description, amount, date , id) {
    return {
        name,
        description,
        amount,
        date,
        id
    };
}

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'rowNumber',
        numeric: true,
        disablePadding: false,
        label: '#',
    },
    {
        id: 'date',
        numeric: false,
        disablePadding: false,
        label: 'تاریخ',
    },
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'هزینه/درآمد',
    },
    {
        id: 'description',
        numeric: false,
        disablePadding: false,
        label: 'توضیحات',
    },
    {
        id: 'amount',
        numeric: true,
        disablePadding: false,
        label: 'مبلغ',
    },
];

function EnhancedTableHead(props) {
    const {
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort
    } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        // align={headCell.numeric ? 'right' : 'left'}
                        align={'left'}
                        // padding={headCell.disablePadding ? 'none' : 'normal'}
                        padding='none'
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box
                                    component="span"
                                    sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
    console.log(props)
    const numSelected = props.numSelected.length;

    return (
        <Toolbar
            sx={{
                pl: {sm: 2},
                pr: {
                    xs: 1,
                    sm: 1
                },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{flex: '1 1 100%'}}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{flex: '1 1 100%'}}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    جدول هزینه و درآمد
                </Typography>
            )}

            {
                numSelected === 1 ? (
                    <>
                        <Tooltip title={<div style={{ fontFamily: 'Vazirmatn FD, sans-serif'}}>ویرایش</div>}>
                            <IconButton>
                                <EditIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={<div style={{ fontFamily: 'Vazirmatn FD, sans-serif'}}>حدف</div>}>
                            <IconButton>
                                <DeleteIcon/>
                            </IconButton>
                        </Tooltip>
                    </>
                ) : (numSelected === 0) ? (
                    <Tooltip title={<div style={{ fontFamily: 'Vazirmatn FD, sans-serif'}}>فیلتر</div>}>
                        <IconButton>
                            <FilterListIcon/>
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title={<div style={{ fontFamily: 'Vazirmatn FD, sans-serif'}}>حذف</div>}>
                        <IconButton>
                            <DeleteIcon/>
                        </IconButton>
                    </Tooltip>)}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
    const {classes} = useStyles()
    const {transactions} = useContext(ExpenseTrackerContext);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(true);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const rows = transactions.map((t) => {
        const selectedCategory = t.type === 'Income' ? incomeCategories : expenseCategories
        const category = selectedCategory.filter(item => item.type === t.category)[0].description
        return (createData(category, t.description, t.amount, formatDate(t.date), t.id))
        // return (createData(category + '\xa0' + t.description, t.amount, formatDate(t.date)))
    })
    // const rows = [
    //     createData('بازاریابی', '2', 350000, new Date().toDateString()),
    //     createData('Donut', 452, 25.0, 51),
    //     createData('Eclair', 262, 16.0, 24),
    //     createData('Frozen yoghurt', 159, 6.0, 24),
    //     createData('Gingerbread', 356, 16.0, 49),
    //     createData('Honeycomb', 408, 3.2, 87, 6.5),
    //     createData('Ice cream sandwich', 237, 9.0, 37),
    //     createData('Jelly Bean', 375, 0.0, 94),
    //     createData('KitKat', 518, 26.0, 65),
    //     createData('Lollipop', 392, 0.2, 98),
    //     createData('Marshmallow', 318, 0, 81),
    //     createData('Nougat', 360, 19.0, 9),
    //     createData('Oreo', 437, 18.0, 63),
    // ];

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <Box sx={{width: '100%'}}>
            <Paper
                sx={{
                    width: '100%',
                    mb: 2
                }}>
                <EnhancedTableToolbar numSelected={selected}/>
                <TableContainer>
                    <Table
                        sx={{ /*minWidth: 750*/}}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.name);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            sx={{
                                                width: '1px',
                                                whiteSpace: 'nowrap'
                                            }}
                                            component="th"
                                            scope="row"
                                            padding="none"
                                            hover
                                            onClick={(event) => handleClick(event, row.name)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.name}
                                            selected={isItemSelected}
                                        >
                                            <TableCell
                                                sx={{
                                                    width: '1px',
                                                    whiteSpace: 'nowrap'
                                                }}
                                                component="th"
                                                scope="row"
                                                padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    width: '1px',
                                                    whiteSpace: 'nowrap',
                                                    // textAlign: 'center'
                                                }}
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {index+1}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    width: '1px',
                                                    whiteSpace: 'nowrap'
                                                }}
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.date}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    width: '1px',
                                                    whiteSpace: 'nowrap'
                                                }}
                                                component="th"
                                                scope="row"
                                                padding="none">{row.name}</TableCell>
                                            <TableCell
                                                sx={{
                                                    width: '1px',
                                                    whiteSpace: 'nowrap'
                                                }}
                                                component="th"
                                                scope="row"
                                                padding="none">{row.description}</TableCell>
                                            <TableCell
                                                sx={{
                                                    width: '1px',
                                                    whiteSpace: 'nowrap'
                                                }}
                                                component="th"
                                                scope="row"
                                                padding="none">
                                                <NumberFormat
                                                    value={row.amount}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={' تومان'}
                                                />
                                            </TableCell>
                                            {/*<TableCell align="right">{row.amount}</TableCell>*/}
                                            {/*<TableCell align="right">{row.amount}</TableCell>*/}
                                            {/*<TableCell align="right">{row.amount}</TableCell>*/}
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6}/>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    labelDisplayedRows={({
                                             from,
                                             to,
                                             count
                                         }) =>
                        `${to}-${from} از ${count}`
                    }
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            {/*<FormControlLabel*/}
            {/*    control={<Switch checked={dense} onChange={handleChangeDense} />}*/}
            {/*    label="Dense padding"*/}
            {/*/>*/}
        </Box>
    );
}
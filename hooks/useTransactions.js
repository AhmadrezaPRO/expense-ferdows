import { useContext } from 'react';
import { ExpenseTrackerContext } from '../context/context';
import { incomeCategories, expenseCategories, resetCategories } from '../constants/categories';

const useTransactions = (title) => {

    resetCategories();

    const { transactions } = useContext(ExpenseTrackerContext);

    const transactionPerType = transactions.filter((t) => t.type === (title==="هزینه" ? "Expense" : "Income"));

    const total = transactionPerType.reduce((acc, currentVal) => acc += currentVal.amount, 0);

    const categories = title === 'هزینه' ? expenseCategories : incomeCategories ;

    transactionPerType.forEach((t) => {
        const category = categories.find((c) => c.type === t.category)
        if(category) category.amount += t.amount
    })

    const filteredCategories = categories.filter((sc) => sc.amount > 0);

    const chartData = {
        datasets: [{
            data: filteredCategories.map((c) => c.amount),
            backgroundColor: filteredCategories.map((c) => c.color),
        }],
            labels: filteredCategories.map((c) => c.description),
    };

    return { filteredCategories, total, chartData };
}

export default useTransactions;
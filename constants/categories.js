const incomeColors = ['#123123', '#154731', '#165f40', '#16784f', '#14915f', '#10ac6e', '#0bc77e', '#04e38d', '#00ff9d'];
const expenseColors = ['#b50d12', '#bf2f1f', '#c9452c', '#d3583a', '#dc6a48', '#e57c58', '#ee8d68', '#f79d79', '#ffae8a', '#cc474b', '#f55b5f'];

export const incomeCategories = [
    {
        type: 'sobhan',
        description: 'صندوق سبحان',
        amount: 0,
        color: incomeColors[0]
    },
    {
        type: 'mokarami',
        description: 'صندوق مکرمی',
        amount: 0,
        color: incomeColors[4]
    },
    {
        type: 'dabir',
        description: 'صندوق دبیر',
        amount: 0,
        color: incomeColors[8]
    },
    {
        type: 'othersIncome',
        description: 'سایر درآمدها',
        amount: 0,
        color: incomeColors[2]
    },
    // { type: 'Deposits', amount: 0, color: incomeColors[3] },
    // { type: 'Lottery', amount: 0, color: incomeColors[4] },
    // { type: 'Gifts', amount: 0, color: incomeColors[5] },
    // { type: 'Salary', amount: 0, color: incomeColors[6] },
    // { type: 'Savings', amount: 0, color: incomeColors[7] },
    // { type: 'Rental income', amount: 0, color: incomeColors[8] },
];

export const expenseCategories = [
    {
        type: 'rent',
        description: 'اجاره',
        amount: 0,
        color: expenseColors[0]
    },
    {
        type: 'marketing',
        description: 'بازاریابی',
        amount: 0,
        color: expenseColors[1]
    },
    {
        type: 'delivery',
        description: 'پیک',
        amount: 0,
        color: expenseColors[2]
    },
    {
        type: 'salary',
        description: 'حقوق',
        amount: 0,
        color: expenseColors[3]
    },
    {
        type: 'technical',
        description: 'حق فنی',
        amount: 0,
        color: expenseColors[4]
    },
    {
        type: 'office',
        description: 'موارد دفتری و اداری',
        amount: 0,
        color: expenseColors[5]
    },
    {
        type: 'consume',
        description: 'موارد مصرفی',
        amount: 0,
        color: expenseColors[6]
    },
    {
        type: 'reference',
        description: 'موارد ارجاعی',
        amount: 0,
        color: expenseColors[7]
    },
    {
        type: 'equipment',
        description: 'تجهیزات',
        amount: 0,
        color: expenseColors[8]
    },
    {
        type: 'cytology',
        description: 'سیتولوژی',
        amount: 0,
        color: expenseColors[9]
    },
    {
        type: 'othersExpense',
        description: 'سایر هزینه‌ها',
        amount: 0,
        color: expenseColors[10]
    },
    // { type: 'Food', amount: 0, color: expenseColors[4] },
    // { type: 'Shopping', amount: 0, color: expenseColors[5] },
    // { type: 'House', amount: 0, color: expenseColors[6] },
    // { type: 'Entertainment', amount: 0, color: expenseColors[7] },
    // { type: 'Phone', amount: 0, color: expenseColors[8] },
    // { type: 'Pets', amount: 0, color: expenseColors[9] },
    // { type: 'Other', amount: 0, color: expenseColors[10] },
];

export const resetCategories = () => {
    incomeCategories.forEach((c) => c.amount = 0);
    expenseCategories.forEach((c) => c.amount = 0);
};
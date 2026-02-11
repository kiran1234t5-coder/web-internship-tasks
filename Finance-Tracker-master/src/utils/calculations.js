export const calculateTotal = (transactions, type = null) => {
  if (type) {
    return transactions
      .filter(t => t.type === type)
      .reduce((sum, t) => sum + t.amount, 0);
  }
  return transactions.reduce((sum, t) => sum + t.amount, 0);
};

export const calculateIncome = (transactions) => {
  return calculateTotal(transactions, 'income');
};

export const calculateExpense = (transactions) => {
  return calculateTotal(transactions, 'expense');
};

export const calculateBalance = (transactions) => {
  return calculateIncome(transactions) - calculateExpense(transactions);
};

export const calculateSavingsRate = (transactions) => {
  const income = calculateIncome(transactions);
  const expense = calculateExpense(transactions);
  return income > 0 ? ((income - expense) / income) * 100 : 0;
};

export const groupTransactionsByMonth = (transactions) => {
  const grouped = {};
  
  transactions.forEach(transaction => {
    const date = new Date(transaction.date || Date.now());
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (!grouped[monthKey]) {
      grouped[monthKey] = {
        month: monthKey,
        income: 0,
        expense: 0,
        transactions: []
      };
    }
    
    grouped[monthKey].transactions.push(transaction);
    
    if (transaction.type === 'income') {
      grouped[monthKey].income += transaction.amount;
    } else {
      grouped[monthKey].expense += transaction.amount;
    }
  });
  
  return Object.values(grouped).sort((a, b) => a.month.localeCompare(b.month));
};

export const groupTransactionsByCategory = (transactions) => {
  const categories = {};
  
  transactions.forEach(transaction => {
    const category = transaction.category || transaction.type;
    
    if (!categories[category]) {
      categories[category] = {
        name: category,
        amount: 0,
        count: 0,
        type: transaction.type
      };
    }
    
    categories[category].amount += transaction.amount;
    categories[category].count += 1;
  });
  
  return Object.values(categories);
};

export const getTopSpendingCategories = (transactions, limit = 5) => {
  const expenses = transactions.filter(t => t.type === 'expense');
  const categories = groupTransactionsByCategory(expenses);
  
  return categories
    .sort((a, b) => b.amount - a.amount)
    .slice(0, limit);
};

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowUpDown, ArrowUp, ArrowDown, Filter } from 'lucide-react';
import { mockTransactions } from '../utils/mockData';
import Modal from '../components/Common/Modal';

const Transactions = () => {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedTransactions = useMemo(() => {
    let filtered = transactions.filter(tx => {
      const matchesSearch = 
        tx.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.amount.toString().includes(searchTerm);
      
      const matchesStatus = statusFilter === 'all' || tx.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });

    if (sortField) {
      filtered = [...filtered].sort((a, b) => {
        let aVal = a[sortField];
        let bVal = b[sortField];

        if (sortField === 'date') {
          aVal = new Date(aVal);
          bVal = new Date(bVal);
        }

        if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [transactions, searchTerm, sortField, sortDirection, statusFilter]);

  const totalValue = useMemo(() => {
    return filteredAndSortedTransactions.reduce((sum, tx) => sum + tx.value, 0);
  }, [filteredAndSortedTransactions]);

  const SortIcon = ({ field }) => {
    if (sortField !== field) {
      return <ArrowUpDown size={16} />;
    }
    return sortDirection === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />;
  };

  return (
    <div className="transactions-page">
      <div className="page-header">
        <div>
          <h1>Transactions</h1>
          <p>Bitcoin transaction history and details</p>
        </div>
      </div>

      <div className="transactions-controls">
        <div className="search-container">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-container">
          <Filter size={20} />
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      <div className="transactions-summary">
        <div className="summary-card">
          <span className="summary-label">Total Transactions</span>
          <span className="summary-value">{filteredAndSortedTransactions.length}</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">Total Value</span>
          <span className="summary-value">${totalValue.toLocaleString()}</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">Total BTC</span>
          <span className="summary-value">
            {filteredAndSortedTransactions.reduce((sum, tx) => sum + tx.amount, 0).toFixed(4)} BTC
          </span>
        </div>
      </div>

      <motion.div
        className="transactions-table-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <table className="transactions-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('date')} className="sortable">
                Date <SortIcon field="date" />
              </th>
              <th onClick={() => handleSort('type')} className="sortable">
                Type <SortIcon field="type" />
              </th>
              <th onClick={() => handleSort('amount')} className="sortable">
                Amount (BTC) <SortIcon field="amount" />
              </th>
              <th onClick={() => handleSort('value')} className="sortable">
                Value (USD) <SortIcon field="value" />
              </th>
              <th onClick={() => handleSort('status')} className="sortable">
                Status <SortIcon field="status" />
              </th>
              <th>Transaction Hash</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedTransactions.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-data">
                  No transactions found
                </td>
              </tr>
            ) : (
              filteredAndSortedTransactions.map((transaction) => (
                <motion.tr
                  key={transaction.id}
                  className="table-row"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ backgroundColor: 'var(--hover-bg)' }}
                  onClick={() => setSelectedTransaction(transaction)}
                >
                  <td>{transaction.date}</td>
                  <td>
                    <span className={`transaction-type type-${transaction.type.toLowerCase()}`}>
                      {transaction.type}
                    </span>
                  </td>
                  <td>{transaction.amount.toFixed(4)}</td>
                  <td>${transaction.value.toLocaleString()}</td>
                  <td>
                    <span className={`status-badge status-${transaction.status}`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="hash-cell">{transaction.hash}</td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </motion.div>

      <Modal
        isOpen={!!selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
        title="Transaction Details"
      >
        {selectedTransaction && (
          <div className="transaction-details">
            <div className="detail-section">
              <div className="detail-item">
                <span className="detail-label">Transaction Hash</span>
                <span className="detail-value hash-value">{selectedTransaction.hash}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Date</span>
                <span className="detail-value">{selectedTransaction.date}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Type</span>
                <span className={`detail-value transaction-type type-${selectedTransaction.type.toLowerCase()}`}>
                  {selectedTransaction.type}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Amount</span>
                <span className="detail-value">{selectedTransaction.amount.toFixed(4)} BTC</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Value</span>
                <span className="detail-value">${selectedTransaction.value.toLocaleString()}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Status</span>
                <span className={`detail-value status-badge status-${selectedTransaction.status}`}>
                  {selectedTransaction.status}
                </span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Transactions;

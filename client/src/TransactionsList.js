import React, { useState, useEffect } from 'react';
import { fetchAllTransactions } from '../utils/ethereum';

function TransactionsList() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const loadTransactions = async () => {
            const transactions = await fetchAllTransactions();
            setTransactions(transactions);
        };

        loadTransactions();
    }, []);

    return (
        <div>
            <h2>Transactions</h2>
            <ul>
                {transactions.map((tx, index) => (
                    <li key={index}>
                        <p><strong>Sender:</strong> {tx.sender}</p>
                        <p><strong>Receiver:</strong> {tx.receiver}</p>
                        <p><strong>IPFS Hash:</strong> {tx.ipfsHash}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TransactionsList;
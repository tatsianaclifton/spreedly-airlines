import React, { useEffect, useState } from 'react';
import axios from 'axios';
 
const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState();

    useEffect(() => {
        getTransactions();
    }, []);

    const reloadTransactionsHandler = () => {
        getTransactions();
    };

    function getTransactions() {
        const url = "http://localhost:3004/api/transactions";
        axios.get(url)
            .then(response => {
                setTransactions(response.data.transactions.transactions);
            })
            .catch(error => {
                setError(error);
            }
        ); 
    };

    return (
        <>
            <h2 style={{ display: 'inline-block', margin: '0'}}>Transactions</h2>
            <button
                className="btn btn-secondary"
                style={{ margin: '10px'}}
                onClick={reloadTransactionsHandler}>
                Refresh
            </button>
            <div className="card" style={{ width: '80%', margin: 'auto'}}>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Transaction Type</th>
                            <th scope="col">Created Date</th>
                            <th scope="col">Updated Date</th>
                            <th scope="col">Status</th>
                            <th scope="col">Amount, USD</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(item => (
                        <tr key={item.token}>
                            <td>{item.transaction_type}</td>
                            <td>{(new Date(item.created_at)).toLocaleString()}</td>
                            <td>{(new Date(item.updated_at)).toLocaleString()}</td>
                            <td>{item.succeeded ? 'succeeded' : 'failed'}</td>
                            <td>{item.amount ? Number(item.amount)/100 : '-'}</td>
                        </tr>))}
                    </tbody>
                </table>
                {error && <p style={{ color: 'red', margin: 'auto'}}>Error ocurred while fetching transactions</p>}
            </div>
        </>
    )
};
 
export default Transactions;
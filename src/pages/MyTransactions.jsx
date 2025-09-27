import React,{ useEffect, useState } from 'react';
import { api } from '../api/axios';
import { Table, Button } from 'reactstrap';
import { useAuth } from '../context/AuthContext';
export default function MyTransactions() {
  const [txs, setTxs] = useState([]);
  const {user}= useAuth();
  
  const load = async () => {
    const res = await api.get('/transactions');
    setTxs(res.data.transactions);
  };
  console.log(user);
  
  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    await api.patch(`/transactions/${id}/status`, { status });
    load();
  };

  return (
    <div className="container">
      <h3>My Transactions</h3>
      <Table striped className='table-responsive'>
        <thead>
          <tr>
            <th>Book</th>
            <th>Buyer</th>
            <th>Seller</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {txs.map(t => (
            <tr key={t._id}>
              <td>{t.book?.title} (₹{t.book?.price})</td>
              <td>{t.buyer?.name}</td>
              <td>{t.seller?.name}</td>
              <td>{t.status}</td>
              <td>
                {t.status === 'initiated' && t.seller._id === user.id  ? (
                  <>
                    <Button color="success" size="sm" onClick={() => updateStatus(t._id, 'accepted')}>Accept</Button>{' '}
                    <Button color="danger" size="sm" onClick={() => updateStatus(t._id, 'rejected')}>Reject</Button>
                  </>
                ): ("NA")}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

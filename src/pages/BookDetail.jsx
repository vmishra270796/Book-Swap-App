import React,{ useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../api/axios';
import { Card, CardBody, CardTitle, CardText, Button, Alert } from 'reactstrap';

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/books/${id}`).then(res => setBook(res.data.book)).catch(() => setError('Not found'));
  }, [id]);

  const initiate = async () => {
    setError('');
    try {
      await api.post('/transactions/initiate', { bookId: id });
      navigate('/transactions');
    } catch (err) {
      console.log(err.response?.data?.message);
      
      setError(err.response?.data?.message || 'Failed to initiate');
    }
  };

  if (!book) {
    return <div className="container">{error ? <Alert color="danger">{error}</Alert> : 'Loading...'}</div>;
  }

  return (
    <div className="container">
       {error && <Alert color="danger" className="mb-3">{error}</Alert>}
      <Card>
        {book.images?.length > 0 && (
          <div className="d-flex gap-2 p-2 flex-wrap">
            {book.images.map((src, idx) => (
              <img key={idx} src={`http://localhost:4000${src}`} alt={`${book.title}-${idx}`} style={{ maxHeight: 180 }} />
            ))}
          </div>
        )}
        <CardBody>
          <CardTitle tag="h4">{book.title}</CardTitle>
          <CardText><strong>Author:</strong> {book.author}</CardText>
          <CardText><strong>Price:</strong> ₹{book.price}</CardText>
          <CardText><strong>Condition:</strong> {book.condition}</CardText>
          <CardText><strong>Seller:</strong> {book.owner?.name} ({book.owner?.email})</CardText>
          <CardText>{book.description}</CardText>
          <Button color="success" onClick={initiate}>Initiate Transaction</Button>
        </CardBody>
      </Card>
    </div>
  );
}

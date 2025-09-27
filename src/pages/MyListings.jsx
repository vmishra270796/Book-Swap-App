import React,{ useEffect, useState } from 'react';
import { api } from '../api/axios';
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';

export default function MyListings() {
  const [books, setBooks] = useState([]);

  const load = async () => {
    const res = await api.get('/books/mine');
    setBooks(res.data.books);
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      await api.delete(`/books/${id}`);
      load(); 
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete book");
    }
  };

  return (
    <div className="container">
      <h3>My Listings</h3>
      <div className="row">
        {books.map(b => (
          <div key={b._id} className="col-md-4 mb-3">
            <Card>
              {b.images?.length > 0 && (
                <img src={`http://localhost:4000${b.images[0]}`} alt={b.title} className="img-fluid" />
              )}
              <CardBody>
                <CardTitle tag="h5">{b.title}</CardTitle>
                <CardText><strong>Price:</strong> ₹{b.price}</CardText>
                <CardText><strong>Condition:</strong> {b.condition}</CardText>
                <Button color="danger" size="sm" onClick={() => handleDelete(b._id)}>Delete</Button>
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

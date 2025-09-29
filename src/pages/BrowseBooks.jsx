import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import { api } from "../api/axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function BrowseBooks() {
  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState({
    title: "",
    author: "",
    category: "",
  });
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const { user } = useAuth();

  const load = async (p = 1, append = false) => {
    const params = { ...filters, page: p, limit: 6 };
    const res = await api.get("/books", { params });
    setBooks(append ? [...books, ...res.data.books] : res.data.books);
    setPage(res.data.page);
    setHasMore(res.data.hasMore);
  };

  useEffect(() => {
    load();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    load(1, false);
  };

  return (
    <div className="container">
      <h3>Browse Books</h3>
      <Form
        onSubmit={onSubmit}
        className="mb-3 d-flex align-items-stretch gap-2"
      >
        <div className="d-flex flex-grow-1 gap-2">
          <FormGroup className="flex-grow-1">
            <Input
              placeholder="Title"
              value={filters.title}
              onChange={(e) =>
                setFilters({ ...filters, title: e.target.value })
              }
            />
          </FormGroup>
          <FormGroup className="flex-grow-1">
            <Input
              placeholder="Author"
              value={filters.author}
              onChange={(e) =>
                setFilters({ ...filters, author: e.target.value })
              }
            />
          </FormGroup>
          <FormGroup className="flex-grow-1">
            <Input
              placeholder="Category"
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
            />
          </FormGroup>
        </div>
        <Button color="primary" className="h-100">Search</Button>
      </Form>

      <div className="row">
        {books.map((b) => (
          <div key={b._id} className="col-md-4 mb-3">
            <Card>
              {b.images?.length > 0 && (
                <img
                  src={`${import.meta.env.VITE_API_FILE_URL}${b.images[0]}`}
                  alt={b.title}
                  className="img-fluid"
                />
              )}
              <CardBody>
                <CardTitle tag="h5">{b.title}</CardTitle>
                <CardText>
                  <strong>Author:</strong> {b.author}
                </CardText>
                <CardText>
                  <strong>Price:</strong> ₹{b.price}
                </CardText>
                <CardText>
                  <strong>Condition:</strong> {b.condition}
                </CardText>
                <Button tag={Link} to={`/books/${b._id}`} color="primary">
                  View
                </Button>{" "}
                {user && (
                  <Button tag={Link} to={`/books/${b._id}`} color="success">
                    Buy
                  </Button>
                )}
              </CardBody>
            </Card>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="text-center mt-3">
          <Button color="secondary" onClick={() => load(page + 1, true)}>
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}

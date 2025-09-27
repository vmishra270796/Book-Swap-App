import React, { useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
  Card,
  CardBody,
  CardTitle,
} from "reactstrap";
import { api } from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function PostBook() {
  const [form, setForm] = useState({
    title: "",
    author: "",
    price: 0,
    condition: "good",
    description: "",
    category: "general",
  });
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));
      for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i]);
      }

      await api.post("/books", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/mine");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to post book");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card style={{ width: "500px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <CardBody>
          <CardTitle tag="h3" className="text-center mb-4">
            Post a Book
          </CardTitle>

          {error && <Alert color="danger">{error}</Alert>}

          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label>Title</Label>
              <Input
                placeholder="Please enter title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Author</Label>
              <Input
                placeholder="Please enter author"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Price</Label>
              <Input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Condition</Label>
              <Input
                type="select"
                value={form.condition}
                onChange={(e) =>
                  setForm({ ...form, condition: e.target.value })
                }
              >
                <option>new</option>
                <option>like-new</option>
                <option>good</option>
                <option>fair</option>
              </Input>
            </FormGroup>

            <FormGroup>
              <Label>Category</Label>
              <Input
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Description</Label>
              <Input
                placeholder="please enter description"
                type="textarea"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </FormGroup>

            <FormGroup>
              <Label>Images (up to 3)</Label>
              <Input
                type="file"
                multiple
                onChange={(e) => {
                  const newFiles = Array.from(e.target.files);
                  const filtered = newFiles.filter(
                    (file) =>
                      !files.some(
                        (f) => f.name === file.name && f.size === file.size
                      )
                  );
                  setFiles([...files, ...filtered].slice(0, 3));
                  e.target.value = "";
                }}
              />
            </FormGroup>

            {files.length > 0 && (
              <div className="mt-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="d-flex align-items-center justify-content-between border p-2 mb-1 rounded"
                  >
                    <span>{file.name}</span>
                    <Button
                      color="danger"
                      size="sm"
                      close
                      onClick={() =>
                        setFiles(files.filter((_, i) => i !== index))
                      }
                    />
                  </div>
                ))}
              </div>
            )}

            <Button color="primary" block className="mt-3">
              Post
            </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}

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
import { login } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import PasswordInput from "../components/PasswordInput";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await login(form);
      setUser(res.data.user);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "70vh" }}
    >
      <Card style={{ width: "400px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <CardBody>
          <CardTitle tag="h3" className="text-center mb-4">
            Login
          </CardTitle>

          {error && <Alert color="danger">{error}</Alert>}

          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="please enter email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Password</Label>
              <PasswordInput
                placeholder="please enter password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </FormGroup>

            <Button color="primary" block>
              Login
            </Button>
          </Form>

          <div className="mt-3 text-center">
            <Link to="/signup">Don’t have an account? Signup</Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

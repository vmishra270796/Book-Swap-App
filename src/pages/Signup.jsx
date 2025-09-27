import React,{ useState } from 'react';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import { signup } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import { Link,useNavigate } from 'react-router-dom';
import PasswordInput from '../components/PasswordInput';
export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await signup(form);
      setUser(res.data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="container">
      <h3>Signup</h3>
      {error && <Alert color="danger">{error}</Alert>}
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <Label>Name</Label>
          <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        </FormGroup>
        <FormGroup>
          <Label>Email</Label>
          <Input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
            <PasswordInput
                value={form?.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
              />
          {/* <Input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} /> */}
        </FormGroup>
        <Button color="primary">Create account</Button>
        <div className="mt-3 text-center">
            <Link to="/login">Already have an account? Login</Link>
          </div>
      </Form>
    </div>
  );
}

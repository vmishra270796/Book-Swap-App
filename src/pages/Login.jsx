import React,{ useState } from 'react';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import { login } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import PasswordInput from '../components/PasswordInput';
export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await login(form);
      setUser(res.data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container">
      <h3>Login</h3>
      {error && <Alert color="danger">{error}</Alert>}
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <Label>Email</Label>
          <Input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <PasswordInput value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required/>

          {/* <Input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} /> */}
        </FormGroup>
        <Button color="primary">Login</Button>
      </Form>
    </div>
  );
}

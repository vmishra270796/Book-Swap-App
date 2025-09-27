// src/components/PasswordInput.jsx
import React, { useState } from 'react';
import { Input, InputGroup, InputGroupText, Button } from 'reactstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function PasswordInput({ value, onChange, placeholder = "Password", ...props }) {
  const [show, setShow] = useState(false);

  return (
    <InputGroup>
      <Input
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...props}
      />
      <InputGroupText style={{ cursor: "pointer" }} onClick={() => setShow(!show)}>
        {show ? <FaEyeSlash /> : <FaEye />}
      </InputGroupText>
    </InputGroup>
  );
}

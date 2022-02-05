import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/file-list");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToPass = { email: email, password: password };
    axios
      .post("http://localhost:8000/api/login", dataToPass)
      .then((result) => {
        if (result.data.code == 200) {
          localStorage.setItem("token", result.data.authToken);
          localStorage.setItem("id", result.data.data._id);
          navigate("/upload");
        }
      })
      .catch((err) => console.log(err, "<- register error"));
  };

  return (
    <Container className="mt-3">
      <h1>Login</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" onClick={(e) => handleSubmit(e)}>
          Submit
        </Button>
        <a href="" onClick={() => navigate("/")} style={{ marginLeft: "10px" }}>
          Go to Register
        </a>
      </Form>
    </Container>
  );
};

export default Login;

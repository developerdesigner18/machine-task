import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/file-list");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToPass = { name: name, email: email, password: password };
    axios
      .post("http://localhost:8000/api/register", dataToPass)
      .then((result) => {
        console.log("result ", result.data);
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
      <h1>Register</h1>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

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
        <a
          href=""
          onClick={() => navigate("/login")}
          style={{ marginLeft: "10px" }}
        >
          Go to Login
        </a>
      </Form>
    </Container>
  );
};

export default Register;

import React from "react";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";

const File403 = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Container>
        <h1>You have not permission to access this file</h1>
        <br />
        <a href="" onClick={() => navigate("/file-list")}>
          Back to List
        </a>
      </Container>
    </div>
  );
};

export default File403;

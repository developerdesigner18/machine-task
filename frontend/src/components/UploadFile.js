import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UploadFile = () => {
  const [fileName, setFileName] = useState();
  const [value, setValue] = useState();
  const navigate = useNavigate();

  const handleFile = (e) => {
    setFileName(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let fd = new FormData();
    fd.append("file", fileName);
    fd.append("permission", value);
    fd.append("id", localStorage.getItem("id"));

    axios
      .put("http://localhost:8000/api/uploadFile", fd, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((result) => {
        if (result.data.code == 200) {
          alert("File uploaded successfully");
          setFileName("");
          setValue("");
          window.location.reload();
        }
      })
      .catch((err) => console.log("error ", err));
  };

  return (
    <div>
      <Container>
        {/* <label className="choose_file custom-file-upload">
          <input type="file" onChange={(e) => {}} />
          Upload File
        </label> */}
        <div className="d-flex justify-content-between">
          <h1>File Upload</h1>
          {localStorage.getItem("token") ? (
            <>
              <h4
                style={{ cursor: "pointer" }}
                onClick={() => {
                  localStorage.clear();
                  navigate("/login");
                }}
              >
                Logout
              </h4>
            </>
          ) : (
            <></>
          )}
        </div>
        <Form>
          <Form.Group controlId="formFile" className="mt-3">
            <Form.Label className="file_label">Select your document</Form.Label>
            <Form.Control
              type="file"
              size="lg"
              onChange={(e) => handleFile(e)}
            />
          </Form.Group>

          <Form.Group controlId="formAccess" className="mt-3">
            <Form.Label className="file_label">
              Has Permossion to access?
            </Form.Label>
            <br />
            <Form.Check
              inline
              label="yes"
              name="group1"
              type="radio"
              value={true}
              onChange={(e) => setValue(e.target.value)}
            />
            <Form.Check
              inline
              label="no"
              name="group1"
              type="radio"
              value={false}
              onChange={(e) => setValue(e.target.value)}
            />
          </Form.Group>

          <Button
            variant="primary"
            className="mt-3"
            onClick={(e) => handleSubmit(e)}
          >
            Upload
          </Button>
          <a
            href=""
            onClick={() => navigate("/file-list")}
            style={{ marginLeft: "10px" }}
          >
            List the file
          </a>
        </Form>
      </Container>
    </div>
  );
};

export default UploadFile;

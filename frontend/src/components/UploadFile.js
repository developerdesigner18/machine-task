import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";

const UploadFile = () => {
  const [fileName, setFileName] = useState();
  const [users, setUsers] = useState();
  const [allowedUser, setAllowedUser] = useState();
  const [allowedUserId, setAllowedUserId] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("id")) {
      axios
        .get("http://localhost:8000/api/usersList", {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then((result) => {
          if (result.data.code === 200) {
            let temp = result.data.data.filter(
              ({ _id }) => _id !== localStorage.getItem("id")
            );
            // temp.forEach((item) => {
            //   item["checked"] = false;
            // });
            setUsers(temp);
            setAllowedUser(temp && temp.length ? temp[0].name : "");
          }
        })
        .catch((err) => console.log("error in listing", err));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    let fd = new FormData();
    fd.append("file", fileName);
    fd.append("id", localStorage.getItem("id"));
    allowedUserId.forEach((value) => {
      fd.append("allowedUserId", value);
    });

    axios
      .put("http://localhost:8000/api/uploadFile", fd, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((result) => {
        if (result.data.code == 200) {
          alert("File uploaded successfully");
          setFileName("");
          window.location.reload();
        }
      })
      .catch((err) => console.log("error ", err));
  };

  const handleUser = (user, e) => {
    if (allowedUserId.includes(user._id)) {
      let array = allowedUserId.filter((item) => item !== user._id);
      setAllowedUserId([...array]);
    } else {
      let array = [...allowedUserId];
      array.push(user._id);
      setAllowedUserId([...array]);
    }
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
              onChange={(e) => setFileName(e.target.files[0])}
              required
            />
          </Form.Group>

          <Form.Group controlId="formAccess" className="mt-3">
            <Form.Label className="file_label">
              Registered users list
            </Form.Label>
            <Table responsive="md">
              <tbody>
                {users && users.length
                  ? users.map((singleuser, i) => {
                      return (
                        <tr key={i}>
                          <td>{singleuser.name}</td>
                          <td>
                            <Form.Check
                              type="switch"
                              checked={allowedUserId.includes(singleuser._id)}
                              onChange={(e) => handleUser(singleuser, e)}
                              id="custom-switch"
                            />
                          </td>
                        </tr>
                      );
                    })
                  : "No users Registered"}
              </tbody>
            </Table>
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

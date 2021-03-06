import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import axios from "axios";
import FileLoad from "./FileLoad";

const FileList = () => {
  const [list, setList] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/uploadedFileList", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((result) => {
        if (result.data.code == 200) {
          setList(result.data.data);
        }
      })
      .catch((err) => console.log("error in list ", err));
  }, []);

  const viewFile = (item) => {
    axios
      .get(
        `http://localhost:8000/api/singleFileDetail?id=${
          item._id
        }&userId=${localStorage.getItem("id")}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((result) => {
        if (result.data.data) {
          // window.location.href = result.data.data.link;
          navigate("/load-file", { state: { data: item } });
        } else {
          navigate("/not-permission");
        }
      })
      .catch((err) => console.log("error in display ", err));
  };

  return (
    <div>
      <Container>
        <div className="d-flex justify-content-between">
          <h1>File List</h1>
          <a href="" onClick={() => navigate("/upload")}>
            Back to upload
          </a>
          {localStorage.getItem("token") ? (
            <h4
              style={{ cursor: "pointer" }}
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              Logout
            </h4>
          ) : (
            <></>
          )}
        </div>
        <Table responsive="md">
          <thead>
            <tr>
              <td>
                <b>File Name</b>
              </td>
              <td>
                <b>Uploaded By</b>
              </td>
            </tr>
          </thead>
          <tbody>
            {list && list.length
              ? list.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td
                        style={{ cursor: "pointer" }}
                        onClick={() => viewFile(item)}
                      >
                        {item.name}
                      </td>
                      <td>{item?.uploadedUser?.name}</td>
                    </tr>
                  );
                })
              : "No file uploaded"}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default FileList;

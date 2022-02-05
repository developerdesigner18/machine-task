import UploadFile from "./components/UploadFile";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import FileList from "./components/FileList";
import File403 from "./components/403File";
import FileLoad from "./components/FileLoad";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Register />} />
          <Route exact path="/upload" element={<UploadFile />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/file-list" element={<FileList />} />
          <Route exact path="/not-permission" element={<File403 />} />
          <Route exact path="/load-file" element={<FileLoad />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

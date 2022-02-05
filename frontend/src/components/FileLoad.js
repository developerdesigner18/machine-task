import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const FileLoad = (props) => {
  const location = useLocation();
  const [allowed, setAllowed] = useState({});
  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (location) {
      const found = location?.state?.data.allowedUserId.find(
        (id) => id == localStorage.getItem("id")
      );
      if (found) {
        setStatus(true);
        setAllowed(location?.state?.data);
      } else if (
        localStorage.getItem("id") == location?.state?.data.uploadedUserId
      ) {
        setStatus(true);
        setAllowed(location?.state?.data);
      } else {
        setStatus(false);
      }
    }
  }, [location]);

  return (
    <div>
      {status ? (
        <div
          dangerouslySetInnerHTML={{
            __html: allowed
              ? `<iframe src='${allowed.link}' width='100%' height='850' />`
              : `You have not permission to access this file`,
          }}
        />
      ) : (
        <h1>You have not permission to access this file</h1>
      )}
    </div>
  );
};

export default FileLoad;

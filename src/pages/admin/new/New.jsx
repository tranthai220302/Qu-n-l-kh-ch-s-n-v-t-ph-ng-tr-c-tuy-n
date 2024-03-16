import "./new.css";
import Sidebar from "../../../compoments/admin/sidebar/Sidebar";
import Navbar from "../../../compoments/admin/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import TableProfile from "../../customers/profile/tableProfile/TableProfile";
const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const user = JSON.parse(localStorage.getItem('currentUser'))
  return (
    <div className="new1">
      <Sidebar />
      <div className="newContainer1">
        <Navbar />
        <div style={{display : 'flex', justifyContent : 'center', paddingTop : '20px'}}>
          <TableProfile/>
        </div>
      </div>
    </div>
  );
};

export default New;

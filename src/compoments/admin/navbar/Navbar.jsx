import "./navbar.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../../../context/darkModeContext";
import { useContext } from "react";

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);

  return (
    <div className="navbarAdmin">
      <div className="wrapperAdmin">
        <div className="searchAdmin">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div className="itemsAdmin">
          <div className="itemAdmin">
            <LanguageOutlinedIcon className="iconAdmin" />
            English
          </div>
          <div className="itemAdmin">
            <DarkModeOutlinedIcon
              className="iconAdmin"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          <div className="itemAdmin">
            <FullscreenExitOutlinedIcon className="iconAdmin" />
          </div>
          <div className="itemAdmin">
            <ListOutlinedIcon className="iconAdmin" />
          </div>
          <div className="itemAdmin">
            <img
              src="https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?size=338&ext=jpg&ga=GA1.1.735520172.1710892800&semt=ais"
              alt=""
              className="avatarAdmin"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

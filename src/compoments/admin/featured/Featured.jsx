import "./featured.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

const Featured = ({revenue}) => {
  return (
    <div className="featuredAdmin">
      <div className="top">
        <h1 className="titleChart">Tổng doanh thu</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
        </div>
        <p className="titleChart">Doanh thu hôm nay</p>
        <p className="amount">{(revenue.total).toLocaleString('en-US')} VND</p>
        <p className="desc">
        Xử lý giao dịch trước đó. Các khoản thanh toán cuối cùng có thể không được bao gồm
        </p>
      </div>
    </div>
  );
};

export default Featured;

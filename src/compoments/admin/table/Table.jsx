import "./table.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const List = ({data}) => {
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">ID</TableCell>
            <TableCell className="tableCell">Tên</TableCell>
            <TableCell className="tableCell">Người quản lý</TableCell>
            <TableCell className="tableCell">Địa chỉ</TableCell>
            <TableCell className="tableCell">Doanh thu</TableCell>
            <TableCell className="tableCell">Phương thức thanh toán</TableCell>
            <TableCell className="tableCell">Trạng thái</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.img} alt="" className="image" />
                  <span style={{fontWeight : '700'}}>{row.name}</span>
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.hotelOwner}</TableCell>
              <TableCell className="tableCell">{row.address}</TableCell>
              <TableCell className="tableCell" style={{color : 'red'}}>{(row.total).toLocaleString('en-US')} VND</TableCell>
              <TableCell className="tableCell">{row.payment}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status === "Approved" ? "Đang hoạt động" : "Đang đăng ký" }</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;

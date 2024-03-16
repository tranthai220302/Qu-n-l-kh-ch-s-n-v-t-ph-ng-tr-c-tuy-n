
import { DataGrid } from "@mui/x-data-grid";
import { ownerColumns, userColumns, userRows } from "../../../datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import BarChartIcon from '@mui/icons-material/BarChart';
import ModalRevenueOwner from "../revenueOwner/ModalReveneuOwner";
const DatatableOwner = ({rows}) => {
  console.log(rows)
  const [data, setData] = useState(userRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Doanh thu",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="cellAction">
              <div className="viewButton"><ModalRevenueOwner id = {params.row.id} /></div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/admin/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={rows}
        columns={ownerColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default DatatableOwner;


import { DataGrid } from "@mui/x-data-grid";
import { ownerColumns, serverColoumn, userColumns, userRows } from "../../../datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Alert, Button, CircularProgress } from "@mui/material";
import BarChartIcon from '@mui/icons-material/BarChart';
import ModalRevenueOwner from "../revenueOwner/ModalReveneuOwner";
import newRequest from "../../../ults/newRequest";
import Backdrop from '@mui/material/Backdrop';
import Snackbar from '@mui/material/Snackbar';
import ModalCreateService from "../../../pages/admin/service/Modal/ModalCreateService";
const DataService = ({rows, getData}) => {
  const [data, setData] = useState([])
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState([])
  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'right',
  });
  const handleCloseSnack = () => {
    setState({ ...state, openSnack: false });
  };
  const { vertical, horizontal, openSnack } = state;
  const handleSelectionChange = (selection) => {
    setSelectedIds(selection)
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
  const hanldeDelete = () =>{
    setIsLoading(true)
    newRequest.post(`/service/delete`, {
        id : selectedIds
    }).then((res)=>{
        setData(res.data);
        setIsLoading(false);
        setError(false)
        setState({
            openSnack: true,
            vertical: 'top',
            horizontal: 'right',
        })
        setSelectedIds([])
        getData()
    }).catch((error)=>{
        setIsLoading(false);
        setError(error.response.data)
        getData()
        setSelectedIds([])
    })
  }
  return (
    <div className="datatable" style={{display: 'flex', flexDirection: 'column', alignItems : 'center', gap : '20px'}}>
      <Snackbar 
          anchorOrigin={{ vertical, horizontal }}
          open={openSnack}
          onClose={handleCloseSnack}
          message={"helo"}
          key={vertical + horizontal}
      >
        <Alert>Xoá thành công</Alert>
      </Snackbar>
      <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={isLoading}
              >
              <CircularProgress color="inherit" />
      </Backdrop>
      <div className="datatableTitle">
        Thêm dịch vụ
        <ModalCreateService getData={getData}/>
      </div>
        <DataGrid
          sx={{width : '800px'}}
          rows={rows}
          columns={serverColoumn}
          initialState={{
            pagination: {
                paginationModel: { page: 0, pageSize: 7 },
            },
          }}
          onRowSelectionModelChange={(params) => {handleSelectionChange(params)}}
          pageSizeOptions={[7, 21]}
          checkboxSelection
        />
        {
          selectedIds.length > 0 && (
            <div style={{display : 'flex', gap : '20px', marginTop : '20px', justifyContent : 'flex-end', width : '800px'}}>
              <Button sx={{color : 'red', border : '1px solid red'}} variant="outlined" onClick={()=>{hanldeDelete()}}>Xoá</Button>
            </div>
          )
        }
    </div>
  );
};

export default DataService;

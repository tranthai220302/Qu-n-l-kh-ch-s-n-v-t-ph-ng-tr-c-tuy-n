
import { DataGrid } from "@mui/x-data-grid";
import { ownerColumns, serverColoumn, userColumns, userRows } from "../../../datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import BarChartIcon from '@mui/icons-material/BarChart';
import ModalRevenueOwner from "../revenueOwner/ModalReveneuOwner";
import ModalCreateService from "../../../pages/admin/service/Modal/ModalCreateService";
import { Button, CircularProgress } from "@mui/material";
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import AddIcon from "@mui/icons-material/Add";
import ModalItems from "./ModalItems";
import ModalCreateItem from "./ModalCreateItem";
import ModalCreateCategory from "./ModalCreateCategory";
import Snackbar from '@mui/material/Snackbar';
import newRequest from "../../../ults/newRequest";
import Backdrop from '@mui/material/Backdrop';
const DataItem = ({rows, getData}) => {
  const [data, setData] = useState([])
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const handleSelectionChange = (selection) => {
    setSelectedIds(selection)
  };
  const [selectedIds, setSelectedIds] = useState([])
  const hanldeDelete = () =>{
    setIsLoading(true)
    newRequest.post(`/item/categoryItem/delete`, {
        id : selectedIds
    }).then((res)=>{
        setData(res.data);
        setIsLoading(false);
        setError(false);
        setSelectedIds([])
        getData()
    }).catch((error)=>{
        setIsLoading(false);
        setError(error.response.data)
        getData()
        setSelectedIds([])
    })
  }
  const actionColumn = [
    {
      field: "action",
      headerName: "Danh sách thiết bị",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
              <Button><ModalItems data = {params.row.Items} getData={getData}/></Button>
          </div>
        );
      },
    },
    {
        field: "action1",
        headerName: "Thêm thiết bị",
        width: 100,
        renderCell: (params) => {
          return (
            <div className="cellAction">
                <ModalCreateItem id ={params.row.id} getData={getData}/>
            </div>
          );
        },
      },
  ];
  return (
    <div className="datatable" style={{display: 'flex', flexDirection: 'column', alignItems : 'center', gap : '20px'}}>
      <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
          >
          <CircularProgress color="inherit" />
      </Backdrop>
      <div className="datatableTitle">
        Thêm tiện nghi
        <ModalCreateCategory getData={getData}/>
      </div>
      <DataGrid
        sx={{width : '900px', height : '900px'}}
        rows={rows}
        columns={serverColoumn.concat(actionColumn)}
        initialState={{
          pagination: {
              paginationModel: { page: 0, pageSize: 7 },
          },
        }}
        pageSizeOptions={[7, 21]}
        checkboxSelection
        onRowSelectionModelChange={(params) => {handleSelectionChange(params)}}
      />
        {
          selectedIds.length > 0 && (
            <div style={{display : 'flex', gap : '20px', justifyContent : 'flex-end', width : '900px'}}>
              <Button sx={{color : 'red', border : '1px solid red'}} variant="outlined" onClick={()=>{hanldeDelete()}}>Xoá</Button>
            </div>
          )
        }
    </div>
  );
};

export default DataItem;

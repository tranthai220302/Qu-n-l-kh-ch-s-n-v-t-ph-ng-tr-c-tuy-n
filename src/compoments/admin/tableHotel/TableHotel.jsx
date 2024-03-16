import "./tableHotel.css";
import { DataGrid } from "@mui/x-data-grid";
import { HotelColumns, HotelConfirmColumns, userRows } from "../../../datatablesource";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { Alert, Button, CircularProgress } from '@mui/material';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import newRequest from "../../../ults/newRequest";
import Backdrop from '@mui/material/Backdrop';
import Snackbar from '@mui/material/Snackbar';
import ModalHotel from "./ModalHotel/ModalHotel";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import RevenueHotel from "../revenueHotel/RevenueHotel";
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
const TableHotel = ({rows,row2, row3, getData, isLoading}) => {
  const [selectedIds, setSelectedIds] = useState([])
  const [selectedIdC, setSelectedIdC] = useState([])
  const [selectedId3, setSelectedId3] = useState([])
  const [data, setData] = useState([])
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)
  const [isLoadingDel, setIsLoadingDel] = useState(false);
  const [value, setValue] = React.useState(0);
  const handleClick = (id) => {
    window.open(`/hotels/${id}`, '_blank');
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue)
  };
  const handleSelectionChange = (selection) => {
    setSelectedIds(selection)
  };
  const handleSelectionChangeC = (selection) => {
    setSelectedIdC(selection)
  };
  const handleSelectionChange3 = (selection) => {
    setSelectedId3(selection)
  };
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'right',
  });
  const submit = (title, message, url, messageSucces, id) => {
    confirmAlert({
      title: title,
      message: message,
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleDelete(url, messageSucces, id)
        },
        {
          label: 'No',
          onClick: () => console.log(selectedIds)
        }
      ]
    });
  };
  const { vertical, horizontal, openSnack } = state;
  const handleCloseSnack = () => {
    setState({ ...state, openSnack: false });
  };
    const handleDelete = (url, messageSucces, id) =>{
        setIsLoadingDel(true)
        newRequest.post(`${url}`, {
            id : id
        }).then((res)=>{
            setData(res.data);
            setMessage(messageSucces)
            setIsLoadingDel(false);
            setError(false)
            setState({
                openSnack: true,
                vertical: 'top',
                horizontal: 'right',
            })
            getData(0);
            getData(1);
            getData(3);
        }).catch((error)=>{
            setIsLoadingDel(false);
            setError(error.response.data)
        })
    }
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="cellAction">
              <ModalHotel data = {params.row.data}/>
          </div>
        );
      },
    },

  ];
  const actionActi = [
    {
      field: "action",
      headerName: "Doanh thu",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="cellAction">
              <RevenueHotel id = {params.row.id}/>
          </div>
        );
      },
    },
    {
      field: "view",
      headerName: "Chi tiết",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="cellAction"  onClick={()=>handleClick(params.row.id)}>
              <Button><WysiwygIcon /></Button>
          </div>
        );
      },
    },
  ]
  return (
    <div style={{display : 'flex', flexDirection : 'column', alignItems: 'center', gap : '10px'}}>
        <Tabs value={value} onChange={handleChange} aria-label="disabled tabs example" sx={{bgColor : 'red'}}>
          <Tab label="khách sạn đăng ký" />
          <Tab label="khách sạn đang hoạt động" />
          <Tab label="khách sạn ngừng hoạt động" />
        </Tabs>
        <div className="datatable">
          <Snackbar 
              anchorOrigin={{ vertical, horizontal }}
              open={openSnack}
              onClose={handleCloseSnack}
              message={"helo"}
              key={vertical + horizontal}
          >
                  <Alert
                      anchorOrigin={{ vertical, horizontal }}
                      onClose={()=>{            
                          setState({
                          openSack: false,
                          vertical: 'top',
                          horizontal: 'right',
                      })}}
                      severity="success"
                      variant="filled"
                      sx={{ width: '100%' }}
                  >
                  {message}
              </Alert>
          </Snackbar>
          <Backdrop
                  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                  open={isLoadingDel}
                  >
                  <CircularProgress color="inherit" />
          </Backdrop>
          {value == 0 && !isLoading  && (
              <DataGrid
                className="datagrid"
                rows={rows}
                columns={HotelColumns.concat(actionColumn)}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
                onRowSelectionModelChange={(params) => {handleSelectionChange(params)}}
              />
          )}
        {
          selectedIds.length > 0 && value == 0 && !isLoading &&(
            <div style={{display : 'flex', gap : '20px', marginTop : '20px', justifyContent : 'flex-end'}}>
              <Button variant="outlined" onClick={()=>submit('Xác nhận đăng ký khách sạn', 'Sau khi xác nhận, những khách sạn này sẽ đi vào hoạt động!', '/hotel/admin/confirm', 'Xác nhận thành công!', selectedIds)}>Xác nhận</Button>
              <Button variant="outlined"onClick={()=>submit('Huỷ đăng ký khách sạn', 'Sau khi huỷ đăng ký, các khách sạn này sẽ bị xoá !', '/hotel/admin/cancel', 'Huỷ đăng ký thành công!', selectedIds)} style={{color : 'red', border : '1px solid red'}}>Từ chối</Button>
            </div>
          )
        }
          {value == 1 && !isLoading && (
              <DataGrid
                className="datagrid"
                rows={row2}
                columns={HotelConfirmColumns.concat(actionActi  )}
                initialState={{
                  pagination: {
                      paginationModel: { page: 0, pageSize: 7 },
                  },
              }}
                pageSizeOptions={[7, 21]}
                checkboxSelection
                onRowSelectionModelChange={(params) => {handleSelectionChangeC(params)}}
              />
          )}
        {
          selectedIdC.length > 0 && value == 1 && !isLoading &&(
            <div style={{display : 'flex', gap : '20px', marginTop : '20px', justifyContent : 'flex-end'}}>
              <Button variant="outlined"onClick={()=>submit('Huỷ đăng ký khách sạn', 'Sau khi huỷ đăng ký, các khách sạn này sẽ đi vào ngưng hoạt động!', '/hotel/admin/noActivi/3', 'Xác nhận thành công!', selectedIdC)} style={{color : 'red', border : '1px solid red'}}>Ngưng hoạt động</Button>
            </div>
          )
        }
        {value == 2 && !isLoading && (
              <DataGrid
                className="datagrid"
                rows={row3}
                columns={HotelConfirmColumns}
                initialState={{
                  pagination: {
                      paginationModel: { page: 0, pageSize: 7 },
                  },
              }}
                pageSizeOptions={[7, 21]}
                checkboxSelection
                onRowSelectionModelChange={(params) => {handleSelectionChange3(params)}}
              />
          )}
        {
          selectedId3.length > 0 && value == 2 && !isLoading && (
            <div style={{display : 'flex', gap : '20px', marginTop : '20px', justifyContent : 'flex-end'}}>
              <Button sx={{color : 'red', border : '1px solid red'}} variant="outlined" onClick={()=>submit('Xác nhận đăng ký khách sạn', 'Sau khi xác nhận, những khách sạn này sẽ bị xoá đi và không khôi phục lại được!', '/hotel/admin/deleteActi', 'Xoá thành công!', selectedId3)}>Xoá</Button>
              <Button variant="outlined"onClick={()=>submit('Khôi phục khách sạn', 'Sau khi khôi phục khách sạn này sẽ đi vào hoạt động trở lại!', '/hotel/admin/noActivi/1', 'Xác nhận thành công!', selectedId3)}>Khôi phục</Button>
            </div>
          )
        }
          {
            isLoading && <div style={{width : '100%', display : 'flex', justifyContent : 'center', margin : 'auto', marginTop : '200px'}}><CircularProgress/></div>
          }
      </div>
    </div>
  );
};

export default TableHotel;

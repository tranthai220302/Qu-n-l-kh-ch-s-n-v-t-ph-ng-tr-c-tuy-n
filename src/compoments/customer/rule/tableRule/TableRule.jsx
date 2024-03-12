import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import './TableRule.css'
export default function TableRule({data}) {
  return (
    <TableContainer component={Paper} style={{marginTop: '20px'}}>
      <Table aria-label="collapsible table">
        <TableBody>
          <TableRow>
            <TableCell style={{fontWeight: '600'}}>
                Nhận phòng
            </TableCell>
            <TableCell>
                <div className="checkin">
                    <span className='hours'>Từ {data.timeCheckIn}</span>
                    <span className='titleH2'>Khách được yêu cầu xuất trình giấy tờ tùy thân có ảnh và thẻ tín dụng lúc nhận phòng</span>
                </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{fontWeight: '600'}}>
                Trả phòng
            </TableCell>
            <TableCell>
                <div className="checkin">
                    <span className='hours'>Từ {data.timeCheckOut}</span>
                </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{fontWeight: '600'}}>
                Huỷ đặt phòng/Trả trước
            </TableCell>
            <TableCell>
                <span>
                Các chính sách hủy và thanh toán trước có khác biệt dựa trên loại chỗ nghỉ. Vui lòng nhập ngày tháng lưu trú và kiểm tra các điều kiện của phòng bạn chọn.
                </span>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{fontWeight: '600'}}>
                Trả em và giường
            </TableCell>
            <TableCell>
                <div className="checkin">
                    <b>Chính sách trẻ em:</b>
                    <div className='descChildren'>
                        <span className="childrenItem">Phù hợp cho tất cả trẻ em.</span>
                        <span className="childrenItem">Trẻ em từ 18 tuổi trở lên sẽ được tính giá như người lớn tại chỗ nghỉ này.</span>
                        <span className="childrenItem">Để xem thông tin giá và tình trạng phòng trống chính xác, vui lòng thêm số lượng và độ tuổi của trẻ em trong nhóm của bạn khi tìm kiếm.</span>
                    </div>
                    <b>Chính sách nôi và giường phụ:</b>
                    <div className='CS'>
                        <b>0 - 2 tuổi</b>
                        <div className="CSItem">
                            <span>Có nôi/cũi nếu yêu cầu :</span>
                            <span style={{color: 'green', fontWeight: '600'}}>Miễn phí</span>
                        </div>
                    </div>
                    <div className='CS'>
                        <b>Người lớn (Từ 18 tuổi trở lên)</b>
                        <div className="CSItem">
                            <span>Có giường phụ nếu yêu cầu :</span>
                            <span style={{color: 'green', fontWeight: '600'}}>VND 300.000/người/đêm</span>
                        </div>
                    </div>
                    <div className='descChildren'>
                        <span className="childrenItem">Giá cho nôi/cũi và giường phụ chưa được bao gồm trong giá tổng và sẽ cần được thanh toán riêng trong kỳ nghỉ.</span>
                        <span className="childrenItem">Số lượng giường phụ và nôi/cũi được phép tùy thuộc vào tùy chọn của bạn. Vui lòng kiểm tra tùy chọn mà bạn đã chọn để biết thêm thông tin.</span>
                        <span className="childrenItem">Tất cả nôi/cũi và giường phụ tùy thuộc vào tình trạng có sẵn.</span>
                    </div>
                </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{fontWeight: '600'}}>
                Không giới hạn độ tuổi
            </TableCell>
            <TableCell>
                <span>
                Không có yêu cầu về độ tuổi khi nhận phòng
                </span>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{fontWeight: '600'}}>
                Vật nuôi
            </TableCell>
            <TableCell>
                <span>
                {data.isAnimals ? 'Vật nuôi không được phép.' : 'Không được phép mang vật nuôi.'}
                </span>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{fontWeight: '600'}}>
                Bãi đỗ xe
            </TableCell>
            <TableCell>
                <span>
                {data.isParking ? 'Có bãi đỗ xe' : 'Không có bãi đỗ xe'}
                </span>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
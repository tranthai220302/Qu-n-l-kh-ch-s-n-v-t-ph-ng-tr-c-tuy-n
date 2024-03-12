import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import newRequest from '../../../ults/newRequest';
import * as Yup from 'yup';
import './ModalQuestion.css'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const validateQuestion = Yup.object().shape({
    question : Yup.string()
        .min(10, 'Vui lòng nhập câu hỏi lớn hơn 10 ký tự !')
        .required('Vui lòng nhập đầy đủ thông tin')
})
export default function ModalQuestion({id}) {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'right',
  });
  const { vertical, horizontal, openSack } = state;
  const handleCloseSnack = () => {
    setState({ ...state, openSnack: false });
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const hanleCreateQuestion = (values, {setFieldError,setSubmitting}) =>{
    newRequest.post(`/question/create/${id}`,values).then((res)=>{
        setState({
            openSack: true,
            vertical: 'top',
            horizontal: 'right',
        })
        handleClose()
        setSubmitting(false)
    }).catch((error)=>{
        setFieldError('question', 'Có lỗi xảy ra khi gửi yêu cầu.');
        setSubmitting(false)
    })
  }
  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>Đặt cậu hỏi</Button>
      <Snackbar 
        anchorOrigin={{ vertical, horizontal }}
        open={openSack}
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
            Câu hỏi của bạn sẽ được đăng khi được quản lý phản hồi !
        </Alert>
      </Snackbar>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">Nhập câu hỏi</h2>
          <Formik
                initialValues={{
                    question : ''
                }}
                validationSchema={validateQuestion}
                onSubmit={(values, {setFieldError, setSubmitting}) => {
                    hanleCreateQuestion(values, {setFieldError, setSubmitting})
                  }}
                >
                {({ errors, touched, isSubmitting }) => (
                    <Form>
                        <Field  as="textarea" name="question" className="myTextArea"/>
                        {errors.question ? (
                            <div className='error'>{errors.question}</div>
                        ) : null}
                        <Button variant="outlined" type='submit' style={{marginTop : '10px'}}>{isSubmitting ? (<CircularProgress color="inherit" size={'25px'}/>) : "OK"}</Button>
                    </Form>
                )}
            </Formik>
        </Box>
      </Modal>
    </div>
  );
}
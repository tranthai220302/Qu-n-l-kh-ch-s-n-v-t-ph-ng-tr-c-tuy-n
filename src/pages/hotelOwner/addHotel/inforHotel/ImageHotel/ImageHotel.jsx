import React from 'react'
import { Button, Paper, Rating, Stack, TextareaAutosize } from '@mui/material'
import { useState } from 'react';
import BackspaceIcon from '@mui/icons-material/Backspace';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import uploadImg from '../../../../../ults/upImage';
const ImageHotel = ({selectedImages, setSelectedImages}) => {
    const [isLoading,setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, setDate] = useState([])
    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'right',
      });
      const { vertical, horizontal, open} = state;
      const handleCloseSnack = () => {
        setState({ ...state, open: false });
      };
    const handleFileChange = (event) => {
        const files = event.target.files;
        const imagesArray = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();

            reader.onload = (e) => {
                imagesArray.push(e.target.result);
                if (imagesArray.length === files.length) {
                    setSelectedImages(imagesArray);
                }
            };

            reader.readAsDataURL(file);
        }
    };
    const handleRemoveImage = (index) => {
        const updatedImages = [...selectedImages];
        updatedImages.splice(index, 1);
        setSelectedImages(updatedImages);
    };

  return (
    <div className="containerInforHotel1">
        <h2 style={{width : '500px'}}>Khách sạn của Quý vị trông ra sao ?</h2>
        <div style={{display : 'flex', gap : '20px'}}>
        <Paper sx={{width : '450px', display: 'flex', flexDirection : 'column', alignItems : 'center', padding : '20px 30px', justifyContent : 'flex-start'}}>
                <Stack direction={'column'} width={'100%'} spacing={5} borderBottom='1px solid #e7e7e7' paddingBottom={'20px'}>
                    <span><b>Đăng tải ít nhất 5 ảnh của chỗ nghỉ</b>. Càng đăng nhiều, Quý vị càng có cơ hội nhận đặt phòng. Quý vị có thể thêm ảnh sau</span>
                    <Stack border={'2px dashed #e7e7e7'} display={'flex'} flexDirection={'column'} alignItems={'center'} spacing={3} padding ={'20px 0'}>
                        <span>Kéo và thả hoặc</span>
                        <label htmlFor="1" style={{ width: '30%',display : 'flex', alignContent : 'center' }} >
                            <div style={{textAlign: 'center', padding : '5px 0', border : '1px solid #0077cc', width : '100%', cursor: 'pointer', borderRadius : '5px'}}>Chọn ảnh</div>
                            <input
                                id="1"
                                type="file"
                                multiple
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                        </label>
                        <span className='titleH2'>jpg/jpeg hoặc png, tối đa 47MB mỗi file</span>
                    </Stack>
                </Stack>
                <Stack direction={'column'} width={'100%'} spacing={1} marginTop={'20px'}>
                    <span style={{fontWeight : '600'}}>Danh sách ảnh của quý vị :</span>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {selectedImages.map((image, index) => (
                        <div key={index} style={{ margin: '10px', textAlign: 'center', position: 'relative' }}>
                            <img src={image} alt={`Image ${index}`} style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
                            <button
                                onClick={() => handleRemoveImage(index)}
                                style={{ position: 'absolute', top: '0px', right: '0px', background: 'transparent', border: 'none', cursor: 'pointer' }}
                            >
                                <BackspaceIcon />
                            </button>
                        </div>
                    ))}
                    </div>
                </Stack>
        </Paper>
        </div>
    </div>
  )
}

export default ImageHotel
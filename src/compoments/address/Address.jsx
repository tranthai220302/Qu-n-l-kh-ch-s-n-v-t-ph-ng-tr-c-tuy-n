import React, { useEffect, useState } from 'react';
import treeData from '../../data/tree.json'
import './Address.css'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
function Address({isEdit, address, setAddress, user}) {
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [nameProvince, setProvince] = useState(user?.Address?.province);
  const [nameDistrict, setDistrict] = useState(user?.Address?.district);
  const [nameWard, setWard] = useState(user?.Address?.ward);
  const [numberHome, setNumberHome] = useState(user?.Address?.numberHome)

  const handleProvinceChange = (provinceCode) => {
    setSelectedProvince(provinceCode);
    setSelectedDistrict(null); 
    setSelectedWard(null); 
    setProvince(treeData[provinceCode]?.name_with_type)
  };

  const handleDistrictChange = (districtCode) => {
    setSelectedDistrict(districtCode);
    setDistrict(treeData[selectedProvince]['quan-huyen'][districtCode].name_with_type)
  };

  const handleWardChange = (wardCode) => {
    setSelectedWard(wardCode);
    setWard(treeData[selectedProvince]['quan-huyen'][selectedDistrict]['xa-phuong'][wardCode].name_with_type)

  };
  useEffect(()=>{
    setAddress({
      province : nameProvince,
      district : nameDistrict,
      ward : nameWard,
      numberHome 
    })
  }, [nameProvince, nameDistrict, nameWard, numberHome])
  return (
    <div>
        {
            !isEdit ? (
            <div className='containerAddress'>
                <div className='province'>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel id="demo-simple-select-standard-label">Tỉnh</InputLabel>
                      <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={selectedProvince}
                      onChange={(e) => handleProvinceChange(e.target.value)}
                      label="Age"
                      >
                      {Object.keys(treeData).map((provinceCode) => (
                          <MenuItem key={provinceCode} value={provinceCode}> {treeData[provinceCode].name_with_type}</MenuItem>
                      ))}
                      </Select>
                  </FormControl>
                </div>
          
                {selectedProvince && (
                  <div className='distrisct'>
                      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                          <InputLabel id="demo-simple-select-standard-label">Huyện/Thành phố</InputLabel>
                          <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          value={selectedDistrict}
                          onChange={(e) => handleDistrictChange(e.target.value)}
                          label="Age"
                          >
                          {Object.keys(treeData[selectedProvince]['quan-huyen']).map((districtCode) => (
                              <MenuItem key={districtCode} value={districtCode}>{treeData[selectedProvince]['quan-huyen'][districtCode].name_with_type}</MenuItem>
                          ))}
                          </Select>
                      </FormControl>
                  </div>
                )}
          
                {selectedDistrict && (
                  <div className='ward'>
                      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                          <InputLabel id="demo-simple-select-standard-label">Phường/Xã</InputLabel>
                          <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          value={selectedWard}
                          onChange={(e) => handleWardChange(e.target.value)}
                          label="Age"
                          >
                          {Object.keys(treeData[selectedProvince]['quan-huyen'][selectedDistrict]['xa-phuong']).map((wardCode) => (
                                <MenuItem key={wardCode} value={wardCode}>
                                  {treeData[selectedProvince]['quan-huyen'][selectedDistrict]['xa-phuong'][wardCode].name_with_type}
                                </MenuItem>
                          ))}
                          </Select>
                      </FormControl>
                  </div>
                )}
                {selectedWard && (
                    <div className='ward'>
                            <InputLabel id="demo-simple-select-standard-label" style={{fontSize : '12px'}}>Thôn/Số nhà</InputLabel>
                            <TextField
                              id="standard-basic"
                              defaultValue=""
                              variant="standard"
                              name='name'
                              onChange={(e)=>{setNumberHome(e.target.value)}}
                            />
                    </div>
                )}
            </div>
            ) : (
                <div>{user.Address?.numberHome}, {user.Address?.ward}, {user.Address?.district}, {user.Address?.province}</div>
            )
        }
    </div>
  );
}

export default Address;

import "./featured.css";
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import { getData } from "../../../ults/getData";
import { useEffect, useState } from "react";
const Featured = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
        try {
            const result = await getData('/address/popular', setIsLoading, setError);
            if (result !== "loi") setData(result)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
  }, []);
  return (
    <div className="containerFeature">
        {
          isLoading ? <Skeleton width={'30%'} style={{marginBottom: '30px'}}/> : <h1 className="homeTitle" style={{marginBottom: '30px'}}>Địa điểm đang thịnh hành</h1>
        }
      <div className="title">
        {
          isLoading ? <Skeleton width={'40%'} /> : " Các lựa chọn phổ biến nhất cho du khách từ Việt Nam"
        }
      </div>
      {isLoading ? (
        <div className="featured">
              <Skeleton
                sx={{ bgcolor: 'grey.300' }}
                variant="rectangular"
                width={"50%"}
                height={250}
                style={{
                  borderRadius : '10px'
                }}
              />
              <Skeleton
                sx={{ bgcolor: 'grey.300' }}
                variant="rectangular"
                width={"50%"}
                height={250}
                style={{
                  borderRadius : '10px'
                }}
              />
        </div>
      ):(
      <div className="featured">
        {data && data.length > 0 && data.map((item, i)=>{
          if(i == 3 || i == 2){
            return(
              <div className="featuredItem" key={i}>
                <img
                  src={item.img.filename}
                  alt=""
                  className="featuredImg"
                />
                <div className="featuredTitles">
                  <h3 style={{fontWeight : '900', color : 'white'}}>{item.name}</h3>
                </div>
              </div>
            )
          }
        })}
      </div>
      )}
      {
        isLoading ? (
          <div className="featured">
              <Skeleton
                sx={{ bgcolor: 'grey.300' }}
                variant="rectangular"
                width={"33%"}
                height={250}
                style={{
                  borderRadius : '10px'
                }}
              />
              <Skeleton
                sx={{ bgcolor: 'grey.300' }}
                variant="rectangular"
                width={"33%"}
                height={250}
                style={{
                  borderRadius : '10px'
                }}
              />
              <Skeleton
                sx={{ bgcolor: 'grey.300' }}
                variant="rectangular"
                width={"33%"}
                height={250}
                style={{
                  borderRadius : '10px'
                }}
              />
        </div>
        ) : (
          <div className="featured">
              {data && data.length > 0 && data.map((item, i)=>{
                if(i == 1 || i == 0 || i == 4){
                  return(
                    <div className="featuredItem" key={i}>
                      <img
                        src={item.img.filename}
                        alt=""
                        className="featuredImg"
                      />
                      <div className="featuredTitles">
                        <h3 style={{fontWeight : '900', color : 'white'}}>{item.name}</h3>
                      </div>
                    </div>
                  )
                }
              })}
        </div>
        )
      }
    </div>
  );
};

export default Featured;

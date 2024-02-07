import "./featured.css";

const Featured = () => {
  return (
    <div className="containerFeature">
      <div className="title">
        Các lựa chọn phổ biến nhất cho du khách từ Việt Nam
      </div>
        <div className="featured">
          <div className="featuredItem">
              <img
                src="https://shop.photozone.com.vn/wp-content/uploads/2015/02/nho-ngay-13-dia-diem-du-lich-sai-gon-chup-anh-dep-khong-ti-vet_photozone-com-vn-1.jpg"
                alt=""
                className="featuredImg"
              />
              <div className="featuredTitles">
                <h2>TP. Hồ Chí Minh</h2>
              </div>
            </div>
            
            <div className="featuredItem">
              <img
                src="https://static.cand.com.vn/Files/Image/hoaithu/2018/11/10/2dfc8311-7e5b-4900-9113-cc73c7f829ce.JPG"
                alt=""
                className="featuredImg"
              />
              <div className="featuredTitles">
                <h2>Đà Nẵng</h2>
              </div>
            </div>
        </div>
        <div className="featured">
          <div className="featuredItem">
            <img
              src="https://top10hue.vn/wp-content/uploads/2022/10/hinh-anh-hue-16.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h2>Huế</h2>
            </div>
          </div>
          
          <div className="featuredItem">
            <img
              src="https://www.hanoistudio.vn/wp-content/uploads/2021/05/nhung-dia-diem-chup-anh-dep-o-ha-noi-24.jpeg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h2>Hà Nội</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://baocamau.vn/image/ckeditor/2023/20231012/images/4.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h2>Cà Mau</h2>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Featured;

import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import fs from 'fs'
import inlineCss from 'inline-css'
dotenv.config()
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "thailu220302@gmail.com",
      pass: process.env.passEmail,
    },
  });
  const sendRequestByEmail = async() => {
    const info = await transporter.sendMail({
      from: 'harumi@gmail.com', 
      to: "tranthai220302@gmail.com", 
      subject: `Harumi đã từ chối yêu cầu mở cửa hàng của bạn`, 
      html: `
      <div style="width: 800px; margin: auto;">
    <div style="background-color: #003580; padding: 5px 10px;">
        <h2 style="color: white;">Booking.com</h2>
    </div>
    <div style="margin-top: 20px;padding-left: 10px;" >
        <span style="font-weight: 700; font-size: 20px; color: #94c9eb;">Cảm ơn quý khách đã tham gia đăng ký khách sạn</span>
        <div style="margin-top: 20px;">
            <span style="font-size: 15px; color : gray; font-style: italic;">
                Sau khi xem qua thông tin khách sạn bạn muốn đăng, nhưng thật tiếc khi thông báo rằng yêu cầu đăng ký khách sạn lên công ty của bạn đã bị từ chối, bởi một số lý do <b>"Thông tin không hợp lệ"</b>. Rất mong sẽ có cơ hội hợp tác với bạn!
            </span>
        </div>
    <div style="margin-top: 20px; text-align: center; font-size: 20px; margin-bottom: 20px; font-weight: 600; font-style: italic; color : #003580">
        <span style="font-size: 23px; font-weight: 800;">Booking.com</span> chúc quý khách có một kỳ nghỉ trọn vẹn.
    </div>
</div>

      `, 
    });
    console.log('send email')
};

  
export default sendRequestByEmail;
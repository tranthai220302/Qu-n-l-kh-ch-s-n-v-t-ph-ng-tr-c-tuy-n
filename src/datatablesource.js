export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "Tên",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.avatar ? params.row.avatar : "https://as2.ftcdn.net/v2/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg" } alt="avatar" />
          {params.row.name ? params.row.name : "Nguyễn Văn A"}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "phone",
    headerName: "Phone",
    width: 110,
  },

  {
    field: "status",
    headerName: "Trạng thái",
    width: 200,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status === "active" ? 'Đã đăng ký Tài khoản' : "Chưa đăng ký Tài khoản"}
        </div>
      );
    },
  },
];
export const ownerColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "Tên",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.avatar ? params.row.avatar : "https://as2.ftcdn.net/v2/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg" } alt="avatar" />
          {params.row.name ? params.row.name : "Nguyễn Văn A"}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "phone",
    headerName: "Phone",
    width: 110,
  },

  {
    field: "address",
    headerName: "Địa chỉ",
    width: 200,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.address}
        </div>
      );
    },
  },
];
export const HotelColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "Tên",
    width: 250,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img ? params.row.img : "https://as2.ftcdn.net/v2/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg" } alt="avatar" />
          {params.row.name ? params.row.name : "Nguyễn Văn A"}
        </div>
      );
    },
  },
  {
    field: "nameHotelOwner",
    headerName: "Người quản lý",
    width: 230,
  },

  {
    field: "address",
    headerName: "Địa chỉ",
    width: 200,
  },

  {
    field: "payment",
    headerName: "Phương thức thanh toán",
    width: 200,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.payment}`}>
          {params.row.payment === 'active' ? 'Thanh toán tại quầy' : "Thanh toán online"}
        </div>
      );
    },
  },
  {
    field: "date",
    headerName: "Ngày đăng ký",
    width: 100,
  },
];
export const serverColoumn = [
  {
    field: "id",
    headerName: "ID",
    width: 150,
  },

  {
    field: "name",
    headerName: "Tên",
    width: 300,
  },
]
export const itemColoumn = [
  {
    field: "id",
    headerName: "ID",
    width: 230,
  },

  {
    field: "name",
    headerName: "Tên",
    width: 200,
  },
  
]
export const HotelConfirmColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "Tên",
    width: 250,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.avatar ? params.row.avatar : "https://as2.ftcdn.net/v2/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg" } alt="avatar" />
          {params.row.name ? params.row.name : "Nguyễn Văn A"}
        </div>
      );
    },
  },
  {
    field: "nameHotelOwner",
    headerName: "Người quản lý",
    width: 230,
  },

  {
    field: "address",
    headerName: "Địa chỉ",
    width: 200,
  },

  {
    field: "payment",
    headerName: "Phương thức thanh toán",
    width: 200,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.payment}`}>
          {params.row.payment === 'active' ? 'Thanh toán tại quầy' : "Thanh toán online"}
        </div>
      );
    },
  },
];
//temporary data
export const userRows = [
  {
    id: 1,
    username: "Snow",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    status: "active",
    email: "1snow@gmail.com",
    age: 35,
  },
  {
    id: 2,
    username: "Jamie Lannister",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "2snow@gmail.com",
    status: "passive",
    age: 42,
  },
  {
    id: 3,
    username: "Lannister",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "3snow@gmail.com",
    status: "pending",
    age: 45,
  },
  {
    id: 4,
    username: "Stark",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "4snow@gmail.com",
    status: "active",
    age: 16,
  },
  {
    id: 5,
    username: "Targaryen",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "5snow@gmail.com",
    status: "passive",
    age: 22,
  },
  {
    id: 6,
    username: "Melisandre",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "6snow@gmail.com",
    status: "active",
    age: 15,
  },
  {
    id: 7,
    username: "Clifford",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "7snow@gmail.com",
    status: "passive",
    age: 44,
  },
  {
    id: 8,
    username: "Frances",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "8snow@gmail.com",
    status: "active",
    age: 36,
  },
  {
    id: 9,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "pending",
    age: 65,
  },
  {
    id: 10,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "active",
    age: 65,
  },
];

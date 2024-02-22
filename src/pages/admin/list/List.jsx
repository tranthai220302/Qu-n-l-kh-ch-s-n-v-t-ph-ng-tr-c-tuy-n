import "./list.css"
import Sidebar from "../../../compoments/admin/sidebar/Sidebar"
import Navbar from "../../../compoments/admin/navbar/Navbar"
import Datatable from "../../../compoments/admin/datatable/Datatable"
import MapContainer from "../../../compoments/customer/map/MapContainer"

const List = () => {
  const location = { lat: 40.7128, lng: -74.0060 };
  return (
    <div className="list2">
      <Sidebar/>
      <div className="listContainer2">
        <Navbar/>
        <Datatable/>
      </div>
    </div>
  )
}

export default List
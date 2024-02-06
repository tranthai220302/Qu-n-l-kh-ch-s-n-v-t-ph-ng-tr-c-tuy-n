import "./list.css"
import Sidebar from "../../../compoments/admin/sidebar/Sidebar"
import Navbar from "../../../compoments/admin/navbar/Navbar"
import Datatable from "../../../compoments/admin/datatable/Datatable"

const List = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Datatable/>
      </div>
    </div>
  )
}

export default List
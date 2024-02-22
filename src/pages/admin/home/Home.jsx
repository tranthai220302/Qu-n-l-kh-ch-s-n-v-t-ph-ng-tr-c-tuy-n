import Sidebar from "../../../compoments/admin/sidebar/Sidebar";
import Navbar from "../../../compoments/admin/navbar/Navbar";
import "./home.css";
import Widget from "../../../compoments/admin/widget/Widget";
import Featured from "../../../compoments/admin/featured/Featured";
import Chart from "../../../compoments/admin/chart/Chart";
import Table from "../../../compoments/admin/table/Table";

const Home = () => {
  return (
    <div className="home1">
      <Sidebar />
      <div className="homeContainer1">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer1">
          <div className="listTitle1">Latest Transactions</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;

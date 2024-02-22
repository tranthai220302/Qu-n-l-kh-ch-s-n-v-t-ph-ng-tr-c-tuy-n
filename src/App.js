import Home from "./pages/admin/home/Home";
import Login from "./pages/admin/login/Login";
import List from "./pages/admin/list/List";
import ListCustomer from "./pages/customers/list/List";
import Single from "./pages/admin/single/Single";
import HomeCustomer from "./pages/customers/home/Home";
import New from "./pages/admin/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.css";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import Hotel from "./pages/customers/hotel/Hotel";
import LoginCustomer from "./pages/customers/login/Login";
import RegisterCustomer from "./pages/customers/register/Register";
function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/admin">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="products">
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
          </Route>
          <Route path="/" element={<HomeCustomer />} />
          <Route path="/hotels" element={<ListCustomer />} />
          <Route path="/hotels/:id" element={<Hotel />} />
          <Route path="/login" element={<LoginCustomer />} />
          <Route path="/register" element={<RegisterCustomer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

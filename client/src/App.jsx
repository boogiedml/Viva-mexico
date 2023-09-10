import { Route, Routes } from "react-router-dom";
import "./App.css";
import {
  AddCategory,
  AddProduct,
  AdminDashboard,
  DrinkDisplay,
  Home,
  ProductDisplay,
  Signin,
  UpdateProduct,
} from "./pages";
import ProtectAdminRoute from "./utils/ProtectAdminRoute";
import OtherDisplay from "./pages/OtherDisplay";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/meals" element={<ProductDisplay />} />
        <Route exact path="/drinks" element={<DrinkDisplay />} />
        <Route exact path="/others" element={<OtherDisplay />} />
        <Route exact path="/signin" element={<Signin />} />
        <Route
          exact
          path="/admin"
          element={
            <ProtectAdminRoute>
              <AdminDashboard />
            </ProtectAdminRoute>
          }
        />
        <Route
          exact
          path="/admin/add_product"
          element={
            <ProtectAdminRoute>
              <AddProduct />
            </ProtectAdminRoute>
          }
        />
        <Route
          exact
          path="/admin/edit_product/:productId"
          element={
            <ProtectAdminRoute>
              <UpdateProduct />
            </ProtectAdminRoute>
          }
        />
        <Route
          exact
          path="/admin/add_category"
          element={
            <ProtectAdminRoute>
              <AddCategory />
            </ProtectAdminRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;

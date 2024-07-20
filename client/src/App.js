import { Children } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import Products from "./pages/Products/Products";
import "./app.scss"
import StoreManager from "./pages/Store-manager/StoreManager";
import SMproduct from "./pages/Store-manager/subComponents/SMproduct"
import AdminLayout from "./pages/Store-manager/AdminLayout";
import CreateProduct from "./pages/Store-manager/subComponents/SMcreateprod"

const Layout = () => {
  return (
    <div className="app">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products/:id",
        element: <Products />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
    ],
  },
  {
    
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        path: '',
        element: <div>Being Build</div>,
      },
      {
        path: 'products',
        element: <SMproduct />,
      },
      {
        path: 'create',
        element: <CreateProduct />
      }
    ],
  
  }
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

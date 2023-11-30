import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import ErrorPage from "./components/ErrorPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";
import MyProfile from "./pages/myprofile/MyProfile";

function App() {
  // const user = true;
  const Layout = () => {
    return (
      <div>
        {/* <Announcement /> */}
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
      errorElement: <ErrorPage />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/register", element: <Register /> },
        { path: "/login", element: <Login /> },
        { path: "/products/:category", element: <ProductList /> },
        { path: "/products", element: <ProductList /> },
        { path: "/product/:id", element: <Product /> },
        { path: "/cart", element: <Cart /> },
        { path: "/myProfile", element: <MyProfile /> },
        { path: "/success", element: <Success /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

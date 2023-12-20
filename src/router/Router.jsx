import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Layout from "../pages/layouts/layout.jsx";
import BookForm from "../pages/BookForm.jsx";
import Search from "../pages/search.jsx";
import BookDetails from "../pages/BookDetails.jsx";
import Register from "../pages/Register.jsx";
import Login from "../pages/Login.jsx";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";


const Router = () => {

  let {authReady, user} = useContext(AuthContext);
  let isAuthenticated = !!user; // !! -> boolean casting -> user obj to boolean value

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: isAuthenticated ? <Home /> : <Navigate to="/login"/>,
        },
        {
          path: "/bookdetails/:id",
          element: isAuthenticated ? <BookDetails /> : <Navigate to="/login"/>,
        },
        {
          path: "/create",
          element: isAuthenticated ? <BookForm /> : <Navigate to="/login"/>,
        },
        {
          path: "/edit/:id",
          element: isAuthenticated ? <BookForm /> : <Navigate to="/login"/>,
        },
        {
          path: "/search",
          element: isAuthenticated ? <Search /> : <Navigate to="/login"/>,
        },
        {
          path: "/register",
          element: !isAuthenticated ? <Register /> : <Navigate to="/"/>,
        },
        {
          path: "/login",
          element: !isAuthenticated ? <Login /> : <Navigate to="/"/>,
        },
      ],
    },
  ]);

  return (
    authReady && <RouterProvider router={router} />
  )
}

export default Router


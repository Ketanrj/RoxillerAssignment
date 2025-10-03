import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import Loginpage from "./pages/Loginpage.tsx";
import Signuppage from "./pages/Signuppage.tsx";
import Layout from "./components/Layout.tsx";
import PersistLogin from "./components/PersistLogin.tsx";
import Authprovider from "./context/Authprovider.tsx";
import Homepage from "./pages/Homepage.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Userpage from "./pages/Userpage.tsx";
import Storepage from "./pages/Storepage.tsx";
import Newstore from "./pages/Newstore.tsx";
import Newuserpage from "./pages/Newuserpage.tsx";
import RequireAuth from "./components/RequireAuth.tsx";
import Profilepage from "./pages/Profilepage.tsx";
import Forgetpassword from "./pages/Forgetpassword.tsx";
import Resetpassword from "./pages/Resetpassword.tsx";
import Userstorelistings from "./pages/Normaluser/Userstorelistings.tsx";
import Addrating from "./pages/Normaluser/Addrating.tsx";
import Ownerdashboard from "./pages/Storeowner/Ownerdashboard.tsx";


// const roles = ["ADMIN", "NORMAL_USER", "STORE_OWNER"]


// define routes here itself
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {index: true, element: <Navigate to={"/login"} replace/>},
      {
        element: <PersistLogin />,
        children: [
          {
            element: <RequireAuth allowedRoles={["ADMIN", "STORE_OWNER", "NORMAL_USER"]} />,
            children: [
              {
                element: <Homepage />,
                children: [
                  { path: "profilepage", element: <Profilepage /> },

                  // ADMIN routes
                  {
                    element: <RequireAuth allowedRoles={["ADMIN"]} />,
                    children: [
                      { index: true, path: 'dashboard', element: <Dashboard /> }, // default when hitting / 
                      { path: "user", element: <Userpage /> },
                      { path: "createuser", element: <Newuserpage /> },
                      { path: "store", element: <Storepage /> },
                      { path: "createStore", element: <Newstore /> },
                    ],
                  },

                  // NORMAL_USER routes
                  {
                    element: <RequireAuth allowedRoles={["NORMAL_USER"]} />,
                    children: [
                      { path: "Userstorelistings", element: <Userstorelistings/> },
                      { path: "Addrating", element: <Addrating/> },
                    ],
                  },

                  // STORE_OWNER routes
                  {
                    element: <RequireAuth allowedRoles={["STORE_OWNER"]} />,
                    children: [
                      { path: "Ownerdashboard", element: <Ownerdashboard/> },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      // Public routes
      { path: "login", element: <Loginpage /> },
      { path: "register", element: <Signuppage /> },
      { path: "forgetpassword", element: <Forgetpassword /> },
      { path: "resetpassword/:token", element: <Resetpassword /> },
      { path: "unauthorized", element: <h1>403 - Unauthorized</h1> },
    ],
  },
]);


function App() {
  return (
    <Authprovider>
      <RouterProvider router={router} />
    </Authprovider>
  );
}


export default App;

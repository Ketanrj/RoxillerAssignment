import { createBrowserRouter, RouterProvider } from "react-router";
import Loginpage from "./pages/Loginpage.tsx";
import Signuppage from "./pages/Signuppage.tsx";
import Layout from "./components/Layout.tsx";
// import PersistLogin from "./components/PersistLogin.tsx";
import Authprovider from "./context/Authprovider.tsx";
// import RequireAuth from "./components/RequireAuth.tsx";
import Homepage from "./pages/Homepage.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Userpage from "./pages/Userpage.tsx";
import Storepage from "./pages/Storepage.tsx";
import Newstore from "./pages/Newstore.tsx";
import Newuserpage from "./pages/Newuserpage.tsx";


// define routes here itself
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        // element: <PersistLogin/>,
        children: [
          {
            // element: <RequireAuth />,
            children: [
              {
                element: <Homepage />,
                children: [
                  { index: true, element: <Dashboard /> },
                  { path: '/user', element: <Userpage /> },
                  { path: '/store', element: <Storepage /> },
                  { path: '/createStore', element: <Newstore /> },
                  { path: '/user', element: <Userpage /> },
                  { path: '/createuser', element: <Newuserpage /> },
                ]
              }
            ]
          }
        ]
      },
      { path: "login", element: <Loginpage /> },
      { path: "register", element: <Signuppage /> },
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

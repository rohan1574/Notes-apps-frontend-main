import { createBrowserRouter } from "react-router-dom";
import Error from "../pages/Error/Error";
import Roots from "../layout/Roots";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import Notes from "../pages/Notes/Notes";
import Tags from "../pages/Tags/Tags";
import Trash from "../pages/Trash/Trash";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Home></Home>,
        errorElement: <Error></Error>,
        children: [
            {
                path: "/",
                element: <ProtectedRoute><Notes></Notes></ProtectedRoute>,
            },
            {
                path: "/tags",
                element: <ProtectedRoute><Tags></Tags></ProtectedRoute>,
            },
            {
                path: "/trash",
                element: <ProtectedRoute><Trash></Trash></ProtectedRoute>,
            },
        ],
    }
])
export default router;
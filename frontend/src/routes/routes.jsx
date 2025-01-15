import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/shared/ErrorPage";
import Home from "../pages/user/Home";
import { UserProtectedRoutes } from "./UserProtectedRoutes";
import AdminProtectedRoutes from "./AdminProtectedRoutes";
import AdminLogin from "../pages/admin/AdminLogin";
import AdminLayout from "../layout/AdminLayout";
import Hotel from "../pages/admin/Hotel";
import ViewUser from "../pages/admin/ViewUser";
import CreateHotel from "../pages/admin/CreateHotel";
import SingleHotel from "../pages/admin/SingleHotel";
import CreateFood from "../pages/admin/CreateFood";
import UserLogin from "../pages/user/UserLogin";
import UserSignup from "../pages/user/UserSignup";
import Cart from "../pages/user/Cart";
import { UserLayout } from "../layout/UserLayout";
import UserProfile from "../pages/user/UserProfile";
import SingleFoodUser from "../pages/user/SingleFoodUser";
import SingleHotelUser from "../pages/user/SingleHotelUser";

const router = createBrowserRouter([
    {
        path: '/',
        element: <UserLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: 'login',
                element: <UserLogin />
            },
            {
                path: 'signup',
                element: <UserSignup />
            },
            {
                path: 'about',
            },
            {
                path: 'hotel/:hotelId',
                element: <SingleHotelUser />
            },
            {
                path: 'food/:foodId',
                element: <SingleFoodUser />
            },
            {
                path: 'user',
                element: <UserProtectedRoutes />,
                children: [
                    {
                        path: 'profile',
                        element: <UserProfile />
                    },
                    {
                        path: 'cart',
                        element: <Cart />
                    },
                    {
                        path: 'order',
                    },
                    {
                        path: 'wishlist',
                    },
                ]
            },
        ]
    },
    {
        path: 'admin',
        element: <AdminLayout />,
        children: [
            {
                path: 'login',
                element: <AdminLogin />
            },
            {
                path: '',
                element: <AdminProtectedRoutes />,
                children: [
                    {
                        path: 'hotel',
                        element: <Hotel />
                    },
                    {
                        path: 'view-user',
                        element: <ViewUser />
                    },
                    {
                        path: 'create-hotel',
                        element: <CreateHotel />
                    },
                    {
                        path: 'hotel/:hotelId',
                        element: <SingleHotel />
                    },
                    {
                        path: 'create-food/:hotelId',
                        element: <CreateFood />
                    }
                ]
            }
        ]
    }
])

export { router }
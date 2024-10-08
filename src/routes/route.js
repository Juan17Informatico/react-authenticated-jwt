import { CustomerPage, LoginPage, RegisterPage, WelcomePage } from "../pages";
import { BaseDashBoard } from "../pages/layout/BaseDashBoard";

export const routes = [
    {
        path: '/',
        element: WelcomePage
    },
    {
        path: '/login',
        element: LoginPage
    },
    {
        path: '/register',
        element: RegisterPage
    },
    {
        path: '/dashboard',
        element: BaseDashBoard,
        isProtected: true,
        children: [
            {
                path: "",
                element: CustomerPage
            }
        ]
    }
]
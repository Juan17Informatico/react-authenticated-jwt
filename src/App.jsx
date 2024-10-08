import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { routes } from "./routes/route";
import { createElement } from "react";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";

export const App = () => {

    const router = createBrowserRouter( routes.map( route => ({
        ...route,
        element: createElement(route.element),
        children: route.children?.map((child) => ({
            ...child,
            element: createElement(child.element),
        })),
    })));
  

    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <RouterProvider router={router} />
            </PersistGate> 
        </Provider>
    );
};

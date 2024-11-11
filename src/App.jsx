import { createHashRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/page";
const router = createHashRouter([
  {
    path: "/",
    element: <HomePage />,
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;

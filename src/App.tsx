import { createHashRouter, RouterProvider } from "react-router-dom";
const router = createHashRouter([]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;

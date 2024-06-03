import { RouterProvider } from "react-router-dom";
import router from "./router/rootRouter";

function App() {
  return <RouterProvider router={router} />;
}

export default App;

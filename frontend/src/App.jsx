
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import AppRoutes from "./routes/routes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <AuthContextProvider>

       

          <AppRoutes />
         
          <Toaster/>
      </AuthContextProvider>
      
    </>
  );
}

export default App;

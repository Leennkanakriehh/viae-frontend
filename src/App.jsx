import { Outlet } from "react-router-dom";
import "./App.css";
import { ViaeProvider } from "./ViaeProvider";


function App() {
  return (
    <div>
      <ViaeProvider>
        <Outlet />
      </ViaeProvider>
    </div>
  )
}

export default App

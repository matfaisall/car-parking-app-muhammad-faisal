import "./App.css";

import NavigationBar from "./components/navbar";
import RouteApp from "./routes";

import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  console.log("location", location);
  return (
    <div className=" min-h-screen bg-[#F5F5F0] text-[#222831]">
      <NavigationBar />
      <div className="max-w-7xl mx-auto">
        <RouteApp />
      </div>
    </div>
  );
}

export default App;

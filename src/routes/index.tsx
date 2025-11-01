import { Routes, Route } from "react-router-dom";
import ParkingPage from "../pages/Parking";
import DetailPemesananPage from "../pages/DetailPemesanan";

const RouteApp = () => {
  return (
    <Routes>
      <Route path="/" element={<ParkingPage />} />
      <Route path="/rincian" element={<DetailPemesananPage />} />
    </Routes>
  );
};

export default RouteApp;

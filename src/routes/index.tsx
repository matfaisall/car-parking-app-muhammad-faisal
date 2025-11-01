import { Routes, Route } from "react-router-dom";
import ParkingLotPage from "../pages/ParkingLot";
import DetailPemesananPage from "../pages/DetailPemesanan";

const RouteApp = () => {
  return (
    <Routes>
      <Route path="/" element={<ParkingLotPage />} />
      <Route path="/rincian" element={<DetailPemesananPage />} />
    </Routes>
  );
};

export default RouteApp;

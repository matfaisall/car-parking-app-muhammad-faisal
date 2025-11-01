import React from "react";
import ParkingSpotsCanvas from "../../components/parking-spots-canvas";
import type { ParkingSpot, FormDataBooking } from "../../types";
import ModalBooking from "../../components/modal-booking";

const ParkingPage = () => {
  // untuk search kasih debounce

  // STATE
  const [search, setSearch] = React.useState("");
  const [parkingSpots, setParkingSpots] = React.useState<ParkingSpot[]>([]);
  const [selectedSpot, setSelectedSpot] = React.useState<ParkingSpot | null>(
    null
  );
  const [openModalBooking, setOpenModalBooking] = React.useState(false);
  const [formData, setFormData] = React.useState<FormDataBooking>({
    customerName: "",
    vehicleNumber: "",
    duration: 0, // ini jam
  });

  // HOOKS
  React.useEffect(() => {
    const spots = [];
    let spotCounter = 1;

    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 5; col++) {
        spots.push({
          id: `spot-${row}-${col}`,
          x: 40 + col * 110,
          y: 90 + row * 95,
          width: 90,
          height: 65,
          isAvailable: false,
          spotNumber: `P${spotCounter.toString().padStart(2, "0")}`,
        });
        spotCounter++;
      }
    }

    setParkingSpots(spots);
  }, []);

  // EVENT HANDLER | FUNCTION HANDLER
  const handleSpotClick = (spot: ParkingSpot) => {
    setOpenModalBooking(true);
    setSelectedSpot(spot);
  };

  const handleCloseModalBooking = () => {
    setOpenModalBooking(false);
  };

  const hanldeBooking = () => {
    console.log("hanldeBooking", formData);
  };

  // filtering spots

  const filteredSpots = parkingSpots.filter((spot) =>
    spot.spotNumber.toLowerCase().includes(search.toLowerCase())
  );

  // console.log("filterdSposts", filterdSposts);

  return (
    <>
      <div className="py-10">
        <div className="w-full max-w-xl  mx-auto">
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search Parking..."
              value={search}
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="">
            <ParkingSpotsCanvas
              spots={search ? filteredSpots : parkingSpots}
              onSpotClick={handleSpotClick}
              selectedSpot={selectedSpot?.id || null}
            />
          </div>
        </div>
      </div>

      {/* modal for booking */}
      <ModalBooking
        isOpen={openModalBooking}
        onCloseModal={handleCloseModalBooking}
        selectedSpot={openModalBooking ? selectedSpot : null}
        formData={formData}
        setFormData={setFormData}
        onBook={hanldeBooking}
      />
    </>
  );
};

export default ParkingPage;

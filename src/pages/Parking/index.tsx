import React from "react";
import ParkingSpotsCanvas from "../../components/parking-spots-canvas";
import type {
  ParkingSpot,
  FormDataBooking,
  FormErrorBooking,
  Booking,
} from "../../types";
import ModalBooking from "../../components/modal-booking";
import { useDebounce } from "use-debounce";

const STORAGE_KEY = "bookings";

const ParkingPage = () => {
  // untuk search kasih debounce

  // STATE
  const [search, setSearch] = React.useState("");
  const [debounce] = useDebounce(search, 500);
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
  const [error, setError] = React.useState<FormErrorBooking>({
    customerName: "",
    vehicleNumber: "",
    duration: "",
  });
  const [bookings, setBookings] = React.useState<Booking[]>([]);

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

  // load localStorage saat pertama kali mount
  React.useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const loadedBookings: Booking[] = JSON.parse(stored);
        setBookings(loadedBookings);
      } catch (error) {
        console.error("Error parsing bookings from localStorage:", error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // update parking spot berdasarkan bookings ..
  React.useEffect(() => {
    if (parkingSpots.length > 0 && bookings.length >= 0) {
      setParkingSpots((prev) =>
        prev.map((spot) => ({
          ...spot,
          isAvailable: bookings.some((b) => b.spotId === spot.id && b.isActive),
        }))
      );
    }
  }, [bookings, parkingSpots.length]);

  // simpan ke localstorage setiap bookings berubah
  React.useEffect(() => {
    if (bookings.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    }
  }, [bookings]);

  // EVENT HANDLER | FUNCTION HANDLER
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSpotClick = (spot: ParkingSpot) => {
    setOpenModalBooking(true);
    setSelectedSpot(spot);
  };

  const handleCloseModalBooking = () => {
    setOpenModalBooking(false);
    // reset semua cuyy
    setFormData({
      customerName: "",
      vehicleNumber: "",
      duration: 0,
    });
    setSelectedSpot(null);
  };

  console.log("selected", selectedSpot);

  const hanldeBooking = () => {
    const newError = {
      customerName: "",
      vehicleNumber: "",
      duration: "",
    };

    let hasError: boolean = false;

    if (!formData.customerName.trim()) {
      newError.customerName = "Customer name is required";
      hasError = true;
    }

    if (!formData.vehicleNumber.trim()) {
      newError.vehicleNumber = "Vehicle number is required";
      hasError = true;
    }

    if (!formData.duration) {
      newError.duration = "Duration is required";
      hasError = true;
    }

    setError(newError);

    if (hasError) return;

    // input data

    // console.log("selectedSpot", selectedSpot);

    const newBooking: Booking = {
      id: `booking-${new Date().getTime()}`,
      spotId: selectedSpot?.id,
      spotNumber: selectedSpot?.spotNumber,
      customerName: formData.customerName,
      vehicleNumber: formData.vehicleNumber,
      duration: formData.duration,
      startTime: Date.now(),
      isActive: true,
    };

    console.log("new Booking", newBooking);
    setBookings([...bookings, newBooking]);
    setParkingSpots((prev) =>
      prev.map((spot) =>
        spot.id === selectedSpot?.id ? { ...spot, isAvailable: true } : spot
      )
    );

    // reset and close modal
    handleCloseModalBooking();
  };

  // filtering spots
  const filteredSpots = React.useMemo(() => {
    return parkingSpots.filter((spot) =>
      spot.spotNumber.toLowerCase().includes(debounce.toLowerCase())
    );
  }, [debounce, parkingSpots]);

  // const filteredSpots = parkingSpots.filter((spot) =>
  //   spot.spotNumber.toLowerCase().includes(search.toLowerCase())
  // );

  // console.log("filterdSposts", filterdSposts);

  return (
    <>
      <div className="py-10">
        <div className="w-full max-w-xl  mx-auto">
          <div className="p-4 mb-2 bg-white rounded-xl">
            <input
              type="text"
              placeholder="Search Parking..."
              value={search}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => handleOnChange(e)}
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
        error={error}
      />
    </>
  );
};

export default ParkingPage;

import React from "react";
import ParkingSpotsCanvas from "../../components/parking-spots-canvas";
import type { ParkingSpot } from "../../types";

const ParkingPage = () => {
  // untuk search kasih debounce
  const [search, setSearch] = React.useState("");
  const [parkingSpots, setParkingSpots] = React.useState<ParkingSpot[]>([]);
  const [selectedSpot, setSelectedSpot] = React.useState<ParkingSpot | null>(
    null
  );

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

  //   React.useEffect(() => {
  //   const rows = 4;
  //   const cols = 5;
  //   const boxWidth = 80;
  //   const boxHeight = 100;
  //   const gap = 40;
  //   const margin = 50;

  //   const spots = [];
  //   let spotCount = 1;

  //   for (let row = 0; row < rows; row++) {
  //     for (let col = 0; col < cols; col++) {
  //       spots.push({
  //         id: `spot-${row}-${col}`,
  //         x: margin + col * (boxWidth + gap),
  //         y: margin + row * (boxHeight + gap),
  //         width: boxWidth,
  //         height: boxHeight,
  //         isOccupied: false,
  //         spotNumber: `P${spotCount.toString().padStart(2, "0")}`,
  //       });
  //       spotCount++;
  //     }
  //   }

  //   // otomatis hitung dimensi SVG
  //   const totalWidth = margin * 2 + cols * (boxWidth + gap) - gap;
  //   const totalHeight = margin * 2 + rows * (boxHeight + gap) - gap;

  //   setParkingSpots(spots);
  //   setDimensions({ width: totalWidth, height: totalHeight });
  // }, []);

  // EVENT HANDLER | FUNCTION HANDLER
  const handleSpotClick = (spot: ParkingSpot) => {
    setSelectedSpot(spot);
    console.log("spot", spot);
  };

  // filtering spots

  const filteredSpots = parkingSpots.filter((spot) =>
    spot.spotNumber.toLowerCase().includes(search.toLowerCase())
  );

  // console.log("filterdSposts", filterdSposts);

  return (
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
  );
};

export default ParkingPage;

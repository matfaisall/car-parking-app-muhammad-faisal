import type { ParkingSpot } from "../../types";

interface ParkingSpostsCanvasProps {
  spots: ParkingSpot[];
  onSpotClick: (spot: ParkingSpot) => void;
  selectedSpot: string | null;
}

const ParkingSpotsCanvas = ({
  spots,
  onSpotClick,
  selectedSpot,
}: ParkingSpostsCanvasProps) => {
  return (
    <div className="flex justify-center bg-base-100 p-4 rounded-lg">
      <svg
        width="100%"
        height="400"
        viewBox="0 0 600 480"
        className="border border-gray-300 rounded-lg bg-white max-w-full"
      >
        {spots.map((spot) => {
          const isSelected = selectedSpot === spot.id;
          const fillColor = isSelected
            ? "#fbbf24"
            : spot.isAvailable
            ? "#ef4444"
            : "#10b981";
          const opacity = spot.isAvailable ? 0.6 : 1;

          return (
            <g
              key={spot.id}
              onClick={() => !spot.isAvailable && onSpotClick(spot)}
              className={
                !spot.isAvailable
                  ? "cursor-pointer hover:opacity-80 transition-opacity"
                  : "cursor-not-allowed"
              }
            >
              <rect
                x={spot.x}
                y={spot.y}
                width={spot.width}
                height={spot.height}
                fill={fillColor}
                stroke="#000"
                strokeWidth="1"
                rx="2"
                opacity={opacity}
                style={{
                  filter: isSelected ? "drop-shadow(0 0 10px #fbbf24)" : "none",
                }}
              />
              <text
                x={spot.x + spot.width / 2}
                y={spot.y + spot.height / 2 + 5}
                textAnchor="middle"
                fill="#fff"
                fontSize="14"
                fontWeight="bold"
                style={{ pointerEvents: "none", userSelect: "none" }}
              >
                {spot.spotNumber}
              </text>
              {spot.isAvailable && (
                <circle
                  cx={spot.x + spot.width - 12}
                  cy={spot.y + 12}
                  r="6"
                  fill="#dc2626"
                  style={{ pointerEvents: "none" }}
                />
              )}
            </g>
          );
        })}

        <g>
          {/* Legend - Horizontal & Centered */}
          <rect
            x="39"
            y="32"
            width="25"
            height="25"
            fill="#10b981"
            stroke="#000000"
            strokeWidth="1"
            rx="3"
          />
          <text x="70" y="48" fontSize="12" fill="#000000">
            Available
          </text>

          <rect
            x="150"
            y="32"
            width="25"
            height="25"
            fill="#ef4444"
            stroke="#000000"
            strokeWidth="1"
            rx="3"
            opacity="0.6"
          />
          <text x="180" y="48" fontSize="12" fill="#000000">
            Not Available
          </text>

          <rect
            x="280"
            y="32"
            width="25"
            height="25"
            fill="#fbbf24"
            stroke="#000000"
            strokeWidth="1"
            rx="3"
            opacity="0.6"
          />
          <text x="310" y="48" fontSize="12" fill="#000000">
            Selected
          </text>
        </g>
      </svg>
    </div>
  );
};

export default ParkingSpotsCanvas;

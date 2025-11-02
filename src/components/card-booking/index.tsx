import type { Booking } from "../../types";
import { formatTime } from "../../utils/timeFormat";
import { CircleAlert, Timer, SquareParking } from "lucide-react";

const CardBooking = ({
  dataBook,
  // onEndParking,
  onOpenConfirmModal,
}: {
  dataBook: Booking;
  // onEndParking: (id: string) => void;
  onOpenConfirmModal: (id: string) => void;
}) => {
  const elapsedTime = new Date().getTime() - dataBook.startTime;
  const durationMs = dataBook?.duration * 60 * 60 * 1000;
  const reminingTime = durationMs - elapsedTime;
  const isOverTime = reminingTime < 0;

  // console.log("remining", formatTime(reminingTime));
  // console.log("overtime", isOverTime);

  return (
    <div className="card card-border bg-base-100 shadow-md">
      <div className="card-body ">
        <div className="flex flex-row justify-between py-2 items-center">
          <h2 className="font-bold text-black text-sm md:text-md xl:text-xl flex items-center ">
            <SquareParking className="mr-2 size-6 text-green-500 hidden md:block" />
            Parking No {dataBook?.spotNumber}
          </h2>
          {isOverTime ? (
            <div className="badge bg-red-500 p-4 text-xs text-white">
              <CircleAlert className="" />
              Overtime : {formatTime(reminingTime)}
            </div>
          ) : (
            <div className="badge bg-green-500 p-4 text-xs text-white">
              <Timer />
              Time : {formatTime(reminingTime)}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 py-2">
          <p className="font-semibold text-black text-sm">
            Customer Name:{" "}
            <span className="text-light text-gray-600 font-light">
              {dataBook?.customerName}
            </span>
          </p>
          <p className="font-semibold text-black text-sm">
            Vehicle Number:{" "}
            <span className="text-light text-gray-600 font-light">
              {dataBook?.vehicleNumber}
            </span>
          </p>
          <p className="font-semibold text-black text-sm">
            Parking Duration:{" "}
            <span className="text-light text-gray-600 font-light">
              {dataBook?.duration} hours
            </span>
          </p>
          <p className="font-semibold text-black text-sm">
            Start Time:{" "}
            <span className="text-light text-gray-600 font-light">
              {new Date(dataBook?.startTime).toLocaleString()}
            </span>
          </p>
        </div>
        <div className="card-actions justify-end">
          <button
            className="btn bg-red-500 text-white w-full"
            // onClick={() => onEndParking(dataBook?.id)}
            onClick={() => onOpenConfirmModal(dataBook?.id)}
          >
            End Parking
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardBooking;

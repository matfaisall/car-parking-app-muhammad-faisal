import type { Booking } from "../../types";
import { formatTime } from "../../utils/timeFormat";

const CardBooking = ({
  dataBook,
  onEndParking,
}: {
  dataBook: Booking;
  onEndParking: (id: string) => void;
}) => {
  const elapsedTime = new Date().getTime() - dataBook.startTime;
  const durationMs = dataBook?.duration * 60 * 60 * 1000;
  const reminingTime = durationMs - elapsedTime;
  const isOverTime = reminingTime < 0;

  // console.log("remining", formatTime(reminingTime));
  // console.log("overtime", isOverTime);

  return (
    <div className="card card-border bg-base-100">
      <div className="card-body ">
        <div className="flex flex-row justify-between py-2">
          <h2>Parking No {dataBook?.spotId}</h2>
          {isOverTime ? (
            <div className="badge badge-error">{formatTime(reminingTime)}</div>
          ) : (
            <div className="badge badge-success">
              {formatTime(reminingTime)}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 py-2">
          <p>Customer Name: {dataBook?.customerName}</p>
          <p>Vehicle Number: {dataBook?.vehicleNumber}</p>
          <p>Parking Duration: {dataBook?.duration} hours</p>
          <p>Start Time: {new Date(dataBook?.startTime).toLocaleString()}</p>
        </div>
        <div className="card-actions justify-end">
          <button
            className="btn bg-red-500 text-white w-full"
            onClick={() => onEndParking(dataBook?.id)}
          >
            End Parking
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardBooking;

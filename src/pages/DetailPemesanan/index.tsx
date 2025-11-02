import React from "react";
import type { Booking } from "../../types";
import CardBooking from "../../components/card-booking";

const DetailPemesananPage = () => {
  const [bookings, setBookings] = React.useState<Booking[]>([]);

  React.useEffect(() => {
    const stored = localStorage.getItem("bookings");
    if (stored) {
      try {
        const loadedBookings: Booking[] = JSON.parse(stored);
        setBookings(loadedBookings);
      } catch (error) {
        console.error("Error parsing bookings from localStorage:", error);
      }
    }
  }, []);

  // HANDLER | FUNCTION HANDLER
  const handleEndParking = (id: string) => {
    const updatedBookings = bookings.filter((book) => book.id !== id);
    setBookings(updatedBookings);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
  };

  console.log("bookings", bookings);

  return (
    <div className="p-4 w-full py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookings.map((book) => (
          <React.Fragment key={book.id}>
            <CardBooking dataBook={book} onEndParking={handleEndParking} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default DetailPemesananPage;

import React from "react";
import type { Booking } from "../../types";
import CardBooking from "../../components/card-booking";
import { SearchX } from "lucide-react";
import ConfirmModal from "../../components/modal-confirm";

const DetailPemesananPage = () => {
  const [bookings, setBookings] = React.useState<Booking[]>([]);
  const [openModalConfirm, setOpenModalConfirm] =
    React.useState<boolean>(false);

  const [selectedBookedId, setSelectedBookedId] = React.useState<string | null>(
    ""
  );

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
  const handleOpenConfirmModal = (id: string) => {
    setSelectedBookedId(id);
    setOpenModalConfirm(true);
  };

  const handleEndParking = () => {
    const updatedBookings = bookings.filter(
      (book) => book.id !== selectedBookedId
    );
    setBookings(updatedBookings);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));

    setOpenModalConfirm(false);
    setSelectedBookedId(null);
  };

  console.log("bookings", bookings);

  return (
    <>
      <div className="p-4 w-full py-20">
        {bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <SearchX className="text-red-700 size-20 mb-4" />
            <div className="text-gray-500 text-lg font-medium">Not Found</div>
            <p className="text-sm text-gray-400 mt-2">
              Start a new booking to see it listed here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookings.map((book) => (
              <React.Fragment key={book.id}>
                <CardBooking
                  dataBook={book}
                  // onEndParking={handleEndParking}
                  onOpenConfirmModal={handleOpenConfirmModal}
                />
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
      <ConfirmModal
        isOpen={openModalConfirm}
        onConfirm={() => selectedBookedId && handleEndParking}
        onCancel={() => setOpenModalConfirm(false)}
      />
    </>
  );
};

export default DetailPemesananPage;

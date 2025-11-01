import type { ParkingSpot } from "../../types";
import type { FormDataBooking } from "../../types";

interface ModalBookingProps {
  isOpen: boolean;
  onCloseModal: () => void;
  selectedSpot: ParkingSpot | null;
  formData: FormDataBooking;
  setFormData: React.Dispatch<React.SetStateAction<FormDataBooking>>;
  onBook: () => void;
}

const ModalBooking = ({
  isOpen,
  onCloseModal,
  selectedSpot,
  formData,
  setFormData,
  onBook,
}: ModalBookingProps) => {
  console.log("selectedSpot xx", selectedSpot);
  return (
    isOpen && (
      <dialog className="modal modal-open">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-green-500 mb-4">
            Book Parking Spot {selectedSpot?.spotNumber}
          </h3>
          <fieldset className="fieldset">
            <div className="mb-2">
              <label className="label mb-1">Customer Name</label>
              <input
                type="text"
                className="input input-md w-full"
                placeholder="Input your customer name"
                value={formData.customerName}
                onChange={(e) =>
                  setFormData({ ...formData, customerName: e.target.value })
                }
              />
            </div>
            <div className="mb-2">
              <label className="label mb-1">Vihicle Number</label>
              <input
                type="text"
                className="input input-md w-full"
                placeholder="Input your vihicle number"
                value={formData.vehicleNumber}
                onChange={(e) =>
                  setFormData({ ...formData, vehicleNumber: e.target.value })
                }
              />
            </div>
            <div className="mb-2">
              <label className="label mb-1">Parking Duration</label>
              <input
                type="number"
                className="input input-md w-full"
                placeholder="input your parkinguration"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    duration: parseInt(e.target.value) || 1,
                  })
                }
              />
            </div>
          </fieldset>

          <div className="flex items-center justify-between mt-4">
            <button className="btn btn-outline btn-md" onClick={onCloseModal}>
              Cancel
            </button>
            <button
              className="btn btn-success btn-md text-white px-8"
              onClick={onBook}
            >
              Book
            </button>
          </div>
        </div>
        {/* Backdrop - klik untuk close */}
        <form method="dialog" className="modal-backdrop">
          <button onClick={onCloseModal}>close</button>
        </form>
      </dialog>
    )
  );
};

export default ModalBooking;

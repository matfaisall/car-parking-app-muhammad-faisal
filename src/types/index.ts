export interface ParkingSpot {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isAvailable: boolean;
  spotNumber: string;
}

export interface FormDataBooking {
  customerName: string;
  vehicleNumber: string;
  duration: number;
}

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
  duration: number | string;
}

export interface FormErrorBooking {
  customerName: string;
  vehicleNumber: string;
  duration: string;
}

export interface Booking {
  id: string;
  spotId: string | undefined;
  customerName: string;
  vehicleNumber: string;
  duration: number | string;
  startTime: number;
  isActive: boolean;
}

export interface CropTracker {
  name: string;
  yield: number; // In kilograms
  price: number; // Price per kilogram
  plantingDate: Date;
  harvestDate: Date;
}

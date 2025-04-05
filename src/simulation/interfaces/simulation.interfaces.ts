export enum CustomerState {
  ENTERING = 'entering',
  BROWSING = 'browsing',
  QUEUEING = 'queueing',
  CHECKING_OUT = 'checking_out',
  EXITING = 'exiting',
}

export interface CustomerLocation {
  customerId: number;
  x: number;
  y: number;
  state: CustomerState;
}

export interface SimulationSettings {
  speed: number; // multiplier for simulation speed (1 = real time, 2 = 2x speed)
  peakHourFactor: number; // factor for increasing traffic during peak hours (12:00-14:00)
  customerArrivalRate: number; // average number of new customers per minute
  maxQueueLength: number; // maximum queue length after which customers start looking for other checkouts
  browsingTime: number; // average time in minutes that a customer spends in the store
}

export interface SimulationState {
  isRunning: boolean;
  currentTime: Date;
  customerLocations: CustomerLocation[];
  activeCustomers: number[];
  queueLengths: Record<number, number>; // cash register id -> queue length
  heatMap: Record<string, number>; // coordinate (x,y) -> visit intensity
  settings: SimulationSettings;
}
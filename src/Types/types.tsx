export type CrewsType = {
  crew_id: number;
  car_mark: string;
  car_model: string;
  car_color: string;
  car_number: string;
  driver_name: string;
  driver_phone: string;
  lat: number;
  lon: number;
  distance: number;
};

export type ValuesType = {
  adress: string;
};

export type OrderType = {
  source_time: string;
  addresses: Array<Addresses>;
  crew_id: number;
};

type Addresses = {
  address: string;
  lat: number;
  lon: number;
};


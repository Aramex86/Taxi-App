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
  crew_id: number | undefined;
};

type Addresses = {
  address: string;
  lat: number;
  lon: number;
};

//GeoObject

type PointType = {
  pos: string;
};

type BoundedByType = {
  Envelope: EnvelopeType;
};

type EnvelopeType = {
  lowerCorner: string;
  upperCorner: string;
};

type AddressType = {
  Components: Array<ComponentsType>;
  country_code: string;
  formatted: string;
  postal_code: string;
};
type ComponentsType = {
  kind: string;
  name: string;
};

type GeocoderMetaDataType = {
  Address: AddressType;
  kind: string;
  precision: string;
  text: string;
};

export type GeoObjectType = {
  Point: PointType;
  boundedBy: BoundedByType;
  description: string;
  metaDataProperty: GeocoderMetaDataType;
  name: string;
};

export type ObjectType={
  GeoObject:GeoObjectType
}


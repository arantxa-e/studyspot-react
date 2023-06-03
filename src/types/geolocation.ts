export interface LocationOption {
  properties: {
    address_line1: string;
    address_line2: string;
    formatted: string;
    lon: number;
    lat: number;
  };
  geometry: {
    coordinates: [number, number];
    type: "Point";
  };
}

export interface MapViewState {
  longitude: number;
  latitude: number;
  zoom: number;
}

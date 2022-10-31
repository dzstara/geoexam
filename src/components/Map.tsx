import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import type { FeatureCollection } from "geojson";
import geoJsonDataset from "@osm_borders/maritime_1000m";
import { Country } from "../types";

interface MapProps {
  country: Country;
}

export function Map(props: MapProps) {
  return (
    <div className="w-full md:w-[400px]" style={{ aspectRatio: "4 / 3" }}>
      <MapContainer
        key={props.country.alpha2}
        center={[props.country.position[1], props.country.position[0]]}
        zoom={3}
        scrollWheelZoom={false}
        zoomControl={false}
        dragging={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png'"
        />

        <GeoJSON data={getGeoJson(props.country.alpha2)} />
      </MapContainer>
    </div>
  );
}

function getGeoJson(alpha2: string): FeatureCollection {
  return geoJsonDataset.features.find(
    (f: any) => f.properties.isoA2 === alpha2
  );
}

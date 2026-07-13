"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Car, Footprints, MapPin } from "lucide-react";
import type { City } from "@/data/trip";

function makeIcon(color: string) {
  return L.divIcon({
    className: "",
    html: `<div style="width:16px;height:16px;border-radius:50%;background:${color};border:2.5px solid white;box-shadow:0 1px 4px rgba(16,25,58,0.4)"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
}

const hotelIcon = makeIcon("#E5A87E");
const sightIcon = makeIcon("#8FBF9E");

type RouteGeom = { coords: [number, number][]; mode: "foot" | "car" } | null;

export default function CityMap({ city }: { city: City }) {
  const [routeGeoms, setRouteGeoms] = useState<RouteGeom[]>(() =>
    city.routes.map(() => null)
  );

  useEffect(() => {
    let cancelled = false;

    city.routes.forEach(async (route, i) => {
      const profile = route.mode === "foot" ? "foot" : "driving";
      const url = `https://router.project-osrm.org/route/v1/${profile}/${route.from.lon},${route.from.lat};${route.to.lon},${route.to.lat}?overview=full&geometries=geojson`;
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("bad response");
        const json = await res.json();
        const coords: [number, number][] | undefined =
          json.routes?.[0]?.geometry?.coordinates.map(
            ([lon, lat]: [number, number]) => [lat, lon]
          );
        if (!cancelled && coords?.length) {
          setRouteGeoms((prev) => {
            const next = [...prev];
            next[i] = { coords, mode: route.mode };
            return next;
          });
        } else {
          throw new Error("no route");
        }
      } catch {
        if (!cancelled) {
          setRouteGeoms((prev) => {
            const next = [...prev];
            next[i] = {
              coords: [
                [route.from.lat, route.from.lon],
                [route.to.lat, route.to.lon],
              ],
              mode: route.mode,
            };
            return next;
          });
        }
      }
    });

    return () => {
      cancelled = true;
    };
  }, [city]);

  const center: [number, number] = [city.coord.lat, city.coord.lon];

  return (
    <div className="mb-5 overflow-hidden rounded-3xl bg-white/90 shadow-float backdrop-blur-sm">
      <div className="flex items-center gap-2 px-4 py-3">
        <MapPin
          className="h-4 w-4 text-green-deep"
          strokeWidth={2.5}
          aria-hidden="true"
        />
        <span className="text-sm font-semibold text-navy">
          Orte in {city.name}
        </span>
        <span className="text-xs text-ink-soft">
          · Fußwege eingebettet
        </span>
      </div>
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "300px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {city.pins.map((pin) => (
          <Marker
            key={pin.label}
            position={[pin.coord.lat, pin.coord.lon]}
            icon={pin.type === "hotel" ? hotelIcon : sightIcon}
          >
            <Popup>
              <strong>{pin.label}</strong>
              <br />
              <a href={pin.url} target="_blank" rel="noopener noreferrer">
                Auf OpenStreetMap öffnen
              </a>
            </Popup>
          </Marker>
        ))}
        {routeGeoms.map((geom, i) =>
          geom ? (
            <Polyline
              key={city.routes[i].label}
              positions={geom.coords}
              pathOptions={{
                color: geom.mode === "foot" ? "#3F7A54" : "#837f77",
                weight: 4,
                opacity: 0.85,
                dashArray: geom.mode === "car" ? "6 6" : undefined,
              }}
            />
          ) : null
        )}
      </MapContainer>
      <div className="flex flex-wrap gap-2 p-4">
        {city.pins.map((pin) => (
          <a
            key={pin.label}
            href={pin.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`shadow-float-sm inline-flex min-h-11 items-center gap-1.5 rounded-full bg-white/75 px-3 py-2 text-xs font-medium backdrop-blur-sm transition active:scale-95 hover:bg-white ${
              pin.type === "hotel" ? "text-orange-deep" : "text-green-deep"
            }`}
          >
            {pin.type === "hotel" ? (
              <MapPin className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
            ) : (
              <MapPin className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
            )}
            {pin.label}
          </a>
        ))}
        {city.routes.map((route) => (
          <span
            key={route.label}
            className="shadow-float-sm inline-flex min-h-11 items-center gap-1.5 rounded-full bg-white/75 px-3 py-2 text-xs font-medium text-navy backdrop-blur-sm"
          >
            {route.mode === "foot" ? (
              <Footprints className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
            ) : (
              <Car className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
            )}
            {route.label}
          </span>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { City } from "@/data/trip";

function makeIcon(color: string) {
  return L.divIcon({
    className: "",
    html: `<div style="width:14px;height:14px;border-radius:50%;background:${color};border:2px solid white;box-shadow:0 0 0 1px rgba(0,0,0,0.25)"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });
}

const hotelIcon = makeIcon("#b5451b");
const sightIcon = makeIcon("#5a7a5e");

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
  const hotelPin = city.pins.find((p) => p.type === "hotel");

  return (
    <div className="mb-6 overflow-hidden border border-border">
      <div className="border-b border-border bg-white px-3 py-2 text-[0.68rem] tracking-[0.15em] text-muted uppercase">
        🗺 Orte in {city.name}
        {hotelPin && (
          <>
            {" "}
            — <span className="text-rust">Fußwege ab {hotelPin.label.split(" (")[0]}</span>
          </>
        )}
      </div>
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "340px", width: "100%" }}
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
                color: geom.mode === "foot" ? "#c8943a" : "#7a6e62",
                weight: 4,
                opacity: 0.8,
                dashArray: geom.mode === "car" ? "6 6" : undefined,
              }}
            />
          ) : null
        )}
      </MapContainer>
      <div className="flex flex-wrap gap-2 bg-white p-3">
        {city.pins.map((pin) => (
          <a
            key={pin.label}
            href={pin.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1 rounded-sm border px-2 py-1 text-[0.78rem] transition-colors hover:bg-cream ${
              pin.type === "hotel"
                ? "border-rust text-rust"
                : "border-sage text-sage"
            }`}
          >
            {pin.type === "hotel" ? "🏨" : "📍"} {pin.label}
          </a>
        ))}
        {city.routes.map((route) => (
          <span
            key={route.label}
            className="inline-flex items-center gap-1 rounded-sm border border-gold px-2 py-1 text-[0.78rem] text-gold"
          >
            {route.mode === "foot" ? "🚶" : "🚗"} {route.label}
          </span>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState } from 'react';

type LocationState = {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
};

export function useLocation() {
  const [location, setLocation] = useState<LocationState>({
    latitude: null,
    longitude: null,
    error: null,
  });
  const [loading, setLoading] = useState(false);

  const getLocation = () => {
    setLoading(true);
    setLocation({ latitude: null, longitude: null, error: null });

    if (!navigator.geolocation) {
      setLocation(l => ({ ...l, error: 'Geolocation is not supported by your browser.' }));
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
        setLoading(false);
      },
      () => {
        setLocation(l => ({ ...l, error: 'Unable to retrieve your location.' }));
        setLoading(false);
      }
    );
  };

  return { location, loading, getLocation };
}

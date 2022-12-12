import Image from 'next/image';
import { useMemo } from 'react';
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';

const LocateUs = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyC68fha9dxFOu00mUo1C9qxNC3CEdPc57U',
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
};

function Map() {
  const center = useMemo(() => ({ lat: 19.1159, lng: 73.0054 }), []);

  return (
    <div className='py-4'>
        <div className="flex justify-center items-center flex-col">
        <h1 className="text-yellow-400 text-3xl font-bold mb-4">Locate Us</h1>
        <GoogleMap
          zoom={20}
          center={center}
          mapContainerClassName="mapContainer"
        >
          <MarkerF position={center} />
        </GoogleMap>
      </div>
    </div>
  );
}
export default LocateUs;

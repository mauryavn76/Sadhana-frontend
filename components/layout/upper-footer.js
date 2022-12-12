import { useMemo } from 'react';
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';

const UpperFooter = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyC68fha9dxFOu00mUo1C9qxNC3CEdPc57U',
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
};

function Map() {
  const center = useMemo(() => ({ lat: 19.1159, lng: 73.0054 }), []);

  return (
    <div className="flex h-full lg:py-32 px-8 py-10 justify-center items-center lg:px-16 lg:flex-row flex-col font-semibold ">
      <div className="lg:w-[30%] w-full flex flex-1 flex-col justify-center items-center lg:justify-start lg:items-start h-max">
        <i className="fa-solid fa-phone">
          <button className="ml-5 bg-sky-900 mt-10 my-3 text-white text-lg p-2 font-sans font-bold">
            +910000000000
          </button>
        </i>

        <span className="flex flex-col my-3">
          <i className="fa-solid fa-envelope-open-text">
            <span className="ml-5 font-semibold text-sm lg:text-xl">
              info@sadhana.com
            </span>
          </i>
        </span>

        <span className="flex flex-col my-3">
          <i className="fa-solid fa-address-book">
            <span className="ml-5 font-semibold text-base lg:text-xl">
              Address Plot Number. 5, Railway Station, Shop No. 44/45, Shree
              <br />
              Manoshi CHS, 6, opp. Ghansoli, Sector 3, Navi Mumbai, Maharashtra
              400701
            </span>
          </i>
        </span>
      </div>
      <div className="lg:w-[70%] w-full flex justify-center items-center">
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

export default UpperFooter;

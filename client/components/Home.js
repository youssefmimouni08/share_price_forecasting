import React from "react";
import {
  LightningBoltIcon,
  SunIcon,
  XCircleIcon,
} from "@heroicons/react/outline";
const Home = () => {
  return (
    <div className="text-center font-forum w-2/3">
      <div className="flex  justify-around ">
        <div className="w-1/3">
          <h2 className="text-lg font-medium mb-3 ">
            <div className="flex justify-center">
              <SunIcon className=" h-8" />
            </div>
            <p> Examples</p>
          </h2>
          <div className="p-4 ">
            <div className=" backdrop-filter backdrop-blur-xl border border-gray-100  shadow-lg p-4 mb-4 rounded-lg ">
              "Saudi Arabia and United States of America signed an oil deal"
            </div>
          </div>
        </div>
        <div className="w-1/3">
          <h2 className="text-lg font-medium mb-3 ">
            <div className="flex justify-center">
              <LightningBoltIcon className="h-8" />
            </div>
            <p> Capabilities</p>
          </h2>
          <div className="p-4">
            <div className="backdrop-filter backdrop-blur-xl border border-gray-100  shadow-lg p-4 mb-4 rounded-lg">
              Allows user to provide follow-up corrections
            </div>
          </div>
        </div>

        <div className="w-1/3 text-center">
          <h2 className="text-lg font-medium mb-3 ">
            <div className="flex justify-center">
              <XCircleIcon className="h-8" />
            </div>
            <p>Limitations</p>
          </h2>
          <div className="p-4">
            <div className="backdrop-filter backdrop-blur-xl border border-gray-100  shadow-lg p-4 mb-4 rounded-lg">
              May occasionally generate incorrect information
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

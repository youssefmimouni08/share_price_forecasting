import React from "react";
import {
  LightningBoltIcon,
  SunIcon,
  XCircleIcon,
} from "@heroicons/react/outline";
const Home = () => {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-24">Event Impact Calculator</h1>
      <div className="flex  justify-around ">
        <div className="w-1/3">
          <h2 className="text-lg font-medium mb-3 ">
            <div className="flex justify-center">
              <SunIcon className=" h-8" />
            </div>
            <p> Examples</p>
          </h2>
          <div className="p-4">
            <div className="p-4 mb-4 rounded-lg bg-gray-200">
              "Argentina found new oil area"
            </div>
            <div className="p-4 mb-4 rounded-lg bg-gray-200">
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
            <div className="p-4 mb-4 rounded-lg bg-gray-200">
              Allows user to provide follow-up corrections
            </div>
            <div className="p-4 mb-4 rounded-lg bg-gray-200">Capability 2</div>
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
            <div className="p-4 mb-4 rounded-lg bg-gray-200">
              May occasionally generate incorrect information
            </div>
            <div className="p-4 mb-4 rounded-lg bg-gray-200">Limitation 2</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

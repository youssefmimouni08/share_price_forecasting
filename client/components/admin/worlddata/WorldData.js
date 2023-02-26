const WorldData = () => {
  return (
    <div
      id="tree-container"
      className=" bg-white bg-opacity-30 backdrop-filter backdrop-blur-xl w-full h-full rounded-2xl shadow-lg p-10  "
    >
      <div className=" text-center text-2xl font-bold ">
        Oil production in The world
      </div>
      <iframe
        className="w-full h-full "
        src="http://127.0.0.1:8080"
        title="Other Page"
      />
    </div>
  );
};

export default WorldData;

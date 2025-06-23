const Loading = () => {
  return (
    // <div className="w-full h-full space-y-2">
    //   <div className="h-1/2 grid grid-cols-2 space-x-3 *:rounded-md">
    //     <div className="bg-gray-300 animate-pulse"></div>
    //     <div className="bg-gray-300 animate-pulse"></div>
    //   </div>
    //   <div className="h-1/2 bg-gray-300 animate-pulse rounded-md">
    //   </div>
    // </div>
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p>...loading</p>
    </div>
  );
};
export default Loading;

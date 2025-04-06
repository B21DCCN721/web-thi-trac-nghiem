const Loading = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-gray-200/75">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p>...loading</p>
    </div>
  );
};
export default Loading;

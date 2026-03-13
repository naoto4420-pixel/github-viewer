const SkeletonCard = () => {
  return(
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm border border-gray-200 animate-pulse">
      <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto mb-4">
        <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto mb-6"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-3"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-3"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      </div>
    </div> 
  );
};

export default SkeletonCard;
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductSkeleton = () => {
  return (
    <div className="card p-3">
      <Skeleton height={180} />
      <div className="mt-2">
        <Skeleton height={20} width="80%" />
        <Skeleton height={15} width="60%" />
        <Skeleton height={20} width="40%" />
      </div>
    </div>
  );
};

export default ProductSkeleton;
export const ProductCardSkeleton = () => {
  return (
    <div className="w-full flex flex-col gap-4 animate-pulse">
      {/* Image box */}
      <div className="w-full aspect-[3/4] bg-luxury-cream" />
      {/* Texts */}
      <div className="flex flex-col gap-2 px-1">
        <div className="h-3 bg-luxury-cream w-1/4" />
        <div className="h-4 bg-luxury-cream w-3/4" />
        <div className="h-3 bg-luxury-cream w-1/3 mt-1" />
      </div>
    </div>
  );
};

export const ProductGridSkeleton = ({ count = 8 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};

export const ProductDetailSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 animate-pulse">
      {/* Left side: Images */}
      <div className="flex flex-col gap-4">
        <div className="w-full aspect-[3/4] bg-luxury-cream" />
        <div className="grid grid-cols-4 gap-4">
          <div className="aspect-[3/4] bg-luxury-cream" />
          <div className="aspect-[3/4] bg-luxury-cream" />
          <div className="aspect-[3/4] bg-luxury-cream" />
          <div className="aspect-[3/4] bg-luxury-cream" />
        </div>
      </div>
      
      {/* Right side: Details */}
      <div className="flex flex-col gap-6">
        <div className="h-4 bg-luxury-cream w-1/4" />
        <div className="h-10 bg-luxury-cream w-3/4" />
        <div className="h-6 bg-luxury-cream w-1/5" />
        <div className="h-20 bg-luxury-cream w-full" />
        
        {/* Colors */}
        <div className="flex flex-col gap-2">
          <div className="h-3 bg-luxury-cream w-12" />
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-luxury-cream" />
            <div className="w-8 h-8 rounded-full bg-luxury-cream" />
          </div>
        </div>

        {/* Sizes */}
        <div className="flex flex-col gap-2">
          <div className="h-3 bg-luxury-cream w-12" />
          <div className="flex gap-2">
            <div className="w-12 h-10 bg-luxury-cream" />
            <div className="w-12 h-10 bg-luxury-cream" />
            <div className="w-12 h-10 bg-luxury-cream" />
            <div className="w-12 h-10 bg-luxury-cream" />
          </div>
        </div>

        {/* Buttons */}
        <div className="h-12 bg-luxury-cream w-full mt-4" />
        <div className="h-12 bg-luxury-cream w-full" />
      </div>
    </div>
  );
};

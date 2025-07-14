import { motion } from "framer-motion";

const Loading = ({ type = "table" }) => {
  const shimmerAnimation = {
    animate: {
      backgroundPosition: ["200% 0", "-200% 0"],
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "linear",
    },
  };

  const shimmerGradient = "bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]";

  if (type === "table") {
    return (
      <div className="bg-white rounded-lg shadow-elegant border border-gray-200">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <motion.div
              {...shimmerAnimation}
              className={`h-8 w-48 rounded-lg ${shimmerGradient}`}
            />
            <motion.div
              {...shimmerAnimation}
              className={`h-10 w-32 rounded-lg ${shimmerGradient}`}
            />
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-4 pb-4 border-b border-gray-200">
              {Array.from({ length: 4 }).map((_, i) => (
                <motion.div
                  key={i}
                  {...shimmerAnimation}
                  className={`h-6 rounded ${shimmerGradient}`}
                />
              ))}
            </div>
            
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="grid grid-cols-4 gap-4 py-4 border-b border-gray-100">
                {Array.from({ length: 4 }).map((_, j) => (
                  <motion.div
                    key={j}
                    {...shimmerAnimation}
                    className={`h-5 rounded ${shimmerGradient}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === "grid") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="bg-white rounded-lg shadow-elegant border border-gray-200 p-6"
          >
            <motion.div
              {...shimmerAnimation}
              className={`h-6 w-3/4 rounded mb-4 ${shimmerGradient}`}
            />
            <motion.div
              {...shimmerAnimation}
              className={`h-8 w-1/2 rounded mb-2 ${shimmerGradient}`}
            />
            <motion.div
              {...shimmerAnimation}
              className={`h-4 w-full rounded ${shimmerGradient}`}
            />
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full"
      />
    </div>
  );
};

export default Loading;
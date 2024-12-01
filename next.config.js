/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverExternalPackages: ["mongoose"],
    },
    images: {
      domains: ["lh3.googleusercontent.com"],
    },
    webpack(config) {
      config.experiments = {
        ...config.experiments,
        topLevelAwait: true,
      };
      return config;
    },
  };
  
module.exports = nextConfig;
  
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["lh3.googleusercontent.com"], // Valid image domain configuration
//   },
//   webpack(config) {
//     config.experiments = {
//       ...config.experiments,
//       topLevelAwait: true, // Top-level await support in webpack
//     };
//     return config;
//   },
// };

// module.exports = nextConfig;

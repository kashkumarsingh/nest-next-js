module.exports = {
    async headers() {
      return [
        {
          source: '/api/:path*',
          headers: [
            {
              key: 'Access-Control-Allow-Origin',
              value: '*', // You can restrict this to specific domains as needed
            },
          ],
        },
      ];
    }
  };
  
/**
 * CI settings
 */
var rlConfig = {
  environment: 'ci',
  // This should be a stub server that supports your cucumber tests - not a real gateway
  gatewayBaseUrl: 'http://my-ci-gateway-stub:8001',
  defaultLocale: 'en',
  locales: ['en'],
  enableAirbrake: false
};

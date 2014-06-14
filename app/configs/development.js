/**
 * Development settings
 */
var rlConfig = {
  // What environment is this client running on?
  // We'll use this to configure feature toggles and airbrake
  // Valid settings:  development, ci, qa, production
  environment: 'development',

  // Where is the cpi-gateway?
  gatewayBaseUrl: 'http://localhost:8001',

  // What locale should we select by default?
  defaultLocale: 'en',

  // What locales are available in the drop-down list?
  // Note:  These must also be configured in your gulp l10n task!!!
  locales: ['en'],

  // Should we log errors with airbrake? (enable for qa and production)
  enableAirbrake: false
};

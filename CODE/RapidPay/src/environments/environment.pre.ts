export const environment = {
  production: true,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    'Content-Security-Policy': "Default-src 'self'; font-src * https://fonts.googleapis.com; img-src *; script-src * https://www.gstatic.com https://www.recaptcha.net; style-src 'unsafe-inline';"
  },
  url: window.location.origin + '/API/',
  baseHref: '/portal/',
  akanaUrl: 'https://akana.scf.es.pre.corp/FRONT/#/'
};

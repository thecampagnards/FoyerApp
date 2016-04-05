let _Environments = {
  production:  {BASE_URL: 'http://isenclub.fr/foyer/api/', API_KEY: 'Basic cm9vdDpzM2N1cml0Mw=='},
  staging:     {BASE_URL: 'http://isenclub.fr/foyer/api/', API_KEY: 'Basic cm9vdDpzM2N1cml0Mw=='},
  development: {BASE_URL: 'http://isenclub.fr/foyer/api/', API_KEY: 'Basic cm9vdDpzM2N1cml0Mw=='}
}

function getEnvironment() {
  let platform = 'development';
  return _Environments[platform]
}

let Environment = getEnvironment()
module.exports = Environment
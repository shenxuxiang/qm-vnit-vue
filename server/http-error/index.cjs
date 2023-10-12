const statuses = require('statuses');

module.exports = function(...args) {
  let status = 500;
  let error = null;
  let message = '';
  let props = null;

  for (let i = 0; i < args.length; i++) {
    const item = args[i];

    if (item instanceof Error) {
      error = item;
      status = error.status || error.statusCode || 500;
      message = error.message;
    }

    switch (typeof item) {
      case 'string':
        message = item;
        break;
      case 'number':
        status = item;
        break;
      default:
        props = item;
    }
  }

  if (typeof status === 'number' && (status > 600 || status < 400)) status = 500;

  if (typeof status !== 'number' || !statuses(status)) status = 500;
  if (!error) error = new Error(statuses(status));

  error.status = error.statusCode = status;
  error.expose = error.status < 500;


  for (let key in props) {
    if (key === 'status' || key === 'statusCode') continue;
    error[key] = props[key];
  }

  return error;
}

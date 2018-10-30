/**
 * Cart API Lib
 */

// dependencies
const store = require('../store');
const is = require('../is');
const val = require('../val');

// config
const collection = 'carts';

// cart api object to be exported
const cart = {};

/**
 * Cart post method for creating cart for user
 * @param {object} data Parsed data from request
 * @param {handlerCallback} callback Callback function
 * @return {undefined}
 */
cart.post = (data, callback) => {
  const obj = {
    product: val.def(data.payload.product, is.stringAndNotEmpty, false),
    amount: val.def(data.payload.amount, is.number, false)
  };

  if (is.objectWithFalseValues(obj)) {
    return callback(418, {'Error': 'Payload data was insufficient'});
  }

  store.create(collection, data.JWT.payload.mail, [obj], (err) => {
    if (err) {
      return callback(500);
    }

    callback(200);
  });
};

/**
 * Cart get method for getting cart for user
 * @param {object} data Parsed data from request
 * @param {handlerCallback} callback Callback function
 * @return {undefined}
 */
cart.get = (data, callback) => {
  store.read(collection, data.JWT.payload.mail, (err, obj) => {
    if (err || !obj) {
      return callback(404, {'Error': 'Cart does not exist'});
    }

    callback(200, obj);
  });
};

/**
 * Cart put method for updating cart for user
 * @param {object} data Parsed data from request
 * @param {handlerCallback} callback Callback function
 * @return {undefined}
 */
cart.put = (data, callback) => {};

/**
 * Cart delete method for deleting cart for user
 * @param {object} data Parsed data from request
 * @param {handlerCallback} callback Callback function
 * @return {undefined}
 */
cart.delete = (data, callback) => {};

// export cart object
module.exports = cart;
var express = require('express');
var router = express.Router();
var models  = require('../models');


//Authentication API routes
module.exports = function(braintree, jsonParser) {
/**
 * Instantiate your gateway (update here with your Braintree API Keys)
 */
var gateway = braintree.connect({
  environment:  braintree.Environment.Sandbox,
  merchantId:   '8z89z5gg7zt6x8x8',
  publicKey:    'w9kvxgpmbsrf594z',
  privateKey:   'cbefff229a42fa94c3138a70584229bf'
});

/**
 * Route that returns a token to be used on the client side to tokenize payment details
 */

router.post('/api/v1/token', function(request, response) {
 	//console.log(req.body);
  console.log('POST: -----------------------PAYMENT TOKEN------------------');

  gateway.clientToken.generate({}, function (err, res) {
    if (err) throw err;
    response.json({
      "client_token": "sandbox_yjjdp7fm_8z89z5gg7zt6x8x8"
    });
  });

 });

 /**
  * Route to process a sale transaction
  */
 router.post('/api/v1/process', jsonParser, function (request, response) {
  console.log('POST: -----------------------PAYMENT PROCESS------------------');
   var transaction = request.body;
   console.log(transaction);
   gateway.transaction.sale({
     amount: transaction.amount,
     paymentMethodNonce: 'fake-valid-nonce'  //transaction.payment_method_nonce
   }, function (err, result) {
     if (err) throw err;
     console.log(result);
     //console.log(util.inspect(result));
     response.json(result);
   });
 });

//***********************************************************************/
return router;
}

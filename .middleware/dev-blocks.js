'use strict';
    
const src_middlewares_pre_middleware = require('../src/middlewares/pre-middleware');
const src_handlers_block_handler = require('../src/handlers/block-handler');
const src_middlewares_pos_middleware = require('../src/middlewares/pos-middleware');

module.exports.handler = async (event, context) => {
  let end = false;
  context.end = () => end = true;

  const wrappedHandler = handler => prev => {
    if (end) return prev;
    context.prev = prev;
    return handler(event, context);
  };

  return Promise.resolve()
    .then(wrappedHandler(src_middlewares_pre_middleware.dbConnect.bind(src_middlewares_pre_middleware)))
    .then(wrappedHandler(src_handlers_block_handler.getBlocks.bind(src_handlers_block_handler)))
    .catch(wrappedHandler(src_middlewares_pos_middleware.errorHandler.bind(src_middlewares_pos_middleware)));
};
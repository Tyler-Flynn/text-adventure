'use strict';


const requireCtx = require.context(
  '../../',
  true,
  // All our md files
  // TODO: dont think this works.  See: console.log(requireCtx.keys());
  /\.md$/
);


const readFileSync = function (filePath, encoding) {
  return requireCtx('.' + filePath);
};


module.exports = {
  readFileSync: readFileSync
};

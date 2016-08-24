'use strict';
const $ = require('jquery');


const scroll = function () {
  const $output = $('#output');
  $output.scrollTop($output[0].scrollHeight - $output.height());
};


module.exports = {
  scroll: scroll
};

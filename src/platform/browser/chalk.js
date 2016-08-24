'use strict';

// Map names to nicer colors
const colorMap = {
  blue: '#8585ff',
  green: '#47c347',
  red: '#ff2d2d'
}

const colorFn = function (colorName, str) {
  return `<span style="color: ${colorMap[colorName]}">${str}</span>`;
};


module.exports = {
  blue: colorFn.bind(null, 'blue'),
  green: colorFn.bind(null, 'green'),
  red: colorFn.bind(null, 'red')
};

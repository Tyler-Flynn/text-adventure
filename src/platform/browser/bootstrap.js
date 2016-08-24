'use strict';
const $ = require('jquery');


const scrollOutput = function () {
  const $output = $('#output');
  $output.scrollTop($output[0].scrollHeight - $output.height());
};


const bootstrap = function () {
  console.log('Running bootstrap; redirecting console.log');

  const originalLog = console.log;
  console.log = (...args) => {
    // Log to console
    originalLog.apply(window.console, args);
    // Print in to the output window
    const $output = $('#output');
    let message = args.join(' ');
    // Handle tabs
    message = message.replace(/\t/gm, '<div class="text-tab"></div>');

    message.split('\n').forEach(line => {
      const $line = $('<div>').addClass('text-line').appendTo($output);
      $line.append($.parseHTML(line));
      // $output.append($('<br/>'));
    });
  };

  scrollOutput();
};


module.exports = {
  bootstrap: bootstrap
};

window.textAdventureBootstrap = bootstrap;

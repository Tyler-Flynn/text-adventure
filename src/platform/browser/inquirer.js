'use strict';
const Promise = require('bluebird');
const $ = require('jquery');

const outputUtils = require('./outputUtils');


const prompt = function (questions) {
  if (questions.length !== 1) {
    throw new Error('More than one question not supported');
  }

  const question = questions[0];
  const answers = {};

  if (question.type !== 'list') {
    throw new Error('Question type not supported: ' + question.type);
  }

  // Top level question container
  const $output = $('#output');
  const $inputContainer = $('<div>').appendTo($output);

  return new Promise((resolve, reject) => {
    const $choiceContainer = $('<div>')
      .addClass('input-container')
      .appendTo($inputContainer);
    // Add the title
    $('<h3>').text(question.message).appendTo($choiceContainer);

    const $choiceList = $('<ul>').appendTo($choiceContainer);
    // Choice complete
    const onChoice = choice => {
      // Cleanup
      $inputContainer.remove();
      // answers
      answers[question.name] = choice.value;
      resolve(answers);
    };
    // Add choice text
    question.choices.forEach(choice => {
      const $li = $('<li/>').appendTo($choiceList);
      $('<a/>').text(choice.name).appendTo($li).click(onChoice.bind(null, choice));
    });
    // Ensure it is visible
    outputUtils.scroll();
  });
};


module.exports = {
  prompt: prompt
};

/**
 * Name: Cheryl Moser
 * Date: November 26, 2023
 * AD320 CP4
 *
 * Adds functionality to the Moss Quotes html file.
 * Adds click-events to buttons for obtaining a list, and getting a funny quote.
 */

"use strict";

(function() {

  const URL = 'http://localhost:8000/'; //base URL

  window.addEventListener("load", init);

  //event listeners for button clicks
  function init() {
      id('list').addEventListener('click', getList);
      id('quote').addEventListener('click', getQuote);
  }

  /**
   * API request: gets a list of topics from the /topics endpoint.
   */
  function getList(){
    clear();
    console.log('fetching topics list...');
    fetch(URL+"topics")
      .then(statusCheck)
      .then(res => res.text())
      .then(processTopic)
      .catch(err);
    console.log('done');
  }

   /**
   * API request: gets a quote from the /:topic endpoint, where
   * :topic is replaced by a user-identified topic. Must match an
   * item from the topics list.
   */
  function getQuote(){
    clear();
    let topic = id('topic').value;
    console.log('fetching '+topic+' quote...');
    fetch(URL+topic)
      .then(statusCheck)
      .then(res => res.json())
      .then(processQuote)
      .catch(err);
    console.log('done');
  }

  /** ------------------------------ Helper Functions  ------------------------------ */
  
  /**
   * Creates a new paragraph in 'results' section that displays a list of topics.
   * @param {*} data - list of topics received from /topics endpoint.
   */
  function processTopic(data){
    console.log('Data received: '+data);
    let paragraph = gen('p');
    
    paragraph.textContent = ' | ' + data.split(' ').join(' | ');
    id('result').appendChild(paragraph);
    console.log('Data processed and appended to result section: '+paragraph.textContent);
  }

  /**
   * Creates a new paragraph in 'results' section that displays a funny quote.
   * @param {*} data - quote received from user-defined /:topic endpoint.
   */
  function processQuote(data){
    let paragraph = gen('p');
    paragraph.textContent = data.quote;
    id('result').appendChild(paragraph);
  }

  /**
   * Checks the status of the HTML site that is being called. True if status is 200.
   * @param {*} res - response from the website being called.
   * @returns - a response, or an error message if status is not ok.
   */
  async function statusCheck(res) {
    if (!res.ok) {
      throw new Error(await res.text() || await res.json());
    }
    return res;
  }

  /**
   * Generic error message if something has not worked
   */
  function err(){
    clear();
    let msg = 'Please enter an item from the topic list. Entries are case-sensitive.';
    let paragraph = gen('p');
    paragraph.textContent = msg;
    id('result').appendChild(paragraph);
  }

  /**
   * Clears the contents of the 'result' section.
   */
  function clear(){
    id('result').innerHTML = '';
  }

  /**
   * Returns a new element with the given tag name.
   * @param {string} tagName - HTML tag name for new DOM element.
   * @returns {object} New DOM object for given HTML tag.
   */
  function gen(tagName) {
    return document.createElement(tagName);
}

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id.
   */
  function id(idName) {
      return document.getElementById(idName);
  }

})();
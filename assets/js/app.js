'use strict';

(function () {
  function init () {
    let router = new Router([
      new Route('news', 'news.html', true),
      new Route('submit', 'submit.html')
    ])
  }
  init()
})()

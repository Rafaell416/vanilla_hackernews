'use strict'

function Router (routes) {
  try {
    if (!routes) {
      throw new Error('Error: routes is a required param')
    }
    this.constructor(routes)
    this.init()
  } catch (e) {
    console.error(e)
  }
}


Router.prototype = {
  routes: undefined,
  root: undefined,
  constructor: function (routes) {
    this.routes = routes;
    this.root = document.getElementById('app')
  },

  init: function () {
    //get the routes
    let r = this.routes;
    //set a listener if url change and handle url change
    (function (scope, r) {
      // window.addEventListener('hashchange', function () {
      //   scope.hasChanged(r)
      // })
      window.addEventListener('hashchange', ()=>scope.hasChanged(r))
    })(this, r)
    this.hasChanged(r)
    //go to our firt route
  },

  hasChanged: function (r) {
    // //handle url change
    if (window.location.hash.length > 0) {
      r.map(route => route.isActiveRoute(window.location.hash.substr(1)) ? this.goToRoute(route.name) : null) //route.htmlName
      // for (let i = 0, length = r.length; i < length; i++) {
      //     let route = r[i]
      //     if(route.isActiveRoute(window.location.hash.substr(1))) {
      //         this.goToRoute(route.htmlName)
      //     }
      // }
    } else {
      r.map(route => route.default ? this.goToRoute(route.name) : null) //route.htmlName
      // for (let i = 0, length = r.length; i < length; i++) {
      //     let route = r[i]
      //     if(route.default) {
      //         this.goToRoute(route.htmlName)
      //     }
      // }
    }
  },

  goToRoute: function (name) { //htmlName
    switch (name) {
      case 'news':
          this.getHackerNewsData()
        break;
      case 'submit':
        this.root.innerHTML = `<h1>SUBMIT</h1>`
        break;
      default:
        return name
    }
  },

   getHackerNewsData () {
     fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
     .then(res => res.json())
     .then(data => {
       let ul = document.createElement('ul')
       ul.setAttribute('id', 'list')
       document.getElementById('app').innerHTML = ''
       this.root.appendChild(ul)

       data.map((d) => this.handleHtmlIsertion(d))
     })
   },

   handleHtmlIsertion (item) {
     fetch(`https://hacker-news.firebaseio.com/v0/item/${item}.json`)
     .then(res => res.json())
     .then(data => {
       let link = `
       <div id="link">
         <a target="_blank" href=${data.url}>${data.title}</a>
       </div>
       `
       document.getElementById('list').insertAdjacentHTML('afterbegin',link)

     })
   }
}



// goToRoute: function (htmlName) {
//   fetch(`views/${htmlName}`)
//   .then(res => res.text())
//   .then(html => this.handleHtmlIsertion(html))
//   .catch(err => console.error('There was an error fetching'))
// },

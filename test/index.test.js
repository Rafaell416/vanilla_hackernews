const request = require('supertest')
const index = require('../')

describe('app', ()=>{
  it('should serve html on index',  (done) => {
    request(index).get('/').expect('Content-Type', /html/).expect(200, done)
  })
})

module.exports = function(app, path){
  // app passes in the express object needed for the route.
  // path passes in a path object needed to find the file. The path module is part of node and needs to be required in the server.js file
  app.get('/login',function(req, res){
  let filepath = path.resolve('./www/login.html');
    res.sendFile(filepath);
  });
}
// Add an index route to express that returns a HTML login page.
// This page should have a login form that has an email and password field.

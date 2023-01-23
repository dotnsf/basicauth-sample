//. app.js
var express = require( 'express' ),
    basicAuth = require( 'basic-auth-connect' ),
    app = express();

require( 'dotenv' ).config();

//. Basic Auth
var basic_user = 'BASIC_USER' in process.env && process.env.BASIC_USER ? process.env.BASIC_USER : ""; 
var basic_pass = 'BASIC_PASS' in process.env && process.env.BASIC_PASS ? process.env.BASIC_PASS : ""; 
if( basic_user && basic_pass ){
  app.all( '/*', basicAuth( function( user, pass ){
    return( user === basic_user && pass === basic_pass );
  }));
}

app.get( '/', function( req, res ){
  res.contentType( 'text/plain; charset=utf-8' );
  res.write( "Hello." );
  res.end();
});

var port = process.env.PORT || 8080;
app.listen( port );
console.log( "server starting on " + port + " ..." );

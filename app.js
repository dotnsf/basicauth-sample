//. app.js
var express = require( 'express' ),
    basicAuth = require( 'basic-auth-connect' ),
    app = express();

require( 'dotenv' ).config();

app.use( express.Router() );

//. Basic 認証

//. ユーザー名とパスワード（.env ファイルから読み取る）
var basic_user = 'BASIC_USER' in process.env && process.env.BASIC_USER ? process.env.BASIC_USER : ""; 
var basic_pass = 'BASIC_PASS' in process.env && process.env.BASIC_PASS ? process.env.BASIC_PASS : ""; 
if( basic_user && basic_pass ){
  //. BASIC_USER と BASIC_PASS 両方に何かが設定されていた場合は、その値で Basic 認証を掛ける
  app.all( '/*', basicAuth( function( user, pass ){
    return( user === basic_user && pass === basic_pass );
  }));
}

//. Basic 認証を通過した場合のみ、以下のアクセスが可能になる

//. public フォルダへのアクセス
//. (http://localhost:8080/icon.png)
app.use( express.static( __dirname + '/public' ) );

//. ルートコンテキストへのアクセス
//. (http://localhost:8080/)
app.get( '/', function( req, res ){
  res.contentType( 'text/plain; charset=utf-8' );
  res.write( "Hello." );
  res.end();
});

var port = process.env.PORT || 8080;
app.listen( port );
console.log( "server starting on " + port + " ..." );

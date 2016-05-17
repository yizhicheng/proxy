/**
 * 封装执行shell命令
 * author: johnny
 */
var exec = require('child_process').exec;
var command = {
  exec : function ( cmdstr, success, error ) {
    exec(cmdstr, function(err,stdout,stderr){
        if(err) {
            console.log('get weather api error:'+stderr);
            error && error( stderr );
        } else {
          success && success( stdout );
        }
    });
  }
};

module.exports = command;

exports.action = function(data, callback, config){

  // Retrieve config
  config = config.modules.pushover;
  if (!config.token || !config.user){
    console.log("Missing Pushover config");
    callback({});
    return;
  }
  
  //Si data.device est vide, envoie à toutes les devices, sinon juste à celui concerné
  if (data.device===""){
    var data.device="all";
  }

  // https://github.com/SamDecrock/node-pushover
  var pushover = require('./lib/pushover');
  pushover.send({  
    token: config.token,
    user: config.user,
    title: config.title,
    device: data.device,
    message: data.push
  },
  
  function(err, response){    
    if (err){
      callback({'tts': "Erreur dans l'envoie"});
      return;
    }
    callback({'tts': 'Message envoyé'});
  });
}

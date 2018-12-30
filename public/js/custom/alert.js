function success(msg) {
  iziToast.success({
      title: 'OK',
      message:msg ,
  });
}
function error(msg) {
  iziToast.error({
      title: 'Error',
      message: msg,
  });
}

function sendAnError(field,msg){
  error(msg);
  field.focus();
  return false;
}

function notify(notifications) {
  if(notifications.errors){
    var errors = notifications.errors.isArray ?notifications.errors: [notifications.errors] ;

    errors.forEach(function(item) {
      error(item);
    });
  }

  if(notifications.info){
    iziToast.info({
        title: 'Hello',
        message: notifications.info,
    });
  }

  if(notifications.success){
    success(notifications.success);
  }

  if(notifications.warn){
    iziToast.warning({
        title: 'Caution',
        message: notifications.warn,
    });
  }

}

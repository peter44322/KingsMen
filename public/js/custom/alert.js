function notify(notifications) {
  if(notifications.errors){
    var errors = notifications.errors.isArray ?notifications.errors: [notifications.errors] ;

    errors.forEach(function(item) {
      iziToast.error({
          title: 'Error',
          message: item,
      });
    });
  }

  if(notifications.info){
    iziToast.info({
        title: 'Hello',
        message: notifications.info,
    });
  }

  if(notifications.success){
    iziToast.success({
        title: 'OK',
        message:notifications.success ,
    });
  }

  if(notifications.warn){
    iziToast.warning({
        title: 'Caution',
        message: notifications.warn,
    });
  }

}

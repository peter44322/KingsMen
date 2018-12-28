$('input').each(function(){
    var val = $(this).val();
    $(this).val(val.trim());
});

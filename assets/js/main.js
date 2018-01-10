var usuario = '';
function login() {
  usuario = $('#nombre').val();
  console.log(usuario);
  $.post('autenticar', {usuario:usuario}, function(result){
    console.log(result);
    if (result != '') {
      window.location.href = 'http://localhost:3000/';
    }
  });
}
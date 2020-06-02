$(function(){
  $("#enviar").click(function(){
    // Um objeto do JS. Sintaxe muito similar a um dicionario do Python.
    var parametros = {
      "nome": $("#nome").val(),
      "e-mail": $("#email").val(),
      "senha": $("#senha").val()
    }

    // "Em resumo, AJAX se trata de carregar dados em segundo plano e mostrá-los no site, sem ter que recarregar a página inteira."
    /*
    Como AJAX funciona:
    1. Um evento ocorre em uma página (como o clique de um botão)
    2. Um objeto XMLHttpRequest é criado pelo JavaScript
    3. O objeto XMLHttpRequest manda uma requisição para um servidor web
    4. O servidor processa a requisição
    5. O servidor envia uma resposta para a página
    6. A resposta é lida pelo JavaScript
    7. A ação apropriada (como recarregar a página) é feita pelo JavaScript
    FONTE: W3Schools
    */
    $.ajax({
      // Como estaremos enviando os dados
      type: "POST",
      // Para onde estaremos enviando. Para o servidor do prof, para o arquivo cadastra.php
      url: "https://wordpress-online-2.000webhostapp.com/webservice/cadastra.php",
      // O que estaremos enviando
      data: parametros,
      // Se der bom,
      // retorno representa a mensagem de um echo em cadastra.php, por exemplo
      success: function(retorno){
        // mostramos um alert com retorno
        navigator.notification.alert(retorno);
        // e deixamos os campos vazios
        $("#nome").val("")
        $("#email").val("")
        $("#senha").val("")
      },
      // Se der ruim,
      error: function(retorno){
        // Mostramos um alert com uma mensagem de erro
        navigator.notification.alert("Algum erro ocorreu");
      }
    })
  })
})
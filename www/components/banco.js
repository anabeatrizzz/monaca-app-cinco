$(function(){
  function Listar(){
    $.ajax({
      // Como estaremos enviando os dados
      type: "POST",
      // Para onde estaremos enviando. Para o servidor do prof, para o arquivo listar.php
      url: "https://wordpress-online-2.000webhostapp.com/webservice/listar.php",
      // Tipo de dado recebido
      dataType: "JSON",
      // Se der bom,
      // retorno é o json que está em listar.php
      success: function(retorno){
        var itemLista = "";
        // retorno.pessoas representa a identificação do json
        // dados representa codigo, nome, email e senha
        // i representa os pares de chaves
        // a função each é como a funcao foreach do c sharp
        $.each(retorno.pessoas, function(i, dados){
          itemLista += `<option value="${dados.codigo}">${dados.nome}</option>`
        });
        $("#listagem").append(itemLista);
      },
      error: function(retorno){
        navigator.notification.alert("Erro ao buscar registro");
      }
    })
  }

  Listar();

  // Função que deixa usuario escrever nos inputs
  function habilitarInputs(){
    // O metodo prop() define ou retorna propriedades e valores dos elementos selecionados
    $("#nome").prop("readonly", false)
    $("#email").prop("readonly", false)
    $("#senha").prop("readonly", false)
  }

  // Função que bloqueia a escrita nos inputs
  function desabilitarInputs(){
    $("#nome").prop("readonly", true)
    $("#email").prop("readonly", true)
    $("#senha").prop("readonly", true)
  }
  
  $("#enviar").click(function(){
    // Um objeto do JS. Sintaxe muito similar a um dicionario do Python.
    var parametros = {
      "nome": $("#nome").val(),
      "email": $("#email").val(),
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

  // Quando ocorrer uma mudança no select,
  $("#listagem").change(function(){
    // Guarde o valor que está na option selecionada
    var parametro = {
      "codigo": $("#listagem option:selected").val()
    }
    $.ajax({
      // Como estaremos enviando os dados
      type: "POST",
      // Para onde estaremos enviando. Para o servidor do prof, para o arquivo listar-um-registro.php
      url: "https://wordpress-online-2.000webhostapp.com/webservice/listar-um-registro.php",
      // O que estaremos enviando
      data: parametro,
      // Tipo de dado recebido
      dataType: "JSON",
      // Se der bom,
      // retorno representa o que listar-um-registro.php retorna, nesse caso, um JSON
      success: function(retorno){
        $("#codigo").val(retorno.pessoa.codigo);
        $("#nome").val(retorno.pessoa.nome);
        $("#email").val(retorno.pessoa.email);
        $("#senha").val(retorno.pessoa.senha);
      },
      // Se der ruim,
      error: function(retorno){
        // Mostramos um alert com uma mensagem de erro
        navigator.notification.alert("Algum erro ocorreu");
      }
    })
  })
  
  $("#editar").click(function(){
    habilitarInputs();
  })

  $("#salvar").click(function(){
    var parametros = {
      "codigo": $("#codigo").val(),
      "nome": $("#nome").val(),
      "email": $("#email").val(),
      "senha": $("#senha").val()
    }

    $.ajax({
      // Como estaremos enviando os dados
      type: "POST",
      // Para onde estaremos enviando. Para o servidor do prof, para o arquivo atualiza.php
      url: "https://wordpress-online-2.000webhostapp.com/webservice/atualiza.php",
      // O que estaremos enviando
      data: parametros,
      // Se der bom,
      // retorno representa o que a pagina atualiza.php retorna
      success: function(retorno){
        // mostramos um alert com retorno
        navigator.notification.alert(retorno);
        // e recarregaremos a pagina
        location.reload();
        // com os inputs desabilitados
        desabilitarInputs();
      },
      // Se der ruim,
      error: function(retorno){
        // Mostramos um alert com uma mensagem de erro
        navigator.notification.alert("Algum erro ocorreu");
      }
    })
  })

  $("#cancelar").click(function(){
    desabilitarInputs();
  })

  $("#excluir").click(function(){
    var parametros = {
      "codigo": $("#codigo").val()
    }

    $.ajax({
      // Como estaremos enviando os dados
      type: "POST",
      // Para onde estaremos enviando. Para o servidor do prof, para o arquivo delete.php
      url: "https://wordpress-online-2.000webhostapp.com/webservice/delete.php",
      // O que estaremos enviando
      data: parametros,
      // Se der bom,
      // retorno representa o que a pagina atualiza.php retorna
      success: function(retorno){
        // mostramos um alert com retorno
        navigator.notification.alert(retorno);
        // e recarregaremos a pagina
        location.reload();
        // com os inputs desabilitados
        desabilitarInputs();
      },
      // Se der ruim,
      error: function(retorno){
        // Mostramos um alert com uma mensagem de erro
        navigator.notification.alert("Algum erro ocorreu");
      }
    })
  })
})
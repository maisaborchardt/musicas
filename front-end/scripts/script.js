$(function() {
    function exibirMusicas() {
        $.ajax({
            url: 'http://localhost:5000/listar_musicas',
            method: 'GET',
            dataType: 'json', 
            success: listarMusicas, 
            error: function() {
                alert("erro ao ler dados, verifique o backend");
            }
        });
        function listarMusicas (musicas) {
           
            $('#corpoTabelaMusicas').empty();
            
            mostrarConteudo("tabelaMusicas");      
            
            for (musica of musicas) {
                novaLinha = `<tr id="linha_${musica.id}">
                            <td>${musica.nome}</td>
                            <td>${musica.banda}</td>
                            <td>${musica.data}</td>
                            <td>${musica.duracao}</td>
                            <td><a href=# id="${musica.id}" class="excluir_musica">
                                    <p class="badge badge-danger">Excluir</p>
                                </a>
                            </td>
                          </tr>`;
                $('#tabelaMusicas').append(novaLinha);
            }
        }
    }

    
    function mostrarConteudo(identificador) {
        
        $("#tabelaMusicas").addClass('invisible');
        $("#conteudoInicial").addClass('invisible');
        
        $("#"+identificador).removeClass('invisible');      
    }

    
    $(document).on("click", "#linkListarMusicas", function() {
        exibirMusicas();
    });
    
    
    $(document).on("click", "#linkInicio", function() {
        mostrarConteudo("conteudoInicial");
    });

    
    $(document).on("click", "#btIncluirMusica", function() {
      
        nome = $("#campoNome").val();
        banda = $("#campoBanda").val();
        data = $("#campoData").val();
        duracao = $("#campoDuracao").val();
        
        var dados = JSON.stringify({ nome: nome, banda: banda, data: data, duracao: duracao });
        
        $.ajax({
            url: 'http://localhost:5000/criar_musica',
            type: 'POST',
            dataType: 'json', 
            contentType: 'application/json', 
            data: dados, 
            success: musicaIncluida, 
            error: erroAoIncluir
        });
        function musicaIncluida (retorno) {
            if (retorno.resultado == "ok") { 
                
                alert("Música incluída com sucesso!");
                
                $("#campoNome").val("");
                $("#campoBanda").val("");
                $("#campoData").val("");
                $("#campoDuracao").val("");
            } else {
                
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoIncluir (retorno) {
            
            alert("ERRO: "+retorno.resultado + ":" + retorno.detalhes);
        }
    });

   
    $('#modalIncluirMusica').on('hide.bs.modal', function (e) {
        
        if (! $("#tabelaMusicas").hasClass('invisible')) {
            
            exibirMusicas();
        }
    });

    $(document).on("click", ".excluir_musica", function() {
        var musicaId = $(this).attr("id");
    
        $.ajax({
          url: `http://localhost:5000/excluir_musica/${musicaId}`,
          type: "DELETE",
          dataType: 'json',
          success: excluirMusica,
          error: erroAoExcluir
        });
    
        function excluirMusica(retorno) {
          if (retorno.resultado === "ok") {
            $(`#linha_${musicaId}`).fadeOut(() => {
                alert("Música excluída com sucesso!")
            });
          } else {
            alert(`ERROR: ${retorno.resultado}: ${retorno.datalhes}`);
          }
        }
    
        function erroAoExcluir(retorno) {
          alert("Error: Search on back-end");
        }
      });
    
    mostrarConteudo("conteudoInicial");
});
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

            mostrarConteudo("musicas");

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


    function exibirUsuarios() {
        $.ajax({
            url: 'http://localhost:5000/listar_usuarios',
            method: 'GET',
            dataType: 'json',
            success: listarUsuarios,
            error: function() {
                alert("erro ao ler dados, verifique o backend");
            }
        });

        function listarUsuarios(usuarios) {
            $('#corpoTabelaUsuarios').empty();

            mostrarConteudo("usuarios");

            for (usuario of usuarios) {
                novaLinha = `<tr id="linha_${usuario.id}">
                            <td>${usuario.nome}</td>
                            <td>${usuario.idade}</td>
                            <td>${usuario.premium}</td>
                          </tr>`;
                $('#tabelaUsuarios').append(novaLinha);
            }
        }
    }


    function exibirPlayLists() {
        $.ajax({
            url: 'http://localhost:5000/listar_playlists',
            method: 'GET',
            dataType: 'json',
            success: listarPlayLists,
            error: function() {
                alert("erro ao ler dados, verifique o backend");
            }
        });

        function listarPlayLists(playlists) {
            $('#corpoTabelaPlayLists').empty();

            mostrarConteudo("playlists");

            for (playlist of playlists) {
                novaLinha = `<tr id="linha_${playlist.id}">
                            <td>${playlist.nome}</td>
                            <td>${playlist.data_criacao}</td>
                            <td>${playlist.musica.nome}</td>
                            <td>${playlist.musica.banda}</td>
                            <td>${playlist.musica.data}</td>
                            <td>${playlist.musica.duracao}</td>
                            <td>${playlist.usuario.nome}</td>
                            <td>${playlist.usuario.idade}</td>
                            <td>${playlist.usuario.premium}</td>
                          </tr>`;
                $('#tabelaPlayLists').append(novaLinha);
            }
        }
    }


    function mostrarConteudo(identificador) {
        $("#musicas").addClass('d-none');
        $("#usuarios").addClass('d-none');
        $("#playlists").addClass('d-none');
        $("#conteudoInicial").addClass('d-none');
        $("#"+identificador).removeClass('d-none');
    }


    $(document).on("click", "#linkListarMusicas", function() {
        exibirMusicas();
    });

    $(document).on("click", "#linkListarUsuarios", function() {
        exibirUsuarios();
    });

    $(document).on("click", "#linkListarPlayLists", function() {
        exibirPlayLists();
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

        if (! $("#tabelaMusicas").hasClass('d-none')) {

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
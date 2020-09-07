$(function() {
    $.ajax({
        url: 'http://localhost:5000/index_musica',
        method: 'GET',
        dataType: 'json',
        success: listarMusicas,
        error: function() {
            alert("ERRO");
        }
    });
  
    function listarMusicas(musicas) {
        for (musica of musicas) {
            novaLinha = `<tr>
                        <td>${musica.nome}</td>
                        <td>${musica.banda}</td>
                        <td>${musica.data}</td>
                        <td>${musica.duracao}</td>
                      </tr>`;
            $('#tabelaMusica').append(novaLinha);
        }
    }
 });
 
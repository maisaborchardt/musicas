from config import *
from models import Musica, Usuario, PlayList

@app.route('/')
def home():
    return 'Link de acesso para as minhas músicas <a href="/index_musica">Minhas músicas</a>'

@app.route('/listar_musicas')
def listar_musicas():
    musicas = db.session.query(Musica).all()
    json_musicas = [ musica.json() for musica in musicas ]
    resposta = jsonify(json_musicas)
    resposta.headers.add('Access-Control-Allow-Origin', '*')
    return resposta

@app.route('/criar_musica', methods=['POST'])
def criar_musica():
    resposta = jsonify({'resultado':'ok', 'detalhes':'ok'})
    dados = request.get_json()

    try:
        nova_musica = Musica(**dados)
        db.session.add(nova_musica)
        db.session.commit()
    except Exception as e:
        resposta = jsonify({'resultado':'erro', 'detalhes': str(e)})

    resposta.headers.add('Access-Control-Allow-Origin', '*')
    return resposta

@app.route('/excluir_musica/<int:musica_id>', methods=['DELETE'])
def excluir_musica(musica_id):
    resposta = jsonify({'resultado':'ok', 'detalhes':'ok'})

    try:
        Musica.query.filter(Musica.id == musica_id).delete()
        db.session.commit()
    except Exception as e:
        resposta = jsonify({'resultado':'erro', 'detalhes': str(e)})

    resposta.headers.add('Access-Control-Allow-Origin', '*')
    return resposta

@app.route('/listar_usuarios')
def listar_usuarios():
    usuarios = db.session.query(Usuario).all()
    json_usuarios = [ usuario.json() for usuario in usuarios ]
    resposta = jsonify(json_usuarios)
    resposta.headers.add('Access-Control-Allow-Origin', '*')
    return resposta

@app.route('/listar_playlists')
def listar_playlists():
    playlists = db.session.query(PlayList).all()
    json_playlists = [ playlist.json() for playlist in playlists ]
    resposta = jsonify(json_playlists)
    resposta.headers.add('Access-Control-Allow-Origin', '*')
    return resposta
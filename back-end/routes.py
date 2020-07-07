from config import *
from model import Musica

@app.route('/')
def home():
    return 'Link de acesso para as minhas músicas <a href="/index_musica">Minhas músicas</a>'

@app.route('/index_musica')
def index_musica():
    musicas = db.session.query(Musica).all()
    json_musicas = [ musica.json() for musica in musicas ]
    resposta = jsonify(json_musicas)
    resposta.headers.add('Access-Control-Allow-Origin', '*')
    return resposta


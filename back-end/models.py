from config import *

class Musica(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(254))
    banda = db.Column(db.String(254))
    data = db.Column(db.String(254))
    duracao = db.Column(db.String(254))

    playlist = db.relationship("PlayList", back_populates="musica")


    def __str__ (self):
        return f"{self.id}. {self.nome}; {self.banda}; {self.data}; {self.duracao}"


    def json(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "banda": self.banda,
            "data": self.data,
            "duracao": self.duracao
        }


class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(254))
    idade = db.Column(db.Integer)
    premium = db.Column(db.Boolean)

    playlist = db.relationship("PlayList", back_populates="usuario")


    def __str__ (self):
        return f"{self.id}. {self.nome}; {self.idade}; {self.premium};"


    def json(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "idade": self.idade,
            "premium": self.premium
        }


class PlayList(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(254))
    data_criacao = db.Column(db.String(254))

    musica_id = db.Column(db.Integer, db.ForeignKey(Musica.id), nullable=False)
    musica = db.relationship("Musica", back_populates="playlist")

    usuario_id = db.Column(db.Integer, db.ForeignKey(Usuario.id), nullable=False)
    usuario = db.relationship("Usuario", back_populates="playlist")


    def __str__ (self):
        return f"{self.id}. {self.nome} - {self.data_criacao}: \n" +\
               f"{self.musica} \n" +\
               f"{self.usuario}"


    def json(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "data_criacao": self.data_criacao,
            "musica_id": self.musica_id,
            "musica": self.musica,
            "usuario_id": self.usuario_id,
            "usuario": self.usuario
        }


if __name__ == "__main__":
    if os.path.exists(arquivobd):
        os.remove(arquivobd)

    db.create_all()

    musica1 = Musica(nome="911", banda="Trevor Daniel", data="20/04/2020", duracao="00:02:33")
    db.session.add(musica1)

    usuario1 = Usuario(nome="Maisa", idade=17, premium=True)
    db.session.add(usuario1)

    playlist1 = PlayList(nome="Trap", data_criacao="13/11/2020", musica=musica1, usuario=usuario1)
    db.session.add(usuario1)



    db.session.commit()

    print(musica1)
    print(musica1.json())
    print('\n')
    print(usuario1)
    print(usuario1.json())
    print('\n')
    print(playlist1)
    print(playlist1.json())





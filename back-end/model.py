from config import *

class Musica(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(254))
    banda = db.Column(db.String(254))
    data = db.Column(db.String(254))
    duracao = db.Column(db.String(254))


    def __str__ (self):
        return str(self.id) +") "+ self.nome + ", " +\
            self.banda + ", " + self.data + "," + self.duracao
    
    def json(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "banda": self.banda,
            "data": self.data,
            "duracao": self.duracao
        }
    
if __name__ == "__main__":
    if os.path.exists(arquivobd):
        os.remove(arquivobd)

    db.create_all()

    musica1 = Musica(nome = "911", banda = "Trevor Daniel", data = "20/04/2020", duracao = "00:02:33")

    db.session.add(musica1)
    db.session.commit()

    print(musica1)

    print(musica1.json())

       



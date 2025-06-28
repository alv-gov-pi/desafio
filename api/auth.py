from rest_framework.exceptions import AuthenticationFailed, APIException
from django.contrib.auth.hashers import check_password, make_password

from api.models import Usuario

class Autenticacao:
    def signin(self, email, senha):
        exception_auth = AuthenticationFailed('E-mail e/ou senha incorreto(s)!')
        usuario_existe = Usuario.objects.filter(email=email).exists()

        if not usuario_existe:
            raise exception_auth
        
        usuario = Usuario.objects.filter(email=email).first()

        if not check_password(senha, usuario.senha):
            raise exception_auth
        
        return usuario
    
    def signup(self, nome, email, senha):
        if not nome or nome == '':
            raise APIException('O nome não deve ser vazio!')
        
        if not email or email == '':
            raise APIException('O email não deve ser vazio!')
        
        if not senha or senha == '':
            raise APIException('A senha não deve ser vazio!')

        email_existe = Usuario.objects.filter(email=email).exists()

        if email_existe:
            raise APIException('Email informado já está em uso!')

        senha_hased = make_password(senha)

        novo_usuario = Usuario.objects.create(nome=nome, senha=senha, email=email)

        return novo_usuario
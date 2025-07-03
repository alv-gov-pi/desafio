from rest_framework.exceptions import AuthenticationFailed, APIException
from django.contrib.auth.hashers import check_password, make_password

from api.models import Usuario

class Autenticacao:
    def signin(self, email, password):
        exception_auth = AuthenticationFailed('E-mail e/ou password incorreto(s)!')
        usuario_existe = Usuario.objects.filter(email=email).exists()

        if not usuario_existe:
            raise AuthenticationFailed('Usuário não encontrado')
        
        usuario = Usuario.objects.filter(email=email).first()

        if not check_password(password, usuario.password):
            raise exception_auth
        
        return usuario
    
    def signup(self, nome, email, password, genero):
        
        if not nome or nome == '':
            raise APIException('O nome não deve ser vazio!')
        
        if not email or email == '':
            raise APIException('O email não deve ser vazio!')
        
        if not password or password == '':
            raise APIException('A password não deve ser vazio!')
        print(f"Nome: {nome} email:{email} senha:{password} genero: {genero}")
        email_existe = False#Usuario.objects.filter(email=email).exists()
        
        if email_existe:
            raise APIException('Email informado já está em uso!')
        
        password_hased = make_password(password)
        
        novo_usuario = Usuario.objects.create(nome=nome, password=password_hased, email=email, genero=genero)

        return novo_usuario
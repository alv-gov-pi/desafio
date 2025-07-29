from api.auth import Autenticacao
from api.serializers import UsuarioSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import APIException
from rest_framework.permissions import AllowAny
class Signup(APIView):
    permission_classes=[AllowAny]
    def post(self, request):
        nome = request.data.get('nome')
        email = request.data.get('email')
        password = request.data.get('password')
        genero = request.data.get('genero')
        usuario = Autenticacao.signup(self, nome=nome, email=email, password=password, genero=genero)
        serializer = UsuarioSerializer(usuario)

        return Response({"usuario": serializer.data})
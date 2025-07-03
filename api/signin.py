from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.exceptions import APIException
from api.serializers import UsuarioSerializer
from api.auth import Autenticacao

class Signin(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        usuario = Autenticacao.signin(self, email=email, password=password)

        token = RefreshToken.for_user(usuario)

        serializer = UsuarioSerializer(usuario)

        return Response({
            "usuario": serializer.data,
            "refresh": str(token),
            "access": str(token.access_token)
        })
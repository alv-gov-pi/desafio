from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.exceptions import APIException
from api.serializers import UsuarioSerializer
from api.auth import Autenticacao
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.settings import api_settings
from datetime import datetime, timedelta

class Signin(APIView):
    permission_classes=[AllowAny]
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')


        usuario = Autenticacao.signin(self, email=email, password=password)

        token = RefreshToken.for_user(usuario)

        serializer = UsuarioSerializer(usuario)

        return Response({
            "usuario": serializer.data,
            "refresh": str(token),
            "access": str(token.access_token),
            "accessTokenExpires": datetime.now() + timedelta(minutes=5)
        })
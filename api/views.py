from rest_framework import generics

from api.serializers import SetorSerializer, ServicoSerializer, UsuarioSerializer, AtendimentoSerializer, AvaliacaoAtendimentoSerializer
from api.models import Setor, Servico, Usuario, Atendimento, AvaliacaoAtendimento


class ListaSetor(generics.ListCreateAPIView):
    queryset = Setor.objects.all()
    serializer_class = SetorSerializer

class DetalhaSetor(generics.RetrieveUpdateDestroyAPIView):
    queryset = Setor.objects.all()
    serializer_class = SetorSerializer

class ListaServico(generics.ListCreateAPIView):
    queryset = Servico.objects.all()
    serializer_class = ServicoSerializer

class DetalhaServico(generics.RetrieveUpdateDestroyAPIView):
    queryset = Servico.objects.all()
    serializer_class = ServicoSerializer

class ListaUsuario(generics.ListCreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class DetalhaUsuario(generics.RetrieveUpdateDestroyAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class ListaAtendimento(generics.ListCreateAPIView):
    queryset = Atendimento.objects.all()
    serializer_class = AtendimentoSerializer

class DetalhaAtendimento(generics.RetrieveUpdateDestroyAPIView):
    queryset = Atendimento.objects.all()
    serializer_class = AtendimentoSerializer

class ListaAvaliacaoAtendimento(generics.ListCreateAPIView):
    queryset = AvaliacaoAtendimento.objects.all()
    serializer_class = AvaliacaoAtendimentoSerializer

class DetalhaAvaliacaoAtendimento(generics.RetrieveUpdateDestroyAPIView):
    queryset = AvaliacaoAtendimento.objects.all()
    serializer_class = AvaliacaoAtendimentoSerializer
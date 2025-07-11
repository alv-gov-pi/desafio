from rest_framework import generics
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from api.serializers import SetorSerializer, ServicoSerializer, UsuarioSerializer, AtendimentoSerializer, AvaliacaoAtendimentoSerializer, PainelAvaliacaoServicoSerializer
from api.models import Setor, Servico, Usuario, Atendimento, AvaliacaoAtendimento, PainelAvaliacaoServico


class ListaSetor(generics.ListCreateAPIView):
    queryset = Setor.objects.all()
    serializer_class = SetorSerializer

class DetalhaSetor(generics.RetrieveUpdateDestroyAPIView):
    queryset = Setor.objects.all()
    serializer_class = SetorSerializer

class ListaServico(generics.ListCreateAPIView):
    queryset = Servico.objects.all()
    serializer_class = ServicoSerializer
# Nova classe para listar e filtrar serviços
class ListaServicosFiltrados(generics.ListAPIView):
    queryset = Servico.objects.all()
    serializer_class = ServicoSerializer
    # Definindo os backends de filtro que você quer usar
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    # Campos pelos quais você quer permitir a filtragem exata (ex: ?setor_ofertante=1)
    filterset_fields = ['nome', 'setor_ofertante'] # Adicione outros campos que você queira filtrar
    # Campos pelos quais você quer permitir a busca textual (ex: ?search=manutencao)
    search_fields = ['nome', 'descricao'] # Adicione um campo 'descricao' ou outro campo textual ao seu modelo Servico se quiser usar search
    # Campos pelos quais você quer permitir a ordenação (ex: ?ordering=-nome)
    ordering_fields = ['nome', 'id']

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

class ListaPainelAvaliacaoServico(generics.ListCreateAPIView):
    queryset = PainelAvaliacaoServico.objects.all()
    serializer_class = PainelAvaliacaoServicoSerializer

class DetalhaPainelAvaliacaoServico(generics.RetrieveUpdateDestroyAPIView):
    queryset = PainelAvaliacaoServico.objects.all()
    serializer_class = PainelAvaliacaoServicoSerializer
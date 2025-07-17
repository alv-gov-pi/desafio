from rest_framework import generics
from rest_framework import filters
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend
from api.serializers import SetorSerializer, ServicoSerializer, UsuarioSerializer, AtendimentoSerializer, AvaliacaoAtendimentoSerializer, PainelAvaliacaoServicoSerializer
from api.models import Setor, Servico, Usuario, Atendimento, AvaliacaoAtendimento, PainelAvaliacaoServico
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import ValidationError

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

class ObterUsuarioPorEmail(generics.RetrieveAPIView):
    serializer_class = UsuarioSerializer
    lookup_field = 'email'

    def get_queryset(self):
        return Usuario.objects.all()
        
class DetalhaUsuario(generics.RetrieveUpdateDestroyAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class ListaAtendimentosPorSolicitante(generics.ListAPIView):
    serializer_class = AtendimentoSerializer
    lookup_field = 'solicitante'

    def get_queryset(self):
        solicitante_id = self.kwargs.get(self.lookup_field)
        return Atendimento.objects.filter(solicitante=solicitante_id)

class ListaAtendimentosPorSetor(generics.ListAPIView):
    serializer_class = AtendimentoSerializer

    def get_queryset(self):
        ids_param = self.request.query_params.get('ids')
        if not ids_param:
            # Se não passou o parâmetro, retorna queryset vazia (ou você pode mudar)
            return Atendimento.objects.none()
        try:
            # transforma string '1,2,3' em lista de ints [1, 2, 3]
            ids = [int(i) for i in ids_param.split(',')]
        except ValueError:
            raise ValidationError({'ids': 'Os IDs devem ser uma lista de números separados por vírgula.'})
        return Atendimento.objects.filter(servico__in=ids)

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
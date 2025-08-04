from rest_framework import generics
from rest_framework import filters
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from api.serializers import (
    SetorSerializer, 
    ServicoSerializer, 
    UsuarioSerializer, 
    AtendimentoSerializer, 
    AvaliacaoAtendimentoSerializer, 
    PainelAvaliacaoServicoSerializer, 
    InteracaoAtendimentoSerializer, 
    VwEstatatisticasSetorGeneroSerializer
    )
from api.models import (
    Setor, 
    Servico, 
    Usuario, 
    Atendimento, 
    AvaliacaoAtendimento, 
    PainelAvaliacaoServico, 
    InteracaoAtencimento, 
    VwEstatatisticasSetorGenero
)
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.views import APIView
from django.db.models import Count, Q, F, Value, Avg
from django.db.models.functions import TruncDate
from collections import defaultdict # Para facilitar a agregação em Python

class ListaSetor(generics.ListCreateAPIView):
    permission_classes=[AllowAny]
    queryset = Setor.objects.all()
    serializer_class = SetorSerializer

class DetalhaSetor(generics.RetrieveUpdateDestroyAPIView):
    queryset = Setor.objects.all()
    serializer_class = SetorSerializer

class ListaServico(generics.ListCreateAPIView):
    queryset = Servico.objects.all()
    serializer_class = ServicoSerializer

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
    
class ObterUsuarioPorSetor(generics.ListAPIView):
    serializer_class = UsuarioSerializer
    lookup_field = 'setor'

    def get_queryset(self):
        setor = self.kwargs.get(self.lookup_field)
        return Usuario.objects.filter(setor=setor)
        
class DetalhaUsuario(generics.RetrieveUpdateDestroyAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class ListaAtendimentosPorSolicitante(generics.ListAPIView):
    serializer_class = AtendimentoSerializer
    lookup_field = 'solicitante'

    def get_queryset(self):
        solicitante_id = self.kwargs.get(self.lookup_field)
        return Atendimento.objects.filter(solicitante=solicitante_id)
    
class ListaInteracaoPorAtendimento(generics.ListAPIView):
    serializer_class = InteracaoAtendimentoSerializer
    lookup_field = 'atendimento'

    def get_queryset(self):
        atendimento = self.kwargs.get(self.lookup_field)
        return InteracaoAtencimento.objects.filter(atendimento=atendimento)

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
    
class ObterAvaliacaoAtenfimento(generics.RetrieveAPIView):
    serializer_class = UsuarioSerializer
    lookup_field = 'setor'

    def get_queryset(self):
        return AvaliacaoAtendimento.objects.all()
    
class ListaAtendimento(generics.ListCreateAPIView):
    queryset = Atendimento.objects.all()
    serializer_class = AtendimentoSerializer

class DetalhaAtendimento(generics.RetrieveUpdateDestroyAPIView):
    queryset = Atendimento.objects.all()
    serializer_class = AtendimentoSerializer

class ListaInteracaoAtendimento(generics.ListCreateAPIView):
    queryset = InteracaoAtencimento.objects.all()
    serializer_class = InteracaoAtendimentoSerializer

class DetalhaInteracaoAtendimento(generics.RetrieveUpdateDestroyAPIView):
    queryset = InteracaoAtencimento.objects.all()
    serializer_class = InteracaoAtendimentoSerializer

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

class EstatisticasTotaisAtendimentos(APIView):
    """
    Retorna estatísticas de atendimentos.
    """
    def get(self, request, *args, **kwargs):
        # 1. Obter os totais globais
        totais = Atendimento.objects.aggregate(
            atendidos=Count('id', filter=Q(atendido=True)),
            nao_atendidos=Count('id', filter=Q(atendido=False))
        )

        return Response({"atendidos": totais['atendidos'], "nao_atendidos": totais['nao_atendidos']})

class EstatisticasAtendimentoPorData(APIView):
    """
    Retorna estatísticas de atendimentos por data de fechamento e abertura
    """
    # defaultdict é ótimo para acumular contagens sem verificar se a chave existe
    # A chave será a data (objeto date), o valor será um dicionário com 'atendidos' e 'nao_atendidos'
    def get(self, request, *args, **kwargs):
        # Buscar apenas os campos necessários de todos os atendimentos
        todos_atendimentos = Atendimento.objects.only('cadastrado_em', 'resolvido_em', 'atendido')
        uniao_datas_contagens = defaultdict(lambda: {'atendidos': 0, 'nao_atendidos': 0})
        for atendimento in todos_atendimentos:
            # Contagem para a data de cadastro
            data_cadastro_dt = atendimento.cadastrado_em.date() # Converte datetime para date
            if atendimento.atendido:
                uniao_datas_contagens[data_cadastro_dt]['atendidos'] += 1
            else:
                uniao_datas_contagens[data_cadastro_dt]['nao_atendidos'] += 1
                
            # Contagem para a data de resolução (se o atendimento foi resolvido)
            if atendimento.resolvido_em:
                data_resolucao_dt = atendimento.resolvido_em.date() # Converte datetime para date
                # Contamos o status de atendido/não atendido para a data de resolução
                if atendimento.atendido:
                    uniao_datas_contagens[data_resolucao_dt]['atendidos'] += 1
                else:
                    uniao_datas_contagens[data_resolucao_dt]['nao_atendidos'] += 1

        # Converter o defaultdict para uma lista de dicionários e ordenar por data
        agrupamento_uniao_datas = []
        for data_dt in sorted(uniao_datas_contagens.keys()):
            agrupamento_uniao_datas.append({
                'data': data_dt.isoformat(), # Formata a data para string ISO 8601 (ex: "2025-07-24")
                'atendidos': uniao_datas_contagens[data_dt]['atendidos'],
                'nao_atendidos': uniao_datas_contagens[data_dt]['nao_atendidos']
            })   
        return Response(agrupamento_uniao_datas)
    
class RelatorioMediaAvaliacaoPorServicoSolicitado(APIView):
    """
    Retorna um relatório JSON com:
    - Média da nota agrupada por servico_solicitado.
    """
    def get(self, request, *args, **kwargs):
    
        media_por_servico = AvaliacaoAtendimento.objects.values(
            servico_nome=F('servico_solicitado__nome')
        ).annotate(
            media_nota=Avg('nota')
        ).order_by('servico_nome')

        # Tratar casos onde o servico_solicitado é nulo
        media_por_servico_formatada = []
        for item in media_por_servico:
            if item['servico_nome'] is None:
                item['servico_nome'] = 'Não Informado'
            # Arredondar a média para 2 casas decimais
            item['media_nota'] = round(item['media_nota'], 2) if item['media_nota'] is not None else None
            media_por_servico_formatada.append(item)

        return Response(list(media_por_servico_formatada))

class RelatorioAvaliacaoMediaPorSetorSolicitante(APIView):
    """
    Retorna um relatório JSON com:
    - Média da nota agrupada por setor_solicitante.
    """
    def get(self, request, *args, **kwargs):
        # 1. Média da nota agrupada por setor_solicitante
        media_por_setor = AvaliacaoAtendimento.objects.values(
            setor_nome=F('setor_solicitante__nome')
        ).annotate(
            media_nota=Avg('nota')
        ).order_by('setor_nome')

        # Tratar casos onde o setor_solicitante é nulo
        media_por_setor_formatada = []
        for item in media_por_setor:
            if item['setor_nome'] is None:
                item['setor_nome'] = 'Não Informado'
            # Arredondar a média para 2 casas decimais para melhor legibilidade
            item['media_nota'] = round(item['media_nota'], 2) if item['media_nota'] is not None else None
            media_por_setor_formatada.append(item)
        return Response(list(media_por_setor_formatada))

class AtendimentosPorResponsavelView(APIView):
    """
    Retorna a quantidade de atendimentos agrupados por responsável.
    Inclui um tratamento para atendimentos sem responsável atribuído.
    """
    def get(self, request, *args, **kwargs):
        # Agrupa os atendimentos pelo nome do responsável e conta a quantidade de atendimentos para cada um.
        # Usamos F('responsavel__nome') para acessar o nome do usuário responsável.
        atendimentos_por_responsavel = Atendimento.objects.annotate(
            nome_responsavel=F('responsavel__nome') # Renomeia o campo para 'nome_responsavel'
        ).values('nome_responsavel').annotate(
            quantidade_atendimentos=Count('id') # Conta o número de atendimentos
        ).order_by('nome_responsavel') # Ordena pelo nome do responsável

        # Formata o resultado para substituir 'None' por 'Não atribuído'
        # e garante que seja uma lista para a resposta JSON.
        resultados_formatados = []
        for item in atendimentos_por_responsavel:
            if item['nome_responsavel'] is None:
                item['nome_responsavel'] = 'Não atribuído'
            resultados_formatados.append(item)
        
        return Response(resultados_formatados)

class VwEstatatisticasSetorGeneroView(APIView):
     def get(self, request):
        estatisticas = VwEstatatisticasSetorGenero.objects.all()
        serializer = VwEstatatisticasSetorGeneroSerializer(estatisticas, many=True)
        return Response(serializer.data)
        
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.permissions import AllowAny
##Token 
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from api import views
from api.signup import Signup
from api.signin import Signin

urlpatterns = [
    path('setor/', views.ListaSetor.as_view(permission_classes=[AllowAny])),
    path('setor/<int:pk>/', views.DetalhaSetor.as_view()),
    path('setor/estatistica/genero/', views.VwEstatatisticasSetorGeneroView.as_view()),
    path('servico/', views.ListaServico.as_view()),
    path('servico/<int:pk>/', views.DetalhaServico.as_view()),
    path('servicos-filtrados/', views.ListaServicosFiltrados.as_view(), name='lista-servicos-filtrados'),
    path('usuario/', views.ListaUsuario.as_view()),
    path('usuario/<int:pk>/', views.DetalhaUsuario.as_view()),
    path('usuario/por-email/<str:email>/', views.ObterUsuarioPorEmail.as_view(), name='obter-usuario-por-email'),
    path('usuario/por-setor/<int:setor>/', views.ObterUsuarioPorSetor.as_view(), name='obter-usuarios-por-setor'),
    path('atendimento/', views.ListaAtendimento.as_view()),
    path('atendimento/<int:pk>/', views.DetalhaAtendimento.as_view()),
    path('atendimento/estatisticas/totais/', views.EstatisticasTotaisAtendimentos.as_view()),
    path('atendimento/estatisticas/por-data/', views.EstatisticasAtendimentoPorData.as_view()),
    path('atendimento/estatisticas/avaliacao/por-servico-solicitado/', views.RelatorioMediaAvaliacaoPorServicoSolicitado.as_view()),
    path('atendimento/<int:atendimento>/interacoes/', views.ListaInteracaoPorAtendimento.as_view()),
    path('atendimento/por-responsavel/', views.AtendimentosPorResponsavelView.as_view()),
    path('atendimento/relatorio/avaliacao/por-sertor-solicitante/', views.RelatorioAvaliacaoMediaPorSetorSolicitante.as_view()),
    path('atendimento/<int:atendimento>/interacao/adicionar/', views.ListaInteracaoAtendimento.as_view()),
    path('atendimento/<int:atendimento>/avaliacao/', views.ListaAvaliacaoAtendimento.as_view()),
    path('atendimento/por-setor/', views.ListaAtendimentosPorSetor.as_view(), name='obter-atendimentos-por-setor'),
    path('solicitacoes/por-solicitante/<int:solicitante>', views.ListaAtendimentosPorSolicitante.as_view(), name='obter-atendimentos-por-solicitante'),
    path('avaliacao-atendimentos/', views.ListaAvaliacaoAtendimento.as_view()),
    path('avaliacao-atendimento/<int:pk>/', views.DetalhaAtendimento.as_view()),
    path('painel-avaliacao-servicos/', views.ListaPainelAvaliacaoServico.as_view()),
    path('painel-avaliacao-servico/<int:pk>/', views.DetalhaPainelAvaliacaoServico.as_view()),
    path('api/token/', TokenObtainPairView.as_view(permission_classes=[AllowAny]), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(permission_classes=[AllowAny]), name='token_refresh'),
    path('signin', Signin.as_view(permission_classes=[AllowAny])),
    path('signup', Signup.as_view(permission_classes=[AllowAny])),
]

urlpatterns = format_suffix_patterns(urlpatterns)


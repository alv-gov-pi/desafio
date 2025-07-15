from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
##Token 
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from api import views
from api.signup import Signup
from api.signin import Signin

urlpatterns = [
    path('setores/', views.ListaSetor.as_view()),
    path('setor/<int:pk>/', views.DetalhaSetor.as_view()),
    path('servicos/', views.ListaServico.as_view()),
    path('servico/<int:pk>/', views.DetalhaServico.as_view()),
    path('servicos-filtrados/', views.ListaServicosFiltrados.as_view(), name='lista-servicos-filtrados'),
    path('usuarios/', views.ListaUsuario.as_view()),
    path('usuario/<int:pk>/', views.DetalhaUsuario.as_view()),
    path('usuario/por-email/<str:email>/', views.ObterUsuarioPorEmail.as_view(), name='obter-usuario-por-email'),
    path('atendimentos/', views.ListaAtendimento.as_view()),
    path('atendimento/<int:pk>/', views.DetalhaAtendimento.as_view()),
    path('avaliacao-atendimentos/', views.ListaAvaliacaoAtendimento.as_view()),
    path('avaliacao-atendimento/<int:pk>/', views.DetalhaAtendimento.as_view()),
    path('painel-avaliacao-servicos/', views.ListaPainelAvaliacaoServico.as_view()),
    path('painel-avaliacao-servico/<int:pk>/', views.DetalhaPainelAvaliacaoServico.as_view()),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('signin', Signin.as_view()),
    path('signup', Signup.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)


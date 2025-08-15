# filters.py (crie esse arquivo no seu app)
import django_filters
from .models import Usuario

from django_filters import rest_framework as filters

class GeneroFilter(filters.MultipleChoiceFilter):
    def filter(self, qs, value):
        if not value:
            # Se nenhum valor for passado, retorna todos os objetos (sem filtrar por gênero)
            return qs
        # Filtra normalmente se valores válidos forem passados
        return super().filter(qs, value)

class StatusFilter(filters.BooleanFilter):
    def filter(self, qs, value):
        if not value:
            # Se nenhum valor for passado, retorna todos os objetos (sem filtrar por status)
            return qs
        # Filtra normalmente se valores válidos forem passados
        return super().filter(qs, value)

class UsuarioFilter(django_filters.FilterSet):
    # Filtro por nome (busca parcial, insensível a maiúsculas)
    nome = django_filters.CharFilter(field_name='nome', lookup_expr='icontains')

    # Filtro por gênero (exatidão)
    genero = GeneroFilter(choices=Usuario.genero.field.choices)

    #Filtro por status 
    status = StatusFilter(field_name='esta_ativo')
    
    # Filtro por setor (pelo ID do setor)
    setor = django_filters.NumberFilter(field_name='setor__id')

    # Filtro por data de cadastro (intervalo)
    cadastrado_em__gte = django_filters.DateTimeFilter(field_name='cadastrado_em', lookup_expr='gte')
    cadastrado_em__lte = django_filters.DateTimeFilter(field_name='cadastrado_em', lookup_expr='lte')

    class Meta:
        model = Usuario
        fields = ['nome', 'genero', 'esta_ativo','setor', 'cadastrado_em__gte', 'cadastrado_em__lte']
# filters.py (crie esse arquivo no seu app)
import django_filters
from .models import Usuario

class UsuarioFilter(django_filters.FilterSet):
    # Filtro por nome (busca parcial, insensível a maiúsculas)
    nome = django_filters.CharFilter(field_name='nome', lookup_expr='icontains')

    # Filtro por gênero (exatidão)
    genero = django_filters.MultipleChoiceFilter(choices=Usuario.genero.field.choices)
    
    # Filtro por setor (pelo ID do setor)
    setor = django_filters.NumberFilter(field_name='setor__id')

    # Filtro por data de cadastro (intervalo)
    cadastrado_em__gte = django_filters.DateTimeFilter(field_name='cadastrado_em', lookup_expr='gte')
    cadastrado_em__lte = django_filters.DateTimeFilter(field_name='cadastrado_em', lookup_expr='lte')

    class Meta:
        model = Usuario
        fields = ['nome', 'genero', 'setor', 'cadastrado_em__gte', 'cadastrado_em__lte']
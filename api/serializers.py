from django.contrib.auth.models import User
from rest_framework import serializers
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

class ServicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servico
        fields = ['id','nome', 'setor_ofertante', 'descricao', 'imagem_url']
    
    def create(self, validated_data):
        """
        Cria e retorna um novo Servico a partir de dados válidos.
        """
        return Servico.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        """
        Atualiza e retorna um Servico a partir de dados válidos.
        """
        instance.id = validated_data.get('id', instance.id)
        instance.nome = validated_data.get('nome', instance.nome)
        instance.setor_ofertante = validated_data.get('setor_ofertante', instance.setor_ofertante)
        instance.descricao = validated_data.get('descricao', instance.descricao)
        instance.imagem_url = validated_data.get('descricao', instance.imagem_url)
        instance.save()
        return instance
    
class SetorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Setor
        servicos = ServicoSerializer(many=True, read_only=False)
        fields = ['id','nome', 'sigla', 'setor_superior', 'servicos']
    
    def create(self, validated_data):
        """
        Cria e retorna um novo Setor a partir de dados válidos.
        """
        return Setor.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        """
        Atualiza e retorna um Setor a partir de dados válidos.
        """
        instance.id = validated_data.get('id', instance.id)
        instance.nome = validated_data.get('nome', instance.nome)
        instance.sigla = validated_data.get('sigla', instance.sigla)
        instance.id = validated_data.get('setor_superior', instance.setor_superior)
        instance.save()
        return instance

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        setor = serializers.PrimaryKeyRelatedField(queryset=Setor.objects.all())
        setor_detalhado = SetorSerializer(source='setor', read_only=True)
        fields = ['id',
                  'nome', 
                  'email', 
                  'password', 
                  'genero', 
                  'esta_ativo', 
                  'setor'
                ]
    
    def create(self, validated_data):
        """
        Cria e retorna um novo Usuario a partir de dados válidos.
        """
        return Usuario.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        """
        Atualiza e retorna um Usuario a partir de dados válidos.
        """
        instance.id = validated_data.get('id', instance.id)
        instance.nome = validated_data.get('nome', instance.nome)
        instance.email = validated_data.get('email', instance.email)
        instance.password = validated_data.get('password', instance.password)
        instance.genero = validated_data.get('genero', instance.genero)
        instance.esta_ativo = validated_data.get('esta_ativo', instance.esta_ativo)
        instance.setor = validated_data.get('setor', instance.setor)
        instance.save()
        return instance
    
class AtendimentoSerializer(serializers.ModelSerializer):
    servico = serializers.PrimaryKeyRelatedField(queryset=Servico.objects.all())
    solicitante = serializers.PrimaryKeyRelatedField(queryset=Usuario.objects.all())
    responsavel = serializers.PrimaryKeyRelatedField(queryset=Usuario.objects.all(), allow_null=True, required=False)
    
    servico_detalhado = ServicoSerializer(source='servico', read_only=True)
    solicitante_detalhado = UsuarioSerializer(source='solicitante', read_only=True)
    responsavel_detalhado = UsuarioSerializer(source='responsavel', read_only=True)
    
    class Meta:
        model = Atendimento
        fields = ['id',
                  'servico', 'servico_detalhado',
                  'solicitante', 'solicitante_detalhado',
                  'cadastrado_em', 
                  'atendido', 
                  'responsavel', 'responsavel_detalhado',
                  'observacao', 
                  'solucao', 
                  'resolvido_em'
                ]
    
    def create(self, validated_data):
        """
        Cria e retorna um novo Atendimento a partir de dados válidos.
        """
        return Atendimento.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        """
        Atualiza e retorna um Atendimento a partir de dados válidos.
        """
        instance.servico = validated_data.get('servico', instance.servico)
        instance.solicitante = validated_data.get('solicitante', instance.solicitante)
        instance.cadastrado_em = validated_data.get('cadastrado_em', instance.cadastrado_em)
        instance.atendido = validated_data.get('atendido', instance.atendido)
        instance.responsavel = validated_data.get('responsavel', instance.responsavel)
        instance.observacao = validated_data.get('observacao', instance.observacao)
        instance.solucao = validated_data.get('solucao', instance.solucao)
        instance.resolvido_em = validated_data.get('resolvido_em', instance.resolvido_em)
        instance.save()
        return instance

class InteracaoAtendimentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = InteracaoAtencimento
        fields = ['id', 'texto', 'atendimento', 'tipoUsuario', 'cadastrado_em']
    def create(self, validated_data):
        """
        Cria e retorna um novo InteracaoAtencimento a partir de dados válidos.
        """
        return InteracaoAtencimento.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        """
        Atualiza e retorna um InteracaoAtencimento a partir de dados válidos.
        """
        instance.id = validated_data.get('id', instance.id)
        instance.texto = validated_data.get('texto', instance.texto)
        instance.tipoUsuario = validated_data.get('tipoUsuario', instance.tipoUsuario)
        instance.atendimentoId = validated_data.get('atendimento', instance.atendimentoId)
        instance.save()
        return instance
    
class AvaliacaoAtendimentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = AvaliacaoAtendimento
        setor_solicitante = serializers.PrimaryKeyRelatedField(queryset=Setor.objects.all())
        servico_solicitado = serializers.PrimaryKeyRelatedField(queryset=Servico.objects.all())
        fields = ['id','nota', 'genero', 'cadastrado_em', 'servico_solicitado', 'setor_solicitante']

    def create(self, validated_data):
        """
        Cria e retorna um novo AvaliacaoAtendimento a partir de dados válidos.
        """
        return AvaliacaoAtendimento.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        """
        Atualiza e retorna um AvaliacaoAtendimento a partir de dados válidos.
        """
        instance.id = validated_data.get('id', instance.id)
        instance.nota = validated_data.get('nota', instance.nota)
        instance.genero = validated_data.genero('genero', instance.genero)
        instance.cadastrado_em = validated_data.get('cadastrado_em', instance.cadastrado_em)
        instance.servico_solicitado = validated_data.get('servico_solicitado', instance.servico_solicitado)
        instance.setor_solicitante = validated_data.get('setor_solicitante', instance.setor_solicitante)
        instance.save()
        return instance

class PainelAvaliacaoServicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PainelAvaliacaoServico
        fields = ['nome','nota', 'genero']
    
    def create(self, validated_data):
        """
        Cria e retorna um novo PainelAvaliacaoServico a partir de dados válidos.
        """
        return PainelAvaliacaoServico.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        """
        Atualiza e retorna um PainelAvaliacaoServico a partir de dados válidos.
        """
        instance.id = validated_data.get('id', instance.id)
        instance.servico_avaliado = validated_data.get('servico_avaliado', instance.servico_avaliado)
        instance.esta_visivel = validated_data.genero('esta_visivel', instance.esta_visivel)
        instance.save()
        return instance
    
class VwEstatatisticasSetorGeneroSerializer(serializers.ModelSerializer):
    class Meta:
        model = VwEstatatisticasSetorGenero
        fields = ['setor_id','setor_nome', 'genero', 'quantidade']
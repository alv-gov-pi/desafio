from django.contrib.auth.models import User
from rest_framework import serializers
from api.models import Setor, Servico, Usuario, Atendimento, AvaliacaoAtendimento
class SetorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Setor
        fields = ['id','nome', 'sigla', 'setor_superior']
    
    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return Setor.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        """
        Atualiza.
        """
        instance.id = validated_data.get('id', instance.id)
        instance.nome = validated_data.get('nome', instance.nome)
        instance.sigla = validated_data.get('sigla', instance.sigla)
        instance.id = validated_data.get('setor_superior', instance.setor_superior)
        instance.save()
        return instance


class ServicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servico
        fields = ['id','nome', 'setor_ofertante']
    
    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return Servico.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        """
        Atualiza.
        """
        instance.id = validated_data.get('id', instance.id)
        instance.nome = validated_data.get('nome', instance.nome)
        instance.setor_ofertante = validated_data.get('setor_ofertante', instance.setor_ofertante)
        instance.save()
        return instance
    
class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id','nome', 'email', 'password', 'genero', 'esta_ativo', 'setor']
    
    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return Usuario.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        """
        Atualiza.
        """
        instance.id = validated_data.get('id', instance.id)
        instance.nome = validated_data.get('nome', instance.nome)
        instance.email = validated_data.get('email', instance.email)
        instance.password = validated_data.get('password', instance.password)
        instance.esta_ativo = validated_data.get('esta_ativo', instance.esta_ativo)
        instance.setor = validated_data.get('setor', instance.setor)
        instance.save()
        return instance
    
class AtendimentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id','servico', 'solicitante', 'cadastrado_em', 'atendido']
    
    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return Usuario.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        """
        Atualiza.
        """
        instance.id = validated_data.get('id', instance.id)
        instance.servico = validated_data.get('servico', instance.servico)
        instance.solicitante = validated_data.solicitante('email', instance.solicitante)
        instance.cadastrado_em = validated_data.get('cadastrado_em', instance.cadastrado_em)
        instance.atendido = validated_data.get('atendido', instance.atendido)
        instance.save()
        return instance

class AtendimentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Atendimento
        fields = ['id','servico', 'solicitante', 'cadastrado_em', 'atendido']
    
    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return Atendimento.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        """
        Atualiza.
        """
        instance.id = validated_data.get('id', instance.id)
        instance.servico = validated_data.get('servico', instance.servico)
        instance.solicitante = validated_data.solicitante('email', instance.solicitante)
        instance.cadastrado_em = validated_data.get('cadastrado_em', instance.cadastrado_em)
        instance.atendido = validated_data.get('atendido', instance.atendido)
        instance.save()
        return instance

class AvaliacaoAtendimentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = AvaliacaoAtendimento
        fields = ['id','nota', 'genero', 'cadastrado_em', 'servico_solicitado', 'setor_solicitante']
    
    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return AvaliacaoAtendimento.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        """
        Atualiza.
        """
        instance.id = validated_data.get('id', instance.id)
        instance.nota = validated_data.get('nota', instance.nota)
        instance.genero = validated_data.genero('genero', instance.genero)
        instance.cadastrado_em = validated_data.get('cadastrado_em', instance.cadastrado_em)
        instance.servico_solicitado = validated_data.get('servico_solicitado', instance.servico_solicitado)
        instance.setor_solicitante = validated_data.get('setor_solicitante', instance.setor_solicitante)
        instance.save()
        return instance
from pickle import TRUE
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, Permission
from django.core.validators import MinValueValidator, MaxValueValidator

class Setor(models.Model):
    nome = models.CharField(max_length=100, blank=False)
    sigla = models.CharField(max_length=6, blank=False)
    setor_superior = models.ForeignKey('self',
        null=True,
        blank=True,
        related_name='subsetor', on_delete=models.SET_NULL
    )
    def __str__(self):
        return f"{self.nome}({self.sigla})"
   
class Servico(models.Model):
    nome = models.CharField(max_length=100, blank=False)
    descricao = models.CharField(max_length=200, blank=True)
    imagem_url = models.CharField(max_length=200, blank=True)
    setor_ofertante = models.ForeignKey(Setor,
        null=True,
        blank=True,
        related_name='servicos', on_delete=models.SET_NULL
    )
    def __str__(self):
        return f"{self.nome}" 

class Genero(models.TextChoices):
    MASCULINO = 'M', 'Masculino'
    FEMININO = 'F', 'Feminino'

class TipoUsuario(models.TextChoices):
    SOLICITANTE = 'S', 'Solicitante'
    ATENDENTE = 'A', 'Atendente'

class Usuario(AbstractBaseUser):
    cadastrado_em = models.DateTimeField(auto_now_add=True)
    nome = models.CharField(max_length=100, blank=False)
    email = models.EmailField(max_length=100, blank=False, unique=True)
    password =  models.CharField(max_length=150, blank=True)
    genero = models.CharField(max_length=1, blank=False, choices=Genero.choices)
    esta_ativo = models.BooleanField(default=False)
    setor = models.ForeignKey(
        Setor,  
        null=True,
        blank=True,
        on_delete=models.SET_NULL
    )
    USERNAME_FIELD = 'email'

    class Meta:
        ordering = ['cadastrado_em']
    def __str__(self):
        return f"{self.nome}" 

class Atendimento(models.Model):
    observacao =  models.CharField(max_length=200, blank=True)
    solucao =  models.CharField(max_length=200, blank=True)
    servico = models.ForeignKey(
        Servico,  
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='servico'
    )
    solicitante = models.ForeignKey(
        Usuario,  
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='solicitante'
    )
    responsavel = models.ForeignKey(
        Usuario,  
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='responsavel'
    )
    cadastrado_em = models.DateTimeField(auto_now_add=True)
    resolvido_em = models.DateTimeField( null=True)
    atendido = models.BooleanField(default=False)
    def __str__(self):
        return f"{self.id}"
    
class AvaliacaoAtendimento(models.Model):
    nota = models.PositiveIntegerField(blank=False, validators=[MinValueValidator(1), MaxValueValidator(5)])
    genero = models.CharField(max_length=1, blank=False, choices=Genero.choices)
    cadastrado_em = models.DateTimeField(auto_now_add=True)
    servico_solicitado = models.ForeignKey(
        Servico,  
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='servico_solicitado'
    )
    setor_solicitante = models.ForeignKey (
        Setor,  
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='setor_solicitante'
    )
    
class InteracaoAtencimento(models.Model):
    texto = models.CharField(max_length=100, blank=False)
    tipoUsuario = models.CharField(max_length=1, blank=False, choices=TipoUsuario.choices)
    atendimento = models.ForeignKey (
        Atendimento,  
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='atendimento'
    )
    cadastrado_em = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.atendimento}"
class PainelAvaliacaoServico(models.Model):
    nome = models.CharField(max_length=100, blank=False)
    servico_avaliado = models.ForeignKey (
        Servico,  
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='servico_avaliado'
    )
    esta_visivel = models.BooleanField(default=False)

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
    setor_ofertante = models.ForeignKey(Setor,
        null=True,
        blank=True,
        related_name='setor_ofertante', on_delete=models.SET_NULL
    )
    def __str__(self):
        return f"{self.nome}" 

class Genero(models.TextChoices):
    MASCULINO = 'M', 'Masculino'
    FEMININO = 'F', 'Feminino'

class Usuario(AbstractBaseUser):
    cadastrado_em = models.DateTimeField(auto_now_add=True)
    nome = models.CharField(max_length=100, blank=False)
    email = models.EmailField(max_length=100, blank=False, unique=True)
    senha =  models.CharField(max_length=30, blank=False)
    genero = models.CharField(max_length=1, blank=False, choices=Genero.choices)
    esta_ativo = models.BooleanField(default=False)
    setor = models.ForeignKey(
        Setor,  
        null=True,
        blank=True,
        on_delete=models.SET_NULL
    )
    USERNAME_FIELD = 'email'
    PASSWORD_FIELD = 'senha'
    class Meta:
        ordering = ['cadastrado_em']
    def __str__(self):
        return f"{self.nome}" 

class Atendimento(models.Model):
    servico = models.ForeignKey(
        Servico,  
        null=True,
        blank=True,
        on_delete=models.SET_NULL
    )
    solicitante = models.ForeignKey(
        Usuario,  
        null=True,
        blank=True,
        on_delete=models.SET_NULL
    )
    cadastrado_em = models.DateTimeField(auto_now_add=True)
    atendido = models.BooleanField(default=False)
    
class AvaliacaoAtendimento(models.Model):
    nota = models.PositiveIntegerField(blank=False, validators=[MinValueValidator(1), MaxValueValidator(5)])
    models.CharField(max_length=1, blank=False, choices=Genero.choices)
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
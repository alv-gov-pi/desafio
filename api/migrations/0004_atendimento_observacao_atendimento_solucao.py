# Generated by Django 5.2.3 on 2025-07-16 11:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_servico_descricao_servico_imagem_url_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='atendimento',
            name='observacao',
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AddField(
            model_name='atendimento',
            name='solucao',
            field=models.CharField(blank=True, max_length=200),
        ),
    ]

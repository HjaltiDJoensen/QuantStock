# Generated by Django 3.2.6 on 2021-08-18 23:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stockInfo', '0006_auto_20210818_0520'),
    ]

    operations = [
        migrations.AlterField(
            model_name='company',
            name='info',
            field=models.JSONField(default=dict, null=True),
        ),
        migrations.AlterField(
            model_name='company',
            name='name',
            field=models.CharField(default='', max_length=100, unique=True),
        ),
    ]

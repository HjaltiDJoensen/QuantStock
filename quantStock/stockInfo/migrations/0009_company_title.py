# Generated by Django 3.2.6 on 2021-08-18 23:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stockInfo', '0008_remove_company_info'),
    ]

    operations = [
        migrations.AddField(
            model_name='company',
            name='title',
            field=models.CharField(blank=True, default='', max_length=100),
        ),
    ]
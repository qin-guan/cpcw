# Generated by Django 3.0.3 on 2020-03-05 00:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('calculator', '0006_calculator_expand_formula'),
    ]

    operations = [
        migrations.AddField(
            model_name='calculator',
            name='diff_formula',
            field=models.TextField(default='_'),
            preserve_default=False,
        ),
    ]

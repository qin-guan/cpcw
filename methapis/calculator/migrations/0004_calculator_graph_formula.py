# Generated by Django 3.0.3 on 2020-03-03 23:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('calculator', '0003_calculator_calculation_formula_var_mapping'),
    ]

    operations = [
        migrations.AddField(
            model_name='calculator',
            name='graph_formula',
            field=models.TextField(default='_'),
            preserve_default=False,
        ),
    ]
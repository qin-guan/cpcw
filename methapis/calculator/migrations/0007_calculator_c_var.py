# Generated by Django 3.0.3 on 2020-02-17 09:34

import calculator.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('calculator', '0006_calculator_alternative'),
    ]

    operations = [
        migrations.AddField(
            model_name='calculator',
            name='c_var',
            field=models.TextField(default='', validators=[calculator.models.validate_empty]),
            preserve_default=False,
        ),
    ]

# Generated by Django 3.0.3 on 2020-02-20 08:14

import calculator.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Calculator',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('formula', models.TextField(validators=[calculator.models.validate_empty])),
                ('difficulty', models.TextField(validators=[calculator.models.validate_difficulty])),
                ('topic', models.TextField(validators=[calculator.models.validate_empty])),
                ('title', models.TextField(validators=[calculator.models.validate_empty])),
                ('description', models.TextField(validators=[calculator.models.validate_empty])),
                ('legend', models.TextField()),
                ('alternative', models.TextField()),
                ('calculation_vars', models.TextField()),
                ('calculation_formula', models.TextField()),
                ('calculated_units', models.TextField(validators=[calculator.models.validate_empty])),
            ],
        ),
    ]

# Generated by Django 3.0.3 on 2020-02-17 09:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('calculator', '0007_calculator_c_var'),
    ]

    operations = [
        migrations.RenameField(
            model_name='calculator',
            old_name='c_var',
            new_name='calculation_var',
        ),
    ]

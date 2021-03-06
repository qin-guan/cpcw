from django.contrib import admin
from .models import Calculator

# Register your models here.


class CalculatorAdmin(admin.ModelAdmin):
    list_display = [
        'formula',
        'difficulty',
        'topic',
        'title',
        'description',
        'legend',
        'alternative',
        'calculation_vars',
        'calculation_formula',
        'calculated_units',
        'simplify_formula',
        'calculation_formula_var_mapping',
        'graph_formula',
        'resource_links',
        'expand_formula',
        'diff_formula'
    ]

admin.site.register(Calculator, CalculatorAdmin)
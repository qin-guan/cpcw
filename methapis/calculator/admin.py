from django.contrib import admin
from .models import Calculator

# Register your models here.


class CalculatorAdmin(admin.ModelAdmin):
    list_display = ['formula', 'difficulty', 'topic']

admin.site.register(Calculator, CalculatorAdmin)
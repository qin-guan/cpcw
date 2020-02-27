from rest_framework import serializers
from .models import Calculator

class CalculatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Calculator
        fields = ('id', 'formula', 'difficulty', 'topic', 'title', 'description', 'legend', 'alternative', 'calculation_vars', 'calculation_formula', 'calculated_units', 'simplify_formula')

    # def update(self, instance, validated_data):
    #     instance.calculation_vars = validated_data.get('calculation_vars', instance.calculation_vars).replace(" ", "")
    #     instance.calculation_formula = validated_data.get('calculation_formula', instance.calculation_formula).replace(" ", "")
    #     instance.save()
    #     return instance

    # def create(self, instance, validated_data):
    #     instance.calculation_vars = validated_data.get('calculation_vars', instance.calculation_vars).replace(" ", "")
    #     instance.calculation_formula = validated_data.get('calculation_formula', instance.calculation_formula).replace(" ", "")
    #     instance.save()
    #     return instance
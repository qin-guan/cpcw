from rest_framework import serializers
from .models import Calculator

class CalculatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Calculator
        fields = (
            'id',
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
            'graph_formula'
         )

    def validate(self, data):
        mapping = data['calculation_formula_var_mapping']
        graph_formula = data['graph_formula']
        if len(graph_formula) > 0 and graph_formula != "_":
            for i in graph_formula.split(","):
                if not len(i.split('=')) == 2:
                    raise serializers.ValidationError("Must be valid formula")
                for c in i:
                    if not c == "=":
                        if not c.isalpha():
                            raise serializers.ValidationError("Must be valid alpha char")
            
        if len(mapping) > 0 and mapping != "_":
            for i in mapping.split(","):
                if not len(i.split("=")) == 2:
                    raise serializers.ValidationError("Must be valid char mapping")
                for c in i:
                    if not c == "=":
                        if not all(x.isalpha() or x.isspace() for x in c):
                            raise serializers.ValidationError("Must be valid alpha char")
        return data

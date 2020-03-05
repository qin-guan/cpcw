from rest_framework import serializers
from .models import Calculator
import re

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
            'graph_formula',
            'resource_links',
            'expand_formula',
            'diff_formula'
         )

    def validate(self, data):
        regex = re.compile(
        r'^(?:http|ftp)s?://'
        r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|' #domain...
        r'localhost|'
        r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})'
        r'(?::\d+)?' 
        r'(?:/?|[/?]\S+)$', re.IGNORECASE)
        mapping = data['calculation_formula_var_mapping']
        graph_formula = data['graph_formula']
        resource_links = data["resource_links"]
        if len(resource_links) > 0 and resource_links != "_":
            for i in resource_links.split(","):
                if re.match(regex, i) == False: 
                    raise serializers.ValidationError("Must be valid link")
        if len(graph_formula) > 0 and graph_formula != "_":
            for i in graph_formula.split(","):
                if not len(i.split('=')) == 2:
                    raise serializers.ValidationError("Must be valid formula")
            
        if len(mapping) > 0 and mapping != "_":
            for i in mapping.split(","):
                if not len(i.split("=")) == 2:
                    raise serializers.ValidationError("Must be valid char mapping")
                for c in i:
                    if not c == "=":
                        if not all(x.isalnum() or x.isspace() for x in c):
                            raise serializers.ValidationError("Must be valid alpha char")
        return data

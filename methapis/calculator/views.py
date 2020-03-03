from rest_framework import viewsets
from .serializers import CalculatorSerializer
from .models import Calculator
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework.decorators import action
from django.forms.models import model_to_dict
import re
from sympy import *
from math import pi

def parseStringToNumber(s):
    return float(s.replace('\U00002013', '-'))

class CalculatorView(viewsets.ModelViewSet):
    serializer_class = CalculatorSerializer
    queryset = Calculator.objects.all()

    @action(methods=["GET"], detail=True, name="Simplify equation", url_path="se")
    def simplifyEquation(self, request, pk=None):
        res = {"error": False}
        vals = {}
        arr_calculation_vars = self.get_object().calculation_vars.split(",")
        dict_query_params = request.query_params
        simplify_formula = self.get_object().simplify_formula
        if "s" not in dict_query_params.keys():
            res = {"error": True}
        if res["error"] == True:
            return Response(res)
        # for key in dict_query_params.keys():
        #     vals[key] = parseStringToNumber(dict_query_params[key])
        symbols("a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z")
        res["ans"] = ccode(simplify(dict_query_params["s"]))
        
        return Response(res)
        
    @action(methods=['GET'], detail=True, name="Calculate value for formula", url_path="cv")
    def calculateValue(self, request, pk=None):
        res = {"error": False}
        vals = {"pi": pi}
        arr_calculation_vars = self.get_object().calculation_vars.split(",")
        mappings = self.get_object().calculation_formula_var_mapping.split(",")
        dict_query_params = request.query_params
        for variable in arr_calculation_vars:
            if variable not in dict_query_params.keys():
                res = {"error": True}
        if res["error"] == True:
            return Response(res)
        for key in dict_query_params.keys():
            hasMap = False
            for mapping in mappings:
                if mapping.split("=")[0] == key:
                    vals[mapping.split("=")[-1]] = parseStringToNumber(dict_query_params[key])
                    hasMap = True
            if hasMap == False:
                vals[key] = parseStringToNumber(dict_query_params[key])
        res["ans"] = eval(self.get_object().calculation_formula, {}, vals)
        return Response(res)

    @action(detail=False, methods=['GET'], name='Get topics for difficulties')
    def getTopics(self, request, *args, **kwargs):
        if ("difficulty" not in request.query_params.keys() or ("a" not in request.query_params['difficulty'] and "e" not in request.query_params['difficulty'])):
            return Response({"error": True})
        diff = request.query_params['difficulty']
        res = {}
        for i in Calculator.objects.filter(difficulty=diff).values("topic", "id", "title"):
            topic = i['topic']
            if topic not in res:
                res[topic] = []
            res[topic].append({"id": i["id"], "title": i['title']})
        return Response(res)

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
from sympy.parsing.sympy_parser import parse_expr
import numpy

def parseStringToNumber(s):
    return float(s.replace('\U00002013', '-'))

def parseAdvParamToNumber(s):
    s = list(s.replace('\U00002013', '-').replace('^', "**"))
    parsed = []
    for i, v in enumerate(s):
        parsed.append(v)
        if i != len(s)-1:
            if v.isalpha():
                if s[i+1].isdigit() or s[i+1].isalpha() or s[i+1] == "(":
                    parsed.append("*")
            if v.isdigit():
                if s[i+1].isalpha() or s[i+1] == "(":
                    parsed.append("*")
    print("".join(parsed))
    return parse_expr("".join(parsed))

def parseOutputKatex(s):
    s = list(s.replace("**", "^").replace("*", "\\times "))
    print("".join(s))
    newList = []
    carrot = False
    for i, v in enumerate(s):
        if v == "(" and s[i-1] == "^":
            carrot = True
            newList.append("{")
        elif v == ")" and carrot:
            carrot = False
            newList.append("}")
        elif s[i-1] == "^":
            carrot = True
            newList.append("{")
            newList.append(v)
            if not (len(s)-1 == i):
                if s[i+1] == '\\':
                    print(s[i-1], v, s[i+1], newList)
                    newList.append("}")
                    carrot = False
            if len(s)-1 == i:
                newList.append("}")
        elif carrot and (len(s)-1 == i):
            newList.append(v)
            newList.append("}")
            carrot = False
        elif carrot and v.isalpha() and s[i+1].isalpha() == False:
            newList.append("}")
            newList.append(v)
            carrot = False
        else:
            newList.append(v)
    print("".join(newList))
    return "".join(newList)

class CalculatorView(viewsets.ModelViewSet):
    serializer_class = CalculatorSerializer
    queryset = Calculator.objects.all()

    @action(methods=["GET"], detail=True, name="Expand Equation", url_path="ee")
    def expandEquation(self, request, pk=None):
        res = {"error": False}
        vals = {}
        formula = self.get_object().expand_formula
        if formula == "_":
            res["error"] = True
            return Response(res)
        else:
            arr_calculation_vars = self.get_object().calculation_vars.split(",")
            dict_query_params = request.query_params
            for i in dict_query_params.keys():
                if not len(dict_query_params[i]) > 0:
                    res["error"] = True
            if res['error'] == False:
                for p in dict_query_params.keys():
                    vals[p] = parseAdvParamToNumber(dict_query_params[p])
                exp = parse_expr(formula).subs(vals)
                ans = expand(exp)
                res['ans'] = parseOutputKatex(str(ans))
                return Response(res)
            else :
                return Response(res)

    @action(methods=["GET"], detail=True, name="Get Graph Data", url_path="gd")
    def graphData(self, request, pk=None):
        res = {"error": False}
        vals = {}
        formula = self.get_object().graph_formula
        arr_calculation_vars = self.get_object().calculation_vars.split(",")
        dict_query_params = request.query_params
        if formula == "_":
            res['error'] = True
        for i in arr_calculation_vars:
            if i.lower() != "x" and i.lower() != "y":
                if not i in dict_query_params:
                    res['error'] = True
        if res['error']:
            return Response(res)
        eval_form = formula.split("=")[-1]
        arr = []
        parsed = parseAdvParamToNumber(eval_form)
        for i in dict_query_params.keys():
            vals[i] = parseStringToNumber(dict_query_params[i])
        for i in numpy.arange(-100, 100, 2):
            vals["x"] = i
            exp = parsed.subs(vals)
            arr.append({"y": float(exp.evalf()), "x": float(i)})
        res["ans"] = arr
        return Response(res)

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
        exp = parse_expr(self.get_object().calculation_formula)
        ans = exp.evalf(subs=vals)
        res['ans'] = str(ans)
        return Response(res)
        
    @action(methods=['GET'], detail=True, name="Diff value for formula", url_path="dv")
    def diffValue(self, request, pk=None):
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
                vals[key] = parseAdvParamToNumber(dict_query_params[key])
        exp = parse_expr(self.get_object().diff_formula).subs(vals)
        ans = diff(exp)
        res['ans'] = parseOutputKatex(str(ans))
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

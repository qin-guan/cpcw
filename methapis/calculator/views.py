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

class CalculatorView(viewsets.ModelViewSet):
    serializer_class = CalculatorSerializer
    queryset = Calculator.objects.all()

    @action(methods=['GET'], detail=True, name="Calculate value for formula", url_path="cv")
    def calculateValue(self, request, pk=None):
        res = {"error": False}
        vals = {}
        for variable in self.get_object().calculation_vars.split(","):
            if variable not in request.query_params.keys():
                res = {"error": True}
        if res["error"] == True:
            return Response(res)
        for queryvalkey in request.query_params.keys():
            param = request.query_params[queryvalkey].replace('\U00002013', '-')
            vals[queryvalkey] = float(param)
        print(vals, self.get_object().calculation_formula.split("=")[0])
        res["ans"] = eval(self.get_object().calculation_formula.split("=")[0], {'__builtins__': None}, vals)
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

from rest_framework import viewsets
from .serializers import CalculatorSerializer
from .models import Calculator
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework.decorators import action
from django.forms.models import model_to_dict

class CalculatorView(viewsets.ModelViewSet):
    serializer_class = CalculatorSerializer
    queryset = Calculator.objects.all()

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
from django.shortcuts import render

# Create your views here.

from rest_framework import viewsets
from .serializers import CalculatorSerializer
from .models import Calculator

class CalculatorView(viewsets.ModelViewSet):
    serializer_class = CalculatorSerializer
    queryset = Calculator.objects.all()

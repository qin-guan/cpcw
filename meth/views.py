# Create your views here.
from django.shortcuts import render


def index(request):
    topics = {
        "em": [
            'Conversions',
            'Finance',
            'Ratio and Proportion',
            'Speed and Distance',
            'Indices',
            'Coordinate Geometry',
            'Polygons',
            'Arc Length, Sector and Segment',
        ],
        "am": []
    }
    return render(request, 'meth.html', {'topics': topics})

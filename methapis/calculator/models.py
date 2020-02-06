from django.db import models
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

# Create your models here.

def validate_difficulty(value):
    if value != "a" or value != "e":
        raise ValidationError(
            _('%(value)s is not a or e'),
            params={'value': value},
        )

def validate_empty(value):
    if len(value) < 0:
        raise ValidationError(
            _('%(value)s is empty'),
            params={'value': value},
        )

class Calculator(models.Model):
    equation = models.TextField()
    difficulty = models.TextField(validators=[validate_difficulty])

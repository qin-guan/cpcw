from django.db import models
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

# Create your models here.

def validate_difficulty(value):
    if value != "a" and value != "e":
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

def validate_c_var(value): 
    i = value.replace(" ", "")
    i = i.split(",")
    for v in i:
        if v.isalpha() == False:
            raise ValidationError(
                _('%(value)s contains charactars that are not alphabets'),
                params={'value': value},
            )

class Calculator(models.Model):
    formula = models.TextField(validators=[validate_empty])
    difficulty = models.TextField(validators=[validate_difficulty])
    topic = models.TextField(validators=[validate_empty])
    title = models.TextField(validators=[validate_empty])
    description = models.TextField(validators=[validate_empty])
    legend = models.TextField()
    alternative = models.TextField()
    calculation_vars = models.TextField()
    calculation_formula = models.TextField()
    calculated_units = models.TextField(validators=[validate_empty])
    calculation_formula_var_mapping = models.TextField()
    simplify_formula = models.TextField()
    graph_formula = models.TextField()
    resource_links = models.TextField()

from django.db import models


class Postulante(models.Model):

    FRONTEND = 'frontend'
    BACKEND = 'backend'

    JUNIOR = 'junior'
    SEMISENIOR = 'semisenior'
    SENIOR = 'senior'


    CATEGORIES_CHOICES = (
        (FRONTEND ,'frontend,'),
        (BACKEND , 'backend'),
    )
    
    CATEGORIES_CHOICES2 = (
        (JUNIOR , 'Junior'),
        (SEMISENIOR , 'Semisenior'),
        (SENIOR , 'Senior'),
    )

    name = models.CharField(max_length=100)
    release_date = models.DateField()
    dni = models.IntegerField(default=0)
    perfil = models.CharField(max_length=10, choices=CATEGORIES_CHOICES)
    nivel = models.CharField(max_length=10, choices=CATEGORIES_CHOICES2)

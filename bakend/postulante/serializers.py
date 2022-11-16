from rest_framework import serializers

from .models import Postulante

class SerieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Postulante
        fields = ('id', 'name', 'release_date', 'dni', 'perfil','nivel')

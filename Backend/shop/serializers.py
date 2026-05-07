from dataclasses import field

from rest_framework import serializers
from .models import *

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model =Tag
        field='__all__'

class SizeSerializser(serializers.ModelSerializer):

    class Meta:
        model = Size
        field = '__all__'
        
class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = '__all__'
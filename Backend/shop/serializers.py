from dataclasses import field

from rest_framework import serializers
from .models import *

class ProductSerializer(serializers.ModelSerializer):
    tags = serializers.StringRelatedField(many=True)
    sizes = serializers.StringRelatedField(many=True)

    class Meta:
        model = Product
        fields = '__all__'
    def get_sizes(self, obj):
        # obj.sizes is ManyToMany OR broken string case
        if isinstance(obj.sizes, str):
            return [s.strip() for s in obj.sizes.split(",")]

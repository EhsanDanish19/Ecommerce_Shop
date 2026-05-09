from django.contrib.auth.models import User
from rest_framework import serializers
from .models import *

class RegisterSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

        extra_kwargs = {
            'password' : {'write_only': True}
        }
    def create(self, validated_data):
        user =User.objects.create_user(
            username=validated_data['username'],
            email= validated_data['email'],
            password= validated_data['password']
        )
        return user

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

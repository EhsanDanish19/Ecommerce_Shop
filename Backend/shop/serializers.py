from dataclasses import fields

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
        fields = "__all__"


class CartSerializer(serializers.ModelSerializer):

    class Meta:
        model =Cart
        fields = '__all__'

        from rest_framework import serializers

class OrderItemSerializer(serializers.ModelSerializer):

    product_name = serializers.CharField(
        source='product.name',
        read_only=True
    )

    class Meta:
        model = OrderItem
        fields = '__all__'



class OrderSerializer(serializers.ModelSerializer):

    items = OrderItemSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = Order
        fields = '__all__'


class CheckoutSerializer(serializers.Serializer):

    full_name = serializers.CharField()
    phone = serializers.CharField()
    address = serializers.CharField()
    payment_method = serializers.CharField()
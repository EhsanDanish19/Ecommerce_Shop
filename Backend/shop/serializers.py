
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
    
class ProductSizeStockSerializer(serializers.ModelSerializer):

    size = serializers.StringRelatedField()

    class Meta:
        model = ProductSizeStock
        fields = [
            "size",
            "stock",
            "new_price",
            "old_price"
        ]

class ProductImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductImage
        fields = ["id", "image"]

class ProductSerializer(serializers.ModelSerializer):
    tags = serializers.StringRelatedField(many=True)
    sizes = serializers.StringRelatedField(many=True)

    size_stock = ProductSizeStockSerializer(
        many=True,
        read_only=True
    )

    images = ProductImageSerializer(
        many = True,
        read_only = True
    )
    
    class Meta:
        model = Product
        fields = "__all__"


class CartSerializer(serializers.ModelSerializer):

    class Meta:
        model =Cart
        fields = '__all__'

        from rest_framework import serializers

class OrderItemSerializer(serializers.ModelSerializer):

    name = serializers.CharField(
        source='product.name',
        read_only=True
    )

    size = serializers.CharField(
        source="size.name"
    )
    class Meta:
        model = OrderItem
        fields = [
            "name",
            "size",
            "quantity",
            "price",
            "subtotal"]



class OrderSerializer(serializers.ModelSerializer):

    items = OrderItemSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = Order
        fields = [
            "id",
            "total_amount",
            "payment_method",
            "status",
            "created_at",
            "items"
        ]


class CheckoutSerializer(serializers.Serializer):

    full_name = serializers.CharField()
    phone = serializers.CharField()
    address = serializers.CharField()
    payment_method = serializers.CharField()


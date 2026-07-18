
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

from rest_framework import serializers
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)
    full_name = serializers.CharField(source="user.get_full_name", read_only=True)
    email = serializers.EmailField(source="user.email", read_only=True)
    date_joined = serializers.DateTimeField(source="user.date_joined", read_only=True)

    class Meta:
        model = UserProfile
        fields = [
            "id",
            "username",
            "full_name",
            "email",
            "full_name",
            "phone",
            "address",
            "bio",
            "image",
            "date_joined",
        ]

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


class WishlistItemSerializer(serializers.ModelSerializer):

    image = serializers.SerializerMethodField()

    class Meta:
        model = WishlistItem
        fields = [
            "id",
            "product",
            "image",
            "created_at"
        ]

    def get_image(self, obj):

        request = self.context.get("request")

        if obj.product.image:

            return request.build_absolute_uri(
                obj.product.image.url
            )

        return None
    
class WishlistSerializer(serializers.ModelSerializer):

    items = serializers.SerializerMethodField()

    class Meta:
        model = Wishlist

        fields = [
            "id",
            "items"
        ]

    def get_items(self, obj):

        request = self.context.get("request")

        data = []

        for item in obj.items.all():

            stock = item.product.size_stock.first()

            data.append({

                "id": item.id,

                "product_id": item.product.id,

                "name": item.product.name,

                "image": request.build_absolute_uri(
                    item.product.image.url
                ) if item.product.image else None,

                "price": stock.new_price if stock else 0,

                "category": item.product.category,

                "created_at": item.created_at

            })

        return data
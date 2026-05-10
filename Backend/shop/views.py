
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Product
from .serializers import *

@api_view(['POST'])
def register_user(request):
    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response({
            'message': 'User Registered Successfully'
        })

    return Response(serializer.errors)

@api_view(['POST'])
def login_view(request):

    username = request.data.get('username')
    password = request.data.get('password')
    print("USERNAME:", username)
    print("PASSWORD:", password)
    user = authenticate(username=username, password=password)

    if user is not None:
        return Response({"message": "Login success"})
    
    return Response({"error": "Invalid Username or Password"}, status=400)

@api_view(['GET'])
def all_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def popular_products(request):
    products = Product.objects.filter(is_popular=True)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def new_products(request):
    products = Product.objects.filter(is_new=True)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def product_details(request, id):
    product = Product.objects.get(id=id)

    related_products = Product.objects.filter(
        category=product.category
    ).exclude(id=product.id)

    return Response({
        "product": ProductSerializer(product).data,
        "related": ProductSerializer(related_products, many=True).data
    })

@api_view(['GET'])
def product_by_category(request, category):
    product = Product.objects.filter(category=category)
    serializer = ProductSerializer(product, many=True, context={'request':request})
    return Response(serializer.data)




#new
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):

    product_id = request.data.get('product')
    size = request.data.get('size')
    quantity = request.data.get('quantity', 1)
    user_id = request.data.get('user')

    product = Product.objects.get(id=product_id)
    
    user = request.user


    cart_item, created = Cart.objects.get_or_create(
        user=user,
        product=product,
        size=size
    )

    if not created:
        cart_item.quantity += quantity
    else:
        cart_item.quantity = quantity

    cart_item.save()

    return Response({
        "message": "Added to cart"
    })
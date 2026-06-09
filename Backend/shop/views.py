
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response

from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Product
from .serializers import *

# ==============================
# Register
# ==============================

@api_view(['POST'])
def register_user(request):
    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response({
            'message': 'User Registered Successfully'
        })

    return Response(serializer.errors)

# ==============================
# Login
# ==============================

@api_view(['POST'])
def login_view(request):

    username = request.data.get('username')
    password = request.data.get('password')
   
    user = authenticate(username=username, password=password)

    if user is not None:

        refresh = RefreshToken.for_user(user)
        data={
            "message": "Login success",
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "username":user.username
            }

        return Response(data)
    
    return Response({"error": "Invalid Username or Password"}, status=400)

# ==============================
# All Products
# ==============================

@api_view(['GET'])
def all_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

# ==============================
# Popular Products
# ==============================

@api_view(['GET'])
def popular_products(request):
    products = Product.objects.filter(is_popular=True)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

# ==============================
# New Products
# ==============================

@api_view(['GET'])
def new_products(request):
    products = Product.objects.filter(is_new=True)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

# ==============================
# Product Details
# ==============================

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

# ==============================
# Product Category
# ==============================

@api_view(['GET'])
def product_by_category(request, category):
    product = Product.objects.filter(category=category)
    serializer = ProductSerializer(product, many=True, context={'request':request})
    return Response(serializer.data)


# ==============================
# Add To Cart
# ==============================

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

# ==============================
# Get Carts
# ==============================

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_cart(request):

    cart_items = Cart.objects.filter(user=request.user)

    data = []

    for item in cart_items:
        data.append({
            "id": item.id,
            "product_id": item.product.id,
            "name": item.product.name,
            "image": item.product.image.url,
            "price": item.product.new_price,
            "size": item.size,
            "quantity": item.quantity,
            "subtotal": item.product.new_price * item.quantity
        })

    return Response(data)


# ==============================
# INCREASE QUANTITY
# ==============================
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def increase_quantity(request, id):

    try:

        cart_item = Cart.objects.get(
            id=id,
            user=request.user
        )

        cart_item.quantity += 1
        cart_item.save()

        return Response({
            "message": "Quantity Increased"
        })

    except Cart.DoesNotExist:

        return Response({
            "error": "Cart item not found"
        }, status=404)


# ==============================
# DECREASE QUANTITY
# ==============================
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def decrease_quantity(request, id):

    try:

        cart_item = Cart.objects.get(
            id=id,
            user=request.user
        )

        # if quantity 1 then delete
        if cart_item.quantity > 1:

            cart_item.quantity -= 1
            cart_item.save()

        else:

            cart_item.delete()

        return Response({
            "message": "Quantity Decreased"
        })

    except Cart.DoesNotExist:

        return Response({
            "error": "Cart item not found"
        }, status=404)


# ==============================
# REMOVE ITEM
# ==============================
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_cart_item(request, id):

    try:

        cart_item = Cart.objects.get(
            id=id,
            user=request.user
        )

        cart_item.delete()

        return Response({
            "message": "Item Removed"
        })

    except Cart.DoesNotExist:

        return Response({
            "error": "Cart item not found"
        }, status=404)
    
# ==============================
# Update carts ITEM
# ==============================

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_cart(request):

    items = request.data.get("items", [])

    for item in items:

        cart = Cart.objects.get(
            id=item["id"],
            user=request.user
        )

        cart.quantity = item["quantity"]
        cart.save()

    return Response({
        "message": "Cart Updated Successfully"
    })



from rest_framework.views import APIView
from django.db import transaction

class CheckoutAPIView(APIView):

    permission_classes = [IsAuthenticated]

    @transaction.atomic
    def post(self, request):

        serializer = CheckoutSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        cart_items = Cart.objects.filter(
            user=request.user
        )

        if not cart_items.exists():
            return Response({
                "error": "Cart is empty"
            }, status=400)

        total_amount = sum(
            item.product.new_price * item.quantity
            for item in cart_items
        )

        order = Order.objects.create(
            user=request.user,
            full_name=serializer.validated_data['full_name'],
            phone=serializer.validated_data['phone'],
            address=serializer.validated_data['address'],
            payment_method=serializer.validated_data['payment_method'],
            total_amount=total_amount
        )

        for item in cart_items:

            OrderItem.objects.create(
                order=order,
                product=item.product,
                size=item.size,
                quantity=item.quantity,
                price=item.product.new_price,
                subtotal=item.product.new_price * item.quantity
            )

        cart_items.delete()

        return Response({
            "message": "Order placed successfully",
            "order_id": order.id
        })
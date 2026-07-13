
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
    size_name = request.data.get('size')
    quantity = request.data.get('quantity', 1)
    user_id = request.data.get('user')

    # -----------------------
    # Product Check
    # -----------------------
    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response(
            {"error": "Product not found"},
            status=404
        )    

    # -----------------------
    # Size Check
    # -----------------------
    try:
        size_obj = Size.objects.get(name=size_name)
    except Size.DoesNotExist:
        return Response(
            {"error": "Invalid size"},
            status=400
        )
    
    #--------------------
    #Stock Check
    #--------------------

    try:
        size_stock = ProductSizeStock.objects.get(
            product = product,
            size = size_obj
        )
    except ProductSizeStock.DoesNotExist:
        return Response(
            {
                "error": "This size is not available"
            },
            status=400
        )
    
    if size_stock.stock < quantity:
        return Response(
            {
                "error":f"Only {size_stock.stock} items availabe"
            },
            status=400
        )
    
    user = request.user
    
    cart_item, created = Cart.objects.get_or_create(
        user=user,
        product=product,
        size=size_obj
    )

    if not created:
        new_quantity = cart_item.quantity + quantity
        
        if new_quantity > size_stock.stock:
            return Response(
                {
                    "error":"You cannot add more than availabe stock"
                },
                status=400
            )
        
        cart_item.quantity = new_quantity
        
    else:
        cart_item.quantity = quantity

    cart_item.save()

    return Response({
        "message": "Product added to cart successfully."
    },
    status=200
    )

# ==============================
# Get Carts
# ==============================

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_cart(request):

    cart_items = Cart.objects.filter(user=request.user)

    data = []

    for item in cart_items:
        stock = ProductSizeStock.objects.filter(
            product=item.product,
            size=item.size
        ).first()

        data.append({
            "id": item.id,
            "product_id": item.product.id,
            "name": item.product.name,
            "image": item.product.image.url,
            "price": item.product.new_price,
            "size": item.size.name,
            "quantity": item.quantity,
            "available_stock": stock.stock if stock else 0,
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

        cart_item = Cart.objects.select_related(
            "product",
            "size"
        ).get(
            id=id,
            user=request.user
        )
    except Cart.DoesNotExist:
        return Response(
            {"error": "Cart item not found"},
            status=404
        )
    
    try:
        stock = ProductSizeStock.objects.get(
            product = cart_item.product,
            size = cart_item.size
        )

       
    except ProductSizeStock.DoesNotExist:
        return Response(
            {"error": "Stock record not found"},
            status=404
        )
    
    if cart_item.quantity >= stock.stock:
        return Response(
                {
                    "error": "Stock not available"
                },
                status=400
            )

    cart_item.quantity += 1
    cart_item.save()

    return Response({
            "message": "Quantity Increased"
        })


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
        
    except Cart.DoesNotExist:
        return Response(
            {
                "error": "Cart item not found"
            },
            status=404
        )

    # Quantity 1 se kam nahi hone deni
    if cart_item.quantity <= 1:
        return Response(
            {
                "error": "Quantity cannot be less than 1"
            },
            status=400
        )

    cart_item.quantity -= 1
    cart_item.save()

    return Response(
        {
            "message": "Quantity decreased successfully"
        },
        status=200
    )

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
        try:
            cart_item = Cart.objects.get(
                id=item["id"],
                user=request.user
            )

        except Cart.DoesNotExist:
            return Response(
                {
                    "error":"Cart item not found"
                },
                status=404
            )

        stock = ProductSizeStock.objects.get(
            product=cart_item.product,
            size=cart_item.size
        )
        
        if item["quantity"] > stock.stock:
            return Response(
                {
                    "error": f"{cart_item.product.name} stock available only {stock.stock}"
                },
                status=400
            )
        
        cart_item.quantity = item["quantity"]
        cart_item.save()

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
        ).select_related(
            "product",
            "size"
        )

        if not cart_items.exists():
            return Response({
                "error": "Cart is empty"
            }, status=400)


        # ==========================
        # STOCK CHECK
        # ==========================

        for item in cart_items:


            stock = ProductSizeStock.objects.get(
                product=item.product,
                size=item.size
            )


            if item.quantity > stock.stock:

                return Response(
                    {
                        "error":
                        f"{item.product.name} ({item.size.name}) only {stock.stock} available"
                    },
                    status=400
                )
            
        # ==========================
        # TOTAL PRICE
        # ==========================
        total_amount = sum(
            item.product.new_price * item.quantity
            for item in cart_items
        )

        # ==========================
        # CREATE ORDER
        # ==========================

        order = Order.objects.create(
            user=request.user,
            full_name=serializer.validated_data['full_name'],
            phone=serializer.validated_data['phone'],
            address=serializer.validated_data['address'],
            payment_method=serializer.validated_data['payment_method'],
            total_amount=total_amount
        )

        # ==========================
        # ORDER ITEMS
        # ==========================
        for item in cart_items:

            OrderItem.objects.create(
                order=order,
                product=item.product,
                size=item.size,
                quantity=item.quantity,
                price=item.product.new_price,
                subtotal=item.product.new_price * item.quantity
            )

           # Reduce Stock

            stock = ProductSizeStock.objects.get(

                product=item.product,

                size=item.size

            )


            stock.stock -= item.quantity

            stock.save()

        cart_items.delete()

        return Response({
            "message": "Order placed successfully",
            "order_id": order.id
        },
        status=201
        )

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def user_orders(request):

    orders = Order.objects.filter(
        user = request.user
    ).order_by("-created_at")
    
    serializer = OrderSerializer(
        orders,
        many=True
    )

    return Response(serializer.data)
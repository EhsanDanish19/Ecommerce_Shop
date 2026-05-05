from multiprocessing import context

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Product
from .serializers import ProductSerializer

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
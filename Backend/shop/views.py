from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product
from .serializers import ProductSerializer

@api_view(['GET'])
def get_popular_products(request):
    products = Product.objects.filter(is_popular=True)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)
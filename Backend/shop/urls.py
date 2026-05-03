from django.urls import path
from .views import *

urlpatterns = [
    path('products/', all_products),
    path('popular/', popular_products),
    path('product/<int:id>/', product_details),
    path('new/', new_products),
    

]
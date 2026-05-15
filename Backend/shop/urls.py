from django.urls import path
from .views import *
from rest_framework_simplejwt.views import TokenObtainPairView
urlpatterns = [

    path('register/', register_user),
    path('login/', TokenObtainPairView.as_view()),
    path('products/', all_products),
    path('popular/', popular_products),
    path('product/<int:id>/', product_details),
    path('new/', new_products),
    path('products/<str:category>/', product_by_category),
    path('add_to_cart/', add_to_cart),
    path('cart/', get_cart),
# INCREASE
    path(
        'cart/increase/<int:id>/',
        increase_quantity,
        name='increase_quantity'
    ),

    # DECREASE
    path(
        'cart/decrease/<int:id>/',
        decrease_quantity,
        name='decrease_quantity'
    ),

    # REMOVE
    path(
        'cart/remove/<int:id>/',
        remove_cart_item,
        name='remove_cart_item'
    ),    
    

]
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
    
    

]
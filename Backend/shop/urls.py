from django.urls import path
from .views import get_popular_products

urlpatterns = [
    path('popular/', get_popular_products),
]
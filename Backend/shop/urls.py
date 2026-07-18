from django.urls import path
from .views import *
# from rest_framework_simplejwt.views import TokenObtainPairView
urlpatterns = [

    path('register/', register_user),
    path('login/', login_view),
    # path('login/', TokenObtainPairView.as_view()),

    path("change-password/", ChangePasswordView.as_view(), name="changePassword"),


    path('products/', all_products),
    path('popular/', popular_products),
    path('product/<int:id>/', product_details),
    path('new/', new_products),
    path('products/<str:category>/', product_by_category),
    path('add_to_cart/', add_to_cart),
    path('cart/', get_cart),

    path('cart/increase/<int:id>/', increase_quantity, name='increase_quantity'),

    path('cart/decrease/<int:id>/', decrease_quantity, name='decrease_quantity'),
    # REMOVE
    path('cart/remove/<int:id>/', remove_cart_item, name='remove_cart_item'
    ), 

    path('cart/update/', update_cart, name='update_cart'
    ),    
    
    path('checkout/', CheckoutAPIView.as_view(), name='checkout'
    ),

    path('my_orders/', user_orders, name='my_orders'),
    path("profile/", UserProfileView.as_view(), name="profil"),

    path("wishlist/", WishlistAPIView.as_view() ),

    path("wishlist/add/", AddWishlistAPIView.as_view()),

    path("wishlist/remove/<int:id>/", RemoveWishlistAPIView.as_view()),

]
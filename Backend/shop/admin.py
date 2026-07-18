
from django.contrib import admin
from .models import *

admin.site.register(Tag)
admin.site.register(Size)
admin.site.register(ProductSizeStock)
admin.site.register(UserProfile)

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):

    inlines = [ProductImageInline]

# ==============================
# ORDER ITEMS INLINE
# ==============================

class OrderItemInline(admin.TabularInline):

    model = OrderItem

    extra = 0

    readonly_fields = (
        "product",
        "size",
        "quantity",
        "price",
        "subtotal",
    )



# ==============================
# ORDER ADMIN
# ==============================

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):

    list_display = (

        "id",
        "user",
        "full_name",
        "phone",
        "total_amount",
        "status",
        "created_at",

    )


    list_filter = (

        "status",
        "created_at",

    )


    search_fields = (

        "full_name",
        "phone",
        "user__username",

    )


    readonly_fields = (

        "user",
        "full_name",
        "phone",
        "address",
        "payment_method",
        "total_amount",
        "created_at",

    )


    inlines = [

        OrderItemInline

    ]



# ==============================
# CART ADMIN
# ==============================

@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):

    list_display = (

        "user",
        "product",
        "size",
        "quantity",

    )


    list_filter = (

        "size",

    )


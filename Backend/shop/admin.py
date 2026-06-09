
from django.contrib import admin
from .models import *

admin.site.register(Tag)
admin.site.register(Size)
admin.site.register(Product)
admin.site.register(Cart)
admin.site.register(Order)
admin.site.register(OrderItem)
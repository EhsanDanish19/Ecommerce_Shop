

from django.db import models
from django.contrib.auth.models import User
class Tag(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name
    
class Size(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Product(models.Model):
    CATEGORY_CHOICES =[
        ('women', 'Women'),
        ('men', 'Men'),
        ('kids', 'Kids'),

    ]

    tags = models.ManyToManyField(Tag, blank=True)
    sizes = models.ManyToManyField(Size, blank=True)
    name = models.CharField(max_length=200)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    image = models.ImageField(upload_to='products/', null=True, blank=True)
    description=models.TextField()
    new_price = models.FloatField()
    old_price = models.FloatField()
    is_popular = models.BooleanField(default=False)
    is_new = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class ProductSizeStock(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="size_stock")

    size = models.ForeignKey(Size, on_delete=models.CASCADE)

    stock = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.product.name} - {self.size.name} - {self.stock}"
    
class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    size = models.ForeignKey(Size, on_delete=models.CASCADE)

    quantity = models.PositiveIntegerField(default=1)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.product.name}"
    
class Order(models.Model):

    PAYMENT_CHOICES = (
        ('COD', 'Cash On Delivery'),
        ('JAZZCASH', 'JazzCash'),
        ('EASYPAISA', 'EasyPaisa'),
    )

    STATUS_CHOICES = (
        ('PENDING', 'Pending'),
        ('PROCESSING', 'Processing'),
        ('SHIPPED', 'Shipped'),
        ('DELIVERED', 'Delivered'),
        ('CANCELLED', 'Cancelled'),
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    full_name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    address = models.TextField()

    payment_method = models.CharField(
        max_length=20,
        choices=PAYMENT_CHOICES
    )

    total_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='PENDING'
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order #{self.id}"
    


class OrderItem(models.Model):

    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name='items'
    )

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE
    )
    size = models.CharField(max_length=20)

    quantity = models.PositiveIntegerField()

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    subtotal = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    def save(self, *args, **kwargs):
        self.subtotal = self.price * self.quantity
        super().save(*args, **kwargs)
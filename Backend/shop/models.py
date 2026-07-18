

from encodings.punycode import T

from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=20, blank=True)
    address = models.TextField(blank=True)
    bio = models.TextField(blank=True)
    image = models.ImageField(upload_to='profiles/', default='profiles/default.png')

    def __str__(self):
        return self.user.username
    
    
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
    
    is_popular = models.BooleanField(default=False)
    is_new = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class ProductImage(models.Model):

    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="images"
    )

    image = models.ImageField(
        upload_to="product_gallery/"
    ) 

    def __str__(self):
        return self.product.name

class ProductSizeStock(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="size_stock")

    size = models.ForeignKey(Size, on_delete=models.CASCADE)

    stock = models.IntegerField(default=0)

     # Size wise price
    new_price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    old_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True
    )
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
        ('CONFIRMED', 'Confirmed'),
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
        choices=PAYMENT_CHOICES,
        default="COD"
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
        return f"Order #{self.id} - {self.user.username}"
    


class OrderItem(models.Model):

    order = models.ForeignKey(
        Order,
        related_name='items',
        on_delete=models.CASCADE
    )

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE
    )

    size = models.ForeignKey(Size, on_delete=models.CASCADE)

    quantity = models.PositiveIntegerField()

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    subtotal = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    def __str__(self):
        return self.product.name

#New Starting form here

class Wishlist(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="wishlist"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username


class WishlistItem(models.Model):
    wishlist = models.ForeignKey(
        Wishlist,
        on_delete=models.CASCADE,
        related_name="items"
    )

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('wishlist', 'product')

    def __str__(self):
        return self.product.name
    
# class Review(models.Model):

#     RATING_CHOICES = (
#         (1, "1 Star"),
#         (2, "2 Star"),
#         (3, "3 Star"),
#         (4, "4 Star"),
#         (5, "5 Star"),
#     )

#     product = models.ForeignKey(
#         Product,
#         on_delete=models.CASCADE,
#         related_name="reviews"
#     )

#     user = models.ForeignKey(
#         User,
#         on_delete=models.CASCADE
#     )

#     rating = models.IntegerField(
#         choices=RATING_CHOICES
#     )

#     review = models.TextField()

#     created_at = models.DateTimeField(
#         auto_now_add=True
#     )

#     updated_at = models.DateTimeField(
#         auto_now=True
#     )

#     class Meta:
#         unique_together = ("product", "user")

#     def __str__(self):
#         return f"{self.product.name} - {self.user.username}"
    
# class SearchHistory(models.Model):

#     user = models.ForeignKey(
#         User,
#         on_delete=models.CASCADE
#     )

#     keyword = models.CharField(
#         max_length=200
#     )

#     searched_at = models.DateTimeField(
#         auto_now_add=True
#     )

#     def __str__(self):
#         return self.keyword
    
# class ProductView(models.Model):

#     user = models.ForeignKey(
#         User,
#         on_delete=models.CASCADE,
#         null=True,
#         blank=True
#     )

#     product = models.ForeignKey(
#         Product,
#         on_delete=models.CASCADE
#     )

#     viewed_at = models.DateTimeField(
#         auto_now_add=True
#     )
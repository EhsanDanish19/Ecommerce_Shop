

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


class Cart(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE
    )

    size = models.CharField(max_length=20)

    quantity = models.PositiveIntegerField(default=1)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.product.name}"
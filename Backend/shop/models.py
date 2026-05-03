

from django.db import models


class Product(models.Model):
    CATEGORY_CHOICES =[
        ('women', 'Women'),
        ('men', 'Men'),
        ('kids', 'Kids'),

    ]

    name = models.CharField(max_length=200)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    image = models.ImageField(upload_to='products/', null=True, blank=True)
    new_price = models.FloatField()
    old_price = models.FloatField()
    is_popular = models.BooleanField(default=False)
    is_new = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
from django.db import models
from .type import Type
from django.contrib import admin
from django.contrib.auth.models import User

class Product(models.Model):
    name = models.CharField(max_length=200)
    code = models.CharField(max_length=200)
    description = models.TextField()
    type = models.ForeignKey(Type, on_delete=models.CASCADE)
    unit = models.CharField(max_length=200)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    vat_rate = models.DecimalField(max_digits=10, decimal_places=2)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'products'


class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'code', 'type', 'description', 'unit', 'unit_price', 'vat_rate', 'user_id')
    search_fields = ('id', 'name', 'code', 'type', 'description', 'unit', 'unit_price', 'vat_rate', 'user_id')
    list_filter = ('id', 'name', 'code', 'type', 'description', 'unit', 'unit_price', 'vat_rate', 'user_id')

    def user_id(self, obj):
        return obj.user.id


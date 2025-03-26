from django.db import models
from django.contrib.auth.models import User
from django.contrib import admin

class Company(models.Model):
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    city = models.CharField(max_length=200)
    district = models.CharField(max_length=200)
    phone = models.CharField(max_length=200)
    email = models.EmailField(max_length=200)
    website = models.URLField(max_length=200)
    tax_office = models.CharField(max_length=200)
    tax_number = models.CharField(max_length=200)
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
    
    class Meta:
        db_table = 'companies'


class CompanyAdmin(admin.ModelAdmin):
    list_display = ('name', 'address', 'city', 'district', 'phone', 'email', 'website', 'tax_office', 'tax_number', 'user')
    search_fields = ('name', 'address', 'city', 'district', 'phone', 'email', 'website', 'tax_office', 'tax_number', 'user' )
    list_filter = ('name', 'address', 'city', 'district', 'phone', 'email', 'website', 'tax_office', 'tax_number', 'user')

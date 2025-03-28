from django.db import models
from django.contrib import admin

class Type(models.Model):
    TYPES = [
        ('product', 'Product'),
        ('service', 'Service'),
    ]
    name = models.CharField(max_length=200)
    type = models.CharField(max_length=200, choices=TYPES)

    def __str__(self):
        return self.name
    
    class Meta:
        db_table = 'types'

class TypeAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'type_display')
    search_fields = ('id', 'name', 'type')
    list_filter = ('id', 'name', 'type')

    def type_display(self, obj):
        return obj.get_type_display()
    
    type_display.short_description = 'Type'



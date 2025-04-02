from django.db import models
from django.contrib import admin
from django.contrib.auth.models import User
class Type(models.Model):
    TYPES = [
        ('product', 'Product'),
        ('service', 'Service'),
    ]
    name = models.CharField(max_length=200)
    type = models.CharField(max_length=200, choices=TYPES)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True, related_name='types')

    def __str__(self):
        return self.name
    
    class Meta:
        db_table = 'types'

class TypeAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'type_display', 'user_id')
    search_fields = ('id', 'name', 'type', 'user_id')
    list_filter = ('id', 'name', 'type', 'user_id')

    def type_display(self, obj):
        return obj.get_type_display()
    
    type_display.short_description = 'Type'

    def user_id(self, obj):
        return obj.user.id
    
    user_id.short_description = 'User ID'
    user_id.admin_order_field = 'user__id'


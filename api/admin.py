from django.contrib import admin
from .models import Company, CompanyAdmin, User, UserAdmin, Type, TypeAdmin


admin.site.unregister(User)
admin.site.register(User, UserAdmin)
admin.site.register(Company, CompanyAdmin)
admin.site.register(Type, TypeAdmin)

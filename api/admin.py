from django.contrib import admin
from .models import Company, CompanyAdmin

admin.site.register(Company, CompanyAdmin)

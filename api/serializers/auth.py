from rest_framework import serializers
from django.contrib.auth.models import User

from api.models import Company
from api.serializers import CompanySerializer


class CompanyCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['name', 'email', 'tax_number']


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    company = CompanyCreateSerializer()

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'company']

    def create(self, validated_data):
        company_data = validated_data.pop('company')
        user = User.objects.create_user(**validated_data)
        Company.objects.create(user=user, **company_data)
        return user

    def validate_company(self, value):
        if self.context.get('request') and self.context['request'].user.id:
            if Company.objects.filter(user=self.context['request'].user).exists():
                raise serializers.ValidationError("Company already exists")
        return value
    
class RegisterResponseSerializer(serializers.ModelSerializer):
    company = CompanySerializer()

    class Meta:
        model = User
        fields = ['username', 'email', 'company']


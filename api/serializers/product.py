from rest_framework import serializers
from ..models.product import Product
from .type import TypeListSerializer

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class ProductListSerializer(serializers.ModelSerializer):
    type = TypeListSerializer()
    class Meta:
        model = Product
        fields = ['id', 'name', 'code', 'description', 'unit', 'unit_price', 'vat_rate', 'type']




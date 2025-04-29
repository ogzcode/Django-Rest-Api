from rest_framework import generics
from api.models.product import Product
from api.serializers.product import ProductSerializer, ProductListSerializer
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema
from api.permissions import IsOwnData

@extend_schema(
    tags=["Product"],
    summary="Product Create",
    description="Product Create",
    responses={200: ProductSerializer()},
    request=ProductSerializer
)
class ProductCreateView(generics.CreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated, IsOwnData]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

@extend_schema(
    tags=["Product"],
    summary="Product Delete",
    description="Product Delete",
    responses={200: ProductSerializer},
    request=ProductSerializer
)
class ProductDeleteView(generics.DestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated, IsOwnData]

@extend_schema(
    tags=["Product"],
    summary="Product Update",
    description="Product Update",
    responses={200: ProductSerializer},
    request=ProductSerializer
)
class ProductUpdateView(generics.UpdateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated, IsOwnData]

@extend_schema(
    tags=["Product"],
    summary="Product List",
    description="Product List",
    responses={200: ProductListSerializer(many=True)},
)
class ProductListView(generics.ListAPIView):
    serializer_class = ProductListSerializer
    permission_classes = [IsAuthenticated, IsOwnData]

    def get_queryset(self):
        queryset = Product.objects.filter(user=self.request.user)
        return queryset


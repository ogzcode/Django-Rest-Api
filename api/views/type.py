from rest_framework import generics
from api.models import Type
from api.serializers import TypeSerializer
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema
from api.permissions import IsOwnData
from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import OpenApiParameter

@extend_schema(
    tags=["Type"],
    summary="Type Create",
    description="Type Create",
    responses={200: TypeSerializer()},
    request=TypeSerializer
)
class TypeCreateView(generics.CreateAPIView):
    queryset = Type.objects.all()
    serializer_class = TypeSerializer
    permission_classes = [IsAuthenticated, IsOwnData]

@extend_schema(
    tags=["Type"],
    summary="Type Delete",
    description="Type Delete",
    responses={200: TypeSerializer},
    request=TypeSerializer
)
class TypeDeleteView(generics.DestroyAPIView):
    queryset = Type.objects.all()
    serializer_class = TypeSerializer
    permission_classes = [IsAuthenticated, IsOwnData]

@extend_schema(
    tags=["Type"],
    summary="Type Update",
    description="Type Update",
    responses={200: TypeSerializer},
    request=TypeSerializer
)
class TypeUpdateView(generics.UpdateAPIView):
    queryset = Type.objects.all()
    serializer_class = TypeSerializer
    permission_classes = [IsAuthenticated, IsOwnData]

@extend_schema(
    tags=["Type"],
    summary="Type List",
    description="Type List",
    responses={200: TypeSerializer(many=True)},
    parameters=[
        OpenApiParameter(
            name='type',
            description='Type',
            required=False,
            type=OpenApiTypes.STR
        )
    ]
)
class TypeListView(generics.ListAPIView):
    serializer_class = TypeSerializer
    permission_classes = [IsAuthenticated, IsOwnData]

    def get_queryset(self):
        queryset = Type.objects.all()
        type_param = self.request.query_params.get('type')
        if type_param:
            queryset = queryset.filter(type=type_param)
        return queryset


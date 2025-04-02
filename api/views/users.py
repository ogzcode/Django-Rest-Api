from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from api.serializers.user import UserSerializer, UserUpdateSerializer
from api.serializers.company import CompanySerializer
from api.models import Company
from drf_spectacular.utils import extend_schema, OpenApiResponse  
from api.permissions import IsOwnData
from rest_framework.generics import RetrieveAPIView, UpdateAPIView, DestroyAPIView



@extend_schema(
    tags=['Users'],
    description='Get a user by ID',
    responses={
        200: UserSerializer,
        400: OpenApiResponse(description='Bad Request')
    }
)
class UserDetailAPIView(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsOwnData]   



@extend_schema(
    tags=['Users'],
    description='Update a user by ID',
    request=UserUpdateSerializer,
    responses={
        200: UserSerializer,
        400: OpenApiResponse(description='Bad Request')
    }
)
class UserUpdateAPIView(UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserUpdateSerializer
    permission_classes = [IsAuthenticated, IsOwnData]


@extend_schema(
    tags=['Users'],
    description='Delete a user by ID',
    responses={
        200: OpenApiResponse(description='User deleted successfully'),
        400: OpenApiResponse(description='Bad Request')
    }
)
class UserDeleteAPIView(DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsOwnData]



@extend_schema(
    tags=['Users'],
    description='Get a user company by ID',
    responses={
        200: CompanySerializer,
        400: OpenApiResponse(description='Bad Request')
    }
)
class UserCompanyAPIView(RetrieveAPIView):
    serializer_class = CompanySerializer
    permission_classes = [IsAuthenticated, IsOwnData]

    def get_queryset(self):
        user_id = self.kwargs['pk']
        user = get_object_or_404(User, pk=user_id)
        return Company.objects.filter(user=user)
    
    def get(self, request, *args, **kwargs):
        company = self.get_queryset().first()
        serializer = self.get_serializer(company)
        return Response(serializer.data, status=status.HTTP_200_OK)

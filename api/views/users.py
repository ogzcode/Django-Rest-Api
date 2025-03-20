from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from api.serializers import UserSerializer, UserUpdateSerializer
from drf_spectacular.utils import extend_schema, OpenApiResponse
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from api.permissions import IsOwnData


class UserDetailAPIView(APIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsOwnData]

    @extend_schema(
        tags=['Users'],
        description='Get a user by ID',
        responses={
            200: UserSerializer,
            401: OpenApiResponse(description='Unauthorized'),
            403: OpenApiResponse(description='Forbidden')
        },
        operation_id='get_user_by_id'
    )
    def get(self, request, pk):
        user = User.objects.get(pk=pk)
        self.check_object_permissions(request, user)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(
        tags=['Users'],
        description='Update a user by ID',
        request=UserUpdateSerializer,
        responses={
            200: UserUpdateSerializer,
            401: OpenApiResponse(description='Unauthorized'),
            403: OpenApiResponse(description='Forbidden')
        },
        operation_id='update_user_by_id'
    )
    def put(self, request, pk):
        user = User.objects.get(pk=pk)
        self.check_object_permissions(request, user)
        serializer = UserUpdateSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @extend_schema(
        tags=['Users'],
        description='Delete a user by ID',
        responses={
            204: OpenApiResponse(description='No Content'),
            401: OpenApiResponse(description='Unauthorized'),
            403: OpenApiResponse(description='Forbidden')
        },
        operation_id='delete_user_by_id'
    )
    def delete(self, request, pk):
        user = User.objects.get(pk=pk)
        self.check_object_permissions(request, user)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

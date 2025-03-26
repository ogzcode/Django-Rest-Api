from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from drf_spectacular.utils import extend_schema
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from api.serializers import RegisterSerializer, RegisterResponseSerializer


class CustomTokenObtainPairView(TokenObtainPairView):
    @extend_schema(tags=['Auth'], summary='Login', description='Login')
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


class CustomTokenRefreshView(TokenRefreshView):
    @extend_schema(tags=['Auth'], summary='Refresh Token', description='Refresh Token')
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


class RegisterView(APIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    @extend_schema(
        tags=['Auth'],
        summary='Register',
        description='Register',
        request=RegisterSerializer,
        responses={201: RegisterResponseSerializer}
    )
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        if serializer.is_valid():
            user = serializer.save()
            response_serializer = RegisterResponseSerializer(user)
            return Response(response_serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

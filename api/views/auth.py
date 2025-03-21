from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from drf_spectacular.utils import extend_schema
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
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

    @extend_schema(
        tags=['Auth'],
        summary='Register',
        description='Register',
        request=RegisterSerializer,
        responses={201: RegisterResponseSerializer}
    )
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

from django.urls import path
from .views import UserDetailAPIView, CustomTokenObtainPairView, CustomTokenRefreshView, RegisterView

urlpatterns = [
    path('users/<int:pk>/', UserDetailAPIView.as_view(), name='user-detail'),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='register'),
]

    
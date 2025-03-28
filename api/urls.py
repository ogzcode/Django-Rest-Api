from django.urls import path
from .views.auth import CustomTokenObtainPairView, CustomTokenRefreshView, RegisterView
from .views.users import UserDetailAPIView, UserUpdateAPIView, UserDeleteAPIView, UserCompanyAPIView
from .views.type import TypeCreateView, TypeDeleteView, TypeUpdateView, TypeListView

urlpatterns = [
    # User
    path('users/<int:pk>', UserDetailAPIView.as_view(), name='user-detail'),
    path('users/update/<int:pk>', UserUpdateAPIView.as_view(), name='user-update'),
    path('users/delete/<int:pk>', UserDeleteAPIView.as_view(), name='user-delete'),
    path('users/company/<int:pk>', UserCompanyAPIView.as_view(), name='user-company'),

    # Auth
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='register'),

    # Type  
    path('types/', TypeListView.as_view(), name='type-list'),
    path('types/create/', TypeCreateView.as_view(), name='type-create'),
    path('types/delete/<int:pk>', TypeDeleteView.as_view(), name='type-delete'),
    path('types/update/<int:pk>', TypeUpdateView.as_view(), name='type-update'),
]

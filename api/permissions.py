from rest_framework.permissions import BasePermission

class IsOwnData(BasePermission):
    def has_permission(self, request, view):
        user_id = request.query_params.get('id')
        if not user_id or int(user_id) != request.user.id:
            return False
        return True
    
    def has_object_permission(self, request, view, obj):
        if hasattr(obj, 'user'):
            return obj.user == request.user
        elif hasattr(obj, 'id'):
            return obj.id == request.user.id
        return False
    
    

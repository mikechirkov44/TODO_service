from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet

from .models import User
from .serializer import UserModelSerializer, UserModelSerializerV20


class UserModelViewSet(GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin):

    queryset = User.objects.filter(is_active=True)

    def get_serializer_class(self):
        if self.request.version == '2.0':
            return UserModelSerializerV20
        return UserModelSerializer

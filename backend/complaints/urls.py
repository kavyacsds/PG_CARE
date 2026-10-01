from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import (
    RoomViewSet,
    ComplaintViewSet,
    dashboard_stats,
)


router = DefaultRouter()

router.register(
    "rooms",
    RoomViewSet
)

router.register(
    "complaints",
    ComplaintViewSet
)


urlpatterns = [
    path(
        "dashboard/",
        dashboard_stats
    ),
]

urlpatterns += router.urls
from rest_framework import viewsets
from .models import Room, Complaint
from .serializers import RoomSerializer, ComplaintSerializer


class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


class ComplaintViewSet(viewsets.ModelViewSet):
    queryset = Complaint.objects.all().order_by("-created_at")
    serializer_class = ComplaintSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Room, Complaint


@api_view(["GET"])
def dashboard_stats(request):

    total_rooms = Room.objects.count()

    open_issues = Complaint.objects.filter(
        status="submitted"
    ).count()

    in_progress = Complaint.objects.filter(
        status__in=["under_review", "assigned"]
    ).count()

    resolved = Complaint.objects.filter(
        status="resolved"
    ).count()

    return Response({
        "total_rooms": total_rooms,
        "open_issues": open_issues,
        "in_progress": in_progress,
        "resolved": resolved,
    })
from rest_framework import serializers
from .models import Room, Complaint


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = "__all__"


class ComplaintSerializer(serializers.ModelSerializer):
    room_number = serializers.CharField(
        source="room.room_number",
        read_only=True
    )

    class Meta:
        model = Complaint
        fields = [
            "id",
            "room",
            "room_number",
            "category",
            "issue_type",
            "priority",
            "description",
            "photo",
            "status",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "created_at",
            "updated_at",
        ]
from django.contrib import admin
from .models import Room, Complaint


@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ("room_number", "floor", "is_occupied")
    list_filter = ("floor", "is_occupied")


@admin.register(Complaint)
class ComplaintAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "room",
        "category",
        "issue_type",
        "priority",
        "status",
        "created_at",
    )

    list_filter = (
        "category",
        "priority",
        "status",
    )

    search_fields = (
        "issue_type",
        "description",
        "room__room_number",
    )
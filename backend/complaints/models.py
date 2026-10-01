from django.db import models




class Room(models.Model):
    room_number = models.CharField(max_length=10)
    floor = models.PositiveIntegerField()
    is_occupied = models.BooleanField(default=True)
    def __str__(self):
        return f"Room {self.room_number}"
class Complaint(models.Model):

    CATEGORY_CHOICES = [
        ("maintenance", "Maintenance"),
        ("cleaning", "Cleaning"),
        ("food", "Food"),
        ("technical", "Technical"),
        ("plumbing", "Plumbing"),
        ("room", "Room"),
        ("other", "Other"),
    ]

    PRIORITY_CHOICES = [
        ("low", "Low"),
        ("medium", "Medium"),
        ("high", "High"),
    ]

    STATUS_CHOICES = [
        ("submitted", "Submitted"),
        ("under_review", "Under Review"),
        ("assigned", "Assigned"),
        ("resolved", "Resolved"),
    ]

    room = models.ForeignKey(
        Room,
        on_delete=models.CASCADE,
        related_name="complaints"
    )

    category = models.CharField(
        max_length=30,
        choices=CATEGORY_CHOICES
    )

    issue_type = models.CharField(max_length=100)

    priority = models.CharField(
        max_length=10,
        choices=PRIORITY_CHOICES,
        default="medium"
    )

    description = models.TextField()

    photo = models.ImageField(
        upload_to="complaints/",
        blank=True,
        null=True
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="submitted"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.category} - Room {self.room.room_number}"


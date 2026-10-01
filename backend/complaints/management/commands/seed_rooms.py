from django.core.management.base import BaseCommand
from complaints.models import Room


class Command(BaseCommand):
    help = "Create the default PG rooms"

    def handle(self, *args, **kwargs):

        rooms = [
            ("101", 1),
            ("102", 1),
            ("103", 1),
            ("104", 1),
            ("105", 1),
            ("106", 2),
            ("107", 2),
            ("108", 2),
            ("109", 2),
            ("110", 2),
        ]

        for room_number, floor in rooms:
            Room.objects.get_or_create(
                room_number=room_number,
                defaults={
                    "floor": floor,
                    "is_occupied": True,
                }
            )

        self.stdout.write(
            self.style.SUCCESS("10 rooms created successfully!")
        )
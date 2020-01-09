from django.db import models


class Developer(models.Model):

    name = models.TextField()
    country = models.TextField()
    employee_count = models.PositiveIntegerField()
    foundation_date = models.DateField()
    ceo_name = models.TextField(blank=True)

    def __str__(self):
        return self.name


class Game(models.Model):

    CHOICES = (
        ('a', 'Action'),
        ('r', 'RPG'),
        ('j', 'Jump n Run')
    )

    title = models.TextField()
    price = models.PositiveIntegerField()
    genre = models.CharField(max_length=1, choices=CHOICES, null=True)
    release_date = models.DateField()
    developer = models.ForeignKey(Developer, on_delete=models.CASCADE, null=True)
    platform = models.ManyToManyField('Platform', blank=True)

    def __str__(self):
        return self.title


class Platform(models.Model):

    name = models.TextField()
    release_date = models.DateField()
    developer = models.ForeignKey(Developer, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.developer.name + ' ' + self.name

# Create your models here.


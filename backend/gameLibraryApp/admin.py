from django.contrib import admin
from gameLibraryApp.models import Game, Developer, Platform


class GameAdmin(admin.ModelAdmin):

    pass

class DeveloperAdmin(admin.ModelAdmin):

    pass

class PlatformAdmin(admin.ModelAdmin):

    pass

admin.site.register(Game, GameAdmin)
admin.site.register(Developer, DeveloperAdmin)
admin.site.register(Platform, PlatformAdmin)

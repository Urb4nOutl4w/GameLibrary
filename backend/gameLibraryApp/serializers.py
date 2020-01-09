from rest_framework import serializers

from gameLibraryApp.models import Game, Developer, Platform

class DeveloperOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Developer
        fields = ['id', 'name']


class PlatformOptionSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = Platform
        fields = ['id', 'full_name']

    def get_full_name(self, obj):
        return ' '.join(filter(None, (obj.developer.name, obj.name)))


class GameListSerializer(serializers.ModelSerializer):
    platform_name = serializers.SerializerMethodField()

    class Meta:
        model = Game
        fields = ['id', 'title', 'genre', 'platform_name']

    def get_platform_name(self, obj):
        platform_names = ''
        for p in obj.platform.all():
            platform_names += p.name + ', '
        return platform_names


class GameFormSerializer(serializers.ModelSerializer):

    class Meta:
        model = Game
        fields = '__all__'

class DeveloperListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Developer
        fields = ['id', 'name', 'foundation_date', 'ceo_name']


class DeveloperFormSerializer(serializers.ModelSerializer):

    class Meta:
        model = Developer
        fields = '__all__'

from django.shortcuts import render

from django.contrib.auth.decorators import permission_required
from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework.response import Response

from gameLibraryApp.models import Game, Developer, Platform
from gameLibraryApp.serializers import DeveloperOptionSerializer, PlatformOptionSerializer, GameListSerializer, \
    GameFormSerializer, DeveloperListSerializer, DeveloperFormSerializer


@swagger_auto_schema(method='GET', responses={200: DeveloperOptionSerializer(many=True)})
@api_view(['GET'])
def developer_option_list(request):
    developers = Developer.objects.all()
    serializer = DeveloperOptionSerializer(developers, many=True)
    return Response(serializer.data)

@swagger_auto_schema(method='GET', responses={200: PlatformOptionSerializer(many=True)})
@api_view(['GET'])
def platform_option_list(request):
    platforms = Platform.objects.all()
    serializer = PlatformOptionSerializer(platforms, many=True)
    return Response(serializer.data)


@swagger_auto_schema(method='GET', responses={200: GameListSerializer(many=True)})
@api_view(['GET'])
@permission_required('gameLibraryApp.view_game', raise_exception=True)
def games_list(request):
    games = Game.objects.all()
    serializer = GameListSerializer(games, many=True)
    return Response(serializer.data)


@swagger_auto_schema(method='POST', request_body=GameFormSerializer, responses={200: GameFormSerializer()})
@api_view(['POST'])
@permission_required('gameLibraryApp.add_game', raise_exception=True)
def game_form_create(request):
    data = JSONParser().parse(request)
    serializer = GameFormSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@swagger_auto_schema(method='PUT', request_body=GameFormSerializer, responses={200,GameFormSerializer()})
@api_view(['PUT'])
@permission_required('gameLibraryApp.change_game', raise_exception=True)
def game_form_update(request, pk):
    try:
        game = Game.objects.get(pk=pk)
    except Game.DoesNotExist:
        return Response({'error': 'Game does not exist.'}, status=404)

    data = JSONParser().parse(request)
    serializer = GameFormSerializer(game, data=data)
    if serializer.is_valid():
        serializer.save()
        return  Response(serializer.data)
    return Response(serializer.errors, status=400)


@swagger_auto_schema(method='GET', responses={200: GameFormSerializer()})
@api_view(['GET'])
@permission_required('gameLibraryApp.view_game', raise_exception=True)
def game_form_get(request, pk):
    try:
        game = Game.objects.get(pk=pk)
    except Game.DoesNotExist:
        return Response({'error': 'Game does not exist.'}, status=404)

    serializer = GameFormSerializer(game)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_required('gameLibraryApp.delete_game', raise_exception=True)
def game_delete(request, pk):
    try:
        game = Game.objects.get(pk=pk)
    except Game.DoesNotExist:
        return Response({'error': 'Game does not exist.'}, status=404)
    game.delete()
    return  Response(status=204)


# Create your views here.



@swagger_auto_schema(method='GET', responses={200: DeveloperListSerializer(many=True)})
@api_view(['GET'])
@permission_required('gameLibraryApp.view_developer', raise_exception=True)
def developers_list(request):
    developers = Developer.objects.all()
    serializer = DeveloperListSerializer(developers, many=True)
    return Response(serializer.data)


@swagger_auto_schema(method='POST', request_body=DeveloperFormSerializer, responses={200: DeveloperFormSerializer()})
@api_view(['POST'])
@permission_required('gameLibraryApp.add_developer', raise_exception=True)
def developer_form_create(request):
    data = JSONParser().parse(request)
    serializer = DeveloperFormSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@swagger_auto_schema(method='PUT', request_body=DeveloperFormSerializer, responses={200,DeveloperFormSerializer()})
@api_view(['PUT'])
@permission_required('gameLibraryApp.change_developer', raise_exception=True)
def developer_form_update(request, pk):
    try:
        developer = Developer.objects.get(pk=pk)
    except Developer.DoesNotExist:
        return Response({'error': 'Developer does not exist.'}, status=404)

    data = JSONParser().parse(request)
    serializer = DeveloperFormSerializer(developer, data=data)
    if serializer.is_valid():
        serializer.save()
        return  Response(serializer.data)
    return Response(serializer.errors, status=400)


@swagger_auto_schema(method='GET', responses={200: DeveloperFormSerializer()})
@api_view(['GET'])
@permission_required('gameLibraryApp.view_developer', raise_exception=True)
def developer_form_get(request, pk):
    try:
        developer = Developer.objects.get(pk=pk)
    except Developer.DoesNotExist:
        return Response({'error': 'Developer does not exist.'}, status=404)

    serializer = DeveloperFormSerializer(developer)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_required('gameLibraryApp.delete_developer', raise_exception=True)
def developer_delete(request, pk):
    try:
        developer = Developer.objects.get(pk=pk)
    except Developer.DoesNotExist:
        return Response({'error': 'Developer does not exist.'}, status=404)
    developer.delete()
    return  Response(status=204)



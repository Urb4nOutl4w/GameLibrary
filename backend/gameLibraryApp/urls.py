from django.conf.urls import url
from django.urls import path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view

from rest_framework_jwt.views import obtain_jwt_token

from django.contrib import admin
from . import views

schema_view = get_schema_view(
    openapi.Info(
        title='API',
        default_version='v1'
    ),
)

urlpatterns = [
    path('admin/', admin.site.urls),

    path('developer/options', views.developer_option_list),
    path('platform/options', views.platform_option_list),
    path('game/list', views.games_list),
    path('game/create', views.game_form_create),
    path('game/<int:pk>/get', views.game_form_get),
    path('game/<int:pk>/update', views.game_form_update),
    path('game/<int:pk>/delete', views.game_delete),

    path('developer/list', views.developers_list),
    path('developer/create', views.developer_form_create),
    path('developer/<int:pk>/get', views.developer_form_get),
    path('developer/<int:pk>/update', views.developer_form_update),
    path('developer/<int:pk>/delete', views.developer_delete),

    url(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    url(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    url(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

    url(r'^api-token-auth/', obtain_jwt_token),
]

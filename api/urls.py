from django.urls import path,re_path
from rest_framework.routers import DefaultRouter
from api.views import *
from django.urls import path, include
from . import views

router = DefaultRouter()
router.register(r'category',CategoryViewSet,'category'),
router.register(r'tag',TagViewSet,'tag')
router.register(r'article',ArticleViewSet,'article')
router.register(r'comment',CommentViewSet,'comment')
router.register(r'view',ViewViewSet,'view')

urlpatterns = [
    path('', include(router.urls)),
    re_path('signup', views.signup),
    re_path('login', views.login),
    re_path('test_token', views.test_token),
]
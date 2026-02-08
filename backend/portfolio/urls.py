from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, PhotoViewSet, TeamMemberViewSet, BlogPostViewSet, ContactMessageViewSet, index, portfolio, about, blog, contact

router = DefaultRouter()
router.register('categories', CategoryViewSet)
router.register('photos', PhotoViewSet)
router.register('team', TeamMemberViewSet)
router.register('blog', BlogPostViewSet)
router.register('contact', ContactMessageViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

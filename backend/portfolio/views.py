from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Category, Photo, TeamMember, BlogPost, ContactMessage
from .serializers import CategorySerializer, PhotoSerializer, TeamMemberSerializer, BlogPostSerializer, ContactMessageSerializer

# HTML Views
def index(request):
    return render(request, 'index.html')

def portfolio(request):
    return render(request, 'portfolio.html')

def about(request):
    return render(request, 'about.html')

def blog(request):
    return render(request, 'blog.html')

def contact(request):
    return render(request, 'contact.html')

# API ViewSets
class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class PhotoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
    
    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        photo = self.get_object()
        photo.likes += 1
        photo.save()
        return Response({'likes': photo.likes})

class TeamMemberViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer

class BlogPostViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer

class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    http_method_names = ['get', 'post']

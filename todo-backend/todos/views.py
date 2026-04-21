from django.shortcuts import render
from rest_framework import generics
from .models import Todo
from .serializers import TodoSerializer
from drf_spectacular.utils import extend_schema

# Create your views here. 


# List, Create 
class TodoListCreateView(generics.ListCreateAPIView):
  queryset = Todo.objects.all() 
  serializer_class = TodoSerializer 


# Retrive, Update, Delete
class TodoDetailView(generics.RetrieveUpdateDestroyAPIView): 
  queryset = Todo.objects.all() 
  serializer_class = TodoSerializer

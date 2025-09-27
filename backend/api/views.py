from django.shortcuts import render
from rest_framework import generics
from .models import Transaction
from .serializers import TransactionSerializer

class Transacti0onListCreateView(generics.ListCreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer 
    
class Transaction_r_u_d_View(generics.RetrieveUpdateDestroyAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    lookup_field = 'id'
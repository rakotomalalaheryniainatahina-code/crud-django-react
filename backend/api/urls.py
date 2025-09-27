from django.urls import path
from . import views
urlpatterns = [
    path('transaction/', views.Transacti0onListCreateView.as_view()),
    path('transaction/<uuid:id>/', views.Transaction_r_u_d_View.as_view()),
]
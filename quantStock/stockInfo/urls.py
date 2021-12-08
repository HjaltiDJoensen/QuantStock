from django.urls import path, include
from rest_framework.routers import DefaultRouter
from stockInfo import views

# Create a router and register our viewsets with it.
router = DefaultRouter()
# router.register(r"snippets", views.SnippetViewSet)
router.register(r"users", views.UserViewSet)
# router.register(r"example", views.ExampleViewSet, basename="example")
router.register(r"stock", views.StockPriceViewSet, basename="stock")
router.register(r"company", views.CompanyViewSet, basename="company")
# The API URLs are now determined automatically by the router.
urlpatterns = [
    path("", include(router.urls)),
]

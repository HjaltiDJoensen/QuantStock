from django.contrib.auth.models import User
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework import renderers
from rest_framework import viewsets
from rest_framework.decorators import action
import requests
import yfinance as yf
from stockInfo.models import Snippet
from stockInfo.models import Company
from stockInfo.serializers import SnippetSerializer
from stockInfo.permissions import IsOwnerOrReadOnly
from stockInfo.serializers import UserSerializer
from stockInfo.serializers import ExampleSerializer
from stockInfo.serializers import StockPriceSerializer
from stockInfo.serializers import CompanySerializer
from stockInfo.helpers.pagination import StockPricePagination
from stockInfo.helpers.pagination import CompanyPagination


class UserViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list` and `retrieve` actions.
    """

    queryset = User.objects.all()
    serializer_class = UserSerializer


class SnippetViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    Additionally we also provide an extra `highlight` action.
    """

    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    @action(detail=True, renderer_classes=[renderers.StaticHTMLRenderer])
    def highlight(self, request, *args, **kwargs):
        snippet = self.get_object()
        return Response(snippet.highlighted)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ExampleViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing the accounts
    associated with the user.
    """

    serializer_class = ExampleSerializer
    # permission_classes = [IsAccountAdminOrReadOnly]

    def get_queryset(self):
        r = requests.get("http://127.0.0.1:8000/users/", timeout=10)
        if r.status_code == 200:
            data = r.json()["results"]
            result = ExampleSerializer(data, many=True).data
            return result
        else:
            return Response({"error": "Request failed"}, status=r.status_code)


class StockPriceViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = StockPriceSerializer
    pagination_class = StockPricePagination

    def get_queryset(self):
        company = self.request.query_params.get("company", None)
        period = self.request.query_params.get("period", None)
        interval = self.request.query_params.get("interval", None)
        """
        Example:
            company = "MSFT"
            period = "1d"
            interval = "60m"
        
        # valid periods: 1d,5d,1mo,3mo,6mo,1y,2y,5y,10y,ytd,max
        # valid intervals: 1m,2m,5m,15m,30m,60m,90m,1h,1d,5d,1wk,1mo,3mo

        Exmaple URL:
            http://127.0.0.1:8000/stock/?company=MSFT&period=1d&interval=60m/
        """

        if company == None or period == None or interval == None:
            return []
        elif company[-1] == "/":
            company = company[:-1]
        elif period[-1] == "/":
            period = period[:-1]
        elif interval[-1] == "/":
            interval = interval[:-1]

        data = yf.download(tickers=company, period=period, interval=interval)
        # print(data)
        data.columns = ["open", "high", "low", "close", "adj_close", "volume"]
        data.index.names = ["datetime"]
        stockPrice = data.reset_index().to_dict("records")
        # print(stockPrice)
        # stockPrice = data.reset_index().to_dict(orient='list')

        # stockPrice["company"] = "MSFT"
        # stockPrice["period"] = "1d"
        # stockPrice["interval"] = "60m"
        # stockPrice = [stockPrice]

        if not data.empty:
            result = StockPriceSerializer(stockPrice, many=True).data
            return result
        else:
            return Response({"error": "Request failed"})


class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    pagination_class = CompanyPagination
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

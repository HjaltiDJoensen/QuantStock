from re import A
from rest_framework import serializers
import yfinance as yf
from stockInfo.models import Snippet, Company, LANGUAGE_CHOICES, STYLE_CHOICES
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    # snippets = serializers.PrimaryKeyRelatedField(
    #     many=True, queryset=Snippet.objects.all()
    # )

    class Meta:
        model = User
        fields = "__all__"
        # ["id", "username"]


class SnippetSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source="owner.username")

    class Meta:
        model = Snippet
        fields = ["id", "title", "code", "linenos", "language", "style", "owner"]


class ExampleSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    username = serializers.CharField()
    snippets = serializers.ListField(child=serializers.IntegerField())


class StockPriceSerializer(serializers.Serializer):
    datetime = serializers.DateTimeField()
    open = serializers.DecimalField(max_digits=None, decimal_places=4)
    high = serializers.DecimalField(max_digits=None, decimal_places=4)
    low = serializers.DecimalField(max_digits=None, decimal_places=4)
    close = serializers.DecimalField(max_digits=None, decimal_places=4)
    adj_close = serializers.DecimalField(max_digits=None, decimal_places=4)
    volume = serializers.DecimalField(max_digits=None, decimal_places=4)

    # Datetime = serializers.ListField(
    #     child = serializers.DateTimeField()
    # )
    # open = serializers.ListField(
    #     child = serializers.DecimalField(max_digits=None, decimal_places=4)
    # )
    # high = serializers.ListField(
    #     child = serializers.DecimalField(max_digits=None, decimal_places=4)
    # )
    # low = serializers.ListField(
    #     child = serializers.DecimalField(max_digits=None, decimal_places=4)
    # )
    # close = serializers.ListField(
    #     child = serializers.DecimalField(max_digits=None, decimal_places=4)
    # )
    # adj_close = serializers.ListField(
    #     child = serializers.DecimalField(max_digits=None, decimal_places=4)
    # )
    # volume = serializers.ListField(
    #     child = serializers.DecimalField(max_digits=None, decimal_places=4)
    # )


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ["name", "info"]

    def create(self, validated_data):
        name = validated_data.get("name", None)
        # print(name)
        info = yf.Ticker(name).info
        # print(info)
        if not ("longBusinessSummary" in info):
            raise serializers.ValidationError("Stock not found")
        else:
            return Company.objects.create(name=name, info=info)

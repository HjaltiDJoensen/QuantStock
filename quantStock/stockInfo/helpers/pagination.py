from rest_framework.pagination import PageNumberPagination


class StockPricePagination(PageNumberPagination):
    page_size = 10

    def paginate_queryset(self, queryset, request, view=None):
        if request.query_params.get("get_all", False) == "true":
            return None

        return super(StockPricePagination, self).paginate_queryset(
            queryset, request, view=view
        )


class CompanyPagination(PageNumberPagination):
    page_size = 1

    def paginate_queryset(self, queryset, request, view=None):
        if request.query_params.get("get_all", False) == "true":
            return None

        return super(CompanyPagination, self).paginate_queryset(
            queryset, request, view=view
        )

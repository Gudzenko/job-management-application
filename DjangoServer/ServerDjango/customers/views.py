from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from customers.models import Customer
from customers.serializers import *

from any_case import converts_keys


@api_view(['GET', 'POST'])
def customers_list(request):
    """
    List  customers, or create a new customer.
    """
    if request.method == 'GET':
        data = []
        next_page = 1
        previous_page = 1
        customers = Customer.objects.all()
        page = request.GET.get('page', 1)
        paginator = Paginator(customers, 10)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = CustomerSerializer(data, context={'request': request}, many=True)
        if data.has_next():
            next_page = data.next_page_number()
        if data.has_previous():
            previous_page = data.previous_page_number()

        return Response(converts_keys({'data': serializer.data, 'count': paginator.count, 'numpages': paginator.num_pages,
                         'nextlink': '/api/customers/?page=' + str(next_page),
                         'prevlink': '/api/customers/?page=' + str(previous_page)}, case='camel'))

    elif request.method == 'POST':
        serializer = CustomerSerializer(data=converts_keys(request.data, case='snake'))
        if serializer.is_valid():
            serializer.save()
            return Response(converts_keys(serializer.data, case='camel'), status=status.HTTP_201_CREATED)
        return Response(converts_keys(serializer.errors, case='camel'), status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def customers_detail(request, pk):
    """
    Retrieve, update or delete a customer by id/pk.
    """
    try:
        customer = Customer.objects.get(pk=pk)
    except Customer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CustomerSerializer(customer, context={'request': request})
        return Response(converts_keys(serializer.data, case='camel'))

    elif request.method == 'PUT':
        serializer = CustomerSerializer(customer, data=converts_keys(request.data, case='snake'), context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(converts_keys(serializer.data, case='camel'))
        return Response(converts_keys(serializer.errors, case='camel'), status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        customer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

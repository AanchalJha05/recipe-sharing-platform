from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Recipe_home, Ingredients,Favourite
from .serializers import RecipeSerilizer, CreateRecipeSerializer,RegisterSerializer,UserSerializer
from rest_framework.decorators import api_view,permission_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser,JSONParser

# Parsers tell Django how to read incoming request data.
# MultiPartParser : handles FormData with files/images
# FormParser      : handles normal form fields
# JSONParser      : handles JSON data (used in DELETE and other JSON requests)

parser_classes = [MultiPartParser, FormParser, JSONParser]
class RecipeAPI(APIView):
    permission_classes =[IsAuthenticated]
    parser_classes = [MultiPartParser,FormParser,JSONParser]

    def get(self, request):
        recipe_id = request.query_params.get("id")
        mine = request.query_params.get("mine")
        favourite = request.query_params.get("favourite")
        if recipe_id:
            try:
                recipe = Recipe_home.objects.get(id = recipe_id)
                serializer = RecipeSerilizer(recipe,context={"request":request})
                return Response({
                    "status":True,
                    "message":"recipe_fetched",
                    "data":serializer.data
                })
            except Recipe_home.DoesNotExist:
                return Response({
                    "status":"False",
                    "message":"Recipe not Found",
                    "data":{}
                },status=404)
        if mine=="true":
            queryset=Recipe_home.objects.filter(user=request.user)
        elif favourite == "true":
            queryset = Recipe_home.objects.filter(favourited_by__user=request.user).distinct()
        else:
            queryset=Recipe_home.objects.all()
            
        serializer=RecipeSerilizer(
            queryset,
            many=True,
            context={"request":request}

        )
        return Response({
            "status":True,
            "message": "data Fetched",
            "data":serializer.data
        })

    def post(self, request):
        print("USER:", request.user)
        print("AUTH:", request.auth)
        data = request.data

        serializer = CreateRecipeSerializer(data=data)

        if not serializer.is_valid():
            return Response({
                "status": False,
                "message": "data not create",
                "data": serializer.errors
            })

        serializer.save(user=request.user)

        return Response({
            "status": True,
            "message": "data created",
            "data": {}
        })

    def delete(self, request):
        data = request.data
        recipe = Recipe_home.objects.filter(id=data.get('id'),user=request.user)

        if recipe.exists():
            recipe.delete()
            return Response({
                "status": True,
                "message": "data delete",
                "data": {}
            })

        return Response({
            "status": False,
            "message": "data not found",
            "data": {}
        })

    
    def put(self, request):
        data = request.data
        recipe_id = data.get("id")

        try:
            recipe = Recipe_home.objects.get(id=recipe_id)

            serializer = CreateRecipeSerializer(recipe, data=data)

            if serializer.is_valid():
                serializer.save()
                return Response({
                    "status": True,
                    "message": "data updated",
                    "data": {}
                })

            return Response({
                "status": False,
                "message": "validation error",
                "data": serializer.errors
            })

        except Recipe_home.DoesNotExist:
            return Response({
                "status": False,
                "message": "recipe not found",
                "data": {}
            })  

@api_view(['POST'])
def register_view(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({
            "message":"user created Successfully",
            "user":UserSerializer(user).data
        },status = status.HTTP_201_CREATED)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login_view(request):
    username = request.data.get("username")
    password = request.data.get("password")
    user = authenticate(username = username,password = password)
    if user is None:
        return Response({"error":"Invalid credentials"},status =status.HTTP_400_BAD_REQUEST)
    refresh = RefreshToken.for_user(user)
    return Response({
        "access":str(refresh.access_token),
        "refresh":str(refresh)
    })

class FavouriteAPI(APIView):
    permission_classes =[IsAuthenticated]
    def post(self,request):
        recipe_id = request.data.get("recipe_id")
        try:
            recipe = Recipe_home.objects.get(id =recipe_id)
        except Recipe_home.DoesNotExist:
            return Response({
                "status":False,
                "message":"Recipe not Found"

            },status=404)
        favourite = Favourite.objects.filter(user=request.user,recipe=recipe)
        if favourite.exists():
            favourite.delete()

            return Response({
                "status":True,
                "message":"Removed from favourites",
                "is_favourite":False
            })
        Favourite.objects.create(user =request.user,recipe =recipe)
        return Response({
            "status":True,
            "message":"Added tp Favourite",
            "is_favourite":True
        })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard(request):
    recipes = Recipe_home.objects.filter(user= request.user)
    total = recipes.count()
    veg = recipes.filter(Recipe_type ="Vegetarian").count()
    nonveg=recipes.filter(Recipe_type = "Non-Vegetarian").count()
    favourite = Favourite.objects.filter(user = request.user).count()
    recent_recipes =recipes.order_by("-id")[:5]
    recent_data = RecipeSerilizer(recent_recipes,many=True,context={"request":request},).data
    favourite_recipe = Recipe_home.objects.filter(favourited_by__user= request.user).distinct()[:3]
    favourite_data = RecipeSerilizer(favourite_recipe,many=True,context ={"request":request},).data
    return Response({
        "total":total,
        "veg":veg,
        "nonveg":nonveg,
        "favourite":favourite,
        "recent": recent_data,
        "favourites":favourite_data,

    }) 




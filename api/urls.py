#  api folder mene khud bnaya hai not from cmd (jese normal files bnate h vese and baki 7th line tk urls.py cookpad ka copy paste kra hai)



from recipes.views import RecipeAPI,register_view,login_view,RecipeAPI,FavouriteAPI,dashboard
from django.urls import path

urlpatterns = [
    path('recipes/',RecipeAPI.as_view()),# bas yaha admin ki jagah change kiya h hamne
    path('register/',register_view,name="register"),
    path('login/',login_view,name="login"),
    path('favourite/',FavouriteAPI.as_view()),
    path('dashboard/',dashboard)
]

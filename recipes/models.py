from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Recipe_home(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name="recipes")
    Recipe_name = models.CharField(max_length = 100,db_index=True)
    Recipe_description = models.TextField()
    Recipe_image =models. ImageField(upload_to="Receipes/")
    Recipe_slug = models.SlugField(unique=True,blank=True)
    Recipe_type = models.CharField(max_length=100 ,choices=(("Vegetarian","Vegetarian"),("Non-Vegetarian","Non-Vegetarian")))


class Ingredients(models.Model):
    Recipe = models.ForeignKey(Recipe_home,on_delete=models.CASCADE,related_name = "Recipe_ingredients")
    Ingredients_name = models.CharField(max_length=100)


class Favourite(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name="favourites")
    recipe=models.ForeignKey(Recipe_home,on_delete=models.CASCADE,related_name="favourited_by")
    class Meta:
        unique_together=("user","recipe")


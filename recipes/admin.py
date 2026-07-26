from django.contrib import admin

# Register your models here.
from .models import Recipe_home,Ingredients

admin.site.register(Recipe_home)
admin.site.register(Ingredients)





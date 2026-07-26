from rest_framework import serializers
from .models import Recipe_home,Ingredients,Favourite
from django.template.defaultfilters import slugify
import uuid
from django.contrib.auth.models import User;
 # ya agr kuch hi chij leni h sab nhi then ese kr skte hai  [recipe_name,recipe_description]
class IngridentSerilizer(serializers.ModelSerializer):
    class Meta:
        model = Ingredients
        fields = '__all__'
class RecipeSerilizer(serializers.ModelSerializer):
    Recipe_image = serializers.SerializerMethodField()
    is_favourite=serializers.SerializerMethodField() # create read-only, computed fields that don't map directly to a database model
    class Meta:
        model = Recipe_home
        fields = '__all__'
    
    def get_Recipe_image(self,obj):
        request = self.context.get("request")
        
        if obj.Recipe_image:
            if request:
                return request.build_absolute_uri(obj.Recipe_image.url)
            return obj.Recipe_image.url
        return None
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['ingredients'] = IngridentSerilizer(
            instance.Recipe_ingredients.all(),many = True).data
        return data 
    
    def get_is_favourite(self,obj):
        request = self.context.get("request")
        if request and request.user.is_authenticated:
            return Favourite.objects.filter(user=request.user,recipe =obj).exists()
        return False


class CreateRecipeSerializer(serializers.ModelSerializer):
    Recipe_slug = serializers.CharField(allow_null=True,required = False )
    Recipe_ingredients = serializers.ListField(
        child = serializers.CharField()
    )
    class Meta:
        model = Recipe_home
        fields = '__all__'
        read_only_fields=["user"]
        


    
    def create(self, validated_data):
        user = validated_data.pop("user")
        Recipe_slug= slugify(validated_data.get('Recipe_name',''))
        if Recipe_home.objects.filter(Recipe_slug=Recipe_slug).exists():
            Recipe_slug=f"{Recipe_slug}_{str(uuid.uuid4()).split('-')[0]}"

        ingredients = validated_data.pop('Recipe_ingredients')
        image = validated_data.get('Recipe_image')
        recipe = Recipe_home.objects.create(
            user=user,
            Recipe_name=validated_data['Recipe_name'],
            Recipe_description=validated_data['Recipe_description'],
            #Recipe_image =validated_data['Recipe_image'],
            Recipe_slug =Recipe_slug,
            Recipe_type = validated_data['Recipe_type'],
            Recipe_image = image,

        )
        for ri in ingredients:
            Ingredients.objects.create(
                Recipe = recipe,
                Ingredients_name= ri
            )
        return recipe
    def update(self, instance, validated_data):
        instance.Recipe_name = validated_data.get('Recipe_name', instance.Recipe_name)
        instance.Recipe_description = validated_data.get('Recipe_description', instance.Recipe_description)
        instance.Recipe_type = validated_data.get('Recipe_type', instance.Recipe_type)
        if 'Recipe_image' in validated_data:
            instance.Recipe_image = validated_data['Recipe_image']

        if 'Recipe_name' in validated_data:
            from django.template.defaultfilters import slugify
            import uuid
            new_slug = slugify(validated_data['Recipe_name'])

            if Recipe_home.objects.filter(Recipe_slug=new_slug).exclude(id=instance.id).exists():
                new_slug = f"{new_slug}_{str(uuid.uuid4()).split('-')[0]}"

            instance.Recipe_slug = new_slug

        instance.save()


        if 'Recipe_ingredients' in validated_data:
            ingredients = validated_data.pop('Recipe_ingredients')

        
            instance.Recipe_ingredients.all().delete()

        
            for ing in ingredients:
                Ingredients.objects.create(
                    Recipe=instance,
                    Ingredients_name=ing
                )

        return instance
    
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','email']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only = True)
    password2 = serializers.CharField(write_only= True)
    class Meta:
        model = User
        fields = ['username','email','password','password2']
    def validate(self,data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError("passwords donot match")
        return data
    def create(self, validated_data):
        validated_data.pop('password2')
        user = User.objects.create_user(
            username = validated_data['username'],
            email = validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user


    
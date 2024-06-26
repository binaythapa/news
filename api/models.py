from django.db import models
from django.contrib.auth.models import User
from django.db.models import UniqueConstraint


class Category(models.Model):
    #id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True)
    #is_menu = models.BooleanField(default=False)  # New field added

    def __str__(self):
        return self.name  


class Tag(models.Model):
    #id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Article(models.Model):
    #id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200)
    content = models.TextField()
    #author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='authored_articles')
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    tags = models.ManyToManyField(Tag,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    views = models.IntegerField(default=0)
    #likes = models.ManyToManyField(User, blank=True)
    image = models.ImageField(upload_to='article_images/', blank=True)

    def __str__(self):
        return self.title

    def total_likes(self):
        return self.likes.count()


class Comment(models.Model):
    #author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments')
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.article.title}'

class View(models.Model):       
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    count = models.IntegerField(default=0)

    def __str__(self):
        return f'{self.article}'


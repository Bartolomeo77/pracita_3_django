# Generated by Django 4.1.3 on 2022-11-15 18:15

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Serie',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('release_date', models.DateField()),
                ('dni', models.IntegerField(default=0)),
                ('perfil', models.CharField(choices=[('frontend,', 'frontend,'), ('backend', 'backend')], max_length=10)),
                ('nivel', models.CharField(choices=[('junior', 'Junior'), ('semisenior', 'Semisenior'), ('senior', 'Senior')], max_length=10)),
            ],
        ),
    ]

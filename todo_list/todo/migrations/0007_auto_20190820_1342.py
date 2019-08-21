# Generated by Django 2.2.4 on 2019-08-20 13:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0006_delete_profileuser'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='todoitem',
            name='end_date',
        ),
        migrations.RemoveField(
            model_name='todoitem',
            name='start_date',
        ),
        migrations.AddField(
            model_name='todoitem',
            name='date_event',
            field=models.DateField(blank=True, null=True),
        ),
    ]

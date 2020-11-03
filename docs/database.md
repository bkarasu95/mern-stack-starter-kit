# DATABASE

## Migrating

we use migrating for better data structure. so if you have newly installed the starter kit, i recommend the migrate.

```shellscript
    migrate-mongo up
```

If you want create new migration, run

```shellscript
    migrate-mongo create "<your_migration>"
```

We don't/can't migrate the schema, because nature of mongodb. So use migration only for data changing in exists schema or new data inserting(only required recommended) to collection.

## Model Structure

By default some features would do its jobs automatically. But you have to follow some rules. 

1. Automatic URL: If there is **slug** and **name** fields in your model, system assigns the slug from name as seo friendly url, you can set the slug manually if you want.
2. Images: If there is **images** field in your request.body object, system processes the image, moves the files to server folder and saves child as **images** field to its model.
# DATABASE

## Migrating

We use migrating for better data structure.

```shellscript
    migrate-mongo up
```

If you want create new migration, run

```shellscript
    migrate-mongo create "<your_migration>"
```

## Seeding

You can generate the seed file by the cli:

```shellscript
    node cli make:seed <class>
```

You can create the seed without using cli for sure, but I don't recommend it because of you may miss some rules that needs for works correctly.

You can run the seed by using cli:

```shellscript
    node cli db:seed <class>
```

Seed classes gets from server/database/seeds folder.

If you fill empty collection. I recommend to use mongoose for first data adding, it creates the collection indexes etc., after that you can safely use mongodb functions directly.

## Model Structure

By default some features would do its jobs automatically. But you have to follow some rules.

1. Automatic URL: If there is **slug** and **name** fields in your model, system assigns the slug from name as seo friendly url, you can set the slug manually if you want.
2. Images: If there is **images** field in your request.body object, system processes the image, moves the files to server folder and saves child as **images** field to its model.

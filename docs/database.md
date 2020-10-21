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

These are some mocks of env variables used to make drizzle work with supabase DB when doing integration/browser testing

env/static/private is _SECRET_ and should _NOT_ be exposed since it has env variables. It is part of the gitignore and should stay that way. Otherwise passwords might go into version control. Perhaps there is a better fix for this but atm I dunno ¯\_(ツ)_/¯ 

Tread with caution!
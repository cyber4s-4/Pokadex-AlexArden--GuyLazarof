# Heroku deploy

## First deploy
1. Build
```
npm run deploy
```

2. Open `"./deploy"` folder

3. Init git repo:
```
git init
```

4. Login to heroku: (In case you didn't do it earlier)
```
heroku login
```

5. Create heroku project: (In case you didn't do it earlier)
```
heroku create <project-name>
```

6. Create heroku remote: (Replace `<project-name>` with name of your project)
```
heroku git:remote -a <project-name>
```

7. Commit last changes: (Replace `"My new commit"` with your message)
```
git add -A
git commit -m "My new commit"
```

8. Push changes:
```
git push heroku master -f
```

## Next deploys:
1. Build
```
npm run deploy
```
2. Open `"./deploy"` folder
3. Commit last changes: (Replace `"My new commit"` with your message)
```
git add -A
git commit -m "My new commit"
```
4. Push changes:
```
git push heroku master
```
postgres://bjfrpifwleolyv:29a4e1823ca16c560831d9f5aa974594c578c4900216d89f2d1163f9db756ebb@ec2-34-235-31-124.compute-1.amazonaws.com:5432/d5fv2r42the16m
```shell
curl http://localhost:3000/posts?userId=u1&userId=u22

# new
curl \
-H "Content-Type: application/json" \
-X POST \
-d '{"title":"posted title","content":"posted content","userId":"u1"}' \
http://localhost:3000/posts

# edit
curl \
-H "Content-Type: application/json" \
-X PUT \
-d '{"title":"posted title edited","content":"posted content edited"}' \
http://localhost:3000/posts/NdGRj7i # replece the id you want to edit
```

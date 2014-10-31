jacob
=====

a json format validation tool


##use case

```javascript
doc_validate = jacob.define("doc", {
    "name": String,
    "tags": [String],
    "comments": [String],
    "author": {
        "name": String,
        "github": String
    }
});
doc_validate({
    "name": "jacob",
    "tags": ["json", "validation"],
    "comments": [],
    "author": {"name": "mqli", "github": "github.com/mqli"}
});//true

```







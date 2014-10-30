jacob
=====

a json format validation tool


##use case

```javascript
var doc_validate = jacob.define("doc", {"name": String,"tags": [String],"comments":[String],});
number_array([1,2]);//true
number_array([1,'2']);//false
```







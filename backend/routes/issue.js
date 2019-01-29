var express = require('express');
var mongoose = require('mongoose')



let maxissue = 0
var router = express.Router();
var myCollSchema = new mongoose.Schema({
         id: Number,
         description: String,
         status: String,
         serverity: String,
         createdDate: String,
         resolvedDate: String,
        }); // simple schema

      
var coll = mongoose.model('coll', myCollSchema, 'myCollection');

router.get('/',function(req,res,next){
        let issue;
        coll.find({}).then(data => {
                issue = data;
                maxissue = issue.length;
                console.log(maxissue)
                res.status(200).json({
                        message: "Issues fetched successfully!",
                        issue: issue
                      });
        }).catch(err => console.log("error : -",err))
                
        
    
})
router.post("/create", (req, res, next) => {
        const id = Math.max(...issues.map(i => i.id))
  const issue = req.body;
  issue.id = id + 1;
  var col = new coll(issue);
  col.save(function (err, data) {
        if (err)
            res.send(err);
        else {
            console.log(data);
            res.status(201).json({
                message: 'Issue added successfully'
              });
        }
    })
  
});
router.delete("/delete/:id",(req,res,next) => {
        const id = req.params.id
        coll.remove({id:id}).then(data =>{
                res.status(200).json({message: 'Issue Deleted'})
        })
        //issues = issues.filter(item => item.id != id)

})

router.put("/update/:id", (req,res,next) => {
        coll.updateOne({id: req.params.id}, req.body).then(result => {
                res.status(200).json({message: 'Issue Updated'})
        })
        


})

module.exports = router;
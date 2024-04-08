export default class ApiFeature{
    constructor(mongooseQuery,queryString){
 this.mongooseQuery = mongooseQuery
 this.queryString = queryString
    }
    pagination(){
        let limit = 5
        let page = this.queryString.page*1 || 1
        if(this.queryString<=0)page=1
        let skip = (page-1)*limit
        this.page =page
        this.mongooseQuery.skip(skip).limit(limit)
        return this;
    }

    filter(){
        //2-filter
    let filterObj ={...this.queryString} //NOTE: take a deep copy of queryString
    
    const excludedQuery = ['page','sort','keyword','fields']
    excludedQuery.forEach((q)=>{
        delete filterObj[q]
    })
     filterObj = JSON.stringify(filterObj)
     filterObj = filterObj.replace(/\bgte|gt|lt|lte\b/g,match=>`$${match}`)
    filterObj = JSON.parse(filterObj)
    this.mongooseQuery.find(filterObj)
    return this ;
    }

    sort(){
        //3-sort
    if(this.queryString.sort){
        let sortBy = this.queryString.sort.split(",").join(" ") //["-price","sold"] => -price sold
        this.mongooseQuery.sort(sortBy) 
    }
    return this;
    }

    search(){
          //4-search
    if (this.queryString.keyword) {
        this.mongooseQuery.find({ //you can use multi find
        $or:[ {name:{$regex:this.queryString.keyword,$options:"i"}},{description:{$regex:this.queryString.keyword,$options:"i"}},
        ]
        })
    }
    return this;
    }

    fields(){
        if(this.queryString.fields){
            let fields = this.queryString.fields.split(",").join(" ") //["-price","sold"] => -price sold
            this.mongooseQuery.select(fields) 
        }
        return this;
    }
}

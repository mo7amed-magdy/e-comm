

export class ApiFeatures{

    constructor(mongooseQuery,searchQuery){
        this.query = mongooseQuery;
        this.searchQuery = searchQuery;
    }

    pagination(){
        let pageNumber = this.searchQuery.page*1 ||1
        if (pageNumber <= 0) pageNumber = 1
        let limit = this.searchQuery.limit || 8 
        let skip = (pageNumber - 1) * limit
        this.query.skip(skip).limit(limit)
        this.pageNumber = pageNumber
        return this
    }
    
    sort(){
        if (this.searchQuery.sort){
            let sortArr = this.searchQuery.sort.split(',').join(' ')
            this.query.sort(sortArr)
        }
        return this
    }

    filter(){
        let filterObj = {...this.searchQuery}
        let excluded = ['page','sort','fields','keyword','limit']
        excluded.forEach(key=> delete filterObj[key])
        filterObj = JSON.stringify(filterObj)
        filterObj = filterObj.replace(/(gt|gte|lt|lte)/g,(match)=> "$"+match )
        filterObj = JSON.parse(filterObj)
        this.query.find(filterObj)
        return this
    }

    fields(){
        if (this.searchQuery.fields){
            let fields = this.searchQuery.fields.split(',').join(' ')
            this.query.select(fields)
        }
        return this
    }
    search(f1, f2) {
        if (this.searchQuery.keyword) {
            const regex = new RegExp(this.searchQuery.keyword, 'i'); // 'i' makes it case-insensitive
    
            this.query = this.query.find({
                $or: [
                    { [f1]: { $regex: regex } },
                    { [f2]: { $regex: regex } }
                ]
            });
        }
        return this;
    }
    
}
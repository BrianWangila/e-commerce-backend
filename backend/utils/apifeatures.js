class APIfeatures {
    constructor(query,queryString){
        this.query = query;
        this.queryString = queryString;
    }

    search(){
        const keyword = this.queryString.keyword ? {
            name:{
                $regex: this.queryString.keyword,
                $options:"i"
            },
        } : {}
        this.query = this.query.find({...keyword});
        return this;
    }

    pagination(pageLimit){
        const pageNum = this.queryString.page || 1;
        const skipPage = pageLimit * (pageNum - 1);
        this.query = this.query.limit(pageLimit).skip(skipPage);
        return this;
    }
}
module.exports = APIfeatures;
class ApiFeatures {
  // this.query=Product.find();
  constructor(query, queryString) {
    // now query and queryStrign are the property of this class
    this.query = query;
    this.queryString = queryString;
  }

  // After ? are the query and queryString
  // queryString is the = part of the query

  // Search
  search() {
    const keyword = this.queryString.keyword
      ? {
          name: {
            $regex: this.queryString.keyword,
            $options: "i",
          },
        }
      : {};

    // console.log("keyword:",keyword);

    this.query = this.query.find({ ...keyword });
    return this;
  }

  // Filter
  filter() {
    const queryCopy = { ...this.queryString };

    // Removing fields from the query
    const removeFileds = ["keyword", "page" , "limit"];

    removeFileds.forEach((key) => delete queryCopy[key]);
    // console.log("queryCopy2:", queryCopy);

    let queryStr = JSON.stringify(queryCopy);
    // console.log("queryStr1:",queryStr);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    // filter for range item ex:price and rating
    // price[gt]=1000 and price[lt]=10000

    this.query = this.query.find(JSON.parse(queryStr));
    // console.log("queryStr2:",queryStr);

    return this;
  }

  // Pagination
  pagination(resPerPage) {
    const currentPage = Number(this.queryString.page) || 1;
    // console.log("currentPage:",currentPage)
    const skip = resPerPage * (currentPage - 1);
    // console.log("skip:",skip);
    this.query = this.query.limit(resPerPage).skip(skip);
    // console.log("pagination:",this.query);
    console.log(this.query.length);
    return this;
  }
}

module.exports = ApiFeatures;

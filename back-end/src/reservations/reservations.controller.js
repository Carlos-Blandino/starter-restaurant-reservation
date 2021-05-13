/**
 * List handler for reservation resources
 */
const service = require("./reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function list(req, res) {
 const data = await  service.list();
     res.json({
    data: data,
  });
}
function hasProps(req, res, next){
    const {first_name,
        last_name,
        mobile_number,
        reservation_date,
        reservation_time,
        people} = req.body;

    if(first_name && last_name && mobile_number && reservation_date && reservation_time && people){

        if(people < 1 || people > 6){
            return next({
                status: 400,
                message: "Party must be from 1 to 6"
            });
        };
        if(first_name.length < 2 || last_name.length < 2){
            return next({
                status: 400,
                message: "At least 2 characters are required for either first or last name."
            });
        };
        res.locals.reservation = req.body
        return next();
    }
    else{
        return next({
            status: 400,
            message: "Four"
        })
    }
}

async function post(req, res, next) {

    const data = await service.post(res.locals.reservation)
    res.json({data})
}

module.exports = {
    list: asyncErrorBoundary(list),
    post: [hasProps, asyncErrorBoundary(post)]
};

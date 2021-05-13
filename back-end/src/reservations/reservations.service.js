const knex = require("../db/connection");


function list(){
    return knex("reservations").select("*");
}

function post(reservation){
    return knex("reservations")
        .insert(reservation, "*")
}

module.exports = {
    list,
    post
}
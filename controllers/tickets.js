const Ticket = require('../models/ticket');
const Flight = require('../models/flight');

module.exports = {
    show,
    new: newTicket,
    create
}

function show(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        Ticket.find({flight: flight._id}, function(err, tickets) {
            res.render('flights/show', { title: 'Flight Details', flight, tickets });
            })
        });
}

function newTicket(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        res.render('tickets/new', { title: 'New Ticket', flight });
    });
}

function create(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        req.body.flight = flight._id;
        Ticket.create(req.body, function (err, ticket) {
            res.redirect(`/flights/${ticket.flight.toString()}`);
        })
    })
}
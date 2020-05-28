const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
    index, 
    new: newFlight,
    create,
    show
};

function index(req, res) {
    Flight.find({}).sort({departs: 'asc'}).exec(function(err, flights) {
      res.render('flights/index', { title: 'All Flights', flights });
    });
  }

function newFlight(req, res) {
    const newFlight = new Flight();
    const defaultDeparts = newFlight.departs;
    const departsDate = defaultDeparts.toISOString().slice(0, 16);
    res.render('flights/new', { title: 'Add Flight', departsDate });
}

function create(req, res) {
    const flight = new Flight(req.body);
    console.log(req.body);
    console.log(flight);
    flight.save(function(err) {
    if (err) console.log(err);
    });
    res.redirect('/flights');
}

function show(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        // flight.destinations.sort(function (a, b) {
        //     return a.arrival - b.arrival;
        // });
        Ticket.find({flight: flight._id}, function(err, tickets) {
            res.render('flights/show', { title: 'Flight Details', flight, tickets });
        })
    });
}
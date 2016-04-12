/*
 * Description: allows users to manage their plan by saving/recording to
 * the database
 *
**/

var Plan = require('../models/databaseModels').Plan;


//Allows the useer to create a plan w/ a green, yellow, and red zone
exports.addPlan = function (input, next) {

    var newPlan = new Plan({
        user : input.user,

        green : {
            flovent : {
                interval : input.flovent.interval,
                dosage : input.flovent.dosage
            },

            singulair : {
                interval : input.singulair.interval,
                dosage : input.singulair.dosage
            },

            albuterol : {
                interval : input.albuterol.interval,
                dosage : input.albuterol.dosage
            }
        },

        yellow : {
            flovent : {
                interval : input.flovent.interval,
                dosage : input.flovent.dosage
            },

            singulair : {
                interval : input.singulair.interval,
                dosage : input.singulair.dosage
            },

            albuterol : {
                interval : input.albuterol.interval,
                dosage : input.albuterol.dosage
            }
        },

        red : {
            flovent : {
                interval : input.flovent.interval,
                dosage : input.flovent.dosage
            },

            singulair : {
                interval : input.singulair.interval,
                dosage : input.singulair.dosage
            },

            albuterol : {
                interval : input.albuterol.interval,
                dosage : input.albuterol.dosage
            }
        }
    });

    newPlan.save(function (err) {
        if (err) {
            next(err);
        } else {
            next(null);
        }
    });
};

//Allows the useer to find a plan that has been created previosly
exports.findPlan = function (input, next) {
    Plan.findOne({
        user: input.user
    }, function (err, object) {
        next(err, object);
    });
}

//Allows theuserto update the plan that has been created previously
exports.updatePlan = function (input, next) {

}
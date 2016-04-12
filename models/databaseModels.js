var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate');

var userSchema = new Schema({
    username: String,
    password: String,
    created: {type: Date, default: Date.now}
});

var todoSchema = new Schema({
    text: {type: String, default: ''},
    recordDate: String,
    created: {type: Date, default: Date.now}
});

var recordSchema = new Schema({
    user: String,
    school: Boolean,
    sleep: Boolean,
    tired: Boolean,
    reliever: Boolean,
    recordDate: String,
    created: {type: Date, default: Date.now}
});

var planSchema = new Schema({
    user: String,
    green : {
        flovent : {
            interval : Number,
            dosage : Number
        },

        singulair : {
            interval : Number,
            dosage : Number
        },

        albuterol : {
            interval : Number,
            dosage : Number
        }
    },

    yellow : {
        flovent : {
            interval : Number,
            dosage : Number
        },

        singulair : {
            interval : Number,
            dosage : Number
        },

        albuterol : {
            interval : Number,
            dosage : Number
        }
    },

    red : {
        flovent : {
            interval : Number,
            dosage : Number
        },

        singulair : {
            interval : Number,
            dosage : Number
        },

        albuterol : {
            interval : Number,
            dosage : Number
        }
    }

});


userSchema.path('username').validate(function (username, next) {
    User.findOne({username: username}, function (err, user) {
        if (err) {
            return next(false);
        }
        if (!user) {
            return next(true); //Valid
        } else {
            return next(false);
        }
    });
}, 'Username Already Exists');

var userDetailSchema = new Schema({
    userName : String,
    interest: [String],
    accountType: String,
    profilePicture: String,
    _userDetail: {type: Schema.Types.ObjectId, ref: 'User'},
    created: {type: Date, default: Date.now}
});

var User = mongoose.model('User', userSchema);
var Todo = mongoose.model('Todo', todoSchema);
var Record = mongoose.model('Record', recordSchema);
var UserDetail = mongoose.model('UserDetail', userDetailSchema);
var Plan = mongoose.model('Plan', planSchema);

module.exports = {
    User : User,
    UserDetail : UserDetail,
    Record : Record,
    Todo : Todo,
    Plan : Plan
};
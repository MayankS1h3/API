import mongoose  from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: {
        type:  String,
        required: [true, 'Subscription name is required'],
        trim: true,
        minLength: 2,
        maxLength: 100
    },
    price: {
        type: Number,
        required: [true, 'Subcription price is required'],
        min : [0, 'Price must be greater than 0']
    },
    currency: {
        type: String,
        enum: ['USD', 'RUPEE', 'EUR']
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly']
    },
    category: {
        type: String,
        enum: ['sports', 'news', 'entertainment', 'finance'],
        required: true
    },
    paymentMethod: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['active', 'calcelled', 'expired'],
        default: 'active'
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: (val) => val <= new Date(),
            message: 'Start date must be in the past'
        }
    },
    renewalDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (val) {
                return val > this.startDate;
            },
            message: 'Renewal date must be after start date'
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{timestamps: true});

subscriptionSchema.pre('save', function (next) {
    if(!this.renewalDate) {
        const renewalPeriod = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        };
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriod[this.frequency]);
    }
    if(this.renewalDate < new Date()){
        this.status = 'expired';
    }
    next();
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;
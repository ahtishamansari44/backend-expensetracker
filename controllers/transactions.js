const Transactions = require("../models/Transactions")

// @desc Get all transactions
// @route GET /api/v1/transactions
// @access Public
exports.getTransactions = async (req, res, next) => {
    // res.send("GET Transactions");
    try {

        const transactions = await Transactions.find();

        return res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        });

        
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'srver error'

        });
    }
}

// @desc Get all transactions
// @route POST /api/v1/transactions
// @access Public
exports.addTransactions = async (req, res, next) => {
    try {
    // res.send("POST Transactions");
    const {text, amount} = req.body;

    const transaction = await Transactions.create(req.body);

    return res.status(201).json({
        seccess: true,
        data: transaction
    })
        
    } catch (err) {
        
        if(err.name === 'ValidationError'){

            const message = Object.values(err.errors).map(val => val.message)

            return res.status(400).json({
                seccess: false,
                data: message
            })

        }
        else{
            return res.status(500).json({
                success: false,
                error: 'srver error'
            });
        }

    }
}

// @desc Get all transactions
// @route DELETE /api/v1/transactions
// @access Public
exports.deleteTransactions = async (req, res, next) => {
    // res.send("DELETE Transactions");
    try {

        const transaction = await Transactions.deleteOne({"_id":req.params.id})

        if(!transaction){
            return res.status(404).json({
                seccess: false,
                error: "No Transaction Found"
            })
        }

        return res.status(200).json({
            seccess: true,
            message: "Removed"
        })
        
    } catch (err) {
        return res.status(500).json({
            seccess: false,
            error: "server error"
        })
    }
}
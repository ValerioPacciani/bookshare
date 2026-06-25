const Book = require("../model/Book")
const Loan = require("../model/Loan")
const User = require("../model/User")


const getLoans = async (req, res) => {
    try {
        const sender = req.user._id //lo prendo dal token del middleware di riconsocimento
        const loans = await Loan.find({
            senderId: sender
        }).populate("senderId", "name email ").populate("ownerId", "name email").populate("bookId", "title author coverImage")
        return res.status(200).json(loans);
    } catch (error) {
        return res.status(500).json({ message: "server Error" });
    }
}

const createLoan = async (req, res) => {

    try {
        console.log("req.params.id:", req.params.id)
        const senderId = req.user._id //l user di sessione
        const requestedBook = await Book.findById(req.params.id) //trovo il libro con l'id
        const ownerId = requestedBook.owner;
        if (!requestedBook) {
            console.log("libro non esistente")
            return res.status(404).json({ message: "id del libro non esistente" })
        } else {

            const ex = await Loan.findOne({
                senderId,
                ownerId,
                bookId: req.params.id
            })
            if (ex) { // controllo duplicati
                console.log("richiesta gia presente")
                return res.status(400).json({ message: "la Richiesta è gia presente" });
            }
            console.log("req.params.id:", req.params.id)
            if (requestedBook.isOnShare) { //controllo se il libro è in richiesta


                await Loan.create({
                    senderId,
                    ownerId,
                    bookId: req.params.id,
                })

                return res.status(200).json({ message: "Richiesta di prestito creata con successo" })

            } else {
                return res.status(400).json({ message: "Il libro richiesto non è disponibile al prestito" })
            }
        }


    } catch (error) {

        console.log("Errore:", error.message);
        res.status(500).json({ Message: "Server Error" });
    }
}

const getLoansReceived = async (req, res) => {

    try {
        const ownerId = req.user._id
        const loansRecievied = await Loan.find({
            ownerId
        }).populate("senderId", "name email ").populate("ownerId", "name email").populate("bookId", "title author coverImage")
        //populate is a mongodb function that returns the fields of the specidied link, so for expample if i ha have bookID i can return the title
        //The json will be {senderId: {_id : "dad231dsa1d, name:"Mario", email: "maririorossi@test.com"}}
        return res.status(200).json(loansRecievied)

    } catch (error) {
        console.log("Errore:", error.message);
        return res.status(500).json({ Message: "Server Error" });
    }
}

const updateLoanStatus = async (req, res) => {
    try {
        const acceptedStatus = ["accepted", "refused", "returned"];
        const statusTo = req.body.status;
        const loanId = req.params.id;

        if (!acceptedStatus.includes(statusTo)) {
            return res.status(400).json({ message: "status non valido" })
        }

        const loanUpdate = await Loan.findOneAndUpdate(
            { _id: loanId },
            { status: statusTo },
            { new: true } //that's the return of the function, so i can return the new document
        )
        return res.status(200).json(loanUpdate);

    } catch (e) {
        return res.status(500).json({ message: "server error" })
        console.log("message:", e.error);
    }


}

//TODO deleteLoan


module.exports = {
    getLoans,
    createLoan,
    getLoansReceived,
    updateLoanStatus
}

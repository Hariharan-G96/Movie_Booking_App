const userRegistration = (user) => {
    return {
        subject : "Welcome to Book My Show",
        html : `
        <div>
        <h5>Hi ${user.name},</h5>
        <br/>
        You have been registered successfully with the email <b>${user.email}</b>
        <br/>
        Your User ID required at the time of login will be <b>${user.userId}</b>
        <br/>
        <hr/>
        Thanks & Regards,
        <br/>
        <h3>Book My Show</h3>
        <img src="https://logodix.com/logo/2011124.jpg"/>
        </div>
        `
    };
}

const paymentSuccess = (user, booking, payment) => {
    return {
        subject : "Book My Show - Payment successful!",
        html : `
        <div>
        <h5>Hi ${user.name},</h5>
        <br/>
        Your payment of <b>₹ ${payment.amount}</b> have been confirmed!
        <br/>
        Your Booking ID required at the time of entering to the theatre will be <b>${booking._id}</b>
        <br/>
        Enjoy your show!
        <br/>
        <hr/>
        Thanks & Regards,
        <br/>
        <h3>Book My Show</h3>
        <img src="https://logodix.com/logo/2011124.jpg"/>
        </div>
        `
    };
}

module.exports = {
    userRegistration,
    paymentSuccess
}
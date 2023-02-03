const releaseStatus = {
    released : 'RELEASED',
    unreleased : 'UNRELEASED',
    blocked : 'BLOCKED'
}

const userTypes = {
    customer : "CUSTOMER",
    client : "CLIENT",
    admin : "ADMIN"
}

const userStatus = {
    pending : "PENDING",
    approved : "APPROVED",
    rejected : "REJECTED"
}

const bookingStatus = {
    completed : "COMPLETED",
    inprogress : "IN-PROGRESS",
    cancelled : "CANCELLED",
    expired : "EXPIRED"
}

const paymentStatus = {
    success : "SUCCESS",
    pending : "PENDING",
    failed : "FAILED"
}

module.exports = {
    releaseStatus : releaseStatus,
    userTypes : userTypes,
    userStatus : userStatus,
    bookingStatus : bookingStatus,
    ticketPrice : 220.10,
    paymentStatus : paymentStatus
}
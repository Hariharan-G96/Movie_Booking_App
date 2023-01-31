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
    success : "SUCCESS",
    inprogress : "IN-PROGRESS",
    failed : "FAILED"
}

module.exports = {
    releaseStatus : releaseStatus,
    userTypes : userTypes,
    userStatus : userStatus,
    bookingStatus : bookingStatus
}
function setCookies(res, token) {
    res.cookie('token', token, {
        sameSite: 'None',
        secure: true,
        httpOnly: true
    })
}

function clearCookies(res) {
    res.clearCookie('token', {
        sameSite: 'None',
        secure: true,
        httpOnly: true
    })
}

module.exports = { setCookies, clearCookies }

let transfMaiuscula = (letra) => {
    return letra.substring(0, 1).toUpperCase().concat(letra.substring(1))
}

let validadeEmail = (email) => {
    let re = /.+\@.+\..+/
    return re.test(email)
}

module.exports = {
    transfMaiuscula,
    validadeEmail
}
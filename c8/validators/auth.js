const register = {
    full_name: "required|string",
    email: "required|email",
    password: "required|string",
    password2: "required|string"
}

const login = {
    email: "required|email",
    password: "required|string"
};

module.exports = {
    register,
    login
}
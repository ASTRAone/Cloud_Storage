module.exports = class ApiError extends Error {
    status;
    errors;

    constructor(status, message, errors) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnathorizedError() {
        return new ApiError(401, 'Unathorized', []);
    }

    static BadRequestError(message, errors) {
        return new ApiError(400, message, errors);
    }

    static BadOperationFilesError(message, errors) {
        return new ApiError(400, message, errors);
    }
}
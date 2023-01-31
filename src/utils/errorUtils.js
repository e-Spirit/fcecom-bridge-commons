const { respondWithCode, writeJson } = require('../utils/writer');
const { ParameterValidationError, BodyValidationError } = require('./errors');

const handleError = (response, err) => {
    if (err instanceof ParameterValidationError) {
        const message = err.message || 'Invalid request';
        const errorResponse = respondWithCode(400, { error: message });
        writeJson(response, errorResponse);
    } else if (err instanceof BodyValidationError) {
        const message = err.message || 'Invalid request';
        const cause = err.cause;
        const errorResponse = respondWithCode(400, { error: cause ?? message });
        writeJson(response, errorResponse);
    } else {
        let error = err;
        if (!error.status && !error.data) {
            /* case error is in code and has nothing to do with http calls */
            error = { status: 500, data: error.toString() };
        }
        const errorResponse = respondWithCode(error.status, error.data);
        writeJson(response, errorResponse);
    }
};

const ErrorCode = {
    UNKNOWN: '0000',
    URL_ALREADY_EXISTS: '1010',
    TEMPLATE_NOT_MAPPED: '1020',
    FIELD_MUST_BE_UNIQUE: '1030',
    FIELD_REQUIRED: '1040'
};

module.exports = {
    handleError,
    ErrorCode
};

const { respondWithCode, writeJson } = require("../utils/writer");
const { ParameterValidationError } = require("./parameterExtractor");

const handleError = (response, err) => {
    if (err instanceof ParameterValidationError) {
        const message = err.message || 'Invalid request';
        const errorResponse = respondWithCode(400, { error: message });
        writeJson(response, errorResponse);
    } else {
        let error = err;
        if(!error.status && !error.data) {
            /* case error is in code and has nothing to do with http calls */
            error = { status: 500, data: error.toString() }
        }
        const errorResponse = respondWithCode(error.status, error.data);
        writeJson(response, errorResponse);
    }
};

module.exports = {
    handleError
}

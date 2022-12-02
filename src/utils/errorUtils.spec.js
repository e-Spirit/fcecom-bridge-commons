const { handleError } = require('./errorUtils');
const { generateResponseMock } = require('./testUtils');
const { writeJson } = require("../utils/writer");
const { ParameterValidationError } = require('./parameterExtractor');

jest.mock('../utils/writer', () => ({
    respondWithCode: (code, payload) => ({code, payload}),
    writeJson: jest.fn()
}));

describe('errorUtils', () => {
    describe('handleError', () => {
        it('handles parameter validation errors', () => {
            const message = 'MESSAGE';
            const resMock = generateResponseMock();
            const error = new ParameterValidationError(message);

            handleError(resMock, error);

            expect(writeJson).toHaveBeenCalledWith(resMock, expect.objectContaining({
                code: 400,
                payload: { error: message }
            }));
        });
    });
});

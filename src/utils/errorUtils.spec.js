const { handleError } = require('./errorUtils');
const { generateResponseMock } = require('./testUtils');
const { writeJson } = require('../utils/writer');
const { ParameterValidationError, BodyValidationError } = require('./errors');

jest.mock('../utils/writer', () => ({
    respondWithCode: (code, payload) => ({ code, payload }),
    writeJson: jest.fn()
}));

describe('errorUtils', () => {
    describe('handleError', () => {
        it('handles parameter validation errors', () => {
            const message = 'MESSAGE';
            const resMock = generateResponseMock();
            const error = new ParameterValidationError(message);

            handleError(resMock, error);

            expect(writeJson).toHaveBeenCalledWith(
                resMock,
                expect.objectContaining({
                    code: 400,
                    payload: { error: message }
                })
            );
        });

        it('handles body validation errors with cause', () => {
            const message = 'MESSAGE';
            const cause = 'CAUSE';
            const options = { cause: cause };
            const resMock = generateResponseMock();
            const error = new BodyValidationError(message, options);

            handleError(resMock, error);

            expect(writeJson).toHaveBeenCalledWith(
                resMock,
                expect.objectContaining({
                    code: 400,
                    payload: { error: cause }
                })
            );
        });

        it('handles body validation errors with message if no cause is passed', () => {
            const message = 'MESSAGE';
            const resMock = generateResponseMock();
            const error = new BodyValidationError(message);

            handleError(resMock, error);

            expect(writeJson).toHaveBeenCalledWith(
                resMock,
                expect.objectContaining({
                    code: 400,
                    payload: { error: message }
                })
            );
        });
    });
});

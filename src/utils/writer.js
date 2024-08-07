const ResponsePayload = function (code, payload) {
    this.code = code;
    this.payload = payload;
};

const respondWithCode = function (code, payload) {
    return new ResponsePayload(code, payload);
};

const writeJson = function (response, arg1, arg2) {
    let code;
    let payload;

    if (arg1 && arg1 instanceof ResponsePayload) {
        writeJson(response, arg1.payload, arg1.code);
        return;
    }

    if (arg2 && Number.isInteger(arg2)) {
        code = arg2;
    } else {
        if (arg1 && Number.isInteger(arg1)) {
            code = arg1;
        }
    }
    if (arg1) {
        payload = arg1;
    }

    if (!code) {
        // if no response code given, we default to 200
        code = 200;
    }
    if (typeof payload === 'object') {
        payload = JSON.stringify(payload, null, 2);
        response.writeHead(code, { 'Content-Type': 'application/json' });
    } else {
        response.writeHead(code, { 'Content-Type': 'plain/text' });
    }
    response.end(payload);
};

module.exports = {
    writeJson,
    respondWithCode
};

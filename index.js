const SMTPServer = require("smtp-server").SMTPServer;

const server = new SMTPServer({
    allowInsecureAuth: true,
    authOptional: true,
    onConnect(session, callback) {
        console.log(' onConnect', session.id);
        callback();
    },
    onMailFrom(address, session, callback) {
        console.log(' onMailFrom', address.address, session.id);
        callback();
    },
    onRcptTo(address, session, callback) {
        console.log(' onRcptTo', address.address, session.id);
        callback();
    },
    onData(stream, session, callback) {
        stream.on('data', (data) => {
            console.log(' onData', data.toString());
        });
        stream.on('end', () => {
            console.log(' end');
            callback();
        });
    }


});

server.listen(25,() => {console.log('Server running on 25')});


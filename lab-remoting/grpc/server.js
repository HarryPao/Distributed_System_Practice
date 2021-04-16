var PROTO_PATH = __dirname + '/helloworld.proto';

var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
var hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;
 
/**
 * Implements the SayHello RPC method.
 */
function sayHello(call, callback) {
    callback(null, {message: 'Hello ' + call.request.name});
    // first param: if no err send null
}

//new function
function add(input, call) {
    call(null, {result: input.request.x + input.request.y});
}

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
    var server = new grpc.Server();

    server.addService(hello_proto.Greeter.service, {sayHello: sayHello, add: add});
    //server.addService(hello_proto.Add.service, {add: add}); 
    //WRONG! no need to write another 'addService'. Just add new function in the original addService.

    server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
        server.start();
    });
    //server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());

} 

main();

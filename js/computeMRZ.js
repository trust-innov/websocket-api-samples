// The URL of the device to connect to
var hostname = "192.168.200.200";

// Multiple smart card readers could be connected to the device, so let's specify which one we're using
var smartCardReaderName = "Identiv uTrust 3700 F CL Reader [uTrust 3700 F CL Reader] (55021716210255) 00 00";

var url = "ws://" + hostname + ":8090/";


var ws = new WebSocket(url);

ws.onopen = function() {
    console.log("Socket opened");
}

ws.onmessage = function(e) {
    console.log("Got response:");
    console.log(JSON.parse(e.data));
}

ws.onclose = function(e) {
    console.log("Socket closed or can´t connect to the server (Please check the server IP/port and/or check that the device is up and running).");
}

function doSendCommand(command) {
    console.log("Sending command to server:");
    console.log(command);
    ws.send(JSON.stringify(command));
    console.log("Command sent (wait a few seconds for the response)");
}

/*
 * The computeMRZ command is composed of multiple attributes:
 * - command name: "computeMRZ"
 * - and the necessary attributes to compute the MRZ
 *
 * The command is sent encoded in JSON to the server
 */
function doSendComputeMRZCommand() {
    var command = {};
    command.command =                "computeMRZ";
    command.documentType =           "P";
    command.documentNumber =         "L898902C3";
    command.primaryIdentifier =      "Eriksson";
    command.secondaryIdentifiers =   "Anna Maria";
    command.dateBirth =              "740812";
    command.dateExpiry =             "120415";
    command.nationalityCountryCode = "UTO";
    command.gender =                 "F";
    command.optionalData =           "Z E 184226 B";
    command.profileInlay =           "PROFILE_1";

    doSendCommand(command);
}

doSendComputeMRZCommand();
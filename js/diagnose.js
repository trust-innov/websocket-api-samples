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
 * The diagnose command is composed of two attributes:
 * - command name: "diagnose"
 * - the smartCardReaderName
 *
 * The command is sent encoded in JSON to the server
 */
function doSendDiagnoseCommand() {

    var command = {};
    command.command = "diagnose";
    command.smartCardReaderName = smartCardReaderName;

    doSendCommand(command);
}

doSendDiagnoseCommand();
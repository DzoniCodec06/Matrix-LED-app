// --------- SERIAL VARIABLES --------- //

const { SerialPort, ReadlineParser } = require("serialport");

const ARDUINO_VENDOR_ID = 2341;
const CH340_VENDOER_ID = "1A86";

const BAUD_RATE = 9600;

// --------- PROGRAM VARIABLES --------- //

const buttonsBox = document.getElementById("buttons");

const frsBtnBox = document.querySelector(".first-btns");
const secBtnBox = document.querySelector(".sec-btns");
const thrBtnBox = document.querySelector(".thr-btns");

const boxList = [ frsBtnBox, secBtnBox, thrBtnBox ];

const buttons = 10;

let j = 0;

// --------- CREATING BUTTONS --------- //

for (let k = 0; k < 3; k++) {
    for (let i = 0; i < buttons; i++) {
        const button = document.createElement("button");
        button.value = j < 10 ? `0${j}` : `${j}`;
        button.id = "off";
        button.classList.add("button");
        boxList[k].append(button);
        j++;
    }
}

// --------- PROGRAM LOOP --------- //

SerialPort.list().then(boards => {
    if (boards[0].vendorId == ARDUINO_VENDOR_ID || boards[0].vendorId == CH340_VENDOER_ID) {
        const port = new SerialPort({
            path: boards[0].path,
            baudRate: BAUD_RATE,
            stopBits: 1,
            parity: "none",
            dataBits: 8,
            autoOpen: true
        });

        const parser = new ReadlineParser({ delimiter: "\r\n" });
        port.pipe(parser);

        
        buttonsBox.addEventListener("click", e => {
            let button = e.target;
            if (button.value !== undefined) {
                if (button.id == "off") button.id = "on";
                else button.id = "off"; 
                console.log(`Button ${button.value} is ${button.id}`);
                port.write(`${button.value} ${button.id}\n`);
            }
        })    
        
        parser.on("data", data => {
            console.log(data);
        });

        console.log("connected");

    } else console.log("non");

})

// --------- END OF PROGRAM --------- //
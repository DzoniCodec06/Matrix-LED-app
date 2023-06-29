#include <Adafruit_NeoPixel.h>

#define PIN_NEO_PIXEL  3   // Arduino pin that connects to NeoPixel
#define NUM_PIXELS     30  // The number of LEDs (pixels) on NeoPixel

#define DELAY_INTERVAL 200

Adafruit_NeoPixel led(NUM_PIXELS, PIN_NEO_PIXEL, NEO_GRB + NEO_KHZ800);

String command;

int led_num;

String led_state;

void setup() {
  Serial.begin(9600);

  led.begin(); // INITIALIZE NeoPixel strip object (REQUIRED)
  led.clear();
  led.show();
}

void loop() {
  if (Serial.available()) {
    command = Serial.readStringUntil('\n'); 

    led_num = command.substring(0, 2).toInt();
    led_state = command.substring(3);

    Serial.println(led_num);
    Serial.println(led_state);

    if (led_state == "on") {
      led.setPixelColor(led_num, led.Color(0, 0, 10));
    } else {
      led.setPixelColor(led_num, led.Color(0, 0, 0));
    }

    led.show();
    
  }
}

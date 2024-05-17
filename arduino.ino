const int xAxisPin = A0;
const int yAxisPin = A1;
const int buttonPin = A2;

int xAxisValue = 0;
int yAxisValue = 0;
int buttonState = 0;

void setup() {
    Serial.begin(9600);
    pinMode(buttonPin, INPUT);
}

void checkJoystickMovement() {
    int centerPositionX = 512;
    int centerPositionY = 512;
    int safeZoneThreshold = 150;

    if (xAxisValue > centerPositionX + safeZoneThreshold) {
        Serial.println("MOVE: a");
    } else if (xAxisValue < centerPositionX - safeZoneThreshold) {
        Serial.println("MOVE: d");
    }

    if (yAxisValue > centerPositionY + safeZoneThreshold) {
        Serial.println("MOVE: w");
    } else if (yAxisValue < centerPositionY - safeZoneThreshold) {
        Serial.println("MOVE: s");
    }

    if (buttonState == 0) {
        Serial.println("MOVE: z");
    }
}

void loop() {
    xAxisValue = analogRead(xAxisPin);
    yAxisValue = analogRead(yAxisPin);
    buttonState = analogRead(buttonPin);

    // Print joystick values
    Serial.println("JOYSTICK:" + String(xAxisValue) + "," + String(yAxisValue) + "," + String(buttonState));

    checkJoystickMovement();

    /*if (Serial.available()) {
        Serial.flush();
        String message = Serial.readStringUntil('\n');
        message.trim();
        if (message == '\n' || message.equals("")) {
        return;
        }

        Serial.println("JOYSTICK:" + String(xAxisValue) + "," + String(yAxisValue) + "," + String(buttonState));

        delay(200);
  }*/ //wtf esto no sirve

    delay(250);
}

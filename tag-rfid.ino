#include <ArduinoWebsockets.h>
#include <WiFi.h>
#include <MFRC522.h>
#include <SPI.h>

const char* ssid = "Greatek-DB4A84-2.4G";
const char* password = "PAKE45x7A5";
const char* websockets_server_host = "192.168.1.111";
const int websockets_server_port = 8082;

using namespace websockets;

WebsocketsClient client;

#define SS_PIN    21
#define RST_PIN   22

MFRC522 mfrc522(SS_PIN, RST_PIN);

String currentTag = "";
bool isConnected = false;

void connectToWiFi() {
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(1000);
  }

  Serial.println("Connected to WiFi");
}

void connectToWebSocket() {
  Serial.println("Connecting to WebSocket server...");

  while (!isConnected) {
    isConnected = client.connect(websockets_server_host, websockets_server_port, "/");
    if (isConnected) {
      Serial.println("Connected to WebSocket server!");
    } else {
      Serial.println("Failed to connect to WebSocket server. Retrying in 1 second...");
      delay(1000);
    }
  }
}

void setup() {
  Serial.begin(115200);

  SPI.begin();
  mfrc522.PCD_Init();

  connectToWiFi();
  connectToWebSocket();
}

void loop() {
  if (!client.available()) {
    if (isConnected) {
      // A conexão foi perdida
      Serial.println("Connection lost. Reconnecting...");
      isConnected = false; // Resetar a flag de conexão
      connectToWebSocket();
    }

    delay(100);
    return;
  }

  client.poll();

  if (mfrc522.PICC_IsNewCardPresent() && mfrc522.PICC_ReadCardSerial()) {
    currentTag = "";
    for (byte i = 0; i < mfrc522.uid.size; i++) {
      currentTag += String(mfrc522.uid.uidByte[i] < 0x10 ? "0" : "");
      currentTag += String(mfrc522.uid.uidByte[i], HEX);
    }

    Serial.println("RFID Tag: " + currentTag);

    mfrc522.PICC_HaltA();
    mfrc522.PCD_StopCrypto1();

    String message = currentTag;
    client.send(message);

    delay(2000);
  }

  delay(300);
}

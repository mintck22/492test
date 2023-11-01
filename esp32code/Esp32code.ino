#include <WiFi.h>
#include <PubSubClient.h>
#include "esp_camera.h"

const char* ssid = "YOUR_SSID";
const char* password = "YOUR_PASSWORD";
const char* awsEndpoint = "YOUR_AWS_IOT_ENDPOINT";
const char* awsThingName = "YOUR_THING_NAME";
const char* awsTopic = "YOUR_AWS_IOT_TOPIC";

const char* awsClientId = "YOUR_CLIENT_ID";
const char* awsCertificate = R"(
-----BEGIN CERTIFICATE-----
YOUR_AWS_CERTIFICATE
-----END CERTIFICATE-----
)";

const char* awsPrivateKey = R"(
-----BEGIN RSA PRIVATE KEY-----
YOUR_AWS_PRIVATE_KEY
-----END RSA PRIVATE KEY-----
)";

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }

  Serial.println("Connected to WiFi");

  // Configure camera settings
  camera_config_t camera_config;
  camera_config.ledc_channel = LEDC_CHANNEL_0;
  // Configure other camera settings as needed

  // Initialize the camera
  esp_err_t err = esp_camera_init(&camera_config);
  if (err != ESP_OK) {
    Serial.printf("Camera init failed with error 0x%x", err);
    delay(1000);
    ESP.restart();
  }

  // Set up the AWS IoT MQTT client
  WiFiClientSecure wifiClient;
  wifiClient.setCertificate(awsCertificate);
  wifiClient.setPrivateKey(awsPrivateKey);
  PubSubClient mqttClient(awsEndpoint, 8883, wifiClient);

  if (mqttClient.connect(awsClientId)) {
    Serial.println("Connected to AWS IoT Core");

    while (true) {
      captureAndSendImage(mqttClient);
      delay(60000); // Capture and send an image every 60 seconds
    }
  } else {
    Serial.println("AWS IoT Core connection failed");
  }
}

void captureAndSendImage(PubSubClient& client) {
  camera_fb_t* fb = esp_camera_fb_get();
  if (!fb) {
    Serial.println("Camera capture failed");
    return;
  }

  client.beginMessage(awsTopic, fb->len);
  client.write(fb->buf, fb->len);
  client.endMessage();

  esp_camera_fb_return(fb);
}

void loop() {
  
}

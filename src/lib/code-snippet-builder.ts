// Define supported languages
export type SupportedLanguage = "javascript" | "php" | "python" | "go";

/**
 * Detects and replaces base64 strings and API keys in request body
 * @param requestBody - The request body string to process
 * @returns Request body with base64 strings and API keys replaced with placeholders
 */
function replaceBase64InRequestBody(requestBody: string): string {
    // Regex to detect base64 data URLs
    const base64Regex = /"data:([^;]+);base64,([^"]+)"/g;

    // Improved regex to detect API keys with or without spaces
    // Case-insensitive to match both "key" and "Key" variations
    const apiKeyRegex = /(["|']key["|']):\s*(["|'])([^"|']+)(["|'])/gi;

    // Replace all base64 strings with a placeholder
    let processed = requestBody.replace(base64Regex, '"<base 64 string>"');

    // Replace API keys with a placeholder and add comment about accessing from dashboard
    processed = processed.replace(
        apiKeyRegex,
        "$1: $2<api-key>$4 //access api key from your dashboard"
    );

    return processed;
}

/**
 * Builds a code snippet for making an API request
 * @param apiEndpoint - The API endpoint URL
 * @param requestBody - Request body as a string
 * @param language - Programming language for the code snippet
 * @returns String containing code snippet
 */
export function buildApiRequestCodeSnippet(
    apiEndpoint: string,
    requestBody: string,
    language: SupportedLanguage
): string {
    // Process the request body to handle base64 strings
    const processedRequestBody = replaceBase64InRequestBody(requestBody);

    switch (language) {
        case "javascript":
            return buildJavaScriptSnippet(apiEndpoint, processedRequestBody);
        case "php":
            return buildPhpSnippet(apiEndpoint, processedRequestBody);
        case "python":
            return buildPythonSnippet(apiEndpoint, processedRequestBody);
        case "go":
            return buildGoSnippet(apiEndpoint, processedRequestBody);
        default:
            return `Language ${language} is not supported yet.`;
    }
}

/**
 * Builds a JavaScript code snippet for API request
 */
function buildJavaScriptSnippet(
    apiEndpoint: string,
    requestBody: string
): string {
    return `// JavaScript fetch example
fetch("${apiEndpoint}", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(${requestBody})
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`;
}

/**
 * Builds a PHP code snippet for API request
 */
function buildPhpSnippet(apiEndpoint: string, requestBody: string): string {
    return `<?php
// PHP curl example
$url = "${apiEndpoint}";
$data = ${requestBody};

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Content-Type: application/json'
));

$response = curl_exec($ch);
$err = curl_error($ch);
curl_close($ch);

if ($err) {
    echo "cURL Error: " . $err;
} else {
    $result = json_decode($response, true);
    print_r($result);
}`;
}

/**
 * Builds a Python code snippet for API request
 */
function buildPythonSnippet(apiEndpoint: string, requestBody: string): string {
    return `# Python requests example
import requests
import json

url = "${apiEndpoint}"
payload = ${requestBody}
headers = {
    "Content-Type": "application/json"
}

response = requests.post(url, headers=headers, data=json.dumps(payload))
data = response.json()
print(data)`;
}

/**
 * Builds a Go code snippet for API request
 */
function buildGoSnippet(apiEndpoint: string, requestBody: string): string {
    return `// Go example
package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

func main() {
	url := "${apiEndpoint}"
	payload := ${requestBody}
	
	jsonData, err := json.Marshal(payload)
	if err != nil {
		fmt.Println("Error marshalling JSON:", err)
		return
	}

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
	if err != nil {
		fmt.Println("Error creating request:", err)
		return
	}

	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Error sending request:", err)
		return
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("Error reading response:", err)
		return
	}

	var result map[string]interface{}
	json.Unmarshal(body, &result)
	fmt.Println(result)
}`;
}

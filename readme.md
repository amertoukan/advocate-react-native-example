# Advocate React Native Example

This project demonstrates how to integrate the Advocate API into a React Native app. It covers the key steps for rendering widgets, handling API requests, and platform-specific configurations. Below is a breakdown of the implementation.

---

## Features
- **Advocate Widget Integration**: Dynamically loads and displays the Advocate widget using `react-native-webview`.
- **API Integration**: Communicates with the Advocate API for widget upserts and retrieves the required widget content.
- **Platform Compatibility**: Supports both iOS and Android.

---

## Setup Instructions

### Environment Variables
This project uses environment variables to store sensitive information. Add the following variables to your `.env` file:
```
REACT_NATIVE_ACCOUNT_SID=<Your_Account_SID>
REACT_NATIVE_API_KEY=<Your_API_Key>
REACT_NATIVE_TENANT_ALIAS=<Your_Tenant_Alias>
REACT_NATIVE_JWT=<Your_JWT_Token>
```

### Installation
1. Clone the repository:
   ```bash
   git clone <repository_url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the app:
   ```bash
   npx react-native start
   ```

To run on a device:
- For iOS:
  ```bash
  npx react-native run-ios
  ```
- For Android:
  ```bash
  npx react-native run-android
  ```

---

## File Structure and Key Changes

### 1. App.tsx
This is the entry point of the app and contains the core logic for loading and displaying the Advocate widget.

#### Key Features
1. **Platform-Specific Logic**:
   The app uses `Platform.OS` to differentiate behavior between iOS and Android if necessary.

2. **API Call to Advocate**:
   A `fetch` call is made to the Advocate API endpoint to upsert the widget for a specific advocate:
   ```typescript
   const endpoint = `https://app.referralsaasquatch.com/api/v1/${tenantAlias}/widget/account/${payload.accountId}/user/${payload.id}/upsert?widgetType=p%2F27048%2Fw%2FreferrerWidget&engagementMedium=EMBED`;
   const auth = `Basic ${btoa(`${accountSid}:${apiKey}`)}`;
   ```

3. **Advocate User Payload**:
   The payload includes advocate-specific data such as `id`, `accountId`, and optional user information:
   ```typescript
   const payload = {
     id: '21dd3d5674f146e0c8ffeeb43fbbc3bf292b62beaf0315b7af6bfeeef2ee0a2f', // SHA1 of email
     accountId: '21dd3d5674f146e0c8ffeeb43fbbc3bf292b62beaf0315b7af6bfeeef2ee0a2f', // SHA1 of email
     firstName: 'John',
     lastName: 'Doe',
     email: 'john.doe@example.com',
     locale: 'en_CA',
     countryCode: 'CA',
   };
   ```

4. **WebView Integration**:
   The `react-native-webview` is used to render the widget:
   ```tsx
   <WebView
     originWhitelist={['*']}
     source={{ html: htmlCode || '', baseUrl: 'https://ssqt.co' }}
     style={{ flex: 1 }}
     javaScriptEnabled={true}
   />
   ```

5. **Error Handling**:
   Handles errors gracefully with fallback messages:
   ```tsx
   if (error) {
     return (
       <View style={styles.centered}>
         <Text>{error}</Text>
       </View>
     );
   }
   ```

---

### 2. package.json
The following dependencies are required for this app:
```json
"dependencies": {
  "react-native-webview": "^11.23.0"
}
```


---

## Error States
1. **Loading State**:
   While the API request is in progress, a loading spinner is displayed:
   ```tsx
   if (loading) {
     return (
       <View style={styles.centered}>
         <ActivityIndicator size="large" color="#0000ff" />
       </View>
     );
   }
   ```

2. **Error State**:
   If the API request fails, an error message is displayed:
   ```tsx
   if (error) {
     return (
       <View style={styles.centered}>
         <Text>{error}</Text>
       </View>
     );
   }
   ```

---

## Usage Instructions
### Running the App
1. Start the Metro bundler:
   ```bash
   npx react-native start
   ```

2. Run the app on a device or simulator:
   - iOS:
     ```bash
     npx react-native run-ios
     ```
   - Android:
     ```bash
     npx react-native run-android
     ```

---



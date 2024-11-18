import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Text, Platform } from 'react-native';
import { WebView } from 'react-native-webview';

// Define the endpoint and authorization
const tenantAlias = process.env.REACT_NATIVE_TENANT_ALIAS
const apiKey = process.env.REACT_NATIVE_API_KEY
const accountSid = process.env.REACT_NATIVE_ACCOUNT_SID
const JWT = process.env.REACT_NATIVE_JWT

const endpoint = `https://app.referralsaasquatch.com/api/v1/${tenantAlias}/widget/account/21dd3d5674f146e0c8ffeeb43fbbc3bf292b62beaf0315b7af6bfeeef2ee0a2f/user/21dd3d5674f146e0c8ffeeb43fbbc3bf292b62beaf0315b7af6bfeeef2ee0a2f/upsert?widgetType=p%2F27048%2Fw%2FreferrerWidget&engagementMedium=EMBED`;
const payload = {
  id: '21dd3d5674f146e0c8ffeeb43fbbc3bf292b62beaf0315b7af6bfeeef2ee0a2f',
  accountId: '21dd3d5674f146e0c8ffeeb43fbbc3bf292b62beaf0315b7af6bfeeef2ee0a2f',
};

export default function App(): JSX.Element {
  const [htmlCode, setHtmlCode] = useState<string | null>(null); // State to hold the HTML response
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const auth = `Basic ${btoa(`${accountSid}:${apiKey}`)}`;
console.log(accountSid)
console.log(apiKey)
  console.log(auth)
  useEffect(() => {
    const fetchHTML = async () => {
      try {
        const response = await fetch(endpoint, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization:  auth,
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
          console.log(response)

        }

        const result = await response.json();

        // Assume the response contains HTML in a field named `template`
        setHtmlCode(result.template || '<p>No HTML content received.</p>');
      } catch (error: unknown) {
        console.error('Error fetching HTML:', error);
        setError('Failed to fetch HTML content');
      } finally {
        setLoading(false);
      }
    };

    fetchHTML();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <WebView
      originWhitelist={['*']}
      source={{ html: htmlCode || '', baseUrl: 'https://google.com' }}
      style={{ flex: 1 }}
      contentMode={Platform.OS === 'ios' ? 'mobile' : 'desktop'} // Example conditional
      javaScriptEnabled={true}
    />
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

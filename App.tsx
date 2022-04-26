import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import Main from './Main';
import TokenProvider from './providers/TokenProvider';
import store from './redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <TokenProvider>
        <View style={styles.container}>
          <StatusBar translucent={false} backgroundColor='#efefef' />
          <Main />
        </View>
      </TokenProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef'
  },
});

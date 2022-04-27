import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import Main from './Main';
import TokenProvider from './providers/TokenProvider';
import store from './redux/store';
import { RootSiblingParent } from 'react-native-root-siblings';
import UserProvider from './providers/UserProvider';

export default function App() {
  return (
    <RootSiblingParent>
      <Provider store={store}>
        <TokenProvider>
          <UserProvider>
            <View style={styles.container}>
              <StatusBar translucent={false} backgroundColor='#efefef' />
              <Main />
            </View>
          </UserProvider>
        </TokenProvider>
      </Provider>
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef'
  },
});

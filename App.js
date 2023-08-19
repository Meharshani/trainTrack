import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { View, Text, AppConfig } from "react-native";
import { StatusBar } from "react-native";
import Navigations from "./src/Navigation/Navigations";
import { backgroundColor } from "Utils/ThemeColors";
import { store, persist } from "./src/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import {
  initConnection,
  purchaseErrorListener,
  purchaseUpdatedListener,
  flushFailedPurchasesCachedAsPendingAndroid,
} from "react-native-iap";

const App = () => {
  // useEffect(() => {
  //   initConnection().then(() => {
  //     // we make sure that "ghost" pending payment are removed
  //     // (ghost = failed pending payment that are still marked as pending in Google's native Vending module cache)
  //     flushFailedPurchasesCachedAsPendingAndroid()
  //       .catch(() => {
  //         // exception can happen here if:
  //         // - there are pending purchases that are still pending (we can't consume a pending purchase)
  //         // in any case, you might not want to do anything special with the error
  //       })
  //       .then(() => {
  //         this.purchaseUpdateSubscription = purchaseUpdatedListener(
  //           (purchase) => {
  //             console.log("purchaseUpdatedListener", purchase);
  //             const receipt = purchase.transactionReceipt;
  //             if (receipt) {
  //               yourAPI
  //                 .deliverOrDownloadFancyInAppPurchase(
  //                   purchase.transactionReceipt
  //                 )
  //                 .then(async (deliveryResult) => {
  //                   if (isSuccess(deliveryResult)) {
  //                     // Tell the store that you have delivered what has been paid for.
  //                     // Failure to do this will result in the purchase being refunded on Android and
  //                     // the purchase event will reappear on every relaunch of the app until you succeed
  //                     // in doing the below. It will also be impossible for the user to purchase consumables
  //                     // again until you do this.

  //                     // If consumable (can be purchased again)
  //                     await finishTransaction({ purchase, isConsumable: true });
  //                     // If not consumable
  //                     await finishTransaction({
  //                       purchase,
  //                       isConsumable: false,
  //                     });
  //                   } else {
  //                     // Retry / conclude the purchase is fraudulent, etc...
  //                   }
  //                 });
  //             }
  //           }
  //         );

  //         this.purchaseErrorSubscription = purchaseErrorListener((error) => {
  //           console.warn("purchaseErrorListener", error);
  //         });
  //       });
  //   });

  //   return () => {
  //     if (this.purchaseUpdateSubscription) {
  //       this.purchaseUpdateSubscription.remove();
  //       this.purchaseUpdateSubscription = null;
  //     }

  //     if (this.purchaseErrorSubscription) {
  //       this.purchaseErrorSubscription.remove();
  //       this.purchaseErrorSubscription = null;
  //     }
  //   };
  // }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persist}>
        <View style={{ flex: 1 }}>
          <StatusBar translucent backgroundColor={backgroundColor} />
          <Navigations />
        </View>
      </PersistGate>
    </Provider>
  );
};

export default App;

import { FirebaseRealData } from './firebase-realdata.js';
// import { AdsAPI } from './account-details-service.js';

const dataSources = () => ({
  FirebaseRealData: new FirebaseRealData(),
  // adsApi: new AdsAPI(),
});

export default dataSources;

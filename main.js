const db = firebase.initializeApp({
	apiKey: "AIzaSyCC9Nv6093AOhHJ2DV59fMnKJ35Jj_Ed0w",
	authDomain: "higiemax-pigue.firebaseapp.com",
	databaseURL: "https://higiemax-pigue.firebaseio.com",
	projectId: "higiemax-pigue",
	storageBucket: "higiemax-pigue.appspot.com",
	messagingSenderId: "567445337446",
	appId: "1:567445337446:web:2bda26d66bd73193d404a7",
	measurementId: "G-T5TCCNWJWV"
}).firestore();

Vue.use(db);

new Vue({
	el: "#app"
});
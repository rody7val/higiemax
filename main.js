firebase.initializeApp({
	apiKey: "AIzaSyCC9Nv6093AOhHJ2DV59fMnKJ35Jj_Ed0w",
	authDomain: "higiemax-pigue.firebaseapp.com",
	databaseURL: "https://higiemax-pigue.firebaseio.com",
	projectId: "higiemax-pigue",
	storageBucket: "higiemax-pigue.appspot.com",
	messagingSenderId: "567445337446",
	appId: "1:567445337446:web:2bda26d66bd73193d404a7",
	measurementId: "G-T5TCCNWJWV"
});

//Vue.use(db);
const fetchContact = firebase.functions().httpsCallable("contact");

const app = new Vue({
	el: "#app",
		//firestore() {
		//	return {
		//		persons: db.collection("persons")
		//	}
		//},
	data() {
		return {
			title: "HigieMAX",

			nav: [
				{ name: "SERVICIOS", href: "#servicios" },
				{ name: "CLIENTES", href: "#clientes" },
				{ name: "CONTACTO", href: "#contacto" },
			],

			services: {
				title: "Servicios",
				data: [
					{
						name: "Desinfección",
						desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
						img: [
							{src: "https://getuikit.com/docs/images/slider1.jpg", title: 1},
							{src: "https://getuikit.com/docs/images/slider2.jpg", title: 2},
							{src: "https://getuikit.com/docs/images/slider3.jpg", title: 3},
							{src: "https://getuikit.com/docs/images/slider4.jpg", title: 4},
							{src: "https://getuikit.com/docs/images/slider5.jpg", title: 5},
							{src: "https://getuikit.com/docs/images/slider1.jpg", title: 6},
							{src: "https://getuikit.com/docs/images/slider2.jpg", title: 7},
							{src: "https://getuikit.com/docs/images/slider3.jpg", title: 8},
							{src: "https://getuikit.com/docs/images/slider4.jpg", title: 9},
							{src: "https://getuikit.com/docs/images/slider5.jpg", title: 10}
						]
					},
					{
						name: "Institucional",
						desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
						img: [
							{src: "https://getuikit.com/docs/images/slider1.jpg", title: 1},
							{src: "https://getuikit.com/docs/images/slider2.jpg", title: 2},
							{src: "https://getuikit.com/docs/images/slider3.jpg", title: 3},
							{src: "https://getuikit.com/docs/images/slider4.jpg", title: 4},
							{src: "https://getuikit.com/docs/images/slider5.jpg", title: 5},
							{src: "https://getuikit.com/docs/images/slider1.jpg", title: 6},
							{src: "https://getuikit.com/docs/images/slider2.jpg", title: 7},
							{src: "https://getuikit.com/docs/images/slider3.jpg", title: 8},
							{src: "https://getuikit.com/docs/images/slider4.jpg", title: 9},
							{src: "https://getuikit.com/docs/images/slider5.jpg", title: 10}
						]
					},
					{
						name: "Final de evento y obra",
						desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
						img: [
							{src: "https://getuikit.com/docs/images/slider1.jpg", title: 1},
							{src: "https://getuikit.com/docs/images/slider2.jpg", title: 2},
							{src: "https://getuikit.com/docs/images/slider3.jpg", title: 3},
							{src: "https://getuikit.com/docs/images/slider4.jpg", title: 4},
							{src: "https://getuikit.com/docs/images/slider5.jpg", title: 5},
							{src: "https://getuikit.com/docs/images/slider1.jpg", title: 6},
							{src: "https://getuikit.com/docs/images/slider2.jpg", title: 7},
							{src: "https://getuikit.com/docs/images/slider3.jpg", title: 8},
							{src: "https://getuikit.com/docs/images/slider4.jpg", title: 9},
							{src: "https://getuikit.com/docs/images/slider5.jpg", title: 10}
						]
					},
					{
						name: "Vidrios",
						desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
						img: [
							{src: "https://getuikit.com/docs/images/slider1.jpg", title: 1},
							{src: "https://getuikit.com/docs/images/slider2.jpg", title: 2},
							{src: "https://getuikit.com/docs/images/slider3.jpg", title: 3},
							{src: "https://getuikit.com/docs/images/slider4.jpg", title: 4},
							{src: "https://getuikit.com/docs/images/slider5.jpg", title: 5},
							{src: "https://getuikit.com/docs/images/slider1.jpg", title: 6},
							{src: "https://getuikit.com/docs/images/slider2.jpg", title: 7},
							{src: "https://getuikit.com/docs/images/slider3.jpg", title: 8},
							{src: "https://getuikit.com/docs/images/slider4.jpg", title: 9},
							{src: "https://getuikit.com/docs/images/slider5.jpg", title: 10}
						]
					},
				]
			},

			clients: [
				{ 
					title: "Molino Cañuelas",
					desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
					img: "https://getuikit.com/docs/images/photo.jpg"
				},
				{ 
					title: "Mediarg",
					desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
					img: "https://getuikit.com/docs/images/dark.jpg"
				},
				{ 
					title: "Banco Provincia",
					desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
					img: "https://getuikit.com/docs/images/light.jpg"
				},
			],

			contact: {
				name: "",
				email: "",
				message: "",
				isSending: false,
			},

		}
	},

	methods: {

		clearForm() {
			for (let field in this.contact) {
				this.contact[field] = ''
			}
		},

		onSubmit(evt) {
			evt.preventDefault();
			this.isSending = true;
			fetchContact({
				name: this.contact.name,
				email: this.contact.email,
				message: this.contact.message,
			})
				.then(res => {
					console.log(res);
					if (res.data.success) {
						alert("Mensaje enviado");
						this.clearForm();
						this.isSending = false;
					}
				})
				.catch((e) => {
					console.log(e)
				})
			;
		}

	},

});

window.app = app;
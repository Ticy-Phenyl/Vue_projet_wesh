



// data
const products = [
    { id: 1, description: "Quarz Luxe", price: 12, img: 'assets/img/quarz-luxe.JPG' },
    { id: 2, description: 'Curren Business', price: 20, img: 'assets/img/curren-business.JPG' },
    { id: 3, description: 'Curren Sport', price: 5, img: 'assets/img/curren-sport.JPG' },
    { id: 4, description: 'Jaragar Racing', price: 8, img: 'assets/img/jaragar-racing.JPG' },
    { id: 5, description: 'Liges Hommes', price: 3, img: 'assets/img/liges-hommes.JPG' },
    { id: 6, description: 'Maserati Mechanical', price: 65, img: 'assets/img/maserati-mechanical.JPG' },
    { id: 7, description: 'Montre Mecanique', price: 25, img: 'assets/img/montre-mecanique.JPG' },
    { id: 8, description: 'Brand Designer', price: 28, img: 'assets/img/brand-designer.JPG' },
    { id: 9, description: 'Relogio Masculino', price: 4, img: 'assets/img/relogio-masculino.JPG' },
    { id: 10, description: 'Tissot Multifunction', price: 29, img: 'assets/img/tissot-multifunction.JPG' },
    { id: 11, description: 'Hip Hop Gold', price: 87, img: 'assets/img/hiphop-gold.JPG' },
    { id: 12, description: 'Mesh Genova', price: 6, img: 'assets/img/mesh-genova.JPG' },
];





const Home = {
    template: '#home',
    name: 'Home',
    data: () => {
        return {
            products,
            searchKey: '',
            liked: [],
            cart: []
        }
    },

    computed: {
        filteredList() {
            return this.products.filter((product) => {
                return product.description.toLowerCase().includes(this.searchKey.toLowerCase());
            })
        },
        getLikeCookie() {
            let cookieValue = JSON.parse($cookies.get('like'))
            cookieValue = null ? this.liked = [] : this.liked = cookieValue
        },
        totalCartAmount() {
            let total = 0;
            for (let item in this.cart) {
                total = total + (this.cart[item].quantity * this.cart[item].price)
            }
            return total
        },
        totalCartQuantity() {
            let total = 0;
            for (let item in this.cart) {
                total = total + (this.cart[item].quantity);

            }
            return total
        }
    },

    methods: {
        setLikeCookie() {
            document.addEventListener('input', () => {
                setTimeout(() => {
                    $cookies.set('like', JSON.stringify(this.liked));
                }, 300);
            })
        },
        addToCart(product) {
            //chef if already in Array
            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i].id == product.id) {
                    return this.cart[i].quantity++
                }
            }

            this.cart.push({
                id: product.id,
                img: product.img,
                description: product.description,
                price: product.price,
                quantity: 1
            })
        },
        cartPlusOne(product) {
            product.quantity = product.quantity + 1
        },
        cartMinusOne(product, id) {
            if (product.quantity === 1) {
                this.cartRemoveOne(id)
            } else {
                product.quantity = product.quantity - 1
            }
        },
        cartRemoveOne(id) {
            this.$delete(this.cart, id)

        }

    },

    mounted: () => {
        this.getLikeCookie;
    }
}



const UserSettings = {
    template: '<h1>UserSettings</h1>',
    name: 'UserSettings'
}

const WishList = {
    template: '<h1>WishList</h1>',
    name: 'WishList'
}

const ShoppingCart = {
    template: '<h1>ShoppingCart</h1>',
    name: 'ShoppingCart'
}


//router
const router = new VueRouter({
    routes: [
        { path: '/', component: Home, name: 'Home' },
        { path: '/UserSettings', component: UserSettings, name: 'UserSettings' },
        { path: '/WishList', component: WishList, name: 'WishList' },
        { path: '/ShoppingCart', component: ShoppingCart, name: 'ShoppingCart' }
    ]
})

//filter pr pluriel article in cart:
Vue.filter('pluralize', (word, amount) => (amount > 1 || amount === 0) ? `${word}s` : word)


const vue = new Vue({
    router
}).$mount('#app'); //mount pt être monté plus tard en utilisant vue.mount




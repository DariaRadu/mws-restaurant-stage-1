class DBHelper{static get DATABASE_URL(){return"http://localhost:1337/restaurants"}static openDatabase(){if(navigator.serviceWorker)return idb.open("restaurants",1,t=>{t.createObjectStore("restaurants",{keyPath:"id"})})}static fetchRestaurants(t){fetch(DBHelper.DATABASE_URL).then(t=>t.json()).then(e=>{t(null,e)}).catch(e=>{t(e,null)})}static fetchRestaurantById(t,e){DBHelper.fetchRestaurants((a,s)=>{if(a)e(a,null);else{const a=s.find(e=>e.id==t);a?e(null,a):e("Restaurant does not exist",null)}})}static fetchRestaurantByCuisine(t,e){DBHelper.fetchRestaurants((a,s)=>{if(a)e(a,null);else{const a=s.filter(e=>e.cuisine_type==t);e(null,a)}})}static fetchRestaurantByNeighborhood(t,e){DBHelper.fetchRestaurants((a,s)=>{if(a)e(a,null);else{const a=s.filter(e=>e.neighborhood==t);e(null,a)}})}static fetchRestaurantByCuisineAndNeighborhood(t,e,a){DBHelper.fetchRestaurants((s,r)=>{if(s)a(s,null);else{let s=r;"all"!=t&&(s=s.filter(e=>e.cuisine_type==t)),"all"!=e&&(s=s.filter(t=>t.neighborhood==e)),a(null,s)}})}static fetchNeighborhoods(t){DBHelper.fetchRestaurants((e,a)=>{if(e)t(e,null);else{const e=a.map((t,e)=>a[e].neighborhood),s=e.filter((t,a)=>e.indexOf(t)==a);t(null,s)}})}static fetchCuisines(t){DBHelper.fetchRestaurants((e,a)=>{if(e)t(e,null);else{const e=a.map((t,e)=>a[e].cuisine_type),s=e.filter((t,a)=>e.indexOf(t)==a);t(null,s)}})}static urlForRestaurant(t){return`./restaurant.html?id=${t.id}`}static imageUrlForRestaurant(t){return`./images/${t.id}-500_small.jpg`}static imageSrcSetForRestaurant(t){return`./images/${t.id}-500_small.jpg 500w, /images/${t.id}-800_medium.jpg 800w`}static mapMarkerForRestaurant(t,e){return new google.maps.Marker({position:t.latlng,title:t.name,url:DBHelper.urlForRestaurant(t),map:e,animation:google.maps.Animation.DROP})}}
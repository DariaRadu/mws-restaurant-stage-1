let restaurant;var newMap;let db,reviews;storeReviews=(e=>{const t=db.transaction("reviews","readwrite").objectStore("reviews");e.forEach(e=>{t.put(e)})}),document.addEventListener("DOMContentLoaded",e=>{initMap()}),initMap=(()=>{fetchRestaurantFromURL((e,t)=>{e?console.error(e):(self.newMap=L.map("map",{center:[t.latlng.lat,t.latlng.lng],zoom:16,scrollWheelZoom:!1}),L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.jpg70?access_token={mapboxToken}",{mapboxToken:"pk.eyJ1IjoiZGFyaWFyYWR1IiwiYSI6ImNqa2Z5ZjZueTBkOGwzdm56bHN1Y2pqY20ifQ.n9gKdcAPUTOoc50PPqILbA",maxZoom:18,attribution:'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',id:"mapbox.streets"}).addTo(newMap),fillBreadcrumb(),DBHelper.mapMarkerForRestaurant(self.restaurant,self.newMap))})}),DBHelper.openDatabase().then(e=>{(db=e).transaction("reviews","readwrite").objectStore("reviews").getAll().then(e=>{reviews=e})}),fetchRestaurantFromURL=(e=>{if(self.restaurant)return void e(null,self.restaurant);const t=getParameterByName("id");t?DBHelper.fetchRestaurantById(t,(t,n)=>{self.restaurant=n,n?(fillRestaurantHTML(),e(null,n)):console.error(t)}):(error="No restaurant id in URL",e(error,null))}),fillRestaurantHTML=((e=self.restaurant)=>{document.getElementById("restaurant-name").innerHTML=e.name,document.getElementById("restaurant-address").innerHTML=e.address;const t=document.getElementById("restaurant-img");t.className="restaurant-img",t.alt=e.name,t.srcset=DBHelper.imageSrcSetForRestaurant(e),t.src=DBHelper.imageUrlForRestaurant(e),t.sizes="50vw",document.getElementById("restaurant-cuisine").innerHTML=e.cuisine_type,e.operating_hours&&fillRestaurantHoursHTML(),DBHelper.fetchReviews(e.id,(e,t)=>{reviews=t,storeReviews(reviews),fillReviewsHTML(reviews)})}),fillRestaurantHoursHTML=((e=self.restaurant.operating_hours)=>{const t=document.getElementById("restaurant-hours");for(let n in e){const r=document.createElement("tr"),a=document.createElement("td");a.innerHTML=n,r.appendChild(a);const o=document.createElement("td");o.innerHTML=e[n],r.appendChild(o),t.appendChild(r)}}),fillReviewsHTML=(e=>{const t=document.getElementById("reviews-container");document.querySelector("#reviews-container h3").innerHTML="Reviews";let n=document.querySelector("#no-reviews");if(n&&t.removeChild(n),!e){const e=document.createElement("p");return e.id="no-reviews",e.innerHTML="No reviews yet!",void t.appendChild(e)}const r=document.getElementById("reviews-list");r.innerHTML="",e.forEach(e=>{r.appendChild(createReviewHTML(e))})}),createReviewHTML=(e=>{const t=document.createElement("li");if(!navigator.onLine){const e=document.createElement("p");e.classList.add("offline-review-label"),e.innerHTML="Connection Error. Review will be posted when the connection is restored!",t.appendChild(e),t.classList.add("offline-review")}const n=document.createElement("p");n.innerHTML=e.name,t.appendChild(n);const r=document.createElement("p");let a=new Date(e.createdAt);r.innerHTML=a.toISOString().substr(0,10),t.appendChild(r);const o=document.createElement("p");o.innerHTML=`Rating: ${e.rating}`,t.appendChild(o);const i=document.createElement("p");return i.innerHTML=e.comments,t.appendChild(i),t}),fillBreadcrumb=((e=self.restaurant)=>{const t=document.getElementById("breadcrumb"),n=document.createElement("li");n.innerHTML=e.name,t.appendChild(n)}),getParameterByName=((e,t)=>{t||(t=window.location.href),e=e.replace(/[\[\]]/g,"\\$&");const n=new RegExp(`[?&]${e}(=([^&#]*)|&|#|$)`).exec(t);return n?n[2]?decodeURIComponent(n[2].replace(/\+/g," ")):"":null});let addReviewButton=document.querySelector("#addReviewButton");addReviewButton.addEventListener("click",()=>{let e=getParameterByName("id"),t=document.querySelector("#reviewAuthor").value,n=document.querySelector("#reviewRating option:checked").value,r=document.querySelector("#reviewText").value;const a={restaurant_id:parseInt(e),rating:parseInt(n),name:t,comments:r,createdAt:new Date};reviews.push(a),DBHelper.addReview(a),document.querySelector("#reviews-list").appendChild(createReviewHTML(a))});
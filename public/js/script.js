const socket  = io();

if(navigator.geolocation){
    navigator.geolocation.watchPosition((positon) =>{
        const {latitude , longitude} = positon.coords;
        // console.log(latitude , longitude);
        socket.emit("send-location" , {latitude , longitude});
    },
    (err)=>{
        console.error(err);
    },
    {
     enableHighAccuracy:true,
     timeout:5000,
     maximumAge:0,   
    }
  ); 
};


const map = L.map("map").setView([0, 0],25);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" , {
    attribution:"Topu "
}).addTo(map);

const markers = {};

socket.on("receive-location" , (data)=>{
    const {id , latitude ,longitude} = data;
    map.setView([latitude , longitude],16);
    if(markers[id]){
        markers[id].setLatLng([latitude,longitude]);
    }else{
        markers[id] = L.marker([latitude,longitude]).addTo(map);
    }
} )


socket.on("user-disconnected" ,(id)=>{
    if(markers[id]){
        map.removeLayer(markers[id]);
        delete markers[id];
    }
} );

//sidebar
function openNav(){
    document.getElementById("mySidebar").style.width = "250px" ;
    document.getElementById("container").style.marginLeft = "250px";
    document.getElementById("openbtn").style.display = "none";
}
function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("container").style.marginLeft= "0";
    document.getElementById("openbtn").style.display= "block";
  }

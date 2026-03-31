// Booking + Inventory + Analytics (localStorage safe)
const DB = {
  bookings: JSON.parse(localStorage.getItem("bookings")||"[]"),
  inventory: JSON.parse(localStorage.getItem("inventory")||"[]"),
  payments: JSON.parse(localStorage.getItem("payments")||"[]")
};

function saveDB(){
  localStorage.setItem("bookings", JSON.stringify(DB.bookings));
  localStorage.setItem("inventory", JSON.stringify(DB.inventory));
  localStorage.setItem("payments", JSON.stringify(DB.payments));
}

// Booking workflow
function addBooking(b){
  b.status="pending";
  DB.bookings.push(b);
  saveDB();
}

// Payment tracking
function markPaid(id){
  let b=DB.bookings.find(x=>x.id===id);
  if(b){b.status="paid"; saveDB();}
}

// Inventory alert
function checkInventory(){
  return DB.inventory.filter(i=>i.qty<5);
}

// Export / Import
function exportData(){
  const blob=new Blob([JSON.stringify(DB)],{type:"application/json"});
  const a=document.createElement("a");
  a.href=URL.createObjectURL(blob);
  a.download="backup.json";
  a.click();
}

function importData(file){
  const reader=new FileReader();
  reader.onload=e=>{
    const data=JSON.parse(e.target.result);
    localStorage.setItem("bookings",JSON.stringify(data.bookings||[]));
    localStorage.setItem("inventory",JSON.stringify(data.inventory||[]));
    localStorage.setItem("payments",JSON.stringify(data.payments||[]));
    location.reload();
  };
  reader.readAsText(file);
}

// PWA
if('serviceWorker' in navigator){
  navigator.serviceWorker.register('sw.js');
}

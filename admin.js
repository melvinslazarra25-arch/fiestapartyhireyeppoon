function login(){
  if(document.getElementById('pass').value==='admin123'){
    localStorage.setItem('admin','1');
    document.getElementById('login').style.display='none';
    document.getElementById('dashboard').style.display='block';
    loadAnalytics();
  }
}
function logout(){
  localStorage.removeItem('admin');
  location.reload();
}
function loadAnalytics(){
  const bookings=JSON.parse(localStorage.getItem('bookings')||'[]');
  document.getElementById('analytics').innerText='Total bookings: '+bookings.length;
}

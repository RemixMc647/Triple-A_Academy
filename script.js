/* ====== EDIT YOUR SCHOOL DETAILS HERE ====== */
const SCHOOL = {
  phone: "",            // e.g. "+234 800 000 0000"
  email: "",            // e.g. "info@yourschool.com"
  address: ""           // e.g. "12 School Road, City"
};
/* =========================================== */
document.querySelectorAll("[data-fill]").forEach(el=>{
  const v=SCHOOL[el.dataset.fill];
  if(!v){el.textContent="Coming soon";return}
  if(el.dataset.fill==="email"){el.innerHTML=`<a href="mailto:${v}">${v}</a>`}
  else if(el.dataset.fill==="phone"){el.innerHTML=`<a href="tel:${v.replace(/\s/g,'')}">${v}</a>`}
  else el.textContent=v;
});
const menu=document.getElementById("menu"),nav=document.getElementById("nav");
if(menu){menu.addEventListener("click",()=>{const o=nav.classList.toggle("open");menu.setAttribute("aria-expanded",o)})}
document.getElementById("year").textContent=new Date().getFullYear();
/* Academics tabs */
const tabs=document.querySelectorAll(".tabs button");
tabs.forEach(t=>t.addEventListener("click",()=>{
  tabs.forEach(b=>b.setAttribute("aria-selected",b===t));
  document.querySelectorAll(".panel").forEach(p=>p.hidden=p.id!==t.dataset.panel);
}));
/* Contact form */
const form=document.getElementById("contact-form");
if(form){form.addEventListener("submit",e=>{
  e.preventDefault();let bad=false;
  form.querySelectorAll("[required]").forEach(f=>{
    const m=f.parentElement.querySelector(".err");let msg="";
    if(!f.value.trim())msg="This field is required.";
    else if(f.type==="email"&&!/^\S+@\S+\.\S+$/.test(f.value))msg="Enter a valid email address.";
    m.textContent=msg;if(msg)bad=true;
  });
  if(bad)return;
  const d=Object.fromEntries(new FormData(form));
  const body=`Name: ${d.name}\nEmail: ${d.email}\nTopic: ${d.topic}\n\n${d.message}`;
  if(SCHOOL.email){location.href=`mailto:${SCHOOL.email}?subject=${encodeURIComponent(d.topic+" - website enquiry")}&body=${encodeURIComponent(body)}`}
  form.hidden=true;document.getElementById("sent").hidden=false;
})}

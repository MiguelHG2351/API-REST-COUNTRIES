(()=>{"use strict";const t=document.getElementById("form"),e=document.getElementById("btn-country"),n=document.getElementById("select"),a=document.getElementById("filter"),o=n.children,c=document.getElementById("overlay"),i=document.getElementById("container"),s=document.getElementById("input");let l;e.addEventListener("click",(()=>{n.classList.toggle("active"),"expand_more"==e.children[1].textContent?e.children[1].textContent="expand_less":e.children[1].textContent="expand_more",c.classList.toggle("active")})),c.addEventListener("click",(()=>{c.classList.remove("active"),n.classList.remove("active")}));for(let t=0;t<o.length;t++)o[t].addEventListener("click",(()=>{a.textContent=o[t].dataset.id,l={name:o[t].dataset.id,type:"region"},n.classList.remove("active"),c.classList.remove("active")}));function r(t,e,n,a,o){return`\n    <div class="card">\n            <div class="card-image">\n                <img loading="lazy" class="responsive-img" src="${o}" alt="Imagen">\n            </div>\n            <div class="card-title">\n                <h2>${t}</h2>\n            </div>\n            <div class="card-description">\n                <strong>Population: <p>${e}</p></strong>\n                <strong>Region: <p>${n}</p></strong>\n                <strong>Capital: <p>${a}</p></strong>\n            </div>\n        </div>\n    `}async function d(t,e){console.log(e),"all"===e&&(t="all",e="");const n=`${e}`,a=await fetch(`https://restcountries.com/v3.1/${t}/${n}`),o=await a.json();if(404==o.status){alert("no existe, no lo hay xd");const t=await fetch("https://restcountries.com/v3.1/all");return await t.json()}return o}function g(t){const e=document.implementation.createHTMLDocument();return e.body.innerHTML=t,e.body.children[0]}function m(t){i.innerHTML="";for(const e in t){const{name:n,region:a,population:o,flags:c,capital:s}=t[e],l=g(r(n.common,o,a,s,c.svg));i.append(l)}}s.addEventListener("input",(async t=>{t.currentTarget.value.length>0&&m(await d("name",t.currentTarget.value))})),t.addEventListener("submit",(async t=>{t.preventDefault();const e=new FormData(t.currentTarget);s.value="",e.append("location",`${l.name}`),console.log(e.get("location").length),console.log(e.get("country").length),e.get("location").length>0&&0==e.get("country").length?m(await d(l.type,e.get("location"))):m(await d("name",e.get("country").toLowerCase()))}))})();
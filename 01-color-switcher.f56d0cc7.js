const t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),d=document.querySelector("body");let r=null;t.addEventListener("click",(()=>{r=setInterval((()=>{let t=`#${Math.floor(16777215*Math.random()).toString(16)}`;d.style.backgroundColor=t}),1e3),t.setAttribute("disabled","disabled")})),e.addEventListener("click",(()=>{clearInterval(r),t.removeAttribute("disabled","disabled")}));
//# sourceMappingURL=01-color-switcher.f56d0cc7.js.map
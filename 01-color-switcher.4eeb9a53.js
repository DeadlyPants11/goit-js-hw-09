!function(){var t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),n=document.querySelector("body"),o=null;t.addEventListener("click",(function(){o=setInterval((function(){var t="#".concat(Math.floor(16777215*Math.random()).toString(16));n.style.backgroundColor=t}),1e3),t.setAttribute("disabled","disabled")})),e.addEventListener("click",(function(){clearInterval(o),t.removeAttribute("disabled","disabled")}))}();
//# sourceMappingURL=01-color-switcher.4eeb9a53.js.map
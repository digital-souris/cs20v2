function delight_webp_checker(){check_webp_feature("lossy",function(A,t){if(!t){var e=document.getElementsByName("delight_webpconverter_attr")[0];window.attrs=e?e.getAttribute("content").split("|"):["data-src","src"],ForeachImages(),ForeachBgr(),new MutationObserver(function(A){A.forEach(function(A){A.addedNodes.length>0&&Array.prototype.forEach.call(A.addedNodes,function(A){A&&A.nodeType===Node.ELEMENT_NODE&&(images=A.getElementsByTagName("img"),images.length>0&&ForeachImages(),bgr_tags=A.querySelectorAll("[data-bgr-webp]"),bgr_tags.length>0&&ForeachBgr())})})}).observe(document.getElementsByTagName("body")[0],{childList:!0,subtree:!0})}"function"==typeof delight_lazyload_start&&delight_lazyload_start()})}function check_webp_feature(A,t){var e=new Image;e.onload=function(){var r=e.width>0&&e.height>0;t(A,r)},e.onerror=function(){t(A,!1)},e.src="data:image/webp;base64,"+{lossy:"UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",lossless:"UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",alpha:"UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",animation:"UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"}[A]}function ForeachImages(){for(var A=0;A<window.attrs.length;A++)for(var t=document.querySelectorAll("[data-webp-"+window.attrs[A]+"]"),e=0;e<t.length;e++)t[e].hasAttribute(window.attrs[A])&&t[e].getAttribute(window.attrs[A])!=t[e].getAttribute("data-webp-"+window.attrs[A])&&t[e].setAttribute(window.attrs[A],t[e].getAttribute("data-webp-"+window.attrs[A]))}function ForeachBgr(){for(var A=document.querySelectorAll("[data-bgr-webp]"),t=0;t<A.length;t++)A[t].hasAttribute("data-bgr-webp")&&(style_priority=A[t].style.getPropertyPriority("background-image"),""==style_priority&&(style_priority=A[t].style.getPropertyPriority("background")),A[t].style.setProperty("background-image","url('"+A[t].getAttribute("data-bgr-webp")+"')",style_priority))}document.addEventListener("DOMContentLoaded",function(){delight_webp_checker()});
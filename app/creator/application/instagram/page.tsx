
// export default function TikTok() {
//     return (
//         <iframe
//             src="https://honey-crush-315.notion.site/ebd/248639ae64d681afae8eeb008d366045"
//             width="100%"
//             height="600"
//             frameBorder="0"
//             allowFullScreen
//         ></iframe>
//     )
// }
import Script from 'next/script'

export default function Instagram() {
    return (
        <>
            <iframe id="ps-embed-689f3242c6903e003cd9ee9d" src="https://perspectivefunnel.co/689f320dbe629a003cc230d5/689f3242c6903e003cd9ee9d/?embed=1&header=0&footer=0&cookieBanner=1" className="w-screen h-screen"></iframe>
            <Script>
                {`!function(t){function i() { for (var e = [], n = 0; n < arguments.length; n++)e[n] = arguments[n]; var t = (new Date).getTime(); d <= t - s && (s = t, o.apply(void 0, e)) }var o,d,s,a=document.getElementById("ps-embed-689f3242c6903e003cd9ee9d");o=function(){a && "contentWindow" in a && "object" == typeof a.contentWindow && "postMessage" in a.contentWindow && "function" == typeof a.contentWindow.postMessage && a.contentWindow.postMessage({ type: "viewportHeight", viewportHeight: Math.min(a.scrollHeight, window.innerHeight) }, "*")},d=200,s=0,new ResizeObserver(i).observe(a);window.addEventListener("resize",i),window.addEventListener("message",function(e){var e=null==e?void 0:e.data,n=null==e?void 0:e.height;"embed-ready"===(null==e?void 0:e.type)&&setTimeout(i, 100),t&&a&&void 0!==n&&(a.style.height="".concat(n,"px"))})}(false);`}
            </Script>
        </>
    )
}
import rgbaToHsla from "./colors/rgbToHSL";

function ripple(e,button,focus,initial,mouseDown) {
    e.stopPropagation()
    let timeHandler=() => {
        try {
            button.style=initial
            button.removeChild(ripple_elmnt);
            mouseDown=false
        } catch(er) {}
    };
    clearTimeout(timeHandler)
    button.style.overflow="hidden"
    const style = getComputedStyle(button);
    let backgroundColor=style['backgroundColor']||""

    if(backgroundColor==="rgba(0, 0, 0, 0)" && !style["background"].includes("gradient")){
        backgroundColor="rgb(255, 255, 255)"
    }
    if(backgroundColor.startsWith("rgb")){
        backgroundColor=backgroundColor.replace(/^\w*/gm,"").replace(/[(|)]/g,"")
        var [r,g,b,a]=backgroundColor.split(",")
        var hslColor=rgbaToHsla(r,g,b,a?a:'1')
    }

    let ripple_elmnt = document.createElement("span");
    let diameter = Math.max(parseInt(style.height), parseInt(style.width)) * 1.5;
    let radius = diameter / 2;

    ripple_elmnt.className = "ripple";
    ripple_elmnt.style.height = ripple_elmnt.style.width = diameter + "px";
    ripple_elmnt.style.position = "absolute";
    ripple_elmnt.style.borderRadius = "1000px";
    ripple_elmnt.style.pointerEvents = "none";

    ripple_elmnt.style.left = e.nativeEvent.offsetX - radius  + "px";
    ripple_elmnt.style.top = e.nativeEvent.offsetY - radius + "px";
    if(focus){
        ripple_elmnt.style.left = 10 - radius  + "px";
        ripple_elmnt.style.top = 5 - radius + "px";
    }
    ripple_elmnt.style.transform = "scale(0)";
    ripple_elmnt.style.transformOrigin = "center";
    ripple_elmnt.style.transition = "transform 500ms ease, opacity 400ms ease";
    ripple_elmnt.style.background = `hsl(${hslColor?.data?.h}deg,${hslColor?.data?.s}%,${(hslColor?.data?.l > 60) ? "80%":"100%"},0.3)`;

    button.appendChild(ripple_elmnt);

    setTimeout(() => {
        ripple_elmnt.style.transform = "scale(1)";
    }, 10);

    button.addEventListener("mouseup", e => {
        ripple_elmnt.style.opacity = 0;
        setTimeout(timeHandler)
    }, {once: true});
    button.addEventListener("blur", e => {
        ripple_elmnt.style.opacity = 0;
        setTimeout(timeHandler)
    }, {once: true});
}

export default ripple

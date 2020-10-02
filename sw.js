/**/
var v="v5";
var core=(async e=>{
    var cache=await caches.open(v);
    var value=await cache.match(e);
    if(value===undefined){
        try{
            var f=await fetch(e)
        }catch(f){
            var f=await cache.match("error.html");
        }
        console.log(f,f.clone())
        cache.put(e,f.clone());
        return f.clone();
    }
    return value;
})
var fileslist=[
    "error.html",
    "style.css"
    ];
var install=(async ()=>{
    var cache=await caches.open(v);
    await cache.addAll(fileslist);
})
addEventListener("install",()=>{
    event.waitUntil(install())
    console.log("install");
})
addEventListener('fetch',function(e){
    console.log(core(e.request))
    e.respondWith(core(e.request));
})
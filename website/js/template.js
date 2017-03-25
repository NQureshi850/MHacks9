/* eslint-env jquery */
$("document").ready(function(){
    updatestatus();
    scrollalert();
});
function updatestatus(){
    //Show number of loaded items
    var totalItems=$("#content p").length;
    $("#status").text("Loaded "+totalItems+" Items");
}
function scrollalert(){
    var scrolltop=$("#scrollbox").attr("scrollTop");
    var scrollheight=$("#scrollbox").attr("scrollHeight");
    var windowheight=$("#scrollbox").attr("clientHeight");
    var scrolloffset=20;
    if(scrolltop>=(scrollheight-(windowheight+scrolloffset)))
    {
        //fetch new items
        $("#status").text("Loading more items...");
        $.get("new-items.html", "", function(newitems){
            $("#content").append(newitems);
            updatestatus();
        });
    }
    setTimeout("scrollalert();", 1500);
}

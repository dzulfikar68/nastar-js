// NASGOR.js is Navigation Single-Page Orientation
// Make single page app with jquery with easy setup and small size library

// yout should import script jquery before script nastar.js
// EXAMPLE:
// <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
// <script src="nastar.js"></script>

// EXAMPLE DATA LIST TAB:
// DATA:
// data: {
//     "containerId": "",
//     "listData": [],
// }
// var listData = [
//     {
//         tabId: "tab1",
//         containerId: "pageone",
//         urlHtml: "layout1.html"
//     },
// ]

// CALLBACK:
// onReady(tabNow), isSameClicked(tabNow), afterClicked(tabNow)

function initNastar(data, callback) {
    $(document).ready(function(){
        var tabActived = null
        data.listData.forEach(
            function(e) {
                $(`#${data.containerId}`).append(`<div id="nastar-${e.tabId}"></div>`)
                console.log("foreach" + e.tabId)
                $(`#nastar-${e.tabId}`).css("display", "none")
                $(`#nastar-${e.tabId}`).load(e.urlHtml)
                $(`#${e.tabId}`).click(
                    function() {
                        if(tabActived != null && e.tabId == tabActived.tabId) {
                            callback.isSameClicked(e)
                            return
                        }
                        data.listData.forEach(
                            function(x){
                                $(`#nastar-${x.tabId}`).css("display", "none")
                            }
                        )
                        $(`#nastar-${e.tabId}`).css("display", "block")
                        tabActived = e
                        callback.afterClicked(tabActived)
                    }
                )
            }
        );
        var firstData = data.listData[0]
        $(`#nastar-${firstData.tabId}`).css("display", "block")
        tabActived = firstData
        callback.onReady(firstData)
    })
}

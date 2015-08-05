function pivottable1() {

    var derivers = $.pivotUtilities.derivers;
    var renderers = $.extend($.pivotUtilities.renderers, $.pivotUtilities.c3_renderers);

    $.getJSON("http://api.issoa.net/api/organizations", function (mps) {

        $("#pt1").pivotUI(mps, {
            renderers: renderers,
            derivedAttributes: {
                "Type Bin": derivers.bin("Type", 10),
                "Type Imbalance": function (mp) {
                    return mp["Type"] == "Male" ? 1 : -1;
                }
            },
            cols: ["Type Bin"], rows: ["Type"],
            rendererName: "Org Chart"
        });
    });

}

function pivottable2() {

    var derivers = $.pivotUtilities.derivers;
    var renderers = $.extend($.pivotUtilities.renderers, $.pivotUtilities.d3_renderers);

    $.getJSON("http://api.issoa.net/api/organizations", function (mps) {
        $("#pt2").pivotUI(mps, {
            renderers: renderers,
            derivedAttributes: {
                "Type Bin": derivers.bin("Type", 10),
                "Type Imbalance": function (mp) {
                    return mp["Type"] == "Male" ? 1 : -1;
                }
            },
            cols: [], rows: ["Province", "Party"],
            rendererName: "Treemap"
        });
    });

}
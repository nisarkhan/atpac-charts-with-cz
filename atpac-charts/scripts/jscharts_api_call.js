function jschart1() {

    var _http = http_path_organizations();

    $.getJSON(_http, function (org_data) {
        var array = $.map(org_data, function (org_data) {
            return [[org_data.Type, parseInt(org_data.Id)]];
        });

        console.debug(array);

        var colors = randomColorGenerator(array.length);//['#FA5E1F', '#FDCB3F', '#71D743', '#D23333', '#BAE73F', '#AB7B55', '#B381C9', '#AB7B55', '#B381C9'];
        var myChart = new JSChart('graph1', 'bar');
        myChart.setDataArray(array);
        myChart.colorizeBars(colors);
        myChart.setTitle('AT-PAC - Organization');
        myChart.setTitleColor('#8E8E8E');
        myChart.setAxisNameX('Organization');
        myChart.setAxisNameY('%');
        myChart.setAxisColor('#c6c6c6');
        myChart.setAxisWidth(1);
        myChart.setAxisNameColor('#9a9a9a');
        myChart.setAxisValuesColor('#939393');
        myChart.setAxisPaddingTop(60);
        myChart.setAxisPaddingLeft(50);
        myChart.setAxisPaddingBottom(60);
        myChart.setTextPaddingBottom(20);
        myChart.setTextPaddingLeft(15);
        myChart.setTooltip([1, 'custom<br>contents']);
        myChart.setTitleFontSize(11);
        myChart.setBarBorderWidth(0);
        myChart.setBarSpacingRatio(50);
        myChart.setBarValuesColor('#737373');
        myChart.setGrid(false);
        myChart.setSize(616, 321);
        //myChart.setBackgroundImage('chart_bg.jpg');

        //tooltip:
        myChart.setFlagRadius(2);
        myChart.setTooltip(['admin', 'U.S.A and Canada']);

        //legend:
        myChart.setLegendShow(true);
        myChart.setLegendPosition('right top');
        myChart.setLegendForBar(1, '2005');
        //myChart.setLegendForBar(2, '2010');

        myChart.draw();
    });

}

function jschart2() {

        var _http = http_path_work_package();
        $.getJSON(_http, function (data) {
            var array = $.map(data, function (data) {
                return [[data.Name, parseInt(data.Id)]];
            });

            console.debug(array);
            var colors = randomColorGenerator(array.length);//['#FA5E1F', '#FDCB3F', '#71D743', '#D23333', '#BAE73F', '#B381C9'];
            console.debug(colors);
            var myChart = new JSChart('graph2', 'bar');
            myChart.setDataArray(array);
            myChart.colorizeBars(randomColorGenerator(array.length));
            myChart.setTitle('AT-PAC - Work Packages');
            myChart.setTitleColor('#8E8E8E');
            myChart.setAxisNameX('Orgs');
            myChart.setAxisNameY('%');
            myChart.setAxisColor('#c6c6c6');
            myChart.setAxisWidth(1);
            myChart.setAxisNameColor('#9a9a9a');
            myChart.setAxisValuesColor('#939393');
            myChart.setAxisPaddingTop(60);
            myChart.setAxisPaddingLeft(50);
            myChart.setAxisPaddingBottom(60);
            myChart.setTextPaddingBottom(20);
            myChart.setTextPaddingLeft(15);
            myChart.setTitleFontSize(11);
            myChart.setBarBorderWidth(0);
            myChart.setBarSpacingRatio(50);
            myChart.setBarValuesColor('#737373');
            myChart.setGrid(false);
            myChart.setSize(616, 321);
            //myChart.setBackgroundImage('chart_bg.jpg');
            myChart.draw();
    });

}

function jschart3() {

    var _http = http_path_organizations();

    $.getJSON(_http, function (org_data) {
        var array = $.map(org_data, function (org_data) {
            return [[org_data.Name, parseInt(org_data.Id * 8.6)]];
        });

        console.debug(array);
        var colors = randomColorGenerator(array.length);
        var myChart = new JSChart('graph3', 'pie');
        myChart.setDataArray(array);
        myChart.setSize(600, 300);
        myChart.setTitle('Organization Reference Chart');
        myChart.setTitleFontFamily('Times New Roman');
        myChart.setTitleFontSize(14);
        myChart.setTitleColor('#0F0F0F');
        myChart.setPieRadius(95);
        myChart.setPieValuesColor('#FFFFFF');
        myChart.setPieValuesFontSize(9);
        myChart.setPiePosition(180, 165);
        myChart.setShowXValues(false);
        myChart.setLegend('#99CDFB', 'Papers where authors found');
        myChart.setLegend('#3366FB', 'Papers which cite from other articles');
        myChart.setLegend('#0000FA', 'Papers which cite from news');
        myChart.setLegend('#F8CC00', 'Papers which lack crucial');
        myChart.setLegend('#F89900', 'Papers with different conclusion');
        myChart.setLegend('#F76600', 'Papers with useful information');
        myChart.setLegendShow(true);
        myChart.setLegendFontFamily('Times New Roman');
        myChart.setLegendFontSize(10);
        myChart.setLegendPosition(350, 120);
        myChart.setPieAngle(30);
        myChart.set3D(true);
        //myChart.setBackgroundImage('../../images/chart_bg.jpg');
        myChart.draw();
    });

}

function jschart4() {

    var _http = http_path_organizations();

    $.getJSON(_http, function (org_data) {
        var array = $.map(org_data, function (org_data) {
            return [[org_data.Name, parseInt(org_data.Id * 89.36)]];
        });

        console.debug(array);
        var colors = randomColorGenerator(array.length);
        var myChart = new JSChart('graph4', 'pie');
        myChart.setDataArray(array);
        myChart.colorizePie(colors);
        myChart.setTitle('Organization by World Region in 2015 (%)');
        myChart.setTitleColor('#8E8E8E');
        myChart.setTitleFontSize(11);
        myChart.setTextPaddingTop(30);
        myChart.setPieUnitsColor('#8F8F8F');
        myChart.setPieValuesColor('#6E6E6E');
        myChart.setSize(616, 321);
        myChart.setPiePosition(308, 190);
        myChart.setPieRadius(85);
        //myChart.setBackgroundImage('chart_bg.jpg');
        myChart.draw();
    });

}

function jschart5() {

    var _http = http_path_organizations();

    $.getJSON(_http, function (org_data) {
        var array = $.map(org_data, function (org_data) {
            return [[parseInt(org_data.Id * 2.3), parseInt(org_data.Id * 8.6)]];
        });

        console.debug(array);
        var colors = randomColorGenerator(array.length);
        var myChart = new JSChart('graph5', 'line');
        myChart.setDataArray(array);
        myChart.setAxisNameFontSize(10); 
        myChart.setAxisNameX('Organization Horizontal axis values');
        myChart.setAxisNameY('Org Vertical axis');
        myChart.setAxisNameColor('#787878');
        myChart.setAxisValuesNumberX(6);
        myChart.setAxisValuesNumberY(5);
        myChart.setAxisValuesColor('#38a4d9');
        myChart.setAxisColor('#38a4d9');
        myChart.setLineColor('#C71112');
        myChart.setTitle('Org chart');
        myChart.setTitleColor('#383838');
        myChart.setGraphExtend(true);
        myChart.setGridColor('#38a4d9');
        myChart.setSize(616, 321);
        myChart.setAxisPaddingLeft(140);
        myChart.setAxisPaddingRight(140);
        myChart.setAxisPaddingTop(60);
        myChart.setAxisPaddingBottom(45);
        myChart.setTextPaddingLeft(105);
        myChart.setTextPaddingBottom(12);
        //myChart.setBackgroundImage('chart_bg.jpg');
        myChart.draw();
    });

}

function jschart6() {

    var _http = http_path_organizations();

    $.getJSON(_http, function (org_data) {
        var array = $.map(org_data, function (org_data) {
            return [[parseInt(org_data.Id), parseInt(org_data.Id)]];
        });

        console.debug(array);
        var colors = randomColorGenerator(array.length);
        var myChart = new JSChart('graph6', 'line');
        myChart.setDataArray(array);
        myChart.setLineColor('#8D9386');
        myChart.setLineWidth(4);
        myChart.setTitleColor('#7D7D7D');
        myChart.setAxisColor('#9F0505');
        myChart.setGridColor('#a4a4a4');
        myChart.setAxisValuesColor('#333639');
        myChart.setAxisNameColor('#333639');
        myChart.setTitle('Org chart');
        myChart.setTextPaddingLeft(0);
        myChart.draw();
    });

}

 
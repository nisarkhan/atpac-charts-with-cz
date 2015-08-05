      function smslogin() {
        $.ajax({
          type:'GET',
          url: 'https://sms-api.herokuapp.com/smslogin',
          dataType: "jsonp",
          data:$('#loginfrm').serialize(), success: function(msg, response) {
            document.location.href="/main?fullname=" + msg.aaData[0].fullname + '&fname=' + msg.aaData[0].firstname;
          },
          error: function(xhr, status) {
            switch (xhr.status) {
              case 401:
                alert("Invalid username or password");
                break;
              case 400:
                alert("Internal Server Error");
                break;
            }
          }

        });
        return false;
      }


      //Add dataTable Functions
      var functions = $('<div class="btn-group"><button class="btn btn-default btn-xs" type="button">Actions</button><button data-toggle="dropdown" class="btn btn-xs btn-primary dropdown-toggle" type="button"><span class="caret"></span><span class="sr-only">Toggle Dropdown</span></button><ul role="menu" class="dropdown-menu pull-right"><li><a href="#">Edit</a></li><li><a href="#">Copy</a></li><li><a href="#">Details</a></li><li class="divider"></li><li><a href="#">Remove</a></li></ul></div>');
      $("#datatable tbody tr td:last-child").each(function(){
        $(this).html("");
        functions.clone().appendTo(this);
      });

      //Add dataTable Icons
      var functions = $('<a class="btn btn-default btn-xs" href="#" data-original-title="Open" data-toggle="tooltip"><i class="fa fa-file"></i></a> <a class="btn btn-primary btn-xs" href="#" data-original-title="Edit" data-toggle="tooltip"><i class="fa fa-pencil"></i></a> <a class="btn btn-danger btn-xs" href="#" data-original-title="Remove" data-toggle="tooltip"><i class="fa fa-times"></i></a>');
      $("#datatable-icons tbody tr td:last-child").each(function(){
        $(this).html("");
        functions.clone().appendTo(this);
      });

      $(document).ready(function(){
        var fullname = getParameterByName('fullname');
        var firstname = getParameterByName('fname');
        //initialize the javascript
        App.init();
        App.dataTables();

        // Display logged in user's name on home page and profile menu...
        $('#profile').text(getParameterByName('fullname'));
        $('#hello').text('Hello ' + getParameterByName('fname') + ',');

        function getParameterByName(name) {
          name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
          var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
          results = regex.exec(location.search);
          return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }


        /* Formating function for row details
        */
        function fnFormatDetails( oTable, nTr ) {
          var aData = oTable.fnGetData( nTr );
          var sOut = '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">';
          sOut += '<tr><td>Request:</td><td>'+ aData[ "requestID" ] +'</td></tr>';
          sOut += '<tr><td>Work Description:</td><td>'+ aData[ "reqDesc" ] +'</td></tr>';
          sOut += '<tr><td>Work Location:</td><td>'+ aData[ "location" ] +'</td></tr>';
          sOut += '<tr><td>Special Instructions:</td><td>'+ aData[ "instructions" ] +'</td></tr>';
          sOut += '<tr><td>Tag #:</td><td>'+ aData[ "tagid" ] +'</td></tr>';
          sOut += '<tr><td>Estimate Comments:</td><td>'+ aData[ "estcomments" ] +'</td></tr>';
          //sOut += '<tr><td>Map:</td><td><div id="map-canvas" style="width:100%; height:100%"></div></td></tr>';
          //sOut += '<tr><td>Extra info:</td><td>And any further details here (images etc)</td></tr>';
          sOut += '</table>';
          return sOut;
        }

        function fnDisplayOnMap( oTable, nTr ) {
          var aData = oTable.fnGetData( nTr );
          var lat;
          var lon;
          lat = aData[ "lat" ];
          lon = aData[ "lon" ];
          var myLatlng = new google.maps.LatLng(lat, lon);
          var mapOptions = {
            mapTypeId: google.maps.MapTypeId.HYBRID,
            zoom: 16,
            center: myLatlng
          }

          var mkrIcon;
          switch (aData["tagstatus"]) {
            case "Cancelled":
              mkrIcon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
              break;
            case "Dismantled":
              mkrIcon = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
              break;
            case "In Use":
              mkrIcon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
              break;
            case "Not Started":
              mkrIcon = 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png';
              break;
            case "Under Construction":
              mkrIcon = 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png';
              break;
            case "Not In Use":
              mkrIcon = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
              break;
            default:
              mkrIcon = 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png';
          };

          var contentString = '<div id="content">'+
          '<div id="tagInfo">'+
          '</div>'+
          '<h1 id="firstHeading" class="firstHeading">' +aData["tagid"] + '</h1>'+
          '<div id="bodyContent">'+
          '<p>Weight: ' + aData["currentweight"] + ' tonnes</p>' +
          '<p>Status: ' + aData["tagstatus"] + '</p>' +
          '</div>'+
          '</div>';

          var infowindow1 = new google.maps.InfoWindow({
            content: contentString
          });

          var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

          var marker = new google.maps.Marker({
            position: myLatlng,
            icon: mkrIcon
          });

          // To add the marker to the map, call setMap();
          marker.setMap(map);

          google.maps.event.addListener(marker, 'click', function() {
            infowindow1.open(map,marker);
          });
        }

        function fnDisplayOnMap2( oTable, nTr ) {
          var aData = oTable.fnGetData( nTr );
          var lat;
          var lon;
          lat = aData[ "lat" ];
          lon = aData[ "lon" ];
          var myLatlng = new google.maps.LatLng(lat, lon);
          var mapOptions = {
            mapTypeId: google.maps.MapTypeId.HYBRID,
            zoom: 16,
            center: myLatlng
          }

          var mkrIcon;
          switch (aData["tagstatus"]) {
            case "Cancelled":
              mkrIcon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
              break;
            case "Dismantled":
              mkrIcon = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
              break;
            case "In Use":
              mkrIcon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
              break;
            case "Not Started":
              mkrIcon = 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png';
              break;
            case "Under Construction":
              mkrIcon = 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png';
              break;
            case "Not In Use":
              mkrIcon = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
              break;
            default:
              mkrIcon = 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png';
          };

          var contentString = '<div id="content">'+
          '<div id="tagInfo">'+
          '</div>'+
          '<h1 id="firstHeading" class="firstHeading">' +aData["tagid"] + '</h1>'+
          '<div id="bodyContent">'+
          '<p>Weight: ' + aData["currentweight"] + ' tonnes</p>' +
          '<p>Status: ' + aData["tagstatus"] + '</p>' +
          '</div>'+
          '</div>';

          var infowindow1 = new google.maps.InfoWindow({
            content: contentString
          });

          var map = new google.maps.Map(document.getElementById("map-canvas2"), mapOptions);

          var marker = new google.maps.Marker({
            position: myLatlng,
            icon: mkrIcon
          });

          // To add the marker to the map, call setMap();
          marker.setMap(map);

          google.maps.event.addListener(marker, 'click', function() {
            infowindow1.open(map,marker);
          });
        }

        /*
        * Insert a 'details' column to the table
        */

        //$('#reqfrm').submit(function(){
        var nCloneTh = document.createElement( 'th' );
        var nCloneTd = document.createElement( 'td' );
        //nCloneTh.innerHTML = "Details";
        //nCloneTd.innerHTML = '<img class="toggle-details" src="cz/images/plus.png" />';
        //nCloneTd.className = "center";

        $('#datatable2 thead tr').each( function () {
          this.insertBefore( nCloneTh, this.childNodes[0] );
        });

        $('#datatable2 tbody tr').each( function () {
          this.insertBefore(  nCloneTd.cloneNode( true ), this.childNodes[0] );
        });

        $('#datatable3 thead tr').each( function () {
          this.insertBefore( nCloneTh, this.childNodes[0] );
        });

        $('#datatable3 tbody tr').each( function () {
          this.insertBefore(  nCloneTd.cloneNode( true ), this.childNodes[0] );
        });       



        /*
        * Initialse DataTables, with no sorting on the 'details' column
        */
        var oTable = $('#datatable2').dataTable( {
          //"sAjaxSource": "https://localhost:9898/sms_test?callback=?",
          "dom": 'C<"clear">Rlfrtip',
          "stateSave": true,
          "colVis": {
            "exclude": [ 0, 1 ],
            "showAll": "Show all",
            "showNone": "Show none"
          },
          "sAjaxSource": "https://sms-api.herokuapp.com/sms_test?callback=?",
          "sAjaxDataProp": "aaData",
          "aoColumnDefs": [
            { "bSortable": false, "aTargets": [0] },
            { "bSortable": false, "aTargets": [1] }
          ],
          "aoColumns": [
            //{ "mData": null },
            { "mData": null, "sDefaultContent": '<img class="toggle-details" src="cz/images/plus.png" />', "aTargets": [ 0 ] },
            { "mData": null, "sDefaultContent": '<a class="btn btn-default btn-xs" href="#" data-original-title="Open" data-toggle="tooltip"><i class="fa fa-file"></i></a>', "aTargets": [1] },
            { "mData": "requestID" },
            { "mData": "requesteBy" },
            { "mData": "enteredBy" },
            { "mData": "type" },
            { "mData": "area" },
            { "mData": "priority" },
            { "mData": "submitted" },
            { "mData": "required" },
            { "mData": "until" }
            //{ "mData": "reqDesc" }
          ],
          "aaSorting": [[2, 'asc']],
          //"iDisplayLength": -1,
          "iDisplayLength": 20,
          "aLengthMenu": [[10, 20, 30, 40, 50, 100, -1], [10, 20, 30, 40, 50, 100, "All"]],
          "fnRowCallback": function() {
            // Assigning colors to inactive rows
            $('tr').each( function(){
              //$('tr').odd.gradeA;
              //$('tr').even.gradeC;
            });
          }
        });

        var oTable2 = $('#datatable3').dataTable( {
          "dom": 'C<"clear">Rlfrtip',
          "stateSave": true,
          "colVis": {
            "exclude": [ 0, 1 ],
            "showAll": "Show all",
            "showNone": "Show none"
          },
          //"sAjaxSource": "https://localhost:9898/sms_test?callback=?",
          "sAjaxSource": "https://sms-api.herokuapp.com/sms_test?callback=?",
          "sAjaxDataProp": "aaData",
          "aoColumnDefs": [
            { "bSortable": false, "aTargets": [0] },
            { "bSortable": false, "aTargets": [1] }
          ],
          "aoColumns": [
            //{ "mData": null },
            { "mData": null, "sDefaultContent": '<img class="toggle-details" src="cz/images/plus.png" />', "aTargets": [ 0 ] },
            { "mData": null, "sDefaultContent": '<a class="btn btn-default btn-xs" href="#" data-original-title="Open" data-toggle="tooltip"><i class="fa fa-file"></i></a>', "aTargets": [1] },
            { "mData": "requestID" },
            { "mData": "requesteBy" },
            { "mData": "enteredBy" },
            { "mData": "type" },
            { "mData": "area" },
            { "mData": "priority" },
            { "mData": "submitted" },
            { "mData": "required" },
            { "mData": "until" }
            //{ "mData": "reqDesc" }
          ],
          "aaSorting": [[2, 'asc']],
          //"iDisplayLength": -1,
          "iDisplayLength": 20,
          "aLengthMenu": [[10, 20, 30, 40, 50, 100, -1], [10, 20, 30, 40, 50, 100, "All"]],
          "fnRowCallback": function() {
            // Assigning colors to inactive rows
            $('tr').each( function(){
              //$('tr').odd.gradeA;
              //$('tr').even.gradeC;
            });
          }
        });

        var oTable3 = $('#usrTable').dataTable( {
          //"sAjaxSource": "https://localhost:9898/sms_test?callback=?",
          "sAjaxSource": "https://sms-api.herokuapp.com/smsuser?callback=?",
          "sAjaxDataProp": "aaData",
          "aoColumns": [
            //{ "mData": null },
            { "mData": "username" },
            { "mData": "fname" },
            { "mData": "lname" },
            { "mData": "email" }
          ],
          "aaSorting": [[1, 'asc']],
          //"iDisplayLength": -1,
          "iDisplayLength": 20,
          "aLengthMenu": [[10, 20, 30, 40, 50, 100, -1], [10, 20, 30, 40, 50, 100, "All"]],
          "fnRowCallback": function() {
            // Assigning colors to inactive rows
            $('tr').each( function(){
              //$('tr').odd.gradeA;
              //$('tr').even.gradeC;
            });
          }
        });



        nCloneTd.className = "center";
        /* Add event listener for opening and closing details
        * Note that the indicator for showing which row is open is not controlled by DataTables,
        * rather it is done here
        */
        $('#datatable2').delegate('tbody td img','click', function () {
          var nTr = $(this).parents('tr')[0];
          if ( oTable.fnIsOpen(nTr) )
          {
            // This row is already open - close it
            this.src = "cz/images/plus.png";
            oTable.fnClose( nTr );
          }
          else
          {
            //Open this row
            this.src = "cz/images/minus.png";
            oTable.fnOpen( nTr, fnFormatDetails(oTable, nTr), 'details' );
          }
        });

        $('#datatable2').delegate('tbody td','dblclick', function () {
          alert("Coming Soon: Double Click Row to Open in form...");
        });

        $('#datatable2').delegate('tbody td a','click', function () {
          alert("Coming Soon: Double Click Open icon to open in form...");
        });

        $('#datatable2').delegate('tbody td','click', function () {
          //alert("Will display in map here...");
          var nTr = $(this).parents('tr')[0];
          fnDisplayOnMap(oTable, nTr);
        });

        $('#datatable3').delegate('tbody td img','click', function () {
          var nTr = $(this).parents('tr')[0];
          if ( oTable2.fnIsOpen(nTr) )
          {
            // This row is already open - close it
            this.src = "cz/images/plus.png";
            oTable2.fnClose( nTr );
          }
          else
          {
            //Open this row
            this.src = "cz/images/minus.png";
            oTable2.fnOpen( nTr, fnFormatDetails(oTable2, nTr), 'details' );
          }
        });

        $('#datatable3').delegate('tbody td','click', function () {
          //alert("Will display in map here...");
          var nTr = $(this).parents('tr')[0];
          fnDisplayOnMap2(oTable2, nTr);
        });

        $('.dataTables_filter input').addClass('form-control').attr('placeholder','Search');
        $('.dataTables_length select').addClass('form-control');
        //Horizontal Icons dataTable
        $('#datatable-icons').dataTable();

        //File Input control
        $('#attachment').fileinput({'showPreview':false});

        $('label.tree-toggler').click(function () {
          var icon = $(this).children(".fa");
          if(icon.hasClass("fa-folder-o")){
            icon.removeClass("fa-folder-o").addClass("fa-folder-open-o");
          }else{
            icon.removeClass("fa-folder-open-o").addClass("fa-folder-o");
          }
          $(this).parent().children('ul.tree').toggle(300,function(){
            $(this).parent().toggleClass("open");
            $(".tree .nscroller").nanoScroller({ preventPageScrolling: true });
          });
        });
      });



      function submitForm() {
        var password =  CryptoJS.MD5(document.getElementById('pword').value);
        document.getElementById('pword').value = password;
        $.ajax({
          type:'POST',
          //url: 'https://localhost:9898/sms_test',
          url: 'https://sms-api.herokuapp.com/smsuser',
          data:$('#usrFrm').serialize(), success: function(response) {
            //document.getElementById('req_num').value = 'REQ-' + response;
            alert("User added, id=" + response + ".");
          }
        });
        //oTable2.fnReloadAjax();
        return false;
      }
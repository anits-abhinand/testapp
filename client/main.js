var Tables = [];
var data;
var Selected_Columns=[];
var tableArray;
var SelectedColumnsDatatype=[];
var left_field_parent_divRef = document.getElementById("left_field_parent_div");
var center_field_parent_divRef = document.getElementById("center_field_parent_div");
var right_field_parent_divRef = document.getElementById("right_field_parent_div");
var field_count = 1;
var count=1;
var key_value = {};
var result=[];
var isServiceOn = true;
var dataProvider;
loginAction();
 
function loginAction(){
    //var username = "harish.kasina@kony.com";
    //var password = "Harsha14yL1fBEeDRWPEc6nNtRzlKFqT";
	var username = "satyaprakash1729@gmail.com";
	var password = "salesforce$1729D6HNR3cVaCJP4lA5XZnjO10l";
    if(username === null || username === undefined || password === null || password === undefined )
    {
        document.write("Invalid Credentials!!");
        return;
    }
	var text="sample text";
    authenticateService(username, password,text, callback, authenticateErrorcallback);
    function callback(response){
        if(response !== null && response !== undefined){
            sessionToken = response;
            GetMetaData();
        }
        else
            document.write(" session token is improper");

    }
	function authenticateErrorcallback(response){
		var alertMessage = "ERROR ";
		if(response !== null && response !== undefined){
			if(response.hasOwnProperty("errorCode")){
				alertMessage = response["errorCode"]+": ";
			}
			if(response.hasOwnProperty("errorMsg")){
				alertMessage += response["errorMsg"];
			}
		}
		alert(alertMessage);
	}
}

function GetMetaData(){
    var metaService = new MetadataService(isServiceOn);
    metadataProvider = metaService.getMetadataProvider();
    metadataProvider.getEntities( sessionToken, fetchSuccessCallback, fetchErrorCallback);
    function fetchSuccessCallback(response){
		for(var i=0;i<response.length;i+=1)
			Tables.push(response[i].name);
			$(document).ready(function(){
            var btn = $("#drop_down_content");
            $('.list-group-item').mouseover(function(){
                $(this).addClass('hover');
            });

            $('.list-group-item').mouseout(function(){
                $(this).removeClass('hover');
            });

            var list = document.getElementById("columns");

            for(var i=0;i<Tables.length; i++){
                var new_id = "field" + count;
                var anchor = '#' + "test";
                btn.append('<li ><a href = '+ anchor +' id='+new_id+'>'+Tables[i]+'</a></li>');
                count += 1;
            }

            btn.on("click", 'a', function(event){
                //alert("event.target.id   " + event.target.id);
                var Table_Name = $("#"+event.target.id).text();
				
				$('#entityname').html("List Of Fields in "+Table_Name+" Table");
				
				$('#selected_field1').empty();
				$('#selected_field2').empty();
				$('#selected_field3').empty();
				$('#display_field1').empty();
				$('#display_field2').empty();
				$('#display_field3').empty();
				$('#selected_field1').html("Drag Here");
				$('#selected_field2').html("Drag Here");
				$('#selected_field3').html("Drag Here");
				$('#display_field1').html("Dragged data");
				$('#display_field2').html("Dragged data");
				$('#display_field3').html("Dragged data");
                if(metadataProvider !== null && metadataProvider !== undefined){
                    metadataProvider.getEntity(Table_Name, sessionToken, entitySuccessCallback, entityErrorCallback);
                }
                function entitySuccessCallback(response){
                    Selected_Columns = [];
                    SelectedColumnsDatatype = [];
                    for(var i=0;i<response["fields"].length;i+=1){
                        key_value[response["fields"][i]["name"]] = response["fields"][i]["type"];
						Selected_Columns.push(response["fields"][i]["name"]);
                    }
                    SetColumnContents();
                }
                function entityErrorCallback(response){
                    var alertMessage = "ERROR ";
                    if(response !== null && response !== undefined){
                        if(response.hasOwnProperty("errorCode")){
                            alertMessage = response["errorCode"]+": ";
                        }
                        if(response.hasOwnProperty("errorMessage")){
                            alertMessage += response["errorMessage"];
                        }
                    }
                    alert(alertMessage);
                }
                function SetColumnContents()
				{
                    var set = $('#columns');
                    var new_column_set = '';
                    var new_column;
                    for(i=0; i<Selected_Columns.length; i++)
					{
                        new_id = "field" + field_count;
                        //var anchor = '#' + "test";
                        new_column = '<a href="#" class="list-group-item">'+ Selected_Columns[i] +'</a>';
                        new_column_set += new_column;
                    }
                    list.innerHTML = new_column_set;
					data_fetch(Table_Name);
					drag();
                }
            });
        });
    }
    function fetchErrorCallback(response){
        var alertMessage = "ERROR ";
        if(response !== null && response !== undefined){
            if(response.hasOwnProperty("errorCode")){
                alertMessage = response["errorCode"]+": ";
            }
            if(response.hasOwnProperty("errorMessage")){
                alertMessage += response["errorMessage"];
            }
        }
        document.write(alertMessage);
    }
}

        center_field_parent_divRef = document.getElementById("center_field_parent_div");
        right_field_parent_divRef = document.getElementById("right_field_parent_div");


      
//////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/*
        var center_field_set = document.createElement('div');
        var right_field_set = document.createElement('div');
        while(field_count < 4){
            var new_div = $('<div/>', {
                class: "list-group-item"
            }).appendTo(center_field_set);
            $('<div/>', {
                    id: "selected_field" + field_count,
                    class: "list-group-item",
                    text: "field"+ field_count
                }).appendTo(new_div);




            new_div = $('<div/>', {
                id: "display_field" + field_count,
                text: "field"+ field_count,
                class: "list-group-item"
            }).appendTo(right_field_set);




            field_count += 1;
        }
        center_field_parent_divRef.innerHTML = center_field_set.innerHTML;
        right_field_parent_divRef.innerHTML = right_field_set.innerHTML;
        field_count = 1;
*/
///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////



function drag(){

    $("#left_field_parent_div .list-group-item ").draggable({helper: "clone"});
  //  $( "#left_field_parent_div .list-group-item " ).draggable({ cursor: "crosshair" });

    $("#selected_field1").droppable({
        accept: ".list-group-item",
       // activeClass: "ui-state-highlight",
       // hoverClass: "drop-hover",
       // tolerance: "fit",
        drop: function(event,ui){
            //alert("Item was Dropped");
            $(this).empty();
            $(this).html($(ui.draggable)[0].innerHTML);
			
            display_type($(this)[0].id, $(ui.draggable)[0].innerHTML);
		   
           // $(this).append($(ui.draggable).clone());
           // alert($(ui.draggable)[0].innerHTML);
        }
    });

    $("#selected_field2").droppable({
        accept: ".list-group-item",
       // activeClass: "ui-state-highlight",
        //hoverClass: "drop-hover",
       // tolerance: "fit",
        drop: function(event,ui){
            //alert("Item was Dropped");
            $(this).empty();
            $(this).html($(ui.draggable)[0].innerHTML);
			
            display_type($(this)[0].id, $(ui.draggable)[0].innerHTML);
           // $(this).append($(ui.draggable).clone());
           // alert($(ui.draggable)[0].innerHTML);
        }
    });

    $("#selected_field3").droppable({
        accept: ".list-group-item",
      //  activeClass: "ui-state-highlight",
       // hoverClass: "drop-hover",
       // tolerance: "fit",
        drop: function(event,ui){
            //alert("Item was Dropped");
            $(this).empty();
            $(this).html($(ui.draggable)[0].innerHTML);
			
            display_type($(this)[0].id, $(ui.draggable)[0].innerHTML);
          //  $(this).append($(ui.draggable).clone());
           // alert($(ui.draggable)[0].innerHTML);
        }
    });

}

function display_type(id, column_name){
    var number = id[id.length-1];
    var display_id = "display_field" + number;
    $('#'+display_id).empty();
	$('#'+display_id).html(data[0][column_name]);
    //$('#'+display_id).html(key_value[column_name]);
}

function data_fetch(selectedTable){
	if(dataProvider === null || dataProvider === undefined){
		var dataService = new DataService(isServiceOn);
		dataProvider = dataService.getDataProvider();
	}
	var entities = [];
	var table = new Table(selectedTable);
	var query = new SelectQuery(table);
	var column;
	for(i=0;i<Selected_Columns.length;i++){
		column = new Column(table, Selected_Columns[i]);
		query.addColumn(column);
	}
	
	dataProvider.fetch(query, sessionToken, fetchSuccesscallback, fetchErrorCallback);
	function fetchSuccesscallback(response){
		if(response !== null && response !== undefined && response.length !== 0){
			data = response;
			/*entities = response;
			var id = response[0]["Id"];
			query.removeColumn(column);
			var match = new Match(column, MatchType.EQUALS, id);
			query.addCriteria(match);
			dataProvider.fetch(query, sessionToken, fetchDetailsCallback, fetchErrorCallback);*/
		} else {
			alert("No records for the table.");
		}
	}
	function fetchErrorCallback(response){
		var alertMessage = "ERROR ";
		if(response !== null && response !== undefined){
			if(response.hasOwnProperty("errorCode")){
				alertMessage = response["errorCode"]+": ";
			}
			if(response.hasOwnProperty("errorMessage")){
				alertMessage += response["errorMessage"];
			}
		}
		alert(alertMessage);
	}
}
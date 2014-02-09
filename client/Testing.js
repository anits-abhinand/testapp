/**
 * Created by KH9056 on 2/5/14.
 */


var metadata = {
    "menu": [
        {
            "entity_id": 1,
            "entity_name": "Account",
            "pages": [
                {
                    "template_id": 1,
                    "template_name": "listpage",
                    "template_props": [
                        {
                            "name": "numberofheaders",
                            "value": "4",
                            "datatype": "number"
                        }
                    ],
                    "fields": [
                        {
                            "fieldmapping_id": 1,
                            "fieldname": "Id",
                            "properties": [
                                {
                                    "name": "sequence",
                                    "value": "1",
                                    "datatype": "number"
                                },
                                {
                                    "name": "showasPhoneNo",
                                    "value": "false",
                                    "datatype": "boolean"
                                },
                                {
                                    "name": "showasAddress",
                                    "value": "false",
                                    "datatype": "boolean"
                                },
                                {
                                    "name": "sortable",
                                    "value": "true",
                                    "datatype": "boolean"
                                }
                            ]
                        },
                        {
                            "fieldmapping_id": 2,
                            "fieldname": "Name",
                            "properties": [
                                {
                                    "name": "sequence",
                                    "value": "1",
                                    "datatype": "number"
                                },
                                {
                                    "name": "showasPhoneNo",
                                    "value": "false",
                                    "datatype": "boolean"
                                },
                                {
                                    "name": "showasAddress",
                                    "value": "false",
                                    "datatype": "boolean"
                                },
                                {
                                    "name": "sortable",
                                    "value": "true",
                                    "datatype": "boolean"
                                }
                            ]
                        },
                        {
                            "fieldmapping_id": 3,
                            "fieldname": "Type",
                            "properties": [
                                {
                                    "name": "sequence",
                                    "value": "1",
                                    "datatype": "number"
                                },
                                {
                                    "name": "showasPhoneNo",
                                    "value": "false",
                                    "datatype": "boolean"
                                },
                                {
                                    "name": "showasAddress",
                                    "value": "false",
                                    "datatype": "boolean"
                                },
                                {
                                    "name": "sortable",
                                    "value": "false",
                                    "datatype": "boolean"
                                }
                            ]
                        },
                        {
                            "fieldmapping_id": 4,
                            "fieldname": "AccountNumber",
                            "properties": [
                                {
                                    "name": "sequence",
                                    "value": "1",
                                    "datatype": "number"
                                },
                                {
                                    "name": "showasPhoneNo",
                                    "value": "false",
                                    "datatype": "boolean"
                                },
                                {
                                    "name": "showasAddress",
                                    "value": "false",
                                    "datatype": "boolean"
                                },
                                {
                                    "name": "sortable",
                                    "value": "true",
                                    "datatype": "boolean"
                                }
                            ]
                        }
                    ]
                },
                {
                    "template_id": 2,
                    "template_name": "detailpage",
                    "template_props": [
                        {
                            "name": "numberofheaders",
                            "value": "4",
                            "datatype": "number"
                        }
                    ],
                    "fields": [
                        {
                            "fieldmapping_id": 1,
                            "fieldname": "Id",
                            "properties": [
                                {
                                    "name": "sequence",
                                    "value": "1",
                                    "datatype": "number"
                                },
                                {
                                    "name": "showasPhoneNo",
                                    "value": "false",
                                    "datatype": "boolean"
                                },
                                {
                                    "name": "showasAddress",
                                    "value": "false",
                                    "datatype": "boolean"
                                }
                            ]
                        },
                        {
                            "fieldmapping_id": 2,
                            "fieldname": "Name",
                            "properties": [
                                {
                                    "name": "sequence",
                                    "value": "1",
                                    "datatype": "number"
                                },
                                {
                                    "name": "showasPhoneNo",
                                    "value": "false",
                                    "datatype": "boolean"
                                },
                                {
                                    "name": "showasAddress",
                                    "value": "false",
                                    "datatype": "boolean"
                                }
                            ]
                        },
                        {
                            "fieldmapping_id": 3,
                            "fieldname": "Type",
                            "properties": [
                                {
                                    "name": "sequence",
                                    "value": "1",
                                    "datatype": "number"
                                },
                                {
                                    "name": "showasPhoneNo",
                                    "value": "false",
                                    "datatype": "boolean"
                                },
                                {
                                    "name": "showasAddress",
                                    "value": "true",
                                    "datatype": "boolean"
                                }
                            ]
                        },
                        {
                            "fieldmapping_id": 4,
                            "fieldname": "AccountNumber",
                            "properties": [
                                {
                                    "name": "sequence",
                                    "value": "1",
                                    "datatype": "number"
                                },
                                {
                                    "name": "showasPhoneNo",
                                    "value": "true",
                                    "datatype": "boolean"
                                },
                                {
                                    "name": "showasAddress",
                                    "value": "false",
                                    "datatype": "boolean"
                                }
                            ]
                        },
                        {
                            "fieldmapping_id": 4,
                            "fieldname": "ParentId",
                            "properties": [
                                {
                                    "name": "sequence",
                                    "value": "1",
                                    "datatype": "number"
                                },
                                {
                                    "name": "showasPhoneNo",
                                    "value": "false",
                                    "datatype": "boolean"
                                },
                                {
                                    "name": "showasAddress",
                                    "value": "false",
                                    "datatype": "boolean"
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "entity_id": 2,
            "entity_name": "Opportunity",
            "pages": [
                {
                    "template_id": 1,
                    "template_name": "listpage",
                    "template_props": [
                        {
                            "name": "numberofheaders",
                            "value": "4",
                            "datatype": "number"
                        }
                    ],
                    "fields": [
                        {
                            "fieldmapping_id": 1,
                            "fieldname": "Id",
                            "properties": [
                                {
                                    "name": "sequence",
                                    "value": "1",
                                    "datatype": "number"
                                },
                                {
                                    "name": "showasPhoneNo",
                                    "value": "false",
                                    "datatype": "boolean"
                                },
                                {
                                    "name": "showasAddress",
                                    "value": "false",
                                    "datatype": "boolean"
                                }
                            ]
                        },
                        {
                            "fieldmapping_id": 2,
                            "fieldname": "Name",
                            "properties": [
                                {
                                    "name": "sequence",
                                    "value": "1",
                                    "datatype": "number"
                                },
                                {
                                    "name": "showasPhoneNo",
                                    "value": "false",
                                    "datatype": "boolean"
                                },
                                {
                                    "name": "showasAddress",
                                    "value": "false",
                                    "datatype": "boolean"
                                }
                            ]
                        },
                        {
                            "fieldmapping_id": 3,
                            "fieldname": "Description",
                            "properties": [
                                {
                                    "name": "sequence",
                                    "value": "1",
                                    "datatype": "number"
                                },
                                {
                                    "name": "showasPhoneNo",
                                    "value": "false",
                                    "datatype": "boolean"
                                },
                                {
                                    "name": "showasAddress",
                                    "value": "false",
                                    "datatype": "boolean"
                                }
                            ]
                        },
                        {
                            "fieldmapping_id": 4,
                            "fieldname": "StageName",
                            "properties": [
                                {
                                    "name": "sequence",
                                    "value": "1",
                                    "datatype": "number"
                                },
                                {
                                    "name": "showasPhoneNo",
                                    "value": "false",
                                    "datatype": "boolean"
                                },
                                {
                                    "name": "showasAddress",
                                    "value": "false",
                                    "datatype": "boolean"
                                }
                            ]
                        }
                    ]
                },
                {
                    "template_id": 2,
                    "template_name": "detailpage",
                    "template_props": [
                        {
                            "name": "numberofheaders",
                            "value": "4",
                            "datatype": "number"
                        }
                    ],
                    "fields": [
                        {
                            "fieldmapping_id": 1,
                            "fieldname": "Id",
                            "properties": [
                                {
                                    "name": "sequence",
                                    "value": "1",
                                    "datatype": "number"
                                },
                                {
                                    "name": "showasPhoneNo",
                                    "value": "false",
                                    "datatype": "boolean"
                                },
                                {
                                    "name": "showasAddress",
                                    "value": "false",
                                    "datatype": "boolean"
                                }
                            ]
                        },
                        {
                            "fieldmapping_id": 2,
                            "fieldname": "Name",
                            "properties": [
                                {
                                    "name": "sequence",
                                    "value": "1",
                                    "datatype": "number"
                                },
                                {
                                    "name": "showasPhoneNo",
                                    "value": "false",
                                    "datatype": "boolean"
                                },
                                {
                                    "name": "showasAddress",
                                    "value": "false",
                                    "datatype": "boolean"
                                }
                            ]
                        },
                        {
                            "fieldmapping_id": 3,
                            "fieldname": "Description",
                            "properties": [
                                {
                                    "name": "sequence",
                                    "value": "1",
                                    "datatype": "number"
                                },
                                {
                                    "name": "showasPhoneNo",
                                    "value": "false",
                                    "datatype": "boolean"
                                },
                                {
                                    "name": "showasAddress",
                                    "value": "true",
                                    "datatype": "boolean"
                                }
                            ]
                        },
                        {
                            "fieldmapping_id": 4,
                            "fieldname": "Amount",
                            "properties": [
                                {
                                    "name": "sequence",
                                    "value": "1",
                                    "datatype": "number"
                                },
                                {
                                    "name": "showasPhoneNo",
                                    "value": "true",
                                    "datatype": "boolean"
                                },
                                {
                                    "name": "showasAddress",
                                    "value": "false",
                                    "datatype": "boolean"
                                }
                            ]
                        },
                        {
                            "fieldmapping_id": 4,
                            "fieldname": "Probability",
                            "properties": [
                                {
                                    "name": "sequence",
                                    "value": "1",
                                    "datatype": "number"
                                },
                                {
                                    "name": "showasPhoneNo",
                                    "value": "false",
                                    "datatype": "boolean"
                                },
                                {
                                    "name": "showasAddress",
                                    "value": "false",
                                    "datatype": "boolean"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};


//fetching template metadata from json

/*
fs = require('fs');
var metadata = JSON.parse(fs);


*/




//////////////////////////////////////////////////////////////////////////////////////////
                    /* HARD CODED TABLE AND COLUMN DATA FOR TESTING PURPOSE */
//////////////////////////////////////////////////////////////////////////////////////////
var TableArray = ["Accounts", "Opportunity", "Organisation"];
var TableColumnsObject = {
    "Accounts": ["Id", "IsDeleted", "MasterRecordId", "Name", "Type", "ParentId", "BillingStreet", "BillingCity", "BillingState", "BillingPostalCode"],
    "Organisation": ["Id", "Name", "Division", "Street", "City", "State", "PostalCode", "Country", "Latitude", "Longitude"],
    "Opportunity": ["Id", "IsDeleted", "AccountId", "IsPrivate", "Name", "Description", "StageName", "Amount", "Probability", "ExpectedRevenue"]
};
////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


var TemplateArray = metadata["menu"][0]["pages"];
var TemplateName_NoOfHeadersObject = {};
var field_count = 1;
var display_count = 1;
var count = 1;
var SelectedTemplate;


$(document).ready(function () {

    for (var i = 0; i < TemplateArray.length; i++) {
        TemplateName_NoOfHeadersObject[TemplateArray[i]["template_name"]] = TemplateArray[i]["template_props"][0]["value"];
    }

    var templates = CreateTemplates(TemplateName_NoOfHeadersObject);
    var templatedisplay = $('#TemplateDisplay');

    templatedisplay.html(templates.html());
    templatedisplay.children().each(function () {
        var child = $(this);
        if (child.attr('id') === 'listpage')
            ModifyListPageTemplate(child, "field", "value", 0);
        else if (child.attr('id') === 'detailpage')
            ModifyDetailPageTemplate(child, "field", "value", 0);
    });

    var btn = $("#drop_down_content");

    for (var i = 0; i < TableArray.length; i++) {
        var new_id = "field" + count;
        var anchor = '#' + "test";

        btn.append('<li ><a href = ' + anchor + ' id=' + new_id + '>' + TableArray[i] + '</a></li>');
        count += 1;
    }
    count = 1;

    $('.each_cell').mouseover(function(){
        $(this).addClass('hover');
    });

    $('.each_cell').mouseout(function(){
        $(this).removeClass('hover');
    });

    btn.on("click", 'a', function (event) {
        var Table_Name = $("#" + event.target.id).text();
        var TemplateData = $('#TemplateDataDisplay');

        $('#entityname').html("List Of Fields in " + Table_Name + " Table");
        SetColumnContents(TableColumnsObject[Table_Name]);
        
        //////////////////////////////////////////////////////////
                 /*   HARD CODING FOR TESTING TEMPLATES   */
        //////////////////////////////////////////////////////////
        TemplateData.html(templates.find('#detailpage').html());
        //TemplateData.html(templates.find('#listpage'));
        ModifyListPageTemplate(TemplateData, "Drag Here", "Dragged Data", 1);
        ModifyDetailPageTemplate(TemplateData, "Drag Here", "Dragged Data", 1);
        //////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////

        /*
        TemplateData.html(templates.html());
        TemplateData.children().each(function () {
            var child = $(this);
            if (child.attr('id') === 'listpage')
                ModifyListPageTemplate(child, "Drag Here", "Dragged Data", 1);
            else if (child.attr('id') === 'detailpage')
                ModifyDetailPageTemplate(child, "Drag Here", "Dragged Data", 1);
        });
*/
        $('.each_cell').mouseover(function () {
            $(this).addClass('hover');
        });

        $('.each_cell').mouseout(function () {
            $(this).removeClass('hover');
        });
        drag();
    });
});


function SetColumnContents(ColumnSetArray) {
    var columnDiv = $("#columns");
    var ColumnTable = CreateTable(ColumnSetArray.length, 1);
    var columnCells = ColumnTable.find('tr');
    var i = 0;

    columnCells.children().each( function () {
        var child = $(this);
        child.html(ColumnSetArray[i++]);
        child.attr({
            
        });
    });
    count = 1;
    columnDiv.html(ColumnTable);
   // data_fetch(Table_Name);
}

function drag(){
    $("#columns .each_cell").draggable({
        helper: function() {
            return $("<div></div>").append($(this).clone());
        },
        cursor: "move",
        opacity: 3,
        cursorAt: {right: -10}
    });

    //var noofheaders = TemplateName_NoOfHeadersObject[SelectedTemplate];
    var noofheaders = 4;
    while(noofheaders--){
        MakeDroppable("#selected_field"+(noofheaders+1));
    }
}

function MakeDroppable (id) {
    $(id).droppable({
        accept: ".each_cell",
        drop: function(event,ui){
            dropField($(this), event, ui);
        } 
    });
}

function dropField(now, event, ui){
    now.empty();
    now.html($(ui.draggable)[0].innerHTML);        
    display_data(now[0].id, $(ui.draggable)[0].innerHTML);
}

function display_data(id, column_name){
    var number = id[id.length-1];
    var display_id = "display_field" + number;
    $('#'+display_id).empty();
    //$('#'+display_id).html(data[0][column_name]);
    //$('#'+display_id).html(key_value[column_name]);
}

function ModifyListPageTemplate (template, field, value, is_draggable) {
    var tableRowArray = template.find("tr");
    var check = 1;
    field_count = 1;
    display_count = 1;
    tableRowArray.children().each( function () {
        var child = $(this);
        if(check)
            child.html(field);
        else
            child.html(value);
        if(is_draggable){
            if(check)
                child.attr({'id': 'selected_field' + (field_count++)});
            else
                child.attr({'id': 'display_field' + (display_count++)});
        }  
        check = !check;
    });
    field_count = 1;
    display_count = 1;
}

function ModifyDetailPageTemplate (template, field, value, is_draggable) {
    var tableRowArray = template.find("tr");
    var row_length = tableRowArray.length;
    var cell_length = tableRowArray.children().length;
    var column_length = cell_length / row_length;
    var i = 0;

    tableRowArray.children().each( function () { 
        var child = $(this);
        if(i<column_length)
            PerformModification($(this), field, value, is_draggable, 1);   
        else
            PerformModification($(this), field, value, is_draggable, 0); 
        i++;
    });
    field_count = 1;
    display_count =  1;
}

function PerformModification (child, field, value, is_draggable, check) {
    if(check) {
        child.html(field);
        if(is_draggable) child.attr({'id': 'selected_field' + (field_count++)});
    }
    else{
        child.html(value);
        if(is_draggable) child.attr({'id': 'display_field' + (display_count++)});
    }
}

function CreateTemplates (TemplateNameFieldCountObject) {
    var count = 1;
    var ParentTemplateDiv = $('<div></div>', {
        id : "parenttemplate"
    });

    for (var i in TemplateNameFieldCountObject) {
        var templatename = i;
        var numberoffields = TemplateNameFieldCountObject[i];
        var Table;

        var TemplateDiv = $('<div></div>', {
            class : "template",
            id: templatename
        });

        var templatenameDiv = $('<div></div>', {
            class : "tab"
        }).append( $('<h4></h4>', {
                class: "hd",
                text: templatename
            })
        ).appendTo(TemplateDiv); 

        var templateContentDiv = $('<div></div>', {
            class : "contain",
            id: "template" + count
        });     


        if(templatename === 'listpage'){
            Table = CreateTable(numberoffields, 2);     
        }
        else if(templatename === 'detailpage'){
            Table = CreateTable(2, numberoffields);
        }
        else
            alert('Template Not Found');

        templateContentDiv.append(Table);
        TemplateDiv.append(templateContentDiv);
        ParentTemplateDiv.append(TemplateDiv);
        count++;
    }
    return ParentTemplateDiv;
}

function CreateTable (row, col){
    var Table = $('<table></table>');
    var templateid;
    while(row--){
        var new_row = CreateRow(col);
        if(!new_row)
            alert("Cannot Create Template");
        else{
            Table.append(new_row);
        }
    }
    return Table;
}

function CreateRow(columncount){
    if(columncount>0){
        var new_row = $('<tr></tr>', {
            class: "each_row"
        });
        while(columncount--){
            var new_col = $('<td></td>',{
                class: "each_cell"
            });
            new_row.append(new_col);
        }
        return new_row;
    }
    else
        alert('Invalid Column Count');
     return null;
}
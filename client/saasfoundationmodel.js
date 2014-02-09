if (typeof saas === 'undefined' || saas === null) {
	saas = {};
}
if (!saas.hasOwnProperty("constants")){
	saas.constants = {};
}
saas.constants["HOST_ID"]="test.saas.kony.com";
saas.constants["HOST_PORT"]="9080";
saas.constants["DATA_ENDPOINT"]="http://"+saas.constants.HOST_ID+":"+saas.constants.HOST_PORT+"/SaasFoundationWS/v1/data/";
saas.constants["AUTH_ENDPOINT"]="http://"+saas.constants.HOST_ID+":"+saas.constants.HOST_PORT+"/SaasFoundationWS/authenticate";
saas.constants["METADATA_ENDPOINT"]="http://"+saas.constants.HOST_ID+":"+saas.constants.HOST_PORT+"/SaasFoundationWS/v1/metadata";
saas.constants["HTTP_METHOD_GET"]="GET";
saas.constants["HTTP_METHOD_POST"]="POST";

saas.print = function(statement) {
	if (typeof kony !== 'undefined' && typeof kony.print === 'function') {
		kony.print(statement);
	} else if (typeof console !== 'undefined' && typeof console.log === 'function') {
		console.log(statement);
	}
};
saas.AjaxService = Class(function() {
	var ajaxProvider = Class({
		constructor: function() {
			throw "This is an abstract class";
		},
		get: function(url, httpMethod, headers, successCallback, errorCallback, formData) {
			throw "Cannot call this function";
		}
	});
	var konyAjaxProvider = Class(ajaxProvider, {
		constructor: function() {},
		get: function(url, httpMethod, headers, successCallback, errorCallback, formData) {
			try{
				var request = new kony.net.HttpRequest();
				request.onReadyStateChange = callbackHandler;
				request.open(httpMethod, url);
				request.setRequestHeader("Accept", "application/json");
				for (var headerName in headers) {
					request.setRequestHeader(headerName, headers[headerName]);
				}
				if (typeof formData !== 'undefined' && formData !== null){
					var frmData = new kony.net.FormData();
					saas.print("formData -->"+JSON.stringify(formData));
					frmData.append("jsondata", JSON.stringify(formData));
					request.send(frmData);
				} else 
					request.send();
			} catch (e){
				throw "Exception: "+e.message;
			}

			function callbackHandler() {
				saas.print("HttpRequest readystate -->"+request.readyState);
				if (request.readyState == 4) {
					var result ;
					saas.print("Response code -->"+request.status);
					saas.print("Response -->"+JSON.stringify(request));
					if (request.status == 200) {
						if (request.response !== null && request.response !== undefined) {
							if (typeof request.response === 'string' || request.response instanceof String) {
								result = JSON.parse(request.response);
							} else {
								result = request.response;
							}
						}
						if (typeof successCallback === 'function') 
							successCallback(result);
						else 
							throw "callbackhandler invalid";
					} else {
						if (request.response !== null) {
							//"dataAccessExceptionJson":{"errorCode":1003,"errorMsg":"Bad Request"}
							if (typeof request.response === 'string' || request.response instanceof String) {
								result = JSON.parse(request.response);
							} else {
								result = request.response;
							}
						}
						if (typeof errorCallback === 'function') 
							errorCallback(result);
						else 
							throw "callbackhandler invalid";
					}
				}
			}
		}
	});
	var jQueryAjaxProvider = Class(ajaxProvider, {
		constructor: function() {},
		get: function(url, httpMethod, headers, successCallback, errorCallback, formData) {
			//alert("in jqueryajaxprovider");
			headers.Accept = "application/json";
			saas.print("url: " + url + "headers: " + JSON.stringify(headers));
			var ajaxSettings = {};
			if (typeof formData !== 'undefined' && formData !== null){
				saas.print("formData -->"+JSON.stringify(formData));
				var frmData;
				if (typeof formData === 'string' || formData instanceof String) {
					frmData = JSON.parse(formData);
				} else {
					frmData = formData;
				}
				ajaxSettings = {
						'type': httpMethod,
						'headers': headers,
						'data': JSON.stringify(frmData),
						'crossDomain':true,
						'success': function(data, statusText) {
							saas.print("in jqueryAjaxProvider.get success callback " + JSON.stringify(data));
							callbackHandler(data, statusText);
						},
						'error': function( jqXHR, textStatus, errorThrown ){
							saas.print("in jqueryAjaxProvider.get error callback " + textStatus+ errorThrown);
							errorHandler(jqXHR, textStatus, errorThrown);
						}
				};  
			} else {
				ajaxSettings = {
						'type': httpMethod,
						'headers': headers,
						'crossDomain':true,
						'success': function(data, statusText) {
							saas.print("in jqueryAjaxProvider.get success callback " + JSON.stringify(data));
							callbackHandler(data, statusText);
						},
						'error': function( jqXHR, textStatus, errorThrown ){
							errorHandler(jqXHR, textStatus, errorThrown);
						}
				};      
			}
			$.ajax(url, ajaxSettings);
			function callbackHandler(response, statusText) {
				saas.print("HttpRequest status -->"+statusText);
				var result;
				saas.print("Response -->"+JSON.stringify(response));
				if (response !== null && response !== undefined) {
					if (typeof response === 'string' || response instanceof String) {
						result = JSON.parse(response);
					} else {
						result = response;
					}
					if (typeof successCallback === 'function') 
						successCallback(result);
					else 
						throw "callbackhandler invalid";
				}
			}
			function errorHandler(jqXHR, statusText, errorThrown){
				saas.print("HttpRequest status -->"+statusText);
				var errorObj;
				try{
					if (typeof jqXHR.responseText === 'string' || jqXHR.responseText instanceof String) {
						if(jqXHR.responseText.toString().substring(0,1) === "{"){
							errorObj = JSON.parse(jqXHR.responseText);
						} else {
							errorObj = {errorCode : "", errorMsg : jqXHR.responseText};						
						}
					} else {
						errorObj = jqXHR.responseText;
					}					
				} catch(e){
					saas.print("Exception occured in parsing response."+e.message);
					errorObj = {errorCode : "", errorMsg : jqXHR.responseText};	
				}

				if(errorObj.hasOwnProperty("dataAccessExceptionJson")){
					errorObj = errorObj["dataAccessExceptionJson"];
				}
				if (typeof errorCallback === 'function') 
					errorCallback(errorObj);
				else 
					throw "callbackhandler invalid";
			}
		}
	});
	return {
		constructor: function(providerName) {
			if (typeof kony !== 'undefined' && typeof kony.net !== 'undefined') {
				this.provider = new konyAjaxProvider();
			} else if (typeof $ !== 'undefined') {
				this.provider = new jQueryAjaxProvider();
			} else {
				throw "Cannot load provider";
			}
		},
		getAjaxProvider: function() {
			return this.provider;
		}
	};
});
var theAjaxProvider = new saas.AjaxService().getAjaxProvider();

var Model = Class({
	constructor:function(entityName){
		this.entityName = entityName;
		this.fields = {};
		this.callback = null;
		this.args = [];
		this.registerCallback = false;
	},
	get:function(fieldName){
		return this.fields[fieldName];
	},
	set:function(fieldName, value){
		this.fields[fieldName] = value;
		if(this.registerCallback === true){
			this.callback.apply(this, this.args);
		}
	},
	register:function(callbackFunction, args){
		this.callback = callbackFunction;
		this.args = args;
		this.registerCallback = true;
	},
	deRegister:function(){
		this.registerCallback = false;
	}
});

var SelectQuery = Class({
	constructor:function(baseTable){
		this.tables = [];
		this.columnList = [];
		this.criteriaList = [];
		this.isDistinct = false;
		this.orderList = [];
		this.joinList = [];
		this.groupList = [];
		this.tables.push(baseTable);
	},
	addColumn:function(columnObj){
		if(columnObj instanceof Column){
			this.columnList.push(columnObj);
			return this.columnList;
		}
	},
	addCriteria:function(criteriaObj) {
		if(criteriaObj instanceof Criteria || criteriaObj  instanceof Match){
			this.criteriaList.push(criteriaObj);
			return this.criteriaList;
		}
	},
	addGroup:function(groupObj) {
		if(groupObj instanceof Group){
			this.groupList.push(groupObj);
			for(var i=0;i<this.tables.length; i++){
				if(this.tables[i].getName().toUpperCase() === groupObj.getColumn().getTable().getName().toUpperCase()){
					return;
				}
			}
			this.tables.push(groupObj.getColumn().getTable());
		}
	},
	addJoin:function(joinObj) {
		if(joinObj instanceof Criteria && joinObj instanceof Join){
			this.joinList.push(joinObj);
			for(var i=0;i<this.tables.length; i++){
				if(this.tables[i].getName().toUpperCase() === joinObj.getTable().getName().toUpperCase()){
					
					if(this.tables[i].getAlias()!=null || joinObj.getTable().getAlias()!=null || this.tables[i].getAlias()!=undefined || joinObj.getTable().getAlias()!=undefined){
						if(this.tables[i].getAlias().toUpperCase() === joinObj.getTable().getAlias().toUpperCase()){
							return;
						}else{
							this.tables.push(joinObj.getTable());
							return;
						}
					}else{
						return;
					}
				}
			}
			this.tables.push(joinObj.getTable());
		 }
 	},
 	addOrder:function(orderObj) {
		var currentobject=this;
		if(orderObj instanceof Order){
			this.orderList.push(arguments[0]);
			for(var i=0;i<this.tables.length; i++){
				if(this.tables[i].getName().toUpperCase() === arguments[0].getColumn().getTable().getName().toUpperCase()){
					return;
				}
			}
			this.tables.push(orderObj.getColumn().getTable());
		}
	},
	getTables:function() {
		return this.tables;
	},
	getDistinct:function() {
		return this.isDistinct;
	},
	getColumns:function() {
		return this.columnList;
	},
	getCriterias:function() {
		return this.criteriaList;
	},
	getGroups:function() {
		return this.groupList;
	},
	getJoins:function() {
		return this.joinList;
	},
	getOrders:function() {
		return this.orderList;
	},
	removeColumn:function(columnObj) {
		if(columnObj instanceof Column){
			this.columnList.splice(this.columnList.indexOf(columnObj), 1);
		}
	},
	removeCriteria:function(criteriaObj) {
		if(criteriaObj instanceof Criteria){
			this.criteriaList.splice(this.criteriaList.indexOf(criteriaObj), 1);
		}
	},
	removeGroup:function(groupObj) {
		if(groupObj instanceof Group){
			this.groupList.splice(this.groupList.indexOf(groupObj), 1);
		}
	},
	removeJoin:function(joinObj){ 
		if(joinObj instanceof Criteria){
			this.joinList.splice(this.joinList.indexOf(joinObj), 1);
		}
	},
	removeOrder:function(orderObj) {
		if(orderObj instanceof Order){
			this.orderList.splice(this.orderList.indexOf(orderObj), 1);
		}
	},
	setDistinct:function(isDistinct) {
		this.isDistinct = isDistinct;
	},

	toString:function() {
		var query="";
		query = query + "SELECT ";
		if (this.getDistinct() == true || this.getDistinct() == "true") {
			query = query + " DISTINCT ";
		}
		var columnStr = this.appendListToQuery(this.columnList,", ", 0);
		query = query + columnStr;
		query = query + " FROM ";


		query = query + this.getTables()[0].toString();
		if (!(this.joinList.length == 0)) {
			var joinStr = this.appendListToQuery(this.joinList, " ", -1);
			query = query + joinStr;
		}
		if (!this.criteriaList.length == 0) {

			query = query + " WHERE ";
			query = query
			+ this.appendListToQuery(
					this.criteriaList, " AND ", -1);
		}
		if (!(this.groupList.length == 0)) {
			query = query + " GROUP BY ";
			query = query + this.appendListToQuery(this.groupList, ", ", -1);
		}
		if (!(this.orderList.length == 0)) {
			query = query + " ORDER BY ";
			query = query + this.appendListToQuery(this.orderList, " ,", -1);
		}
		return query.toString();

	},
	appendListToQuery:function(objectList,
			seperator, mode) {
		var listBuffer = "";
		for ( var i = 0; i < objectList.length; i++) {
			var obj = objectList[i];
			if (mode > -1) {
				if(obj !== null){
					if (obj instanceof Column) {
						listBuffer = listBuffer.concat(obj.toString());
					} else {
						listBuffer = listBuffer.concat(obj.toString());
					}
				}
			} else if(obj !== null){
				listBuffer = listBuffer.concat(obj.toString());
			}
			if(i<objectList.length-1){
				listBuffer = listBuffer.concat(seperator);
			}
		}
		return listBuffer;
	}
});

var Table = Class({
	constructor:function(tableName, tableAlias){
		var name = (tableName !== null && tableName !== undefined) ? tableName.toLowerCase() : tableName;
		var alias = tableAlias;
		var schema = null;
		this.setName(name);
		this.setAlias(alias);
	},
	getAlias:function() {
		return this.alias;
	},
	setAlias:function(alias) {
		this.alias = alias;
	},
	getName:function() {
		return this.name;
	},
	setName:function(name) {
		this.name = name;
	},
	getSchema:function() {
		return this.schema;
	},
	setSchema:function(schema) {
		this.schema = schema;
	},
	equals:function(obj) {
		var areObjectsEqual = false;
		if (obj === null || obj === undefined) {
			areObjectsEqual =  false;
		} else if (typeof(this) === typeof(obj)) {
			areObjectsEqual =  true;

			if (this.hasAlias() && obj.hasAlias()) {
				areObjectsEqual =  this.getAlias() === obj.getAlias();
			}
			else {
				areObjectsEqual = this.getName() === obj.getName();
			}
		}	else {
			areObjectsEqual=false;
		}
		return areObjectsEqual;
	},
	getColumn:function(columnName) {
		return new Column(this, columnName);
	},
	hasAlias:function() {
		return (this.alias !== null && this.alias !== undefined);
	},
	toString:function() {
		return this.getName() + (this.hasAlias() ? " " + this.getAlias() : "");
	}
});

var Column = Class({
	constructor:function(tableObj, colName){
		if(tableObj instanceof Table){
			var aggregation = null;
			var alias = null;
			var dataType = null;
			var name = null;
			var table = null;
			if(colName !== undefined && colName !== null && typeof(colName)==="string"){
				this.setName(colName);
			}
			this.setTable(tableObj);
		}
	},
	getAggregation:function() {
		return this.aggregation;
	},
	setAggregation:function(aggregation) {
		this.aggregation = aggregation;
	},
	getAlias:function() {
		return this.alias;
	},
	setAlias:function(alias) {
		this.alias = alias;
	},
	getDataType:function() {
		return this.dataType;
	},
	setDataType:function(dataType) {
		this.dataType = dataType;
	},
	getName:function() {
		return this.name;
	},
	setName:function(name) {
		if(name !== undefined && name !== null && typeof(name)==="string"){
			this.name = name;
		}
	},
	getTable:function() {
		return this.table;
	},
	setTable:function(table) {
		if(table instanceof Table){
			this.table = table;
		}
	},
	toString:function() {
		if (this.getDataType() !== null && this.getDataType() !== undefined) {
			if (this.getDataType().toUpperCase() === "STRING") 
				dataType = "text";
		}
		var tableName = (this.getTable().getAlias() !== null && this.getTable().getAlias() !== undefined && this.getTable().getAlias()!=="") ? this.getTable().getAlias() : this.getTable().getName();
		var constructedColumn = null;
		var constructDataType = null;
		var constructAggregation = null;
		if(this.getDataType() !== null && this.getDataType() !== undefined){
			if(this.getDataType().toUpperCase() === "Integer") {
				constructDataType = "CAST (" + tableName + "." + this.getName() + " AS INTEGER)";
			} else  if(this.getDataType().toUpperCase() === "Numeric"){
				constructDataType = "CAST (" + tableName + "." + this.getName() + " AS NUMERIC)";
			}
			else if (this.getDataType().toUpperCase() === "Date"){
				constructDataType = "date(" + tableName + "." + this.getName() + ")";		
			} else {
				constructDataType = tableName + "." + this.getName();
			}
		}else{
			constructDataType = tableName + "." + this.getName();
		}
		constructAggregation = (this.getAggregation() === Aggregation.NONE || (this.getAggregation() === null || this.getAggregation() === undefined)) ? constructDataType : this.getAggregation() + "(" + constructDataType + ")";
		constructedColumn = constructAggregation;
		return constructedColumn;
	}
});

var Criteria = Class({
	constructor:function(){
	},
	quote:function(str){
		if(str === null || str === undefined){
			return "null";
		}
		//var str1 = new String(str);
		var strBuf = [];
		strBuf.push('\'');
		for (var index = 0; index < str.length; index++) {
			var charItem = str.charAt(index);
			if(charItem == '\\' || charItem == '\"' || charItem == '\''){
				//strBuf.concat('\\');
				strBuf.push('\\');
			}
			strBuf.push(charItem);
		}
		strBuf.push('\'');
		return strBuf.join("");
	}
});

var Match = Class(Criteria,{
	constructor:function(columnObj, matchType, value){
		var column;
		var matchType;
		var value;

		if(columnObj instanceof Column)
		{
			this.column = columnObj;
			if(matchType !== MatchType.ISNULL && matchType !== MatchType.ISNOTNULL) {
				//check if the value is passed or not except for NULL and NOT NULL cases.
				if(value !== null && value !== undefined) {
					this.value = value;
				} 
			}
			this.setMatchType(matchType);
		}
	},
	getColumn:function(){
		if(this.column !== null && this.column !== undefined) {
			return this.column;
		}
	},
	getMatchType:function() {
		if(this.matchType !== null && this.matchType !== undefined) {
			return this.matchType;
		} 
	},
	setMatchType:function(matchType) {
		this.matchType = matchType;
	},
	getValue:function() {
		return this.value;
	},
	toString:function() {
		if(this.matchType !== null && this.matchType !== undefined && this.column !== null && this.column !== undefined) {
			var constructedMatch = null;
			var constructedValue = null;
			var type = this.matchType;
			var val = this.matchType.name;

			if(this.value instanceof Date) {
				var dateStr = "";
				var month = this.getValue().getMonth()+1;
				var date = this.getValue().getDate();

				if (month < 10) {
					month = "0" + month;
				}

				if(date < 10) {
					date = "0" + date;
				}
				dateStr = this.getValue().getFullYear() + "-" + month + "-" + date;
				constructedMatch = "date(substr("+this.getColumn().toString()+",0,11)) " + this.getMatchType().value + "'" + dateStr + "'";
				return constructedMatch;
			}
			if(typeof(this.getValue()) === 'boolean') {
				if(this.getValue() === true) {
					return "(" + this.getColumn().toString() + " = 'true' OR " + this.getColumn().toString() + " = 1)";
				} else if(this.getValue() === false) {
					return "(" + this.getColumn().toString() + " = 'false' OR " + this.getColumn().toString() + " = 0)";
				} else {
					this.value = "'" + this.value + "'";
				}
			}


			constructedMatch = this.getColumn().toString()+ " " + this.getMatchType().value + " " ;
			if(typeof(this.getValue()) === 'string') {
				constructedValue = this.getValue().replace("'", "");
				if(type.name.toUpperCase() === "STARTSWITH"){
					constructedValue = constructedValue+"%";
				} else if(type.name.toUpperCase() ==="CONTAINS"){
					constructedValue = "%"+constructedValue+"%";
				} else if(type.name.toUpperCase() ==="ENDSWITH"){
					constructedValue= "%"+constructedValue;
				} else if(type.name.toUpperCase() ==="ISNULL") {
					return "(lower("+this.getColumn().toString()+ ") = 'null' OR " + this.getColumn().toString() + " IS NULL)" ;
				} else if(type.name.toUpperCase() ==="ISNOTNULL") {
					return "(lower("+this.getColumn().toString()+ ") != 'null' OR " + this.getColumn().toString() + " IS NOT NULL)" ;
				}
				constructedValue = this.quote(constructedValue);
			} else {
				if(type.name.toUpperCase() === "ISNULL") {
					return "(lower("+this.getColumn().toString()+ ") = 'null' OR " + this.getColumn().toString() + " IS NULL)";
				} else if(type.name.toUpperCase() === "ISNOTNULL") {
					return "(lower("+this.getColumn().toString()+ ") != 'null' OR " + this.getColumn().toString() + " IS NOT NULL)" ;
				}
				constructedValue = this.getValue().toString();
			}
			if(!(type.name.toUpperCase() === "ISNULL" || type.name.toUpperCase() === "ISNOTNULL")) {
				constructedMatch = constructedMatch + constructedValue;
			}
			return constructedMatch;
		}
	}
});

var Order = Class({
	constructor:function(columnObj,orderTypeObj){
		if((columnObj instanceof Column) && (orderTypeObj == "ASC" || orderTypeObj== "DESC")){
			var column=null;
			var type=null;
			this.setColumn(columnObj);
			this.setType(orderTypeObj);
		}
	},
	getColumn:function(){
		return this.column;
	},
	setColumn:function(column){
		if(column instanceof Column){
			this.column = column;
		}
	},
	getType:function(){
		return this.type;
	},
	setType:function(type){
		this.type = type;
	},
	toString:function(){
		return this.column.toString() + " " + (this.type);
	}	
});

var Join = Class({
	constructor:function(table, criteria, joinType){
		var criteria;
		var table;
		var joinType;
		if(table instanceof Table && criteria instanceof Criteria && joinType !== null && joinType !== undefined && (joinType===JoinType.INNER || joinType===JoinType.LEFT)){
			this.setTable(table);
			this.setJoinType(joinType);
			this.setCriteria(criteria);
		}
	},
	getCriteria:function() {
		return this.criteria;
	},
	setCriteria:function(criteria) {
		if(criteria instanceof Criteria){
			this.criteria = criteria;
		}	
	},
	getTable:function() {
		return this.table;
	},
	setTable:function(table) {
		if(table instanceof Table){	
			this.table = table;
		}
	},
	setCriteria:function(criteria) {
		if(criteria instanceof Criteria){
			this.criteria = criteria;
		}
	},
	setTable:function(table) {
		if(table instanceof Table){	
			this.table = table;
		}
	},
	getJoinType:function() {
		return this.joinType;
	},
	setJoinType:function(joinType) {
		if(joinType!==null){
			this.joinType = joinType;
		}
	},
	initCriteria:function(srcColumn, destColumn) {
		if((srcColumn instanceof Column) && (destColumn instanceof Column)){
			var criteria = new Match(srcColumn, MatchType.EQUALS, destColumn);
			this.setCriteria(criteria);
		}
	},
	toString:function() {
		var returnString = null;
		var temp=null;
		var join;
		if (JoinType.INNER == this.getJoinType()) {
			join = "INNER";
		} else if (JoinType.LEFT == this.getJoinType()) {
			join = "LEFT";
		} else if (JoinType.RIGHT == this.getJoinType()) {
			join = "RIGHT";
		}
		returnString = " " + join + " JOIN " + this.getTable().toString() + " ON ";
		temp=this.getCriteria().toString();
		returnString = returnString + temp;
		return returnString;
	}
});

var Group = Class({
	constructor:function(columnObj){
		var column = null;
		if(columnObj instanceof Column){
			this.setColumn(columnObj);
		}
	},
	getColumn:function() {
		return this.column;
	},
	setColumn:function(column) {
		if(column instanceof Column){
			this.column = column;
		}
	},
	toString:function() {
		var tableName = (this.column.getTable().getAlias() !== null && this.column.getTable().getAlias() !== undefined) ? 
				this.column	.getTable().getAlias() : this.column.getTable().getName();
				return tableName + "." + this.column.getName();
	}
});

var DataProvider = Class({
	constructor:function(){
		throw "Cannot instantiate object of this class!!";
	},
	create:function(model){
		throw "This method is not implemented";
	},
	update:function(model){
		throw "This method is not implemented";
	},
	fetch:function(query){
		throw "This method is not implemented";
	},
	read:function(entityName, id){
		throw "This method is not implemented";
	},
	deleteRecord:function(entityName, id){
		throw "This method is not implemented";
	},
});

var dataSyncProvider = Class(DataProvider,{
	constructor:function(){

	},
	create:function(model){

	},
	update:function(model){

	},
	fetch:function(query){

	},
	read:function(entityName, id){

	},
	deleteRecord:function(entityName, id){

	},
});

var dataRestProvider = Class(DataProvider,{
	constructor:function(){

	},
	create:function(model, sessionToken, createServiceCallback, serviceErrorCallback){
		var colValDto;
		var colValueList = [];
		for (var key in model.fields) {
			if (model.fields.hasOwnProperty(key)) {
				if(key.toUpperCase() !== "Id"){
					colValDto = new columnValueDto(key,model.fields[key]);
					colValueList.push(colValDto);
				}
			}
		}
		var inputData = new insertInput(colValueList);
		var headers = {Accept: "application/json", session_token: sessionToken.token, tenant: sessionToken.tenant, "Content-Type":"application/json"};

		theAjaxProvider.get(saas.constants.DATA_ENDPOINT+model.entityName, saas.constants.HTTP_METHOD_POST, headers, createServiceCallback, serviceErrorCallback, inputData);
	},

	update:function(model, sessionToken, updateServiceCallback, serviceErrorCallback){
		var id = "";
		if(model.fields["Id"] !== null && model.fields["Id"] !== undefined){
			id = model.fields["Id"];
		}
		var colValDto;
		var colValueList = [];
		for (var key in model.fields) {
			if (model.fields.hasOwnProperty(key)) {
				if(key.toUpperCase() !== "ID"){
					colValDto = new columnValueDto(key,model.fields[key]);
					colValueList.push(colValDto);
				}
			}
		}
		var updateData = new updateDto(colValueList, "Id[eq]"+id);
		var input = new updateInput(updateData);
		var headers = {Accept: "application/x-www-form-urlencoded", session_token: sessionToken.token, tenant: sessionToken.tenant, "Content-Type":"application/json", "X-HTTP-Method-Override":"PUT"};

		theAjaxProvider.get(saas.constants.DATA_ENDPOINT+model.entityName, saas.constants.HTTP_METHOD_POST, headers, updateServiceCallback, serviceErrorCallback, input);
	},

	fetch:function(query, sessionToken, successCallback, serviceErrorCallback){
		var tableName = query.getTables()[0].getName();
		var url = saas.constants.DATA_ENDPOINT;
		if(tableName !== null && tableName !== undefined){
			url = url + tableName;
		}
		if(query.getJoins().length !== 0){
			url = url + "/" + query.getJoins()[0].getTable().getName();
		}
		if(query.getColumns().length !== 0 || query.getCriterias().length !== 0){
			url = url + "?";
			if(query.getColumns().length !== 0){
				url = url + "$select=";
				for(var i=0;i<query.getColumns().length;i++){
					url = url + query.getColumns()[i].getName();
					if(i+1<query.getColumns().length){
						url = url + ",";
					}
				}
			}
			if(query.getCriterias().length !== 0){
				url = url + "$filters=";
				for(var i=0;i<query.getCriterias().length;i++){
					url = url + query.getCriterias()[i].getColumn().getName();
					if(query.getCriterias()[i].getMatchType().name.toUpperCase() === "EQUALS"){
						url = url + "[eq]";
					}
					url = url + query.getCriterias()[i].getValue();
					if(i+1<query.getCriterias().length){
						url = url + ",";
					}
				}
			}
		}

		var headers = {Accept: "application/json", session_token: sessionToken.token, tenant: sessionToken.tenant};

		theAjaxProvider.get(url, saas.constants.HTTP_METHOD_GET, headers, successCallback, serviceErrorCallback, null);
	},

	read:function(entityName, id, sessionToken, readSuccessCallback, serviceErrorCallback){
		var headers = {Accept: "application/json", session_token: sessionToken.token, tenant: sessionToken.tenant};

		theAjaxProvider.get(saas.constants.DATA_ENDPOINT+entityName+"?$filters=Id[eq]"+id, saas.constants.HTTP_METHOD_GET, headers, callbackHandler, serviceErrorCallback, null);
		function callbackHandler(result){
			var model = new Model(entityName);
			for (var key in result[0]) {
				if (result[0].hasOwnProperty(key)) {
					model.fields[key] = result[0][key];
				}
			}
			if(typeof readSuccessCallback === 'function')
				readSuccessCallback(model);
		}
	},
	deleteRecord:function(entityName, id, sessionToken, deleteSuccessCallback, serviceErrorCallback){

		var headers = {Accept: "application/json", session_token: sessionToken.token, tenant: sessionToken.tenant, "X-HTTP-Method-Override" : "DELETE"};

		theAjaxProvider.get(saas.constants.DATA_ENDPOINT+entityName+"?$filters=Id[eq]"+id, saas.constants.HTTP_METHOD_GET, headers, deleteSuccessCallback, serviceErrorCallback, null);
	}
	//deleteRecords:function(entityName, criteriaList, deleteSuccessCallback, sessionToken){
//	var request = new kony.net.HttpRequest();
//	request.onReadyStateChange=callbackHandler;
//	var url = saas.constants.DATA_ENDPOINT+entityName+"?";
//	if(criteriaList.length !== 0){
//	url = url + "$filters=";
//	for(var i=0;i<criteriaList.length;i++){
//	url = url + criteriaList[i].getColumn().getName();
//	if(criteriaList[i].getMatchType().name.toUpperCase() === "EQUALS"){
//	url = url + "[eq]";
//	}
//	url = url + criteriaList[i].getValue();
//	if(i+1<criteriaList.length){
//	url = url + ",";
//	}
//	}
//	}

//	request.open(saas.constants.HTTP_METHOD_GET, url);
//	request.setRequestHeader("Accept","application/json");
//	request.setRequestHeader("session_token",sessionToken);
//	request.setRequestHeader("X-HTTP-Method-Override","DELETE");
//	request.send();
//	function callbackHandler(){
//	if (request.readyState == 4) {
//	if (request.status == 200) {
//	var result;
//	if(request.response !== null && request.response !== undefined){
//	if(typeof request.response === 'string' || request.response instanceof String){
//	result = JSON.parse(request.response);
//	}else{
//	result = request.response;
//	}
//	}
//	deleteSuccessCallback(result);
//	}
//	}
//	}
//	}
});

var DataService = Class({
	constructor:function(isServerOn){
		var isOnline;
		var dataProviderInstance;
		this.isOnline = isServerOn;
	},
	getDataProvider:function(){
		if(this.isOnline === true){
			this.dataProviderInstance = new dataRestProvider();
			return this.dataProviderInstance;
		}else{
			this.dataProviderInstance = new dataSyncProvider();
			return this.dataProviderInstance;
		}
	}

});

var metadataProvider = Class({
	constructor:function(){

	},
	getEntities:function(){
		throw "Cannot call this function";
	},
	getEntity:function(entityName){
		throw "Cannot call this function";
	},
	changesSince:function(timestamp){
		throw "Cannot call this function";
	}
});

var metadataSyncProvider = Class(metadataProvider,{
	constructor:function(){

	},
	getEntities:function(fetchSuccessCallback, serviceErrorCallback){
		try{
			var dbName = "SalesforceMtdt";
			var query = "select Name, Description from MtDtDefinition where Type='Table'";
			kony.sync.single_select_execute(dbName, query, null, successCallback, errorCallback);
			function successCallback(response){
				var entities = [];
				var entityMetadata;

				if(response !== null && response !== undefined){
					for(var i=0; i<response.length; i++){
						entityMetadata = new EntityMetadata();
						entityMetadata.name = response[i]["Name"];
						entities.push(entityMetadata);
					}
				}
				if(typeof fetchSuccessCallback === 'function')
					fetchSuccessCallback(entities);
			}
			function errorCallback(error){
				kony.print("error while fetching metadata from db "+error);
				if(typeof serviceErrorCallback === 'function')
					serviceErrorCallback(error);
			}
		}catch(e){
			if(typeof serviceErrorCallback === 'function')
				serviceErrorCallback(e);
			kony.print("exception occurred"+e);
		}
	},
	getEntity:function(entityName, entitySuccessCallback, serviceErrorCallback){
		try{
			var dbName = "SalesforceMtdt";
			var query = "select * from FieldMapping where MtDtDefId=(select id from MtDtDefinition where Name='"+entityName+"')";
			kony.sync.single_select_execute(dbName, query, null, fieldsSuccessCallback, fieldsErrorCallback);

			function fieldsSuccessCallback(response){
				var fieldMetadata;
				var fields = [];
				var entityMetadata = new EntityMetadata();
				if(response !== null && response !== undefined){
					for(var f=0; f<response.length; f++ ){
						fieldMetadata = new FieldMetadata();
						fieldMetadata.name = response[f]["Name"];
						fieldMetadata.type = response[f]["DataType"];
						fields.push(fieldMetadata);
					}
				}
				entityMetadata.name = entityName;
				entityMetadata.fields = fields;
				if(typeof entitySuccessCallback === 'function')
					entitySuccessCallback(entityMetadata);
			}
			function fieldsErrorCallback(error){
				kony.print("Error Occurred while fetching Fields with following error : "+error);
				if(typeof serviceErrorCallback === 'function')
					serviceErrorCallback(error);
			}
		}catch(e){
			if(typeof serviceErrorCallback === 'function')
				serviceErrorCallback(e);
			kony.print("exception occurred"+e);
		}
	},
	changesSince:function(timestamp){
	}
});

var metadataRestProvider = Class(metadataProvider,{
	constructor:function(){

	},
	getEntities:function(sessionToken, fetchSuccessCallback, serviceErrorCallback){
		var headers = {Accept: "application/json", session_token: sessionToken.token, tenant: sessionToken.tenant};

		theAjaxProvider.get(saas.constants.METADATA_ENDPOINT, saas.constants.HTTP_METHOD_GET, headers, callbackHandler, serviceErrorCallback, null);
		function callbackHandler(result){
			var tableArray = result["Metadata"]["tables"];
			var entities = [];
			var entityMetadata;
			for(var i =0; tableArray !== null && tableArray !== undefined && i<tableArray.length;i++){
				entityMetadata = new EntityMetadata();
				entityMetadata.name = tableArray[i]["name"];
				entities.push(entityMetadata);
			}
			if(typeof fetchSuccessCallback === 'function')
				fetchSuccessCallback(entities);
		}
	},
	getEntity:function(entityName, sessionToken, entitySuccessCallback, serviceErrorCallback){
		var headers = {Accept: "application/json", session_token: sessionToken.token, tenant: sessionToken.tenant};

		theAjaxProvider.get(saas.constants.METADATA_ENDPOINT+"/"+entityName, saas.constants.HTTP_METHOD_GET, headers, callbackHandler, serviceErrorCallback, null);

		function callbackHandler(result){
			var entityFields = result["Metadata"]["table"]["selectedColumns"];
			var fieldMetadata;
			var fields = [];
			var entityMetadata = new EntityMetadata();

			for(var i=0; entityFields !== null && entityFields !== undefined && i<entityFields.length; i++){
				fieldMetadata = new FieldMetadata();
				fieldMetadata.name = entityFields[i].name;
				fieldMetadata.type = entityFields[i].datatype;
				fields.push(fieldMetadata);
			}
			entityMetadata.name = entityName;
			entityMetadata.fields = fields;
			if(typeof entitySuccessCallback === 'function')
				entitySuccessCallback(entityMetadata);
		}
	},
	changesSince:function(timestamp){
	}
});

var MetadataService = Class({
	constructor:function(serverStatus){
		var isOnline;
		var metadataProviderInstance;
		this.isOnline = serverStatus;
	},
	getMetadataProvider:function(sessionToken){
		if(this.isOnline === true){
			this.metadataProviderInstance = new metadataRestProvider(sessionToken);
			return this.metadataProviderInstance;
		}else{
			this.metadataProviderInstance = new metadataSyncProvider(sessionToken);
			return this.metadataProviderInstance;
		}
	}
});

var EntityMetadata = Class({
	constructor:function(){
		var name;
		var fields;
	}
});

var FieldMetadata = Class({
	constructor:function(){
		var name;
		var type;
	}
});

/**
 * The input to update service and create service should be modified using the classes defined 
 * below so that they will be written to the corresponding objects on the server
 */
var columnValueDto = Class({
	constructor:function(columnName, value){
		var columnName;
		var val;
		this.columnName = columnName;
		this.val = value;
	}
});

var insertInput = Class({
	constructor:function(array){
		var columnValueDto;
		this.columnValueDto = array;
	}
});

var updateDto = Class({
	constructor:function(columnValues, criteria){
		var columnValues;
		var criteria;
		this.columnValues = columnValues;
		this.criteria = criteria;
	}
});

var updateInput = Class({
	constructor:function(updateDto){
		var updateDto;
		this.updateDto = updateDto;
	}
});

/**
 * These are all the enum functions that consists of key-value pairs used in constructing Criteria Object.
 */
var Aggregation = {
		NONE: "",
		COUNT: "COUNT",
		SUM: "SUM",
		MAX: "MAX",
		MIN: "MIN",
		AVG: "AVG"
};

var OrderType = {
		ASCENDING: "ASC",
		DESCENDING: "DESC"
};

var MatchType =
{
		EQUALS : {value : "=" ,name:"EQUALS"}, 
		GREATER: {value:">" , name:"GREATER"},
		GREATEREQUAL : {value : ">=" , name:"GREATEREQUAL"},
		LESS: {value : "<" , name : "LESS"},
		LESSEQUAL: {value : "<=" , name : "LESSEQUAL"}, 
		STARTSWITH: {value : "LIKE" , name : "STARTSWITH"},
		CONTAINS: {value : "LIKE" , name : "CONTAINS"},
		LIKE: {value:"LIKE", name : "LIKE"},
		ENDSWITH: {value:"LIKE",name : "ENDSWITH"}, 
		NOTEQUAL: {value:"<>",name : "NOTEQUAL"},
		ISNULL: {value : "IS NULL",name : "ISNULL"},
		ISNOTNULL: {value : "IS NOT NULL",name : "ISNOTNULL"} 

};

var JoinType =
{
		INNER: "INNER",
		LEFT: "LEFT"

};

var ParameterType =
{
		IN: "IN", 
		OUT: "OUT",
		INOUT: "INOUT"
};

var ColumnUsage =
{
		SELECTCOLUMN: "0", 
		CRITERIACOLUMN: "1",
		UPDATECOLUMN: "2",
		INSERTCOLUMN: "3"
};


var Operator = 
{
		AND: "AND",
		OR: "OR"
};

function authenticateService(username, password, tenant, authenticateSuccesscallback, authenticateErrorcallback){
	var headers = {username: username, password: password, tenant: tenant};
	theAjaxProvider.get(saas.constants.AUTH_ENDPOINT, saas.constants.HTTP_METHOD_GET, headers, callbackHandler, authenticateErrorcallback, null);

	function callbackHandler(response){
		var result;
		if(typeof authenticateSuccesscallback === 'function') {
			if(response !== null && response !== undefined){
				if(typeof response === 'string' || response instanceof String){
					result = JSON.parse(response);
				}else{
					result = response;
				}
				var authResult = new Object();
				authResult["token"] = result["session_token"];
				authResult["tenant"] = tenant;
			}
			authenticateSuccesscallback(authResult);
		}
	}
}

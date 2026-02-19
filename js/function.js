function emptyFieldIfDefault(id,dfl)
{
	if(document.getElementById(id).value==dfl)
		document.getElementById(id).value="";
}

function refillIfNull(id,refill)
{
	if(document.getElementById(id).value == "")
		document.getElementById(id).value = refill;
}

function checkValidDate(id,type)
{
	token = document.getElementById(id).value;
	token = token.split("-");
	
	input = new Date(token[0],(token[1]-1),token[2],0,0,0);
	current = new Date();
	now = new Date(current.getFullYear(),current.getMonth(),current.getDate(),0,0,0);
	
	switch(type)
	{
		case "P":
		{
			// PAST
			if(input<now)
				return true;
		}
		break;
		case "PN":
		{
			// PAST AND NOW
			if(input<=now)
				return true;
		}
		break;
		case "F":
		{
			// FUTURE
			if(input>now)
				return true;
		}
		break;
		case "FN":
		{
			// FUTURE AND NOW
			if(input>=now)
				return true;
		}
		break;
	}
	return false;
}

/*
function ajaxReq(divid, page)
{
    $.get(page, function(data){$("#"+divid).html(data)});
}
*/

function ajaxReq(divid, page)
{
	$.ajax({
		url: page,
		async: false,
		context: document.body,
		success: function(data){
			$("#"+divid).html(data);
		}
	});
}

function enableIfNotZero(elId,enId)
{
	if(document.getElementById(elId).value!=0)
		document.getElementById(enId).disabled = false;
	else
		document.getElementById(enId).disabled = true;
}

function calculatePrice(unitPrice,qty)
{
	ret = (unitPrice*qty);
	return ret.toFixed(2);
}

function updatePrice(id,u,q)
{
	$('#'+id).html(calculatePrice(u,q));
}

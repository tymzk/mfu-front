import { Pipe, PipeTransform } from '@angular/core';

function replaceBreakLineCode(data: String){
	return data.replace(/^(?:\r\n|\r|\n)/gm, "\n");
}

function removeSpace(data: String){
	return data.replace(/(^\s+)|(\s+$)/g, "");
}

function removeBlankLine(data: String){
	return data.replace(/^(?:\r\n|\r|\n)/gm, "");
}

function insertBreakLine(data: String){
	return data.replace(/(?:\r\n|\r|\n)/g, "<br />");
}

export function ReplaceTextToJsonArray(value: String){
	var prefJsonArray = '[ ';
	var suffJsonArray = ' ]';
//	var prefEachValue = '{ "id": "';
//	var suffEachValue = '" }';
	var prefEachValue = '"';
	var suffEachValue = '"';


//		value = replaceBreakLineCode(value);
	value = removeSpace(value);
	value = removeBlankLine(value);
	var valueArray = value.split(/(?:\r\n|\r|\n)/g);
	// remove unnecessary lines

	// put prefix and suffix
	for(var i in valueArray){
		valueArray[i] = valueArray[i].replace(/\s+|[^A-Za-z0-9]/g, "").toLowerCase();
		valueArray[i] = prefEachValue + valueArray[i] + suffEachValue;
	}
	value = valueArray.join(',');

	return prefJsonArray + value + suffJsonArray;
}


@Pipe({
	name: 'ReplaceBreakLineCodePipe'
})
export class ReplaceBreakLineCodePipe implements PipeTransform {
	transform(data: String): String{
		return replaceBreakLineCode(data);
	}
}

@Pipe({
	name: 'InsertBreakLinePipe'
})
export class InsertBreakLinePipe implements PipeTransform {
	transform(value: String): String{
		return insertBreakLine(value);
	}
}

@Pipe({
	name: 'RemoveSpacePipe'
})
export class RemoveSpacePipe implements PipeTransform {
	transform(value: String): String{
		return removeSpace(value);
	}
}

@Pipe({
	name: 'RemoveBlankLinePipe'
})
export class RemoveBlankLinePipe implements PipeTransform {
	transform(value: String): String{
		return removeBlankLine(value);
	}
}


@Pipe({
	name: 'TextToJsonArrayPipe'
})
export class TextToJsonArrayPipe implements PipeTransform {

	transform(value: String): String{
		return ReplaceTextToJsonArray(value);
	}
}
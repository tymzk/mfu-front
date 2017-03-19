import { Pipe, PipeTransform } from '@angular/core';

export function convertUtcToLocalTime(utcDate: string){
	var localDate = new Date();
			localDate.setTime(Date.parse(utcDate));
//	console.log("pipe" + utcDate);
//	localDate.setTime(utcDate.getTime() - (utcDate.getTimezoneOffset() * 60 * 1000));
//	localDate.setTime(utcDate.getTime());
	return localDate;
}

@Pipe({
	name: 'ConvertUtcToLocalTimePipe'
})
export class ConvertUtcToLocalTimePipe implements PipeTransform {
	transform(utcDate: string): Date{
		return convertUtcToLocalTime(utcDate);
	}
}

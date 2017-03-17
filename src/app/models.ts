export class Subject {
  _id: String;
  name: String;
	semester: String;
  teachers: String[];
	assistants: String[];
  assignments: Assignment[];
  students: String[];
	created: Date;
}

export class Person {
  _id: String;
  id: String;
  subjects: Subject[];
}

export class Assignment {
  _id: String;
  name: String;
	vaild: Boolean;
  deadline: Date;
	description: String;
	items: AssignmentItem[];
	created: Date;
}

export class AssignmentItem {
  _id: String;
	name: String;
	extensions: String[];
  alias: String;
	description: String;
}
